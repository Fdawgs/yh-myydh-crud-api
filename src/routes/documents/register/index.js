// Import plugins
const cors = require("@fastify/cors");

// Import utils
const escSq = require("../../../utils/escape-single-quotes");

const { registerGetSchema } = require("./schema");
const { registerSelect } = require("./query");

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {object} server - Fastify instance.
 * @param {object} options - Route config values.
 * @param {boolean=} options.bearerTokenAuthEnabled - Apply `bearerToken` security scheme to route if defined.
 * @param {object} options.cors - CORS settings.
 * @param {object} options.database - Database config values.
 * @param {object} options.database.tables - Database tables.
 * @param {string} options.database.tables.documentRegister - Name and schema of document register table.
 */
async function route(server, options) {
	if (options.bearerTokenAuthEnabled) {
		registerGetSchema.security = [{ bearerToken: [] }];
	}

	// Register plugins
	server
		// Enable CORS if options passed
		.register(cors, {
			...options.cors,
			methods: ["GET"],
		});

	server.route({
		method: "GET",
		url: "/",
		schema: registerGetSchema,
		preValidation: async (req, res) => {
			if (
				options.bearerTokenAuthEnabled &&
				!req?.scopes?.includes("documents/register.search")
			) {
				throw res.unauthorized(
					"You do not have permission to perform an HTTP GET request on this route"
				);
			}
		},
		handler: async (req, res) => {
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
					let date = modified;
					const operator = server.convertDateParamOperator(
						escape(date).substring(0, 2)
					);

					if (Number.isNaN(Number(date.substring(0, 2)))) {
						date = date.substring(2, date.length);
					}

					whereArray.push(escSq`(Modified ${operator} '${date}')`);
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
				 * (mssql uses recordsets, pgsql uses rows) thus the optional chaining
				 */
				const count =
					results?.recordsets?.[0]?.[0]?.total ??
					results?.[0]?.rows?.[0]?.total ??
					0;
				const data = server.cleanObject(
					results?.recordsets?.[1] ?? results?.[1]?.rows ?? []
				);

				const response = {
					data,
					meta: {
						pagination: {
							total: Number.parseInt(count, 10),
							per_page: perPage,
							current_page: page + 1,
							total_pages: Math.ceil(count / perPage),
						},
					},
				};
				res.send(response);
			} catch (err) {
				throw res.internalServerError(err);
			}
		},
	});
}

module.exports = route;
