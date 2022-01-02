const fp = require("fastify-plugin");

const { Pool } = require("pg");
const mssql = require("mssql");

/**
 * @author Frazer Smith
 * @description Decorator plugin that adds Microsoft SQL Server or PostgreSQL client.
 * @param {object} server - Fastify instance.
 * @param {object} options - Plugin config values.
 * @param {('mssql'|'postgresql')} options.client - Database client.
 * @param {string} options.connection - Database connection string.
 * Example connection string: `mssql://username:password@localhost/database`.
 */
async function plugin(server, options) {
	switch (options.client.toLowerCase()) {
		case "postgresql":
			server.log.info("Connecting to PostgreSQL DB");
			// eslint-disable-next-line no-case-declarations
			const pool = new Pool({
				connectionString: options.connection,
			});
			server.log.info("PostgreSQL DB connection opened");

			server.decorate("db", pool);
			server.addHook("onClose", async () => {
				server.log.info("Closing PostgreSQL DB connection");
				await pool.end();
				server.log.info("PostgreSQL DB connection closed");
			});

			break;
		case "mssql":
		default:
			server.log.info("Connecting to MSSQL DB");
			await mssql.connect(options.connection);
			server.log.info("MSSQL DB connection opened");

			server.decorate("db", mssql);
			server.addHook("onClose", async () => {
				server.log.info("Closing MSSQL DB connection");
				await mssql.close();
				server.log.info("MSSQL DB connection closed");
			});
			break;
	}
}

module.exports = fp(plugin, { fastify: "3.x", name: "db" });
