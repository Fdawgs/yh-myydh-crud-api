const crypto = require("crypto");
const secJSON = require("secure-json-parse");

// Import plugins
const cors = require("fastify-cors");

// Import utils
const escSq = require("../../../../utils/escape-single-quotes");

const {
	accessDeleteSchema,
	accessGetReadSchema,
	accessGetSearchSchema,
	accessPostSchema,
} = require("./schema");
const {
	accessDelete,
	accessGetRead,
	accessGetSearch,
	accessPost,
} = require("./query");

/**
 * @author Frazer Smith
 * @description Build bearer token object from database result.
 * @param {object} result - Database query result.
 * @param {string} result.id - Unique identifier of bearer token record.
 * @param {string} result.name - Name of client or service accessing API.
 * @param {string} result.email - Contact email of client or service accessing API.
 * @param {string} result.scopes - Stringified JSON object containing actions the API key can perform.
 * @param {string} result.hash - Hashed API key.
 * @param {string} result.salt - Salt used on hashed API key.
 * @param {string=} result.expires - Expiry date of API key.
 * @param {string} result.created - Date bearer token record was created.
 * @param {string=} result.last_updated - Date bearer token record was last updated.
 * @param {object=} req - Fastify Request object.
 * @returns {object} bearer token record.
 */
function buildBearerTokenRecord(result, req) {
	return {
		// cleanObject will remove the undefined url key if present
		url:
			req !== undefined
				? new URL(
						`/access/${result.id}`,
						`${req.protocol}://${req.hostname}`
				  ).href
				: undefined,
		id: result.id,
		access: {
			name: result.name,
			email: result?.email,
			hash: result.hash,
			salt: result.salt,
			/**
			 * Database client packages return result in different structures:
			 * mssql returns JSON as string; pg returns JSON as object
			 */
			scopes:
				typeof result.scopes === "string"
					? secJSON.parse(result.scopes)
					: result.scopes,

			expires: result?.expires,
		},

		meta: {
			created: result.created,
			last_updated: result?.last_updated,
		},
	};
}

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {object} server - Fastify instance.
 * @param {object} options - Route config values.
 * @param {object} options.cors - CORS settings.
 */
async function route(server, options) {
	// Register plugins
	server
		// Enable CORS if options passed
		.register(cors, {
			...options.cors,
			methods: ["DELETE", "GET", "POST"],
		});

	server.route({
		method: "DELETE",
		url: "/:id",
		schema: accessDeleteSchema,
		handler: async (req, res) => {
			try {
				const results = await server.db.query(
					accessDelete({
						id: req.params.id,
					})
				);

				/**
				 * Database client packages return results in different structures,
				 * (mssql uses rowsAffected, pg uses rowCount) thus the optional chaining
				 */
				if (results?.rowsAffected?.[0] > 0 || results?.rowCount > 0) {
					res.status(204);
				} else {
					res.notFound(
						"Bearer token record does not exist or has already been deleted"
					);
				}
			} catch (err) {
				throw res.internalServerError(
					"Unable to delete bearer token record from database"
				);
			}
		},
	});

	server.route({
		method: "GET",
		url: "/:id",
		schema: accessGetReadSchema,
		handler: async (req, res) => {
			try {
				const results = await server.db.query(
					accessGetRead({
						id: req.params.id,
					})
				);

				/**
				 * Database client packages return results in different structures,
				 * (mssql uses recordsets, pg uses rows) thus the optional chaining
				 */
				let token = results?.recordsets?.[0] ?? results?.rows;

				if (token && token.length > 0) {
					token = token[0];

					res.send(server.cleanObject(buildBearerTokenRecord(token)));
				} else {
					res.notFound("Bearer token record not found");
				}
			} catch (err) {
				throw res.internalServerError(
					"Unable to return result from database"
				);
			}
		},
	});

	server.route({
		method: "GET",
		url: "/",
		schema: accessGetSearchSchema,
		handler: async (req, res) => {
			try {
				// Build WHERE clause
				const whereArray = [];

				// access.name - Name of client or service granted access to API, case-insensitive and supports `*` wildcards
				if (req?.query?.["access.name"]) {
					// _ and % act as wildcards in SQL LIKE clauses, so need to be escaped
					whereArray.push(
						escSq`(LOWER(name) LIKE LOWER('${req.query[
							"access.name"
						]
							.replace(/%/g, "!%")
							.replace(/_/g, "!_")
							.replace(/\*/g, "%")}') ESCAPE '!')`
					);
				}

				// access.email - Contact email of client or service granted access to API, case-insensitive and supports `*` wildcards
				if (req?.query?.["access.email"]) {
					// _ and % act as wildcards in SQL LIKE clauses, so need to be escaped
					whereArray.push(
						escSq`(LOWER(email) LIKE LOWER('${req.query[
							"access.email"
						]
							.replace(/%/g, "!%")
							.replace(/_/g, "!_")
							.replace(/\*/g, "%")}') ESCAPE '!')`
					);
				}

				// access.scopes - One of the values in the scopes array
				if (req?.query?.["access.scopes"]) {
					let scopes = [];
					if (Array.isArray(req.query["access.scopes"])) {
						scopes = req.query["access.scopes"];
					} else {
						scopes.push(req.query["access.scopes"]);
					}

					scopes.forEach((scopesValue) => {
						switch (options.database.client) {
							case "postgresql":
								whereArray.push(
									escSq`scopes @> '"${scopesValue}"'`
								);
								break;

							case "mssql":
							default:
								// _ and % act as wildcards in SQL LIKE clauses, so need to be escaped
								whereArray.push(
									escSq`(scopes LIKE '%${scopesValue
										.replace(/%/g, "!%")
										.replace(/_/g, "!_")}%' ESCAPE '!')`
								);
								break;
						}
					});
				}

				/**
				 * access.expires - Datetime when API key expires,
				 * can be a string or array
				 */
				if (req?.query?.["access.expires"]) {
					let expires = [];
					if (Array.isArray(req.query["access.expires"])) {
						expires = req.query["access.expires"];
					} else {
						expires.push(req.query["access.expires"]);
					}

					expires.forEach((expiryDate) => {
						let date = expiryDate;
						const operator = server.convertDateParamOperator(
							date.substring(0, 2)
						);

						if (Number.isNaN(Number(date.substring(0, 2)))) {
							date = date.substring(2, date.length);
						}

						whereArray.push(escSq`(expires ${operator} '${date}')`);
					});
				}

				/**
				 * meta.created - Datetime when bearer token record was created,
				 * can be a string or array
				 */
				if (req?.query?.["meta.created"]) {
					let created = [];
					if (Array.isArray(req.query["meta.created"])) {
						created = req.query["meta.created"];
					} else {
						created.push(req.query["meta.created"]);
					}

					created.forEach((createDate) => {
						let date = createDate;
						const operator = server.convertDateParamOperator(
							date.substring(0, 2)
						);

						if (Number.isNaN(Number(date.substring(0, 2)))) {
							date = date.substring(2, date.length);
						}

						whereArray.push(escSq`(created ${operator} '${date}')`);
					});
				}

				/**
				 * meta.last_updated - Last modified datetime of bearer token record,
				 * can be a string or array
				 */
				if (req?.query?.["meta.last_updated"]) {
					let lastUpdated = [];
					if (Array.isArray(req.query["meta.last_updated"])) {
						lastUpdated = req.query["meta.last_updated"];
					} else {
						lastUpdated.push(req.query["meta.last_updated"]);
					}

					lastUpdated.forEach((lastUpdatedDate) => {
						let date = lastUpdatedDate;
						const operator = server.convertDateParamOperator(
							date.substring(0, 2)
						);

						if (Number.isNaN(Number(date.substring(0, 2)))) {
							date = date.substring(2, date.length);
						}

						whereArray.push(
							escSq`(last_updated ${operator} '${date}')`
						);
					});
				}

				// Pagination values used for OFFSET and FETCH NEXT in SQL query
				const page = parseInt(req.query.page, 10) - 1;
				const perPage = parseInt(req.query.per_page, 10);

				// Stops SQL query with empty WHERE clause from being made and throwing errors
				// TODO: replace with JSON Schema subschemas when supported
				if (whereArray.length === 0) {
					res.badRequest("No valid query string parameters provided");
				} else {
					const whereClausePredicates = whereArray.join(" AND ");

					const results = await server.db.query(
						accessGetSearch({
							whereClausePredicates,
							page,
							perPage,
						})
					);

					/**
					 * Database client packages return results in different structures,
					 * (mssql uses recordsets, pg uses rows) thus the optional chaining
					 */
					const count =
						results?.recordsets?.[0]?.[0]?.total ??
						results?.[0]?.rows?.[0]?.total ??
						0;
					const tokens = server.cleanObject(
						results?.recordsets?.[1] ?? results?.[1]?.rows ?? []
					);

					const tokensObject = {
						link: new URL(
							req.url,
							`${req.protocol}://${req.hostname}`
						).href,
						entry: [],
						meta: {
							pagination: {
								total: count,
								per_page: perPage,
								current_page: page + 1,
								total_pages: Math.ceil(count / perPage),
							},
						},
					};

					tokens.forEach((contact) => {
						tokensObject.entry.push(
							buildBearerTokenRecord(contact, req)
						);
					});
					res.send(server.cleanObject(tokensObject));
				}
			} catch (err) {
				throw res.internalServerError(
					"Unable to return result(s) from database"
				);
			}
		},
	});

	server.route({
		method: "POST",
		url: "/",
		schema: accessPostSchema,
		handler: async (req, res) => {
			try {
				/**
				 * Token prefixes are a clear way to make tokens identifiable, thus the 'ydhmyydh'.
				 * The underscore is used as a separator as it is not a Base64 character, which
				 * helps ensure our tokens cannot be accidentally duplicated by randomly
				 * generated strings.
				 *
				 * Underscores are also good as they allow for the whole token to be selected
				 * when double-clicking on it, as opposed to dashes.
				 */
				const key = `ydhmyydh_${crypto
					.randomUUID()
					.replace(/-/g, "_")}`;

				const salt = crypto.randomBytes(16).toString("hex");
				const hash = crypto
					.pbkdf2Sync(key, salt, 1000, 64, "sha512")
					.toString("hex");

				const results = await server.db.query(
					accessPost({
						client: options.database.client,
						name: req.body.name,
						email: req?.body?.email ?? "",
						// If not set then provide a date ridiculously far into the future
						expires: req?.body?.expires ?? "9999-12-31",
						hash,
						salt,
						scopes: JSON.stringify(req.body.scopes),
					})
				);

				/**
				 * Database client packages return results in different structures,
				 * (mssql uses recordsets, pg uses rows) thus the optional chaining
				 */
				let token = results?.recordsets?.[0] ?? results?.rows;

				if (token && token.length > 0) {
					token = token[0];

					const resObj = {
						id: token.id,
						access: {
							token: key,
							/**
							 * Database client packages return results in different structures:
							 * mssql returns JSON as string; pg returns JSON as object
							 */
							scopes:
								typeof token.scopes === "string"
									? secJSON.parse(token.scopes)
									: token.scopes,
						},
					};

					res.header(
						"location",
						new URL(
							`/admin/access/bearer-token/${resObj.id}`,
							`${req.protocol}://${req.hostname}`
						).href
					);
					res.status(201).send(resObj);
				} else {
					// TODO: resolve "Promise errored, but reply.sent = true was set" being logged, should be fixed in Fastify v4.x.x
					throw new Error();
				}
			} catch (err) {
				throw res.internalServerError(
					"Unable to add bearer token record to database"
				);
			}
		},
	});
}

module.exports = route;
