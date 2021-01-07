const createError = require("http-errors");
const sqlServer = require("mssql");

const clean = require("../../utils/clean-objects");
const convertDateParamOperator = require("../../utils/convert-date-param-operation");

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
			try {
				const page = parseInt(req.query.page, 10) - 1 || 0;
				const perPage = parseInt(req.query.perPage, 10) || 1;

				// Build WHERE clause using lastModified querystring param
				const operator = convertDateParamOperator(
					escape(req.query.lastModified).substring(0, 2)
				);
				// eslint-disable-next-line no-restricted-globals
				if (isNaN(req.query.lastModified.substring(0, 2))) {
					req.query.lastModified = req.query.lastModified.substring(
						2,
						req.query.lastModified.length
					);
				}

				// Create meta object with pagination data
				const count = await server.mssql
					.request()
					.input(
						"timestamp",
						sqlServer.DateTime,
						req.query.lastModified
					).query(`SELECT COUNT(*) AS total
							  FROM ${options.database.tables.documentRegister}
							 WHERE Modified ${operator} @timestamp`);

				const result = {
					data: [],
					meta: {
						pagination: {
							total: count.recordset[0].total,
							per_page: perPage,
							current_page: page + 1,
							total_pages: Math.ceil(
								count.recordset[0].total / perPage
							),
						},
					},
				};

				const queryResult = await server.mssql
					.request()
					.input(
						"timestamp",
						sqlServer.DateTime,
						req.query.lastModified
					)
					.query(
						`SELECT GUID AS 'guid',
						   fhir_id,
						   Title AS 'title',
						   Specialty AS 'specialty',
						   Clinic AS 'clinic',
						   Document_Type AS 'document_type',
						   Filesname AS 'file_name',
						   URL AS 'url',
						   CreatedDate AS 'created_date',
						   Modified AS 'modified'
						   FROM ${options.database.tables.documentRegister}
						   WHERE Modified ${operator} @timestamp
						   ORDER BY Modified DESC
						   OFFSET ${page * perPage} ROWS
						   FETCH NEXT ${perPage} ROWS ONLY`
					);

				if (
					queryResult.recordset &&
					queryResult.recordset.length !== 0
				) {
					result.data = clean(queryResult.recordset);
					res.send(result);
				} else {
					res.send(
						createError(404, "Invalid or expired search results")
					);
				}
			} catch (err) {
				server.log.error(err);
				res.send(
					createError(500, "Unable to return result(s) from database")
				);
			}
		},
	});

	server.route({
		method: "PUT",
		url: "/receipt/:id",
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
		url: "/receipt/:id",
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
