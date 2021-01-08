const createError = require("http-errors");
const clean = require("../../../utils/clean-objects");
const convertDateParamOperator = require("../../../utils/convert-date-param-operation");

const { registerGetSchema } = require("./schema");
const { registerSelect } = require("./query");

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Object containing route config objects.
 */
async function route(server, options) {
	server.route({
		method: "GET",
		url: "/",
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

				const { recordsets } = await server.mssql.query(
					registerSelect({
						timestamp: req.query.lastModified,
						operator,
						documentRegisterTable:
							options.database.tables.documentRegister,
						page,
						perPage,
					})
				);

				const count = recordsets[0][0].total;

				const response = {
					data: [],
					meta: {
						pagination: {
							total: count,
							per_page: perPage,
							current_page: page + 1,
							total_pages: Math.ceil(count / perPage),
						},
					},
				};

				response.data = clean(recordsets[1]);
				res.send(response);
			} catch (err) {
				server.log.error(err);
				res.send(
					createError(500, "Unable to return result(s) from database")
				);
			}
		},
	});
}

module.exports = route;
