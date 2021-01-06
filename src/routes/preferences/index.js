const { optionsGetSchema, userGetSchema, userPutSchema } = require("./schema");

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Object containing route config objects.
 */
async function route(server) {
	server.route({
		method: "GET",
		url: "/options",
		schema: optionsGetSchema,
		async handler(req, res) {
			res.send("hi");
		},
	});

	server.route({
		method: "GET",
		url: "/user/:id",
		schema: userGetSchema,
		async handler(req, res) {
			res.send("hi");
		},
	});

	server.route({
		method: "PUT",
		url: "/user/:id",
		schema: userPutSchema,
		async handler(req, res) {
			res.send("hi");
		},
	});
}

module.exports = route;
