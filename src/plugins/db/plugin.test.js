const Fastify = require("fastify");
const plugin = require(".");
const getConfig = require("../../config");

describe("DB plugin", () => {
	let config;
	let server;

	const query = "SELECT 'test' AS \"example\"";

	describe("MSSQL connection", () => {
		beforeAll(async () => {
			const DB_CLIENT = "mssql";
			const DB_CONNECTION_STRING =
				"Server=localhost,1433;Database=master;User Id=sa;Password=Password!;Encrypt=true;TrustServerCertificate=true;";
			Object.assign(process.env, {
				DB_CLIENT,
				DB_CONNECTION_STRING,
			});
			config = await getConfig();

			server = Fastify();
			await server.register(plugin, config.database);
			server.get("/", async () => {
				const results = await server.db.query(query);
				return results;
			});

			await server.ready();
		});

		afterAll(async () => {
			await server.close();
		});

		it("Returns 'test' string", async () => {
			const response = await server.inject({
				method: "GET",
				url: "/",
			});

			expect(JSON.parse(response.body).recordsets[0][0].example).toBe(
				"test"
			);
			expect(response.statusCode).toBe(200);
		});
	});

	describe("PostgreSQL connection", () => {
		beforeAll(async () => {
			const DB_CLIENT = "postgresql";
			const DB_CONNECTION_STRING =
				"postgresql://postgres:password@localhost:5432/myydh_crud_api";
			Object.assign(process.env, {
				DB_CLIENT,
				DB_CONNECTION_STRING,
			});
			config = await getConfig();

			server = Fastify();
			await server.register(plugin, config.database);
			server.get("/", async () => {
				const results = await server.db.query(query);
				return results.rows;
			});

			await server.ready();
		});

		afterAll(async () => {
			await server.close();
		});

		it("Returns 'test' string", async () => {
			const response = await server.inject({
				method: "GET",
				url: "/",
			});

			expect(JSON.parse(response.body)[0].example).toBe("test");
			expect(response.statusCode).toBe(200);
		});
	});
});
