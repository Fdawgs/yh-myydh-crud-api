const createError = require("http-errors");
const sqlServer = require("mssql");

const clean = require("../../utils/clean-objects");

const { optionsGetSchema, userGetSchema, userPutSchema } = require("./schema");

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Object containing route config objects.
 */
async function route(server, options) {
	server.route({
		method: "GET",
		url: "/options",
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

	server.route({
		method: "GET",
		url: "/user/:id",
		schema: userGetSchema,
		async handler(req, res) {
			try {
				const prefType = await server.mssql
					.request()
					.input(
						"input_parameter",
						sqlServer.VarChar(255),
						req.params.id
					)
					.query(
						`SELECT pat.patientId AS id,
								pat.created AS meta_created,
								pat.lastUpdated AS meta_lastupdated,
								pat.preferenceValueId,
								pat.preferenceTypeId AS preference_type_id,
								prefType.preferenceType AS preference_type_display,
								pat.preferencePriority AS preference_type_priority
						   FROM ${options.database.tables.patientPref} pat
								LEFT JOIN ${options.database.tables.patientPrefTypeLookup} prefType
								ON pat.preferenceTypeId = prefType.preferenceTypeId
						 WHERE patientId = @input_parameter`
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
						id: prefType.recordset[0].id,
						meta: {
							created: prefType.recordset[0].meta_created,
							lastupdated: prefType.recordset[0].meta_lastupdated,
						},
						preferences: [],
					};

					// Build preference objects, merging in results from preferenceList query
					prefType.recordset.forEach((element) => {
						const preferenceObj = {
							type: {
								display: element.preference_type_display,
								id: element.preference_type_id,
								priority: element.preference_type_priority,
								selected: undefined,
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
		url: "/user/:id",
		schema: userPutSchema,
		async handler(req, res) {
			if (
				req.body &&
				Object.keys(req.body).length &&
				req.body.preferences
			) {
				await Promise.all(
					clean(req.body.preferences).map(async (preference) => {
						try {
							await server.mssql
								.request()
								.input(
									"patientId",
									sqlServer.VarChar(255),
									req.params.id
								)
								.input(
									"preferenceTypeId",
									sqlServer.Int,
									preference.id
								)
								.input(
									"preferenceValueId",
									sqlServer.Int,
									preference.selected
								)
								.input(
									"preferencePriority",
									sqlServer.Int,
									preference.priority
								)
								.query(
									`IF EXISTS(SELECT patientId 
											 FROM ${options.database.tables.patientPref}
											WHERE patientId = @patientId
											  AND preferenceTypeId = @preferenceTypeId)
								UPDATE ${options.database.tables.patientPref}
								   SET preferencePriority = @preferencePriority,
									   preferenceValueId = @preferenceValueId,
									   lastUpdated = CURRENT_TIMESTAMP
								 WHERE patientId = @patientId
								   AND preferenceTypeId = @preferenceTypeId
								ELSE
								INSERT INTO ${options.database.tables.patientPref} (patientId, preferenceTypeId, preferenceValueId, preferencePriority, created)
								VALUES(@patientId, @preferenceTypeId, @preferenceValueId, @preferencePriority, CURRENT_TIMESTAMP)`
								);
							res.status(204);
						} catch (err) {
							server.log.error(err);
							res.send(
								createError(
									500,
									"Unable to update patient preference in database"
								)
							);
						}
					})
				);
			} else {
				res.send(createError(400, "Malformed body or body missing"));
			}
		},
	});
}

module.exports = route;
