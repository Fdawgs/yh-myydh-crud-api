// Import plugins
const cors = require("fastify-cors");

// Import utils
const clean = require("../../../utils/clean-objects");

const { optionsGetSchema } = require("./schema");
const { optionsSelect } = require("./query");

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Route config values.
 * @param {object} options.cors - CORS settings.
 * @param {object} options.database - Database config values.
 * @param {object} options.database.tables - Database tables.
 * @param {string} options.database.tables.patientPrefTypeLookup - Name and schema of patient preferences type table.
 * @param {string} options.database.tables.patientPrefValueLookup - Name and schema of patient preference value table.
 */
async function route(server, options) {
	if (options.bearerTokenAuthKeys) {
		optionsGetSchema.security = [{ bearerToken: [] }];
	}

	// Use CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
	server.register(cors, {
		...options.cors,
		methods: ["GET"],
		hideOptionsRoute: true,
	});

	server.route({
		method: "GET",
		url: "/",
		schema: optionsGetSchema,
		async handler(req, res) {
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
						if (
							preferenceValueOptions &&
							preferenceValueOptions.length !== 0
						) {
							preferenceValueOptions.forEach(
								(preferenceValue) => {
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

					res.send(clean(patientObj));
				} else {
					res.notFound("Invalid or expired search results");
				}
			} catch (err) {
				server.log.error(err);
				res.internalServerError(
					"Unable to return result(s) from database"
				);
			}
		},
	});
}

module.exports = route;
