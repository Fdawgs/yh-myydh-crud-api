"use strict";

const S = require("fluent-json-schema").default;

const tags = ["Documents"];

/**
 * JSON Schema expects a String, `fluent-json-schema`
 * converts this from a RegExp to a String
 */
const dateTimeSearchPattern =
	// eslint-disable-next-line security/detect-unsafe-regex
	/^(?:ap|e[bq]|g[et]|l[et]|ne|sa)?\d{4}-[01]\d-[0-3]\d(?:T(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:Z|[+-]\d{2}(?::?\d{2})?))?$/u;

const dateTimeSearchPatternExamples = [
	"2022-01-13",
	"2022-01-13T00:00:01Z",
	"2022-01-13T00:00:01.001Z",
	"2022-01-13T00:00:01+01:00",
	"ge2022-01-13",
	"ge2022-01-13T00:00:01Z",
	"ge2022-01-13T00:00:01.001Z",
	"ge2022-01-13T00:00:01+01:00",
];

/**
 * Fastify uses AJV for JSON Schema Validation.
 * Input validation protects against XSS, HPP, prototype pollution,
 * and most other injection attacks.
 * @see {@link https://fastify.io/docs/latest/Reference/Validation-and-Serialization | Fastify Validation and Serialization}
 */
const registerGetSchema = {
	tags,
	summary: "List document metadata",
	description: "Returns document metadata from register.",
	operationId: "getRegister",
	produces: ["application/json", "application/xml"],
	query: S.object()
		.additionalProperties(false)
		.prop(
			"lastModified",
			S.anyOf([
				S.string()
					.description("Last modified datetime of document")
					.examples(dateTimeSearchPatternExamples)
					.pattern(dateTimeSearchPattern),
				S.array()
					.items(
						S.string()
							.description("Last modified datetime of document")
							.examples(dateTimeSearchPatternExamples)
							.pattern(dateTimeSearchPattern)
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
			.additionalProperties(false)
			.prop(
				"data",
				S.array()
					.items(
						S.object()
							.additionalProperties(false)
							.prop(
								"guid",
								S.string()
									.examples(["EXAMPLEGUID-0123456789-99999"])
									.pattern(/^[\w-]{1,36}$/u)
							)
							.prop(
								"fhirId",
								S.string()
									.examples(["9999999999"])
									.pattern(/^\d{1,10}$/u)
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
				S.object()
					.additionalProperties(false)
					.prop(
						"pagination",
						S.object()
							.additionalProperties(false)
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
								S.number()
									.default(1)
									.examples([1, 10])
									.minimum(1)
							)
							.prop("total_pages", S.number().examples([1, 10]))
					)
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

module.exports = { registerGetSchema };
