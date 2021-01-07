const createError = require("http-errors");

const { receiptDeleteSchema, receiptPutSchema } = require("./schema");
const { receiptDelete, receiptInsert } = require("./query");

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Object containing route config objects.
 */
async function route(server, options) {
	server.route({
		method: "PUT",
		url: "/:id",
		schema: receiptPutSchema,
		async handler(req, res) {
			try {
				const { rowsAffected } = await server.mssql.query(
					receiptInsert({
						id: req.params.id,
						patientId: req.query.patientId,
						timestamp: req.query.timestamp,
						readReceiptTable: options.database.tables.readReceipt,
					})
				);

				if (rowsAffected[0] > 0) {
					res.status(204);
				} else {
					res.send(
						createError(
							500,
							"Unable to update read receipt in database"
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

	server.route({
		method: "DELETE",
		url: "/:id",
		schema: receiptDeleteSchema,
		async handler(req, res) {
			try {
				const { rowsAffected } = await server.mssql.query(
					receiptDelete({
						id: req.params.id,
						patientId: req.query.patientId,
						readReceiptTable: options.database.tables.readReceipt,
					})
				);

				if (rowsAffected[0] > 0) {
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
