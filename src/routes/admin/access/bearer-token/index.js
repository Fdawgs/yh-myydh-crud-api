"use strict";

const { randomUUID } = require("crypto");
const { hash: bcryptHash } = require("bcryptjs");
const { parse: secureParse } = require("secure-json-parse");

// Import plugins
const cors = require("@fastify/cors");

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
 * @description Builds bearer token object from database result.
 * @param {object} result - Database query result.
 * @param {string} result.id - Unique identifier of bearer token record.
 * @param {string} result.name - Name of client or service accessing API.
 * @param {string} result.email - Contact email of client or service accessing API.
 * @param {string} result.scopes - Stringified JSON object containing actions the bearer token can perform.
 * @param {string} result.hash - Bcrypt-hashed bearer token.
 * @param {string} [result.expires] - Expiry date of bearer token.
 * @param {string} result.created - Date bearer token record was created.
 * @param {string} [result.last_updated] - Date bearer token record was last updated.
 * @param {object} [req] - Fastify Request object.
 * @returns {object} bearer token record.
 */
function buildBearerTokenRecord(result, req) {
	return {
		// cleanObject will remove the undefined url key if present
		url: req
			? new URL(
					`/access/bearer-token/${result.id}`,
					`${req.protocol}://${req.hostname}`
			  ).href
			: undefined,
		id: result.id,
		access: {
			name: result.name,
			email: result.email,
			hash: result.hash,
			/**
			 * Database client packages return result in different structures:
			 * mssql returns JSON as string; pg returns JSON as object
			 */
			scopes:
				typeof result.scopes === "string"
					? secureParse(result.scopes)
					: result.scopes,
			expires: result.expires,
		},
		meta: {
			created: result.created,
			last_updated: result.last_updated,
		},
	};
}

/**
 * @author Frazer Smith
 * @description Sets routing options for server.
 * @param {import("fastify").FastifyInstance} server - Fastify instance.
 * @param {object} options - Route config values.
 * @param {object} options.cors - CORS settings.
 * @param {object} options.database - Database config values.
 * @param {('mssql'|'postgresql')} options.database.client - Database client.
 */
async function route(server, options) {
	// Register plugins
	await server
		// Enable CORS if options passed
		.register(cors, {
			...options.cors,
			methods: ["DELETE", "GET", "HEAD", "POST"],
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
				if (results.rowsAffected?.[0] > 0 || results.rowCount > 0) {
					return res.status(204).send();
				}
				return res.notFound(
					"Bearer token record does not exist or has already been deleted"
				);
			} catch (err) {
				return res.internalServerError(err.message);
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
				const token = results.recordsets?.[0] ?? results.rows;

				if (token?.length > 0) {
					return server.cleanObject(buildBearerTokenRecord(token[0]));
				}

				return res.notFound("Bearer token record not found");
			} catch (err) {
				return res.internalServerError(err.message);
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
				if (req.query?.["access.name"]) {
					// _ and % act as wildcards in SQL LIKE clauses, so need to be escaped
					whereArray.push(
						escSq`(LOWER(name) LIKE LOWER('${req.query[
							"access.name"
						]
							.replace(/%/gu, "!%")
							.replace(/_/gu, "!_")
							.replace(/\*/gu, "%")}') ESCAPE '!')`
					);
				}

				// access.email - Contact email of client or service granted access to API, case-insensitive and supports `*` wildcards
				if (req.query?.["access.email"]) {
					// _ and % act as wildcards in SQL LIKE clauses, so need to be escaped
					whereArray.push(
						escSq`(LOWER(email) LIKE LOWER('${req.query[
							"access.email"
						]
							.replace(/%/gu, "!%")
							.replace(/_/gu, "!_")
							.replace(/\*/gu, "%")}') ESCAPE '!')`
					);
				}

				// access.scopes - One of the values in the scopes array
				if (req.query?.["access.scopes"]) {
					const scopes = Array.isArray(req.query["access.scopes"])
						? req.query["access.scopes"]
						: [req.query["access.scopes"]];

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
										.replace(/%/gu, "!%")
										.replace(/_/gu, "!_")}%' ESCAPE '!')`
								);
								break;
						}
					});
				}

				/**
				 * access.expires - Datetime when bearer token expires,
				 * can be a string or array
				 */
				if (req.query?.["access.expires"]) {
					const expires = Array.isArray(req.query["access.expires"])
						? req.query["access.expires"]
						: [req.query["access.expires"]];

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
				if (req.query?.["meta.created"]) {
					const created = Array.isArray(req.query["meta.created"])
						? req.query["meta.created"]
						: [req.query["meta.created"]];

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
				if (req.query?.["meta.last_updated"]) {
					const lastUpdated = Array.isArray(
						req.query["meta.last_updated"]
					)
						? req.query["meta.last_updated"]
						: [req.query["meta.last_updated"]];

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
					return res.badRequest(
						"No valid query string parameters provided"
					);
				}
				const whereClausePredicates = whereArray.join(" AND ");

				const results = await server.db.query(
					accessGetSearch({
						client: options.database.client,
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
					results.recordsets?.[0]?.[0]?.total ??
					results[0]?.rows?.[0]?.total ??
					0;
				const tokens = server.cleanObject(
					results.recordsets?.[1] ?? results[1]?.rows ?? []
				);

				const tokensObject = {
					link: new URL(req.url, `${req.protocol}://${req.hostname}`)
						.href,
					entry: tokens.map((contact) =>
						buildBearerTokenRecord(contact, req)
					),
					meta: {
						pagination: {
							total: count,
							per_page: perPage,
							current_page: page + 1,
							total_pages: Math.ceil(count / perPage),
						},
					},
				};

				return server.cleanObject(tokensObject);
			} catch (err) {
				return res.internalServerError(err.message);
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
				 * Token prefixes are a clear way to make tokens identifiable, thus the 'ydhcc'.
				 * The underscore is used as a separator as it is not a Base64 character, which
				 * helps ensure our tokens cannot be accidentally duplicated by randomly
				 * generated strings.
				 *
				 * Underscores are also good as they allow for the whole token to be selected
				 * when double-clicking on it, as opposed to dashes
				 */
				const key = `ydhmyydh_${randomUUID().replace(/-/gu, "_")}`;

				const hash = await bcryptHash(key, 10);

				const results = await server.db.query(
					accessPost({
						client: options.database.client,
						name: req.body.name,
						email: req.body?.email ?? "",
						// If not set then provide a date ridiculously far into the future
						expires: req.body?.expires ?? "9999-12-31",
						hash,
						scopes: JSON.stringify(req.body.scopes),
					})
				);

				/**
				 * Database client packages return results in different structures,
				 * (mssql uses recordsets, pg uses rows) thus the optional chaining
				 */
				let token = results.recordsets?.[0] ?? results.rows;

				if (token?.length > 0) {
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
									? secureParse(token.scopes)
									: token.scopes,
						},
					};

					res.header(
						"location",
						new URL(
							`/admin/access/bearer-token/${resObj.id}`,
							`${req.protocol}://${req.hostname}`
						).href
					).status(201);
					return resObj;
				}

				throw new Error("Failed to create bearer token record");
			} catch (err) {
				return res.internalServerError(err.message);
			}
		},
	});
}

module.exports = route;
