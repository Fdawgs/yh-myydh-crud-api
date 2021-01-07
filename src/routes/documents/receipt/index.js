const createError = require("http-errors");
const sqlServer = require("mssql");

const { receiptPutSchema, receiptDeleteSchema } = require("./schema");

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
				await server.mssql
					.request()
					.input("guid", sqlServer.Char(36), req.params.id)
					.input(
						"patientId",
						sqlServer.VarChar(255),
						req.query.patientId
					)
					.input("timestamp", sqlServer.VarChar, req.query.timestamp)
					.query(
						`IF EXISTS(SELECT guid 
									 FROM ${options.database.tables.readReceipt}
									   WHERE guid = @guid
									   AND patientId = @patientId)
							UPDATE ${options.database.tables.readReceipt}
							  SET ts = @timestamp
						  WHERE guid = @guid
							  AND patientId = @patientId
							  ELSE
						INSERT INTO ${options.database.tables.readReceipt} (guid, patientId, ts)
								VALUES(@guid, @patientId, @timestamp)`
					);
				res.status(204);
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
				await server.mssql
					.request()
					.input("guid", sqlServer.Char(36), req.params.id)
					.input(
						"patientId",
						sqlServer.VarChar(255),
						req.query.patientId
					)
					.query(
						`DELETE
						   FROM ${options.database.tables.readReceipt}
						  WHERE guid = @guid
							  AND patientId = @patientId`
					);
				res.status(204);
			} catch (err) {
				server.log.error(err);
				res.send(
					createError(
						500,
						"Unable to update delete read receipt from database"
					)
				);
			}
		},
	});
}

module.exports = route;
