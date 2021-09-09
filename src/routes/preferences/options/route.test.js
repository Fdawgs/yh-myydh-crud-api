const Fastify = require("fastify");
const sensible = require("fastify-sensible");
const route = require(".");
const getConfig = require("../../../config");
const sharedSchemas = require("../../../plugins/shared-schemas");

const expResPayload = {
	preferences: [
		{
			type: {
				display: "SMS",
				id: 1,
				priority: 0,
				selected: 2,
				options: [
					{
						display: "yes",
						value: 1,
					},
					{
						display: "no",
						value: 2,
					},
				],
			},
		},
	],
};

describe("Options Route", () => {
	describe("MSSQL Database Backend", () => {
		let config;
		let server;

		beforeAll(async () => {
			Object.assign(process.env, {
				DB_CLIENT: "mssql",
			});
			config = await getConfig();

			server = Fastify();
			server
				.register(sensible)
				.register(sharedSchemas)
				.register(route, config);

			await server.ready();
		});

		afterAll(async () => {
			await server.close();
		});

		describe("GET Requests", () => {
			test("Should return preference options", async () => {
				const mockQueryFn = jest.fn().mockResolvedValue({
					recordsets: [
						[
							{
								preferenceTypeId: 1,
								preferenceTypeDisplay: "SMS",
							},
						],
						[
							{
								preferenceTypeId: 1,
								preferenceTypeDisplay: "SMS",
								preferenceOptionDisplay: "yes",
								preferenceOptionValue: 1,
							},
							{
								preferenceTypeId: 1,
								preferenceTypeDisplay: "SMS",
								preferenceOptionDisplay: "no",
								preferenceOptionValue: 2,
							},
						],
					],
				});

				server.db = {
					query: mockQueryFn,
				};

				const response = await server.inject({
					method: "GET",
					url: "/",
				});

				expect(mockQueryFn).toHaveBeenCalledTimes(1);
				expect(JSON.parse(response.payload)).toEqual(expResPayload);
				expect(response.statusCode).toEqual(200);
			});

			test("Should return HTTP status code 404 if no values returned from database", async () => {
				const mockQueryFn = jest.fn().mockResolvedValue({
					recordsets: [[], []],
				});

				server.db = {
					query: mockQueryFn,
				};

				const response = await server.inject({
					method: "GET",
					url: "/",
				});

				expect(mockQueryFn).toHaveBeenCalledTimes(1);
				expect(response.statusCode).toEqual(404);
			});

			test("Should return HTTP status code 500 if connection issue encountered", async () => {
				const mockQueryFn = jest
					.fn()
					.mockRejectedValue(Error("Failed to connect to DB"));

				server.db = {
					query: mockQueryFn,
				};

				const response = await server.inject({
					method: "GET",
					url: "/",
				});

				expect(mockQueryFn).toHaveBeenCalledTimes(1);
				expect(response.statusCode).toEqual(500);
			});
		});
	});

	describe("PostgreSQL Database Backend", () => {
		let config;
		let server;

		beforeAll(async () => {
			Object.assign(process.env, {
				DB_CLIENT: "postgresql",
			});
			config = await getConfig();

			server = Fastify();
			server
				.register(sensible)
				.register(sharedSchemas)
				.register(route, config);

			await server.ready();
		});

		afterAll(async () => {
			await server.close();
		});

		describe("GET Requests", () => {
			test("Should return preference options", async () => {
				const mockQueryFn = jest.fn().mockResolvedValue([
					{
						rows: [
							{
								preferenceTypeId: 1,
								preferenceTypeDisplay: "SMS",
							},
						],
					},
					{
						rows: [
							{
								preferenceTypeId: 1,
								preferenceTypeDisplay: "SMS",
								preferenceOptionDisplay: "yes",
								preferenceOptionValue: 1,
							},
							{
								preferenceTypeId: 1,
								preferenceTypeDisplay: "SMS",
								preferenceOptionDisplay: "no",
								preferenceOptionValue: 2,
							},
						],
					},
				]);

				server.db = {
					query: mockQueryFn,
				};

				const response = await server.inject({
					method: "GET",
					url: "/",
				});

				expect(mockQueryFn).toHaveBeenCalledTimes(1);
				expect(JSON.parse(response.payload)).toEqual(expResPayload);
				expect(response.statusCode).toEqual(200);
			});

			test("Should return HTTP status code 404 if no values returned from database", async () => {
				const mockQueryFn = jest.fn().mockResolvedValue([{}, {}]);

				server.db = {
					query: mockQueryFn,
				};

				const response = await server.inject({
					method: "GET",
					url: "/",
				});

				expect(mockQueryFn).toHaveBeenCalledTimes(1);
				expect(response.statusCode).toEqual(404);
			});

			test("Should return HTTP status code 500 if connection issue encountered", async () => {
				const mockQueryFn = jest
					.fn()
					.mockRejectedValue(Error("Failed to connect to DB"));

				server.db = {
					query: mockQueryFn,
				};

				const response = await server.inject({
					method: "GET",
					url: "/",
				});

				expect(mockQueryFn).toHaveBeenCalledTimes(1);
				expect(response.statusCode).toEqual(500);
			});
		});
	});
});
