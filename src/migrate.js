/* eslint-disable no-console */

"use strict";

const { ConnectionPool, Request } = require("mssql");
const { Client } = require("pg");
const { parse: pgParse } = require("pg-connection-string");
const Postgrator = require("postgrator");
const { joinSafe } = require("upath");
const getConfig = require("./config");

/**
 * @author Frazer Smith
 * @description Runs Postgrator to execute SQL queries in ../migrations/** directories.
 */
async function migrate() {
	let client;
	let db;
	let postgrator;

	try {
		const { database } = await getConfig();

		db = database.client.toLowerCase();

		switch (db) {
			case "postgresql":
				client = new Client(database.connection);
				postgrator = new Postgrator({
					migrationPattern: joinSafe(
						__dirname,
						"../migrations/postgres/*"
					),
					driver: "pg",
					database: pgParse(database.connection).database,
					execQuery: /* istanbul ignore next */ (query) =>
						client.query(query),
				});
				break;

			case "mssql":
			default:
				client = new ConnectionPool(database.connection);
				postgrator = new Postgrator({
					migrationPattern: joinSafe(
						__dirname,
						"../migrations/mssql/*"
					),
					driver: "mssql",
					database: client.config.database,
					execQuery: /* istanbul ignore next */ async (query) => {
						const request = new Request(client);
						const result = await request.batch(query);

						return {
							rows: result.recordset ? result.recordset : result,
						};
					},
				});
				break;
		}

		await client.connect();

		// Migrate to latest version
		const migrationResult = await postgrator.migrate();

		if (migrationResult.length === 0) {
			console.log("No migrations run, already on latest schema version");
		}

		console.log("Migration complete");
	} catch (err) {
		console.error(err);
		process.exitCode = 1;
	} finally {
		// Close the DB connection
		switch (db) {
			case "postgresql":
				await client.end();
				break;

			case "mssql":
			default:
				await client.close();
				break;
		}
	}
}

// If file called directly, then run function
/* istanbul ignore if */
if (require.main === module) {
	migrate();
}

module.exports = migrate;
