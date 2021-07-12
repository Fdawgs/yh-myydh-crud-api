const S = require("fluent-json-schema");

const tags = ["System Administration"];

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://www.fastify.io/docs/latest/Validation-and-Serialization/
 *
 * This validation protects against XSS and HPP attacks.
 */
const healthcheckGetSchema = {
	tags,
	summary:
		"Used by monitoring software to poll and confirm the API is running",
	operationId: "getHealthcheck",
	produces: ["text/plain"],
	response: {
		200: S.string().const("ok"),
		406: S.object()
			.prop("statusCode", S.number().const(406))
			.prop("error", S.string().const("Not Acceptable"))
			.prop("message", S.string().const("Not Acceptable")),
	},
};

module.exports = { healthcheckGetSchema };
