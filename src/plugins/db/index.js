"use strict";

const fp = require("fastify-plugin");

const { Pool } = require("pg");
const mssql = require("mssql");

/**
 * @author Frazer Smith
 * @description Decorator plugin that adds Microsoft SQL Server or PostgreSQL client.
 * @param {import("fastify").FastifyInstance} server - Fastify instance.
 * @param {object} options - Plugin config values.
 * @param {('mssql'|'postgresql')} options.client - Database client.
 * @param {string} options.connection - Database connection string.
 * Example connection string: `mssql://username:password@localhost/database`.
 */
async function plugin(server, options) {
	try {
		let pool;

		switch (options.client.toLowerCase()) {
			case "postgresql":
				server.log.info("Connecting to PostgreSQL DB");
				pool = new Pool({
					connectionString: options.connection,
				});

				/**
				 * Attempt to connect to DB and check connection string
				 * is valid, will throw error if not.
				 */
				await pool.query("SELECT version();");

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
				pool = await mssql.connect(options.connection);
				server.log.info("MSSQL DB connection opened");

				server.decorate("db", mssql);
				server.addHook("onClose", async () => {
					server.log.info("Closing MSSQL DB connection");
					await pool.close();
					server.log.info("MSSQL DB connection closed");
				});
				break;
		}
	} catch (err) /* istanbul ignore next */ {
		server.log.error(
			`Unable to connect to ${options.client} DB instance: ${err}`
		);
		process.exit(1);
	}
}

module.exports = fp(plugin, { fastify: "4.x", name: "db" });
