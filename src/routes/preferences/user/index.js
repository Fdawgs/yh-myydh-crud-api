// Import plugins
const cors = require("fastify-cors");

// Import utils
const clean = require("../../../utils/clean-objects");

const { userGetSchema, userPutSchema } = require("./schema");
const { userInsert, userSelect } = require("./query");

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Route config values.
 * @param {object} options.cors - CORS settings.
 * @param {object} options.database - Database config values.
 * @param {('mssql'|'postgresql')} options.database.client - Database client.
 * @param {object} options.database.tables - Database tables.
 * @param {string} options.database.tables.patientPref - Name and schema of patient preferences table.
 * @param {string} options.database.tables.patientPrefTypeLookup - Name and schema of patient preferences type table.
 * @param {string} options.database.tables.patientPrefValueLookup - Name and schema of patient preference value table.
 */
async function route(server, options) {
	// Use CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
	server.register(cors, {
		...options.cors,
		methods: ["GET", "PUT"],
		hideOptionsRoute: true,
	});

	server.route({
		method: "GET",
		url: "/:id",
		schema: userGetSchema,
		async handler(req, res) {
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
				 * switch needed to accommodate for this
				 */
				let patientPreferences;
				let patientPreferencesValues;
				switch (options.database.client) {
					case "mssql":
					default:
						patientPreferences = results.recordsets[0];
						patientPreferencesValues = results.recordsets[1];
						break;
					case "postgresql":
						patientPreferences = results[0].rows;
						patientPreferencesValues = results[1].rows;
						break;
				}

				if (patientPreferences && patientPreferences.length !== 0) {
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

					res.send(clean(patientObj));
				} else {
					res.notFound("User not found");
				}
			} catch (err) {
				server.log.error(err);
				res.internalServerError(
					"Unable to return result(s) from database"
				);
			}
		},
	});

	server.route({
		method: "PUT",
		url: "/:id",
		schema: userPutSchema,
		async handler(req, res) {
			try {
				const results = await Promise.all(
					clean(req.body.preferences).map(async (preference) => {
						const rows = await server.db.query(
							userInsert({
								dbClient: options.database.client,
								patientId: req.params.id,
								preferenceTypeId: preference.id,
								preferenceValueId: preference.selected,
								preferencePriority: preference.priority,
								patientPreferencesTable:
									options.database.tables.patientPref,
							})
						);

						if (options.database.client === "postgresql") {
							return rows.rowCount;
						}

						return rows.rowsAffected;
					})
				);

				results.forEach((preferenceType) => {
					if (preferenceType?.[0] < 1 || preferenceType < 1) {
						throw Error;
					}
				});

				res.status(204);
			} catch (err) {
				server.log.error(err);
				res.internalServerError(
					"Unable to update user preferences in database"
				);
			}
		},
	});
}

module.exports = route;
