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
				"notAcceptable",
				S.object()
					.id("#notAcceptable")
					.title("406 Not Acceptable Response")
					.prop("statusCode", S.number().const(406))
					.prop("error", S.string().const("Not Acceptable"))
					.prop("message", S.string().const("Not Acceptable"))
					.description("Not Acceptable")
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
					.description("Too Many Requests")
			)
	);
}

module.exports = fp(plugin, {
	fastify: "3.x",
	name: "shared-schemas",
});
