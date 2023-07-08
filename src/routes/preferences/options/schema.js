"use strict";

const S = require("fluent-json-schema").default;

const tags = ["Contact preferences"];

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://fastify.io/docs/latest/Reference/Validation-and-Serialization/
 *
 * Input validation protects against XSS, HPP, prototype pollution,
 * and most other injection attacks
 */
const optionsGetSchema = {
	tags,
	summary: "List preference options",
	description:
		"Returns the default list of patient contact preferences that can be set.",
	operationId: "getOptions",
	produces: ["application/json", "application/xml"],
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
		404: S.ref("responses#/properties/notFoundDbResults").description(
			"Not Found"
		),
		406: S.ref("responses#/properties/notAcceptable").description(
			"Not Acceptable"
		),
		429: S.ref("responses#/properties/tooManyRequests").description(
			"Too Many Requests"
		),
		500: S.ref("responses#/properties/internalServerError").description(
			"Internal Server Error"
		),
		503: S.ref("responses#/properties/serviceUnavailable").description(
			"Service Unavailable"
		),
	},
};

module.exports = { optionsGetSchema };
