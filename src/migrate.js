/* eslint-disable no-console */
const mssql = require("mssql");
const path = require("path");
const pg = require("pg");
const pgParse = require("pg-connection-string").parse;
const Postgrator = require("postgrator");
const getConfig = require("./config");

/**
 * @author Frazer Smith
 * @description Run Postgrator to execute SQL queries in ../migrations/** directories.
 */
async function migrate() {
	const { database } = await getConfig();
	let client;
	let postgrator;

	switch (database.client.toLowerCase()) {
		case "postgresql":
			client = new pg.Client(database.connection);
			postgrator = new Postgrator({
				migrationPattern: path.join(
					__dirname,
					"../migrations/postgres/*"
				),
				driver: "pg",
				database: pgParse(database.connection).database,
				execQuery: (query) => client.query(query),
			});
			break;

		case "mssql":
		default:
			client = new mssql.ConnectionPool(database.connection);
			postgrator = new Postgrator({
				migrationPattern: path.join(__dirname, "../migrations/mssql/*"),
				driver: "mssql",
				database: client.config.database,
				execQuery: (query) =>
					new Promise((resolve, reject) => {
						const request = new mssql.Request(client);
						// batch will handle multiple queries
						// eslint-disable-next-line promise/prefer-await-to-callbacks
						request.batch(query, (err, result) => {
							if (err) {
								return reject(err);
							}
							return resolve({
								rows:
									result && result.recordset
										? result.recordset
										: result,
							});
						});
					}),
			});
			break;
	}

	await client.connect();

	// Migrate to latest version
	const migrationResult = await postgrator.migrate();

	if (migrationResult.length === 0) {
		console.log("No migrations run, already on latest schema version");
	}

	// Close the DB connection
	switch (database.client.toLowerCase()) {
		case "postgresql":
			await client.end();
			break;

		case "mssql":
		default:
			await client.close();
			break;
	}

	console.log("Migration complete");
}
migrate();
