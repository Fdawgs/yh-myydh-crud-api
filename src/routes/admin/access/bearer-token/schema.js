const S = require("fluent-json-schema");

const security = [{ basicAuth: [] }];
const tags = ["System Administration"];

/**
 * JSON Schema expects a String, `fluent-json-schema` converts this from
 * a RegExp to a String. JSON Schema does not support Regex flags.
 */
const dateTimeSearchPattern =
	/^(?:eq|ne|ge|le|gt|lt|sa|eb|ap|)\d{4}-[0-1]\d-[0-3]\d(?:T(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:Z|[+-]\d\d(?::?\d\d)?))?$/m;

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

const accessRecordScopes = [
	"documents/receipt.delete",
	"documents/receipt.put",
	"documents/register.search",
	"preferences/options.search",
	"preferences/user.put",
	"preferences/user.read",
];

const accessRecordBaseSchema = S.object()
	.prop("id", S.string().format("uuid"))
	.prop(
		"access",
		S.object()
			.additionalProperties(false)
			.prop(
				"name",
				S.string().description(
					"Name of client or service accessing API"
				)
			)
			.prop(
				"email",
				S.string()
					.format("email")
					.description(
						"Contact email of client or service accessing API"
					)
			)
			.prop(
				"expires",
				S.string()
					.description("Expiry date of bearer token")
					.examples(["2022-01-13T14:05:54.000Z"])
					.format("date-time")
			)
			.prop("hash", S.string().description("Hashed bearer token"))
			.prop(
				"salt",
				S.string().description("Salt used on hashed bearer token")
			)
			.prop(
				"scopes",
				S.array()
					.items(S.string().enum(accessRecordScopes))
					.uniqueItems(true)
					.description(
						"Actions the bearer token has been granted access to perform"
					)
			)
	)
	.prop(
		"meta",
		S.object()
			.additionalProperties(false)
			.prop(
				"created",
				S.string()
					.examples(["2022-01-13T14:05:54.000Z"])
					.format("date-time")
			)
			.prop(
				"last_updated",
				S.string()
					.examples(["2022-01-13T14:05:54.000Z"])
					.format("date-time")
			)
	)
	.required(["access"]);

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://www.fastify.io/docs/latest/Validation-and-Serialization/
 *
 * Input validation protects against XSS, HPP, and most injection attacks.
 */
const accessDeleteSchema = {
	tags,
	summary: "Delete bearer token",
	description: "Delete a bearer token record.",
	operationId: "deleteAccess",
	produces: ["application/json", "application/xml"],
	params: S.object()
		.prop(
			"id",
			S.string()
				.description("Unique identifier of bearer token record")
				.examples(["A972C577-DFB0-064E-1189-0154C99310DAAC12"])
				.format("uuid")
		)
		.required(["id"]),
	response: {
		204: S.string().raw({ nullable: true }).description("No Content"),
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
	security,
};

const accessGetReadSchema = {
	tags,
	summary: "Read bearer token record",
	description: "Return a single bearer token record.",
	operationId: "getReadAccess",
	produces: ["application/json", "application/xml"],
	params: S.object()
		.prop(
			"id",
			S.string()
				.description("Unique identifier of bearer token record")
				.examples(["A972C577-DFB0-064E-1189-0154C99310DAAC12"])
				.format("uuid")
		)
		.required(["id"]),
	response: {
		200: accessRecordBaseSchema,
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
	security,
};

const accessGetSearchSchema = {
	tags,
	summary: "Search bearer token records",
	description: "Return bearer token records.",
	operationId: "getSearchAccess",
	produces: ["application/json", "application/xml"],
	query: S.object()
		.prop(
			"access.name",
			S.string().description(
				"Name of client or service granted access to API, case-insensitive and supports `*` wildcards"
			)
		)
		.prop(
			"access.email",
			S.string()
				.format("email")
				.description(
					"Contact email of client or service granted access to API, case-insensitive and supports `*` wildcards"
				)
		)
		.prop(
			"access.expires",
			S.anyOf([
				S.string()
					.description("Datetime when bearer token expires")
					.examples(dateTimeSearchPatternExamples)
					.pattern(dateTimeSearchPattern),
				S.array()
					.items(
						S.string()
							.description("Datetime when bearer token expires")
							.examples(dateTimeSearchPatternExamples)
							.pattern(dateTimeSearchPattern)
					)
					.minItems(2)
					.maxItems(2)
					.uniqueItems(true),
			])
		)
		.prop(
			"access.scopes",
			S.anyOf([
				S.string()
					.enum(accessRecordScopes)
					.description("An action the bearer token can perform"),
				S.array()
					.items(
						S.string()
							.enum(accessRecordScopes)
							.description(
								"An action the bearer token can perform"
							)
					)
					.minItems(2)
					.uniqueItems(true),
			])
		)
		.prop(
			"meta.created",
			S.anyOf([
				S.string()
					.description(
						"Datetime when bearer token record was created"
					)
					.examples(dateTimeSearchPatternExamples)
					.pattern(dateTimeSearchPattern),
				S.array()
					.items(
						S.string()
							.description(
								"Datetime when bearer token record was created"
							)
							.examples(dateTimeSearchPatternExamples)
							.pattern(dateTimeSearchPattern)
					)
					.minItems(2)
					.maxItems(2)
					.uniqueItems(true),
			])
		)
		.prop(
			"meta.last_updated",
			S.anyOf([
				S.string()
					.description(
						"Last modified datetime of bearer token record"
					)
					.examples(dateTimeSearchPatternExamples)
					.pattern(dateTimeSearchPattern),
				S.array()
					.items(
						S.string()
							.description(
								"Last modified datetime of bearer token record"
							)
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
			"per_page",
			S.number()
				.description(
					"Number of bearer token records to return per page"
				)
				.default(1)
				.examples([1, 10])
				.minimum(1)
				.maximum(100)
		),
	responses: {
		200: S.object()
			.additionalProperties(false)
			.prop("link", S.string().format("uri"))
			.prop(
				"entry",
				S.array().items(
					S.object()
						.prop("url", S.string().format("uri"))
						.extend(accessRecordBaseSchema)
				)
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
		400: S.ref("responses#/definitions/badRequest").description(
			"Bad Request"
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
	security,
};

const accessPostSchema = {
	tags,
	summary: "Create a bearer token",
	description: "Generate a new bearer token that grants access to the API.",
	operationId: "postAccess",
	consumes: ["application/json"],
	produces: ["application/json", "application/xml"],
	body: S.object()
		.additionalProperties(false)
		.prop(
			"name",
			S.string().description(
				"Name of client or service being granted access to API"
			)
		)
		.prop(
			"email",
			S.string()
				.format("email")
				.description(
					"Contact email of client or service being granted access to API"
				)
		)
		.prop(
			"expires",
			S.string()
				.description("Expiry date of bearer token")
				.examples([
					"2022-01-13",
					"2022-01-13T00:00:01",
					"2022-01-13T00:00:01.001",
					"2022-01-13T00:00:01Z",
					"2022-01-13T00:00:01.001Z",
				])
				.pattern(
					/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}|)(?:.\d{3}|)(?:Z|)$/im
				)
		)
		.prop(
			"scopes",
			S.array()
				.items(S.string().enum(accessRecordScopes))
				.uniqueItems(true)
				.description("Actions the bearer token can perform")
		)
		.required(["name", "scopes"]),
	response: {
		201: S.object()
			.prop(
				"id",
				S.string()
					.description(
						"Unique identifier of newly created bearer token record"
					)
					.examples(["A972C577-DFB0-064E-1189-0154C99310DAAC12"])
					.format("uuid")
			)
			.prop(
				"access",
				S.object()
					.additionalProperties(false)
					.prop(
						"token",
						S.string()
							.description("Newly created bearer token")
							.examples([
								"ydhmyydh_3e8c3d19-fd60-460e-9c44-2e74cfa3545a",
							])
							.format("uuid")
					)
					.prop(
						"scopes",
						S.array()
							.items(S.string().enum(accessRecordScopes))
							.uniqueItems(true)
							.description(
								"Actions the bearer token has been granted access to perform"
							)
					)
			)
			.required(["access"]),
		401: S.ref("responses#/definitions/unauthorized").description(
			"Unauthorized"
		),
		406: S.ref("responses#/definitions/notAcceptable").description(
			"Not Acceptable"
		),
		415: S.ref("responses#/definitions/unsupportedMediaType").description(
			"Unsupported Media Type"
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
	security,
};

module.exports = {
	accessDeleteSchema,
	accessGetReadSchema,
	accessGetSearchSchema,
	accessPostSchema,
};
