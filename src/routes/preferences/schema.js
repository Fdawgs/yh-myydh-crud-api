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

// TODO: Add 300 response schema
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
						.prop("display", S.string().required())
						.prop("value", S.number(1).required())
						.prop(
							"options",
							S.array().items(
								S.object()
									.prop(
										"display",
										S.string().enum(["yes", "no"])
									)
									.prop("value", S.number().enum([1, 2]))
							)
						)
				)
			)
		),
	},
};

// TODO: Add 200 and 300 response schema
const userGetSchema = {
	params: S.object().prop(
		"id",
		S.number().description("Unique patient identifier").examples([1])
	),
};

// TODO: Add 200 and 300 response schema
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
};

module.exports = { optionsGetSchema, userGetSchema, userPutSchema };
