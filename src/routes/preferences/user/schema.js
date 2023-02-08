const S = require("fluent-json-schema");

const tags = ["Contact Preferences"];

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://fastify.io/docs/latest/Reference/Validation-and-Serialization/
 *
 * Input validation protects against XSS, HPP, and most injection attacks
 */
const userGetSchema = {
	tags,
	summary: "Inspect user contact preferences",
	description: "Returns an individual user's contact preferences by ID.",
	operationId: "getUserOptions",
	produces: ["application/json", "application/xml"],
	params: S.object().prop(
		"id",
		S.string()
			.description("Unique patient identifier")
			.examples([9999999999])
			.pattern(/^\d{1,10}$/m)
	),
	response: {
		200: S.object()
			.additionalProperties(false)
			.prop("id", S.string().pattern(/^\d{1,10}$/m))
			.prop(
				"meta",
				S.object()
					.additionalProperties(false)
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
						S.object()
							.additionalProperties(false)
							.prop(
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
		400: S.ref("responses#/properties/badRequest").description(
			"Bad Request"
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

const userPutSchema = {
	tags,
	summary: "Create or update a user's contact preferences",
	description:
		"Performs an upsert to create or update a user's contact preferences.",
	operationId: "createUserOptions",
	consumes: ["application/json"],
	produces: ["application/json", "application/xml"],
	params: S.object().prop(
		"id",
		S.string()
			.description("Unique patient identifier")
			.examples([1])
			.pattern(/^\d{1,10}$/m)
	),
	body: S.object()
		.additionalProperties(false)
		.prop(
			"preferences",
			S.array()
				.items(
					S.object()
						.additionalProperties(false)
						.prop("id", S.number())
						.prop("priority", S.number())
						.prop("selected", S.number())
						.required(["id", "priority", "selected"])
				)
				.minItems(1)
				.maxItems(4)
				.uniqueItems(true)
		)
		.required("preferences"),
	response: {
		204: S.string().raw({ nullable: true }).description("No Content"),
		400: S.ref("responses#/properties/badRequest").description(
			"Bad Request"
		),
		406: S.ref("responses#/properties/notAcceptable").description(
			"Not Acceptable"
		),
		415: S.ref("responses#/properties/unsupportedMediaType").description(
			"Unsupported Media Type"
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

module.exports = { userGetSchema, userPutSchema };
