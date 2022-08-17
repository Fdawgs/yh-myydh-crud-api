// Import plugins
const cors = require("@fastify/cors");

const { userGetSchema, userPutSchema } = require("./schema");
const { userInsert, userSelect } = require("./query");

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {object} server - Fastify instance.
 * @param {object} options - Route config values.
 * @param {boolean=} options.bearerTokenAuthEnabled - Apply `bearerToken` security scheme to route if defined.
 * @param {object} options.cors - CORS settings.
 * @param {object} options.database - Database config values.
 * @param {('mssql'|'postgresql')} options.database.client - Database client.
 * @param {object} options.database.tables - Database tables.
 * @param {string} options.database.tables.patientPref - Name and schema of patient preferences table.
 * @param {string} options.database.tables.patientPrefTypeLookup - Name and schema of patient preferences type table.
 * @param {string} options.database.tables.patientPrefValueLookup - Name and schema of patient preference value table.
 */
async function route(server, options) {
	if (options.bearerTokenAuthEnabled) {
		const security = [{ bearerToken: [] }];

		userGetSchema.security = security;
		userPutSchema.security = security;
	}

	// Register plugins
	await server
		// Enable CORS if options passed
		.register(cors, {
			...options.cors,
			methods: ["GET", "PUT"],
		});

	server.route({
		method: "GET",
		url: "/:id",
		schema: userGetSchema,
		preValidation: async (req) => {
			if (
				options.bearerTokenAuthEnabled &&
				!req?.scopes?.includes("preferences/user.read")
			) {
				throw server.httpErrors.unauthorized(
					"You do not have permission to perform an HTTP GET request on this route"
				);
			}
		},
		handler: async (req, res) => {
			try {
				const results = await server.db.query(
					userSelect({
						patientId: req.params.id,
						patientPreferencesTable:
							options.database.tables.patientPref,
						patientPreferencesTypeTable:
							options.database.tables.patientPrefTypeLookup,
						patientPreferencesValueTable:
							options.database.tables.patientPrefValueLookup,
					})
				);

				/**
				 * Database client packages return results in different structures,
				 * (mssql uses recordsets, pgsql uses rows) thus the optional chaining
				 */
				const patientPreferences =
					results?.recordsets?.[0] ?? results?.[0]?.rows;
				const patientPreferencesValues =
					results?.recordsets?.[1] ?? results?.[1]?.rows;

				if (patientPreferences?.length > 0) {
					// Build patient object
					const patientObj = {
						id: patientPreferences[0].id,
						meta: {
							created: patientPreferences[0].metaCreated,
							lastupdated: patientPreferences[0].metaLastUpdated,
						},
						preferences: [],
					};

					// Build preference objects, merging in results from patientPreferencesValues query
					patientPreferences.forEach((patientPreference) => {
						const preferenceObj = {
							type: {
								display:
									patientPreference.preferenceTypeDisplay,
								id: patientPreference.preferenceTypeId,
								priority:
									patientPreference.preferenceTypePriority,
								selected: undefined,
								options: [],
							},
						};

						// Build option objects to populate options array
						patientPreferencesValues.forEach((preferenceValue) => {
							/* istanbul ignore else: will not add preference type options if no match */
							if (
								preferenceValue.preferenceTypeId ===
								patientPreference.preferenceTypeId
							) {
								const optionObj = {
									display:
										preferenceValue.preferenceOptionDisplay,
									value: preferenceValue.preferenceOptionValue,
								};

								if (
									patientPreference.preferenceValueId ===
									preferenceValue.preferenceOptionValue
								) {
									preferenceObj.type.selected =
										preferenceValue.preferenceOptionValue;
								}

								preferenceObj.type.options.push(optionObj);
							}
						});

						patientObj.preferences.push(preferenceObj);
					});

					return server.cleanObject(patientObj);
				}
				return res.notFound("User not found");
			} catch (err) {
				return res.internalServerError(err);
			}
		},
	});

	server.route({
		method: "PUT",
		url: "/:id",
		schema: userPutSchema,
		preValidation: async (req) => {
			if (
				options.bearerTokenAuthEnabled &&
				!req?.scopes?.includes("preferences/user.put")
			) {
				throw server.httpErrors.unauthorized(
					"You do not have permission to perform an HTTP PUT request on this route"
				);
			}
		},
		handler: async (req, res) => {
			try {
				const results = await Promise.all(
					server.cleanObject(req.body.preferences).map((preference) =>
						server.db
							.query(
								userInsert({
									dbClient: options.database.client,
									patientId: req.params.id,
									preferenceTypeId: preference.id,
									preferenceValueId: preference.selected,
									preferencePriority: preference.priority,
									patientPreferencesTable:
										options.database.tables.patientPref,
								})
							)
							.then((rows) => {
								if (options.database.client === "postgresql") {
									return rows.rowCount;
								}

								return rows.rowsAffected;
							})
					)
				);

				let count = 0;
				results.forEach((preferenceType) => {
					if (preferenceType?.[0] < 1 || preferenceType < 1) {
						count += 1;
					}
				});
				if (count) {
					throw new Error(`${count} rows were not inserted`);
				}

				return res.status(204).send();
			} catch (err) {
				return res.internalServerError(err);
			}
		},
	});
}

module.exports = route;
