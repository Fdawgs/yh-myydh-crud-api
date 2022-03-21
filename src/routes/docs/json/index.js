const { docsJsonGetSchema } = require("./schema");

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {object} server - Fastify instance.
 */
async function route(server) {
	server.route({
		method: "GET",
		url: "/",
		schema: docsJsonGetSchema,
		preValidation: async (req, res) => {
			if (
				// Catch unsupported Accept header media types
				!docsJsonGetSchema.produces.includes(
					req.accepts().type(docsJsonGetSchema.produces)
				)
			) {
				throw res.notAcceptable();
			}
		},
		handler: (req, res) => {
			res.removeHeader("pragma");
			res.removeHeader("expires");
			res.removeHeader("surrogate-control");
			res.header("cache-control", "public, max-age=3600");
			res.send(server.swagger());
		},
	});
}

module.exports = route;
