/* eslint-disable security-node/detect-crlf */
const fp = require("fastify-plugin");
const bearer = require("fastify-bearer-auth");
const crypto = require("crypto");

/**
 * @author Frazer Smith
 * @description Decorator plugin that adds bearer token authentication,
 * querying a database for hashed and salted bearer token keys.
 * @param {object} server - Fastify instance.
 */
async function plugin(server) {
	server.register(bearer, {
		errorResponse: (err) => ({
			statusCode: 401,
			error: "Unauthorized",
			message: err.message,
		}),
		auth: async (key, req) => {
			const results = await server.db.query(
				`SELECT DISTINCT
                    hash,
                    salt,
                    scopes
                FROM access.tokens
                WHERE expires > CURRENT_TIMESTAMP`
			);

			/**
			 * Database client packages return results in different structures,
			 * (mssql uses recordsets, pg uses rows) thus the optional chaining
			 */
			const tokens = results?.recordsets?.[0] ?? results?.rows;

			let authorized = false;
			for (let index = 0; index < tokens.length; index += 1) {
				// eslint-disable-next-line security/detect-object-injection
				const token = tokens[index];
				// TODO: look at making this async with Promise.any and Array.map
				/* istanbul ignore else */
				if (
					crypto
						.pbkdf2Sync(key, token.salt, 1000, 64, "sha512")
						.toString("hex") === token.hash
				) {
					authorized = true;
					req.scopes =
						typeof token.scopes === "string"
							? JSON.parse(token.scopes)
							: token.scopes;
					break;
				}
			}

			return authorized;
		},
	});
}

module.exports = fp(plugin, {
	fastify: "3.x",
	name: "hashed-bearer-auth",
	dependencies: ["db"],
});
