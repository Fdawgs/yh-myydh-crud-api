const autoLoad = require("fastify-autoload");
const path = require("path");

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Object containing route config objects.
 */
async function route(server, options) {
	/**
	 * Fastify uses AJV for JSON Schema Validation,
	 * see https://www.fastify.io/docs/latest/Validation-and-Serialization/
	 *
	 * This validation protects against XSS and HPP attacks.
	 */
	server.route({
		method: "GET",
		url: "/register",
		prefixTrailingSlash: "no-slash",
		schema: {
			description: "Retrieve document metadata from register",
			querystring: {
				type: "object",
				properties: {
					lastModified: {
						description: "Last modified datetime of document",
						examples: [
							"2021-01-01",
							"ge2021-01-01T00:00:01",
							"ge2021-01-01",
							"2021-01-01T00:00:01",
						],
						type: "string",
						pattern:
							"^(?:eq|ne|ge|le|gt|lt|sa|eb|ap|)\\d{4}-\\d{2}-\\d{2}(?:T\\d{2}\\:\\d{2}\\:\\d{2}|)$",
					},
					page: {
						description: "Page to retrieve",
						default: "0",
						examples: ["1", "10"],
						type: "string",
						pattern: "^\\d{1,}$",
					},
					perPage: {
						description: "Number of documents to return per page",
						default: "1",
						examples: ["1", "10"],
						type: "string",
						pattern: "^\\d{1,}$",
					},
				},
				required: ["lastModified"],
			},
		},
		async handler(req, res) {
			res.send("hi");
		},
	});
}

module.exports = route;
