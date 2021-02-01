const S = require("fluent-json-schema");

const tags = ["Contact Preferences"];
const security = [{ bearer_token: [] }];

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://www.fastify.io/docs/latest/Validation-and-Serialization/
 *
 * This validation protects against XSS and HPP attacks.
 */
const userGetSchema = {
	tags,
	summary: "Retrieve list of patient contact preferences",
	operationId: "getUserOptions",
	produces: ["application/json"],
	params: S.object().prop(
		"id",
		S.string()
			.description("Unique patient identifier")
			.examples([9999999999])
			.pattern("^\\d{1,10}$")
	),
	response: {
		200: S.object()
			.prop("id", S.string().pattern("^\\d{1,10}$"))
			.prop(
				"meta",
				S.object()
					.prop(
						"created",
						S.string()
							.examples(["2020-08-10T03:51:54.000Z"])
							.format("date-time")
					)
					.prop(
						"lastupdated",
						S.string()
							.examples(["2020-08-10T03:51:54.000Z"])
							.format("date-time")
					)
			)
			.prop(
				"preferences",
				S.array()
					.items(
						S.object().prop(
							"type",
							S.object()
								.prop(
									"display",
									S.string().enum([
										"SMS",
										"Email",
										"Phone",
										"Letters",
									])
								)
								.prop("id", S.number().enum([1, 2, 3, 4]))
								.prop("priority", S.number().enum([0, 1, 2, 3]))
								.prop("selected", S.number().enum([1, 2]))
								.prop(
									"options",
									S.array()
										.items(
											S.object()
												.prop(
													"display",
													S.string().enum([
														"yes",
														"no",
													])
												)
												.prop(
													"value",
													S.number().enum([1, 2])
												)
										)
										.minItems(2)
										.maxItems(2)
										.uniqueItems(true)
								)
						)
					)
					.minItems(1)
					.maxItems(4)
					.uniqueItems(true)
			),
		404: S.object()
			.prop("statusCode", S.number().const(404))
			.prop("error", S.string().const("Not Found"))
			.prop("message", S.string().const("User not found")),
		500: S.object()
			.prop("statusCode", S.number().const(500))
			.prop("error", S.string().const("Internal Server Error"))
			.prop(
				"message",
				S.string().const("Unable to return result(s) from database")
			),
	},
	security,
};

const userPutSchema = {
	tags,
	summary: "Create or update list of patient contact preferences",
	operationId: "createUserOptions",
	consumes: ["application/json"],
	params: S.object().prop(
		"id",
		S.string()
			.description("Unique patient identifier")
			.examples([1])
			.pattern("^\\d{1,10}$")
	),
	body: S.object().prop(
		"preferences",
		S.array()
			.items(
				S.object()
					.prop("id", S.number().required())
					.prop("priority", S.number().required())
					.prop("selected", S.number().required())
			)
			.minItems(1)
			.maxItems(4)
			.uniqueItems(true)
			.required()
	),
	response: {
		204: S.string().raw({ nullable: true }),
		400: S.object()
			.prop("statusCode", S.number().const(400))
			.prop("error", S.string().const("Bad Request"))
			.prop(
				"message",
				S.string().const("Malformed body or body missing")
			),
		500: S.object()
			.prop("statusCode", S.number().const(500))
			.prop("error", S.string().const("Internal Server Error"))
			.prop(
				"message",
				S.string().const(
					"Unable to update patient preference in database"
				)
			),
	},
	security,
};

module.exports = { userGetSchema, userPutSchema };
