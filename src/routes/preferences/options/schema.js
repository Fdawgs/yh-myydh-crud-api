const S = require("fluent-json-schema");

const tags = ["Contact Preferences"];

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://www.fastify.io/docs/latest/Validation-and-Serialization/
 *
 * Input validation protects against XSS, HPP, and most injection attacks.
 */
const optionsGetSchema = {
	tags,
	summary: "List preference options",
	description:
		"Returns the default list of patient contact preferences that can be set.",
	operationId: "getOptions",
	produces: ["application/json"],
	response: {
		200: S.object()
			.additionalProperties(false)
			.prop(
				"preferences",
				S.array()
					.items(
						S.object()
							.additionalProperties(false)
							.prop(
								"type",
								S.object()
									.additionalProperties(false)
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
									.prop(
										"priority",
										S.number().enum([0, 1, 2, 3])
									)
									.prop("selected", S.number().enum([1, 2]))
									.prop(
										"options",
										S.array()
											.items(
												S.object()
													.additionalProperties(false)
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
		401: S.ref("responses#/definitions/unauthorized").description(
			"Unauthorized"
		),
		404: S.ref("responses#/definitions/notFoundDbResults").description(
			"Not Found"
		),
		406: S.ref("responses#/definitions/notAcceptable").description(
			"Not Acceptable"
		),
		429: S.ref("responses#/definitions/tooManyRequests").description(
			"Too Many Requests"
		),
		500: S.ref("responses#/definitions/internalServerError").description(
			"Internal Server Error"
		),
		503: S.ref("responses#/definitions/serviceUnavailable").description(
			"Service Unavailable"
		),
	},
};

module.exports = { optionsGetSchema };
