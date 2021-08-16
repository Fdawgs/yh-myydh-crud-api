// Import plugins
const cors = require("fastify-cors");

// Import utils
const clean = require("../../../utils/clean-objects");
const convertDateParamOperator = require("../../../utils/convert-date-param-operation");

const { registerGetSchema } = require("./schema");
const { registerSelect } = require("./query");

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Route config values.
 * @param {object} options.cors - CORS settings.
 * @param {object} options.database - Database config values.
 * @param {('mssql'|'postgresql')} options.database.client - Database client.
 * @param {object} options.database.tables - Database tables.
 * @param {string} options.database.tables.documentRegister - Name and schema of document register table.
 */
async function route(server, options) {
	// Use CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
	server.register(cors, {
		...options.cors,
		methods: ["GET"],
		hideOptionsRoute: true,
	});

	server.route({
		method: "GET",
		url: "/",
		schema: registerGetSchema,
		async handler(req, res) {
			try {
				const page = parseInt(req.query.page, 10) - 1;
				const perPage = parseInt(req.query.perPage, 10);

				// Build WHERE clause using lastModified querystring params
				const whereArray = [];

				let lastModified = [];
				if (Array.isArray(req.query.lastModified)) {
					lastModified = req.query.lastModified;
				} else {
					lastModified.push(req.query.lastModified);
				}

				lastModified.forEach((modified) => {
					const operator = convertDateParamOperator(
						escape(modified).substring(0, 2)
					);

					// eslint-disable-next-line no-restricted-globals
					if (isNaN(modified.substring(0, 2))) {
						// eslint-disable-next-line no-param-reassign
						modified = modified.substring(2, modified.length);
					}

					whereArray.push(`(Modified ${operator} '${modified}')`);
				});

				const whereClausePredicates = whereArray.join(" AND ");

				const results = await server.db.query(
					registerSelect({
						whereClausePredicates,
						documentRegisterTable:
							options.database.tables.documentRegister,
						page,
						perPage,
					})
				);

				/**
				 * Database client packages return results in different structures,
				 * switch needed to accommodate for this
				 */
				let count;
				let data;
				switch (options.database.client) {
					case "mssql":
					default:
						count = results.recordsets[0][0].total;
						data = clean(results.recordsets[1]);
						break;
					case "postgresql":
						count = results[0].rows[0].total;
						data = clean(results[1].rows);
						break;
				}

				const response = {
					data,
					meta: {
						pagination: {
							total: count,
							per_page: perPage,
							current_page: page + 1,
							total_pages: Math.ceil(count / perPage),
						},
					},
				};
				res.send(response);
			} catch (err) {
				server.log.error(err);
				res.internalServerError(
					"Unable to return result(s) from database"
				);
			}
		},
	});
}

module.exports = route;
