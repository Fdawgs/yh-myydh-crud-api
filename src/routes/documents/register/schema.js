const S = require("fluent-json-schema");

const tags = ["Documents"];

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://www.fastify.io/docs/latest/Validation-and-Serialization/
 *
 * This validation protects against XSS and HPP attacks.
 */
const registerGetSchema = {
	tags,
	summary: "List document metadata",
	description: "Returns document metadata from register.",
	operationId: "getRegister",
	produces: ["application/json"],
	query: S.object()
		.prop(
			"lastModified",
			S.anyOf([
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
					),
				S.array()
					.items(
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
					)
					.minItems(2)
					.maxItems(2)
					.uniqueItems(true),
			])
		)

		.prop(
			"page",
			S.number()
				.description("Page to retrieve")
				.default(1)
				.examples([1, 10])
				.minimum(1)
		)
		.prop(
			"perPage",
			S.number()
				.description("Number of documents to return per page")
				.default(1)
				.examples([1, 10])
				.minimum(1)
				.maximum(100)
		)
		.required(["lastModified"]),
	response: {
		200: S.object()
			.prop(
				"data",
				S.array()
					.items(
						S.object()
							.prop(
								"guid",
								S.string()
									.examples(["EXAMPLEGUID-0123456789-99999"])
									.pattern("^[\\w\\-]{1,36}$")
							)
							.prop(
								"fhirId",
								S.string()
									.examples(["9999999999"])
									.pattern("^\\d{1,10}$")
							)

							.prop(
								"title",
								S.string().examples([
									"99999 DUCK 11 July 2015 11 27.pdf",
								])
							)
							.prop(
								"specialty",
								S.string().examples(["General Surgery"])
							)
							.prop("clinic", S.string().examples(["CLO/BIA"]))
							.prop(
								"documentType",
								S.string().examples(['"Clinic Letter"'])
							)
							.prop(
								"fileName",
								S.string().examples([
									"99999 DUCK 11 July 2015 11 27.pdf",
								])
							)
							.prop("baseUrl", S.string().format("uri"))
							.prop("baseSite", S.string().format("uri"))
							.prop("fullPath", S.string().format("uri"))
							.prop(
								"url",
								S.string()
									.examples([
										"https://notreal.ydh.nhs.uk/sites/MedicalRecords1/_layouts/15/DocIdRedir.aspx?ID=EXAMPLEGUID-0123456789-99999",
									])
									.format("uri")
							)
							.prop(
								"createdDate",
								S.string()
									.examples(["2015-09-30T05:40:14.000Z"])
									.format("date-time")
							)
							.prop(
								"modifiedDate",
								S.string()
									.examples(["2020-08-10T03:51:54.000Z"])
									.format("date-time")
							)
							.prop("patientVisible", S.number())
					)
					.uniqueItems(true)
			)
			.prop(
				"meta",
				S.object().prop(
					"pagination",
					S.object()
						.prop("total", S.number().examples([0, 1, 10]))
						.prop(
							"per_page",
							S.number()
								.default(1)
								.examples([1, 10])
								.minimum(1)
								.maximum(100)
						)
						.prop(
							"current_page",
							S.number().default(1).examples([1, 10]).minimum(1)
						)
						.prop("total_pages", S.number().examples([1, 10]))
				)
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

module.exports = { registerGetSchema };
