"use strict";

const Fastify = require("fastify");
const plugin = require(".");
const getConfig = require("../../config");

// Mock MSSQL and PostgreSQL clients to prevent DB connection attempts
jest.mock("mssql", () => ({
	connect: jest.fn().mockResolvedValue({
		close: jest.fn().mockResolvedValue(undefined),
	}),
	query: jest.fn().mockResolvedValue({ recordsets: [[{ example: "test" }]] }),
}));
jest.mock("pg", () => ({
	Pool: jest.fn().mockImplementation(() => ({
		end: jest.fn().mockResolvedValue(undefined),
		query: jest.fn().mockResolvedValue({ rows: [{ example: "test" }] }),
	})),
}));

describe("DB plugin", () => {
	let config;
	/** @type {Fastify.FastifyInstance} */
	let server;

	const query = "SELECT 'test' AS \"example\"";

	beforeEach(() => {
		jest.clearAllMocks();
	});

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
