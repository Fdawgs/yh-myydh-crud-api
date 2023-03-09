const fp = require("fastify-plugin");
const bcrypt = require("bcryptjs");
const bearer = require("@fastify/bearer-auth");
const secJSON = require("secure-json-parse");

/**
 * @author Frazer Smith
 * @description Decorator plugin that adds bearer token authentication,
 * querying a database for bcrypt-hashed bearer token keys.
 * @param {object} server - Fastify instance.
 */
async function plugin(server) {
	await server.register(bearer, {
		errorResponse: (err) => ({
			statusCode: 401,
			error: "Unauthorized",
			message: err.message,
		}),
		auth: async (key, req) => {
			// DISTINCT SQL keyword not needed as PK constraints enforce unique values
			const results = await server.db.query(
				`SELECT name,
                    hash,
                    scopes
                FROM access.tokens
                WHERE expires > CURRENT_TIMESTAMP`
			);

			/**
			 * Database client packages return results in different structures,
			 * (mssql uses recordsets, pg uses rows) thus the optional chaining
			 */
			const tokens = results?.recordsets?.[0] ?? results?.rows;

			const authorized = await Promise.any(
				tokens.map((token) =>
					bcrypt.compare(key, token.hash).then((result) => {
						if (result === true) {
							return token;
						}
						throw new Error("No match");
					})
				)
			)
				.then((token) => {
					req.scopes =
						typeof token.scopes === "string"
							? secJSON.parse(token.scopes)
							: token.scopes;

					req.log.info({ client: token.name }, "requesting client");
					return true;
				})
				.catch(() => false);

			return authorized;
		},
	});
}

module.exports = fp(plugin, {
	fastify: "4.x",
	name: "hashed-bearer-auth",
	dependencies: ["db"],
});
