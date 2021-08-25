const S = require("fluent-json-schema");

const tags = ["Documents"];

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://www.fastify.io/docs/latest/Validation-and-Serialization/
 *
 * This validation protects against XSS and HPP attacks.
 */
const receiptDeleteSchema = {
	tags,
	summary: "Delete receipt",
	description: "Delete a document read receipt.",
	operationId: "deleteReceipt",
	params: S.object()
		.prop(
			"id",
			S.string()
				.description("Logical id of the artifact")
				.examples(["EXAMPLEGUID-0123456789-99999"])
				.pattern("^[\\w\\-]{1,36}$")
		)
		.required(["id"]),
	query: S.object()
		.prop(
			"patientId",
			S.string()
				.description("Unique patient identifier")
				.examples([9999999999])
				.pattern("^\\d{1,10}$")
		)
		.required(["patientId"]),
	response: {
		204: S.string().raw({ nullable: true }).description("No Content"),
		404: S.ref("responses#/definitions/notFoundDbResults").description(
			"Not Found"
		),
		406: S.ref("responses#/definitions/notAcceptable").description(
			"Not Acceptable"
		),
		429: S.ref("responses#/definitions/tooManyRequests").description(
			"Too Many Requests"
		),
		500: S.ref(
			"responses#/definitions/internalServerErrorDbResults"
		).description("Internal Server Error"),
	},
};

const receiptPutSchema = {
	tags,
	summary: "Create or update a read receipt",
	description: "Performs an upsert to create or update a read receipt.",
	operationId: "createReceipt",
	params: S.object()
		.prop(
			"id",
			S.string()
				.description("Logical id of the artifact")
				.examples(["EXAMPLEGUID-0123456789-99999"])
				.pattern("^[\\w\\-]{1,36}$")
		)
		.required(["id"]),
	query: S.object()
		.prop(
			"patientId",
			S.string()
				.description("Unique patient identifier")
				.examples([9999999999])
				.pattern("^\\d{1,10}$")
		)
		.prop(
			"timestamp",
			S.string().description("Read time of document").format("date-time")
		)
		.required(["patientId", "timestamp"]),
	response: {
		204: S.string().raw({ nullable: true }).description("No Content"),
		406: S.ref("responses#/definitions/notAcceptable").description(
			"Not Acceptable"
		),
		429: S.ref("responses#/definitions/tooManyRequests").description(
			"Too Many Requests"
		),
		500: S.ref(
			"responses#/definitions/internalServerErrorDbResults"
		).description("Internal Server Error"),
	},
};

module.exports = { receiptDeleteSchema, receiptPutSchema };
