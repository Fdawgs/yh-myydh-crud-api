const autoLoad = require("fastify-autoload");
const path = require("path");

const {
	registerGetSchema,
	receiptPutSchema,
	receiptDeleteSchema,
} = require("./schema");

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Object containing route config objects.
 */
async function route(server, options) {
	server.route({
		method: "GET",
		url: "/register",
		schema: registerGetSchema,
		async handler(req, res) {
			res.send("hi");
		},
	});

	server.route({
		method: "PUT",
		url: "/receipt/:id",
		schema: receiptPutSchema,
		async handler(req, res) {
			res.send("hi");
		},
	});

	server.route({
		method: "DELETE",
		url: "/receipt/:id",
		schema: receiptDeleteSchema,
		async handler(req, res) {
			res.send("hi");
		},
	});
}

module.exports = route;
