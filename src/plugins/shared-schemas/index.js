const fp = require("fastify-plugin");
const S = require("fluent-json-schema");

/**
 * @author Frazer Smith
 * @description Plugin that adds collection of shared schemas for re-use throughout server.
 * @param {Function} server - Fastify instance.
 */
async function plugin(server) {
	// Response schemas
	server.addSchema(
		S.object()
			.id("responses")
			.title("Responses")
			.description("Common response schemas")
			.definition(
				"notFoundDbResults",
				S.object()
					.id("#notFoundDbResults")
					.title("404 Not Found Response")
					.prop("statusCode", S.number().const(404))
					.prop("error", S.string().const("Not Found"))
					.prop(
						"message",
						S.string().enum([
							"Invalid or expired search results",
							"Record does not exist or has already been deleted",
							"User not found",
						])
					)
			)
			.definition(
				"notAcceptable",
				S.object()
					.id("#notAcceptable")
					.title("406 Not Acceptable Response")
					.prop("statusCode", S.number().const(406))
					.prop("error", S.string().const("Not Acceptable"))
					.prop("message", S.string().const("Not Acceptable"))
			)
			.definition(
				"tooManyRequests",
				S.object()
					.id("#tooManyRequests")
					.title("429 Too Many Requests Response")
					.prop("statusCode", S.number().const(429))
					.prop("error", S.string().const("Too Many Requests"))
					.prop(
						"message",
						S.string().examples([
							"Rate limit exceeded, retry in 1 minute",
						])
					)
			)
			.definition(
				"internalServerError",
				S.object()
					.id("#internalServerError")
					.title("500 Internal Server Error Response")
					.prop("statusCode", S.number().const(500))
					.prop("error", S.string().const("Internal Server Error"))
					.prop(
						"message",
						S.string().examples([
							"Unable to delete read receipt from database",
							"Unable to return result(s) from database",
							"Unable to update patient preference in database",
							"Unable to update read receipt in database",
						])
					)
			)
			.definition(
				"serviceUnavailable",
				S.object()
					.id("#serviceUnavailable")
					.title("503 Service Unavailable")
					.prop("statusCode", S.number().const(503))
					.prop("code", S.string().const("FST_UNDER_PRESSURE"))
					.prop("error", S.string().const("Service Unavailable"))
					.prop("message", S.string().const("Service Unavailable"))
			)
	);
}

module.exports = fp(plugin, {
	fastify: "3.x",
	name: "shared-schemas",
});
