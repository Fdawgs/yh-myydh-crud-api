const createError = require("http-errors");
const sqlServer = require("mssql");

const clean = require("../../../utils/clean-objects");

const { optionsGetSchema } = require("./schema");

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Object containing route config objects.
 */
async function route(server, options) {
	server.route({
		method: "GET",
		url: "/",
		schema: optionsGetSchema,
		async handler(req, res) {
			try {
				const prefType = await server.mssql
					.request()
					.input("input_parameter", sqlServer.Int, req.params.id)
					.query(
						`SELECT prefType.preferenceTypeId AS preference_type_id,
								prefType.preferenceType AS preference_type_display
						   FROM ${options.database.tables.patientPrefTypeLookup} prefType`
					);

				const prefList = await server.mssql.request().query(
					`SELECT prefType.preferenceTypeId AS preference_type_id,
							prefType.preferenceType AS preference_type_display,
							prefVal.preferenceValue AS preference_option_display,
							prefVal.preferenceValueId AS preference_option_value
					   FROM ${options.database.tables.patientPrefTypeLookup} prefType
				 CROSS JOIN ${options.database.tables.patientPrefValueLookup} prefVal`
				);

				if (prefType.recordset && prefType.recordset.length !== 0) {
					// Build patient object
					const patientObj = {
						preferences: [],
					};

					let priorityCount = 0;

					// Build preference objects, merging in results from preferenceList query
					prefType.recordset.forEach((element) => {
						const preferenceObj = {
							type: {
								display: element.preference_type_display,
								id: element.preference_type_id,
								priority: priorityCount,
								selected: 2,
								options: [],
							},
						};

						// Build option objects to populate options array
						if (
							prefList.recordset &&
							prefList.recordset.length !== 0
						) {
							prefList.recordset.forEach((option) => {
								if (
									option.preference_type_id ===
									element.preference_type_id
								) {
									const optionObj = {
										display:
											option.preference_option_display,
										value: option.preference_option_value,
									};

									if (
										element.preferenceValueId ===
										option.preference_option_value
									) {
										preferenceObj.type.selected =
											option.preference_option_value;
									}

									preferenceObj.type.options.push(optionObj);
								}
							});

							patientObj.preferences.push(preferenceObj);
						}

						priorityCount += 1;
					});

					res.send(clean(patientObj));
				} else {
					res.send(
						createError(404, "Invalid or expired search results")
					);
				}
			} catch (err) {
				server.log.error(err);
				res.send(
					createError(500, "Unable to return result(s) from database")
				);
			}
		},
	});
}

module.exports = route;
