const createError = require("http-errors");
const clean = require("../../../utils/clean-objects");

const { userGetSchema, userPutSchema } = require("./schema");
const { userInsert, userSelect } = require("./query");

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Object containing route config objects.
 */
async function route(server, options) {
	server.route({
		method: "GET",
		url: "/:id",
		schema: userGetSchema,
		async handler(req, res) {
			try {
				const { recordsets } = await server.mssql.query(
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

				const patientPreferenceTypes = recordsets[0];
				const patientPreferencesValues = recordsets[1];

				if (
					patientPreferenceTypes &&
					patientPreferenceTypes.length !== 0
				) {
					// Build patient object
					const patientObj = {
						id: patientPreferenceTypes[0].id,
						meta: {
							created: patientPreferenceTypes[0].meta_created,
							lastupdated:
								patientPreferenceTypes[0].meta_lastupdated,
						},
						preferences: [],
					};

					// Build preference objects, merging in results from preferenceList query
					patientPreferenceTypes.forEach((preferenceType) => {
						const preferenceObj = {
							type: {
								display: preferenceType.preference_type_display,
								id: preferenceType.preference_type_id,
								priority:
									preferenceType.preference_type_priority,
								selected: undefined,
								options: [],
							},
						};

						// Build option objects to populate options array
						if (
							patientPreferencesValues &&
							patientPreferencesValues.length !== 0
						) {
							patientPreferencesValues.forEach(
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
					});

					res.send(clean(patientObj));
				} else {
					res.send(createError(404, "User not found"));
				}
			} catch (err) {
				server.log.error(err);
				res.send(
					createError(500, "Unable to return result(s) from database")
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
						const { rowsAffected } = await server.mssql.query(
							userInsert({
								patientId: req.params.id,
								preferenceTypeId: preference.id,
								preferenceValueId: preference.selected,
								preferencePriority: preference.priority,
								patientPreferencesTable:
									options.database.tables.patientPref,
							})
						);

						return rowsAffected;
					})
				);

				results.forEach((preferenceType) => {
					if (preferenceType[0] !== 1) {
						throw Error;
					}
				});

				res.status(204);
			} catch (err) {
				server.log.error(err);
				res.send(
					createError(
						500,
						"Unable to update user preferences in database"
					)
				);
			}
		},
	});
}

module.exports = route;
