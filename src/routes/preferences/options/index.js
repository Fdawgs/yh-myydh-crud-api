const createError = require("http-errors");
const clean = require("../../../utils/clean-objects");

const { optionsGetSchema } = require("./schema");
const { optionsSelect } = require("./query");

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
				const { recordsets } = await server.mssql.query(
					optionsSelect({
						patientPreferencesTypeTable:
							options.database.tables.patientPrefTypeLookup,
						patientPreferencesValueTable:
							options.database.tables.patientPrefValueLookup,
					})
				);

				const preferenceTypeOptions = recordsets[0];
				const preferenceValueOptions = recordsets[1];

				if (
					preferenceTypeOptions &&
					preferenceTypeOptions.length !== 0
				) {
					// Build patient object
					const patientObj = {
						preferences: [],
					};

					let priorityCount = 0;

					// Build preference objects, merging in results from preference list query
					preferenceTypeOptions.forEach((preferenceType) => {
						const preferenceObj = {
							type: {
								display: preferenceType.preference_type_display,
								id: preferenceType.preference_type_id,
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
										preferenceValue.preference_type_id ===
										preferenceType.preference_type_id
									) {
										const optionObj = {
											display:
												preferenceValue.preference_option_display,
											value:
												preferenceValue.preference_option_value,
										};

										if (
											preferenceType.preferenceValueId ===
											preferenceValue.preference_option_value
										) {
											preferenceObj.type.selected =
												preferenceValue.preference_option_value;
										}

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
