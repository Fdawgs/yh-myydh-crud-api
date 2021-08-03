const fp = require("fastify-plugin");
const sql = require("mssql");

/**
 * @author Frazer Smith
 * @description Decorator plugin that adds Microsoft SQL Server client.
 * @param {Function} server - Fastify instance.
 * @param {object} options - Plugin config values.
 * @param {object} options.database - Database config values.
 * @param {object|string} options.database.connection - mssql configuration values either as an object with options or as a connection string.
 * Example connection string: `mssql://username:password@localhost/database`.
 * @param {string=} options.connection.user - User name to use for authentication.
 * @param {string=} options.connection.password - Password to use for authentication.
 * @param {string} options.connection.server - Server to connect to.
 * You can use 'localhost\instance' to connect to named instance.
 * @param {number=} options.connection.port - Port to connect to (default: `1433`).
 * Do not set when connecting to named instance.
 * @param {string=} options.connection.domain - Once you set domain, driver will
 * connect to SQL Server using domain login.
 * @param {string=} options.connection.database - Database to connect to
 * (default: dependent on server configuration).
 * @param {number=} options.connection.connectionTimeout - Connection timeout in ms
 * (default: `15000`).
 * @param {number=} options.connection.requestTimeout - Request timeout in ms
 * (default: `15000`).
 * NOTE: msnodesqlv8 driver does not support timeouts < 1 second.
 * When passed via connection string, the key must be `request timeout`
 * @param {boolean=} options.connection.stream - Stream recordsets/rows instead of returning
 * them all at once as an argument of callback (default: `false`).
 * You can also enable streaming for each request independently (`request.stream = true`).
 * Always set to true if you plan to work with large amount of rows.
 * @param {boolean=} options.connection.parseJSON - Parse JSON recordsets to JS objects
 * (default: `false`).
 * @param {object=} options.connection.pool - See pool options here: https://github.com/vincit/tarn.js/#usage
 */
async function plugin(server, options) {
	const mssql = await sql.connect(options.connection);

	server.decorate("db", mssql);
	server.addHook("onClose", async (instance, done) => mssql.close(done));
}

module.exports = fp(plugin, { fastify: "3.x", name: "mssql" });
