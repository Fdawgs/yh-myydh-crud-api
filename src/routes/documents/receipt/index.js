const createError = require("http-errors");

// Import plugins
const cors = require("fastify-cors");

const { receiptDeleteSchema, receiptPutSchema } = require("./schema");
const { receiptDelete, receiptInsert } = require("./query");

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Route config values.
 * @param {object} options.cors - CORS settings.
 * @param {object} options.database - Database config values.
 * @param {('mssql'|'postgresql')} options.database.client - Database client.
 * @param {object} options.database.tables - Database tables.
 * @param {string} options.database.tables.readReceipt - Name and schema of document read receipt table.
 */
async function route(server, options) {
	// Use CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
	server.register(cors, {
		...options.cors,
		methods: ["DELETE", "PUT"],
		hideOptionsRoute: true,
	});

	server.route({
		method: "PUT",
		url: "/:id",
		schema: receiptPutSchema,
		async handler(req, res) {
			try {
				const rows = await server.db.query(
					receiptInsert({
						dbClient: options.database.client,
						id: req.params.id,
						patientId: req.query.patientId,
						timestamp: req.query.timestamp,
						readReceiptTable: options.database.tables.readReceipt,
					})
				);

				if (rows?.rowsAffected?.[0] > 0 || rows?.rowCount > 0) {
					res.status(204);
				} else {
					throw Error;
				}
			} catch (err) {
				server.log.error(err);
				res.send(
					createError(
						500,
						"Unable to update read receipt in database"
					)
				);
			}
		},
	});

	server.route({
		method: "DELETE",
		url: "/:id",
		schema: receiptDeleteSchema,
		async handler(req, res) {
			try {
				const results = await server.db.query(
					receiptDelete({
						id: req.params.id,
						patientId: req.query.patientId,
						readReceiptTable: options.database.tables.readReceipt,
					})
				);

				if (results?.rowsAffected?.[0] > 0 || results?.rowCount > 0) {
					res.status(204);
				} else {
					res.send(
						createError(
							404,
							"Record does not exist and/or has already been deleted"
						)
					);
				}
			} catch (err) {
				server.log.error(err);
				res.send(
					createError(
						500,
						"Unable to update read receipt in database"
					)
				);
			}
		},
	});
}

module.exports = route;
