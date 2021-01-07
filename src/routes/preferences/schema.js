const S = require("fluent-json-schema");

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://www.fastify.io/docs/latest/Validation-and-Serialization/
 *
 * This validation protects against XSS and HPP attacks.
 */
const headerSchema = S.object().prop(
	"Authorization",
	S.string().description("Bearer token for authorization").required()
);

const optionsGetSchema = {
	description:
		"Retrieve default available list of patient contact preferences that can be set",
	headers: headerSchema,
	response: {
		200: S.object().prop(
			"preferences",
			S.array().items(
				S.object().prop(
					"type",
					S.object()
						.prop(
							"display",
							S.string()
								.enum(["SMS", "Email", "Phone", "Letters"])
								.required()
						)
						.prop("id", S.number().enum([1, 2, 3, 4]).required())
						.prop(
							"priority",
							S.number().enum([0, 1, 2, 3]).required()
						)
						.prop("selected", S.number().enum([1, 2]).required())
						.prop(
							"options",
							S.array()
								.items(
									S.object()
										.prop(
											"display",
											S.string().enum(["yes", "no"])
										)
										.prop("value", S.number().enum([1, 2]))
								)
								.minItems(2)
								.maxItems(2)
								.required()
						)
				)
			)
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
};

const userGetSchema = {
	params: S.object().prop(
		"id",
		S.number().description("Unique patient identifier").examples([1])
	),
	response: {
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
};

const userPutSchema = {
	params: S.object().prop(
		"id",
		S.number().description("Unique patient identifier").examples([1])
	),
	body: S.object().prop(
		"preferences",
		S.array().items(
			S.object()
				.prop("id", S.number().required())
				.prop("priority", S.number().required())
				.prop("selected", S.number().required())
		)
	),
	response: {
		204: S.null(),
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
};

module.exports = { optionsGetSchema, userGetSchema, userPutSchema };
