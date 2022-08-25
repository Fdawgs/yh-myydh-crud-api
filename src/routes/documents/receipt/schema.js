const S = require("fluent-json-schema");

const tags = ["Documents"];

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://www.fastify.io/docs/latest/Validation-and-Serialization/
 *
 * Input validation protects against XSS, HPP, and most injection attacks.
 */
const receiptDeleteSchema = {
	tags,
	summary: "Delete receipt",
	description: "Delete a document read receipt.",
	operationId: "deleteReceipt",
	produces: ["application/json", "application/xml"],
	params: S.object()
		.prop(
			"id",
			S.string()
				.description("Logical id of the artifact")
				.examples(["EXAMPLEGUID-0123456789-99999"])
				.pattern(/^[\w-]{1,36}$/m)
		)
		.required(["id"]),
	query: S.object()
		.additionalProperties(false)
		.prop(
			"patientId",
			S.string()
				.description("Unique patient identifier")
				.examples([9999999999])
				.pattern(/^\d{1,10}$/m)
		)
		.required(["patientId"]),
	response: {
		204: S.string().raw({ nullable: true }).description("No Content"),
		401: S.ref("responses#/properties/unauthorized").description(
			"Unauthorized"
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

const receiptPutSchema = {
	tags,
	summary: "Create or update a read receipt",
	description: "Performs an upsert to create or update a read receipt.",
	operationId: "createReceipt",
	consumes: ["application/json"],
	produces: ["application/json", "application/xml"],
	params: S.object()
		.prop(
			"id",
			S.string()
				.description("Logical id of the artifact")
				.examples(["EXAMPLEGUID-0123456789-99999"])
				.pattern(/^[\w-]{1,36}$/m)
		)
		.required(["id"]),
	query: S.object()
		.additionalProperties(false)
		.prop(
			"patientId",
			S.string()
				.description("Unique patient identifier")
				.examples([9999999999])
				.pattern(/^\d{1,10}$/m)
		)
		.prop(
			"timestamp",
			S.string()
				.description("Read time of document")
				.examples(["2020-08-10T03:51:54.000Z"])
				.format("date-time")
		)
		.required(["patientId", "timestamp"]),
	response: {
		204: S.string().raw({ nullable: true }).description("No Content"),
		401: S.ref("responses#/properties/unauthorized").description(
			"Unauthorized"
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

module.exports = { receiptDeleteSchema, receiptPutSchema };
