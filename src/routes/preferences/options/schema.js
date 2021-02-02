const S = require("fluent-json-schema");

const tags = ["Contact Preferences"];
const security = [{ bearerToken: [] }];

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://www.fastify.io/docs/latest/Validation-and-Serialization/
 *
 * This validation protects against XSS and HPP attacks.
 */
const optionsGetSchema = {
	tags,
	summary:
		"Retrieve default available list of patient contact preferences that can be set",
	operationId: "getOptions",
	produces: ["application/json"],
	response: {
		200: S.object().prop(
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
												S.string().enum(["yes", "no"])
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
			.prop(
				"message",
				S.string().const("Invalid or expired search results")
			),
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

module.exports = { optionsGetSchema };
