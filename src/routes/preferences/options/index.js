// Import plugins
const cors = require("@fastify/cors");

const { optionsGetSchema } = require("./schema");
const { optionsSelect } = require("./query");

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {object} server - Fastify instance.
 * @param {object} options - Route config values.
 * @param {boolean=} options.bearerTokenAuthEnabled - Apply `bearerToken` security scheme to route if defined.
 * @param {object} options.cors - CORS settings.
 * @param {object} options.database - Database config values.
 * @param {object} options.database.tables - Database tables.
 * @param {string} options.database.tables.patientPrefTypeLookup - Name and schema of patient preferences type table.
 * @param {string} options.database.tables.patientPrefValueLookup - Name and schema of patient preferences value table.
 */
async function route(server, options) {
	if (options.bearerTokenAuthEnabled) {
		optionsGetSchema.security = [{ bearerToken: [] }];
	}

	// Register plugins
	await server
		// Enable CORS if options passed
		.register(cors, {
			...options.cors,
			methods: ["GET", "HEAD"],
		});

	server.route({
		method: "GET",
		url: "/",
		schema: optionsGetSchema,
		preValidation: async (req) => {
			if (
				options.bearerTokenAuthEnabled &&
				!req?.scopes?.includes("preferences/options.search")
			) {
				throw server.httpErrors.unauthorized(
					"You do not have permission to perform an HTTP GET request on this route"
				);
			}
		},
		handler: async (req, res) => {
			try {
				const results = await server.db.query(
					optionsSelect({
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
				const preferenceTypeOptions =
					results?.recordsets?.[0] ?? results?.[0]?.rows;
				const preferenceValueOptions =
					results?.recordsets?.[1] ?? results?.[1]?.rows;

				if (
					preferenceTypeOptions &&
					preferenceTypeOptions.length !== 0
				) {
					// Build patient object
					const patientObj = {
						preferences: [],
					};

					let priorityCount = 0;

					// Build preference objects, merging in results from preferenceValueOptions query
					preferenceTypeOptions.forEach((preferenceType) => {
						const preferenceObj = {
							type: {
								display: preferenceType.preferenceTypeDisplay,
								id: preferenceType.preferenceTypeId,
								priority: priorityCount,
								selected: 2,
								options: [],
							},
						};

						// Build option objects to populate options array
						/* istanbul ignore else */
						if (
							preferenceValueOptions &&
							preferenceValueOptions.length !== 0
						) {
							preferenceValueOptions.forEach(
								(preferenceValue) => {
									/* istanbul ignore else: will not add preference type options if no match */
									if (
										preferenceValue.preferenceTypeId ===
										preferenceType.preferenceTypeId
									) {
										const optionObj = {
											display:
												preferenceValue.preferenceOptionDisplay,
											value: preferenceValue.preferenceOptionValue,
										};

										preferenceObj.type.options.push(
											optionObj
										);
									}
								}
							);

							patientObj.preferences.push(preferenceObj);
						}

						priorityCount += 1;
					});

					return server.cleanObject(patientObj);
				}
				return res.notFound("Invalid or expired search results");
			} catch (err) {
				return res.internalServerError(err);
			}
		},
	});
}

module.exports = route;
