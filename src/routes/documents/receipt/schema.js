const S = require("fluent-json-schema");

const tags = ["Documents"];
const security = [{ bearer_token: [] }];

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://www.fastify.io/docs/latest/Validation-and-Serialization/
 *
 * This validation protects against XSS and HPP attacks.
 */
const receiptDeleteSchema = {
	tags,
	summary: "Delete document read receipt",
	params: S.object().prop(
		"id",
		S.string()
			.description("Logical id of the artifact")
			.examples(["EXAMPLE-GUID"])
			.required()
	),
	query: S.object().prop(
		"patientId",
		S.number()
			.description("Unique patient identifier")
			.examples([9999999999])
			.required()
	),
	response: {
		204: S.string().raw({ nullable: true }),
		500: S.object()
			.prop("statusCode", S.number().const(500))
			.prop("error", S.string().const("Internal Server Error"))
			.prop(
				"message",
				S.string().const(
					"Unable to update delete read receipt from database"
				)
			),
	},
	security,
};

const receiptPutSchema = {
	tags,
	summary: "Create or update read receipt",

	params: S.object().prop(
		"id",
		S.string()
			.description("Logical id of the artifact")
			.examples(["EXAMPLE-GUID"])
			.required()
	),
	query: S.object()
		.prop(
			"patientId",
			S.number()
				.description("Unique patient identifier")
				.examples([9999999999])
				.required()
		)
		.prop(
			"timestamp",
			S.string()
				.description("Read time of document")
				.format("date-time")
				.required()
		),
	response: {
		204: S.string().raw({ nullable: true }),
		404: S.object()
			.prop("statusCode", S.number().const(404))
			.prop("error", S.string().const("Not Found"))
			.prop(
				"message",
				S.string().const(
					"Record does not exist and/or has already been deleted"
				)
			),
		500: S.object()
			.prop("statusCode", S.number().const(500))
			.prop("error", S.string().const("Internal Server Error"))
			.prop(
				"message",
				S.string().const("Unable to update read receipt in database")
			),
	},
	security,
};

module.exports = { receiptDeleteSchema, receiptPutSchema };
