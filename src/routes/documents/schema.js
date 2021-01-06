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
const registerGetSchema = {
	description: "Retrieve document metadata from register",
	headers: headerSchema,

	querystring: S.object()
		.prop(
			"lastModified",
			S.string()
				.description("Last modified datetime of document")
				.examples([
					"2021-01-01",
					"ge2021-01-01T00:00:01",
					"ge2021-01-01",
					"2021-01-01T00:00:01",
				])
				.pattern(
					"^(?:eq|ne|ge|le|gt|lt|sa|eb|ap|)\\d{4}-\\d{2}-\\d{2}(?:T\\d{2}\\:\\d{2}\\:\\d{2}|)$"
				)
				.required()
		)
		.prop(
			"page",
			S.number()
				.description("Page to retrieve")
				.default(1)
				.examples([1, 10])
		)
		.prop(
			"perPage",
			S.number()
				.description("Number of documents to return per page")
				.default(1)
				.examples([1, 10])
		),
	response: {
		200: S.object()
			.prop(
				"data",
				S.array().items(
					S.object()
						.prop("guid", S.string().examples(["EXAMPLE-GUID"]))
						.prop("fhir_id", S.number().examples(["99999"]))
						.prop(
							"title",
							S.string().examples([
								"99999   DUCK 11 July 2015 11 27.pdf",
							])
						)
						.prop(
							"specialty",
							S.string().examples(["General Surgery"])
						)
						.prop("clinic", S.string().examples(["CLO/BIA"]))
						.prop(
							"document_type",
							S.string().examples(['"Clinic Letter"'])
						)
						.prop(
							"file_name",
							S.string().examples([
								"99999   DUCK 11 July 2015 11 27.pdf",
							])
						)
						.prop(
							"url",
							S.string()
								.examples([
									"https://notreal.ydh.nhs.uk/sites/MedicalRecords1/_layouts/15/DocIdRedir.aspx?ID=EXAMPLE-GUID",
								])
								.format("uri")
						)
						.prop(
							"created_date",
							S.string()
								.examples(["2015-09-30T05:40:14.000Z"])
								.format("date-time")
						)
						.prop(
							"modified",
							S.string()
								.examples(["2020-08-10T03:51:54.000Z"])
								.format("date-time")
						)
				)
			)
			.prop(
				"meta",
				S.object().prop(
					"pagination",
					S.object()
						.prop("total", S.number().examples([0, 1, 10]))
						.prop(
							"per_page",
							S.number().default(1).examples([1, 10])
						)
						.prop(
							"current_page",
							S.number().default(1).examples([1, 10])
						)
						.prop("total_pages", S.number().examples([1, 10]))
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

// TODO: Add 200 and 300 response schema
const receiptDeleteSchema = {
	description: "Delete document read receipt",
	headers: headerSchema,
	params: S.object().prop(
		"id",
		S.string()
			.description("Logical id of the artifact")
			.examples(["EXAMPLE-GUID"])
			.required()
	),
	querystring: S.object().prop(
		"patientId",
		S.number()
			.description("Unique patient identifier")
			.examples([9999999999])
			.required()
	),
};

// TODO: Add 200 and 300 response schema
const receiptPutSchema = {
	description: "Create document read receipt",
	headers: headerSchema,
	params: S.object().prop(
		"id",
		S.string()
			.description("Logical id of the artifact")
			.examples(["EXAMPLE-GUID"])
			.required()
	),
	querystring: S.object()
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
};

module.exports = { registerGetSchema, receiptDeleteSchema, receiptPutSchema };
