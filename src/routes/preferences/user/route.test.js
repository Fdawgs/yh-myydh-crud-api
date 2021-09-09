const faker = require("faker/locale/en_GB");
const Fastify = require("fastify");
const sensible = require("fastify-sensible");
const route = require(".");
const getConfig = require("../../../config");
const sharedSchemas = require("../../../plugins/shared-schemas");

const mockPatientId = faker.datatype.number({
	min: 1000000000,
	max: 9999999999,
});

const expResPayload = {
	id: "9999999999",
	meta: {
		created: "2021-01-07T10:49:03.503Z",
		lastupdated: "2021-01-08T10:03:50.130Z",
	},
	preferences: [
		{
			type: {
				display: "SMS",
				id: 1,
				priority: 0,
				selected: 1,
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

describe("User Route", () => {
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
			test("Should return user preferences", async () => {
				const mockQueryFn = jest.fn().mockResolvedValue({
					recordsets: [
						[
							{
								id: "9999999999",
								metaCreated: "2021-01-07T10:49:03.503Z",
								metaLastUpdated: "2021-01-08T10:03:50.130Z",
								preferenceValueId: 1,
								preferenceTypeId: 1,
								preferenceTypeDisplay: "SMS",
								preferenceTypePriority: 0,
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
					url: `/${mockPatientId}`,
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
					url: `/${mockPatientId}`,
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
					url: `/${mockPatientId}`,
				});

				expect(mockQueryFn).toHaveBeenCalledTimes(1);
				expect(response.statusCode).toEqual(500);
			});
		});

		describe("PUT Requests", () => {
			test("Should upsert user preferences", async () => {
				const mockQueryFn = jest.fn().mockResolvedValue({
					rowsAffected: [1, 1],
				});

				server.db = {
					query: mockQueryFn,
				};

				const response = await server.inject({
					method: "PUT",
					url: `/${mockPatientId}`,
					headers: {
						"content-type": "application/json",
					},
					payload: {
						preferences: [
							{
								id: 1,
								priority: 0,
								selected: 1,
							},
							{
								id: 2,
								priority: 1,
								selected: 2,
							},
						],
					},
				});

				expect(mockQueryFn).toHaveBeenCalledTimes(2);
				expect(response.statusCode).toEqual(204);
			});

			test("Should return HTTP status code 415 if content-type in `Content-Type` request header unsupported", async () => {
				const mockQueryFn = jest.fn().mockResolvedValue({
					rowsAffected: [1, 1],
				});

				server.db = {
					query: mockQueryFn,
				};

				const response = await server.inject({
					method: "PUT",
					url: `/${mockPatientId}`,
					headers: {
						"content-type": "application/javascript",
					},
					payload: {
						preferences: [
							{
								id: 1,
								priority: 0,
								selected: 1,
							},
							{
								id: 2,
								priority: 1,
								selected: 2,
							},
						],
					},
				});

				expect(response.statusCode).toEqual(415);
			});

			test("Should return HTTP status code 500 if connection issue encountered", async () => {
				const mockQueryFn = jest.fn().mockResolvedValue({
					rowsAffected: [0, 0],
				});

				server.db = {
					query: mockQueryFn,
				};

				const response = await server.inject({
					method: "PUT",
					url: `/${mockPatientId}`,
					headers: {
						"content-type": "application/json",
					},
					payload: {
						preferences: [
							{
								id: 1,
								priority: 0,
								selected: 1,
							},
							{
								id: 2,
								priority: 1,
								selected: 2,
							},
						],
					},
				});

				expect(mockQueryFn).toHaveBeenCalledTimes(2);
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
			test("Should return user preferences", async () => {
				const mockQueryFn = jest.fn().mockResolvedValue([
					{
						rows: [
							{
								id: "9999999999",
								metaCreated: "2021-01-07T10:49:03.503Z",
								metaLastUpdated: "2021-01-08T10:03:50.130Z",
								preferenceValueId: 1,
								preferenceTypeId: 1,
								preferenceTypeDisplay: "SMS",
								preferenceTypePriority: 0,
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
					url: `/${mockPatientId}`,
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
					url: `/${mockPatientId}`,
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
					url: `/${mockPatientId}`,
				});

				expect(mockQueryFn).toHaveBeenCalledTimes(1);
				expect(response.statusCode).toEqual(500);
			});
		});

		describe("PUT Requests", () => {
			test("Should upsert user preferences", async () => {
				const mockQueryFn = jest
					.fn()
					.mockResolvedValue({ rowCount: 1 });

				server.db = {
					query: mockQueryFn,
				};

				const response = await server.inject({
					method: "PUT",
					url: `/${mockPatientId}`,
					headers: {
						"content-type": "application/json",
					},
					payload: {
						preferences: [
							{
								id: 1,
								priority: 0,
								selected: 1,
							},
							{
								id: 2,
								priority: 1,
								selected: 2,
							},
						],
					},
				});

				expect(mockQueryFn).toHaveBeenCalledTimes(2);
				expect(response.statusCode).toEqual(204);
			});

			test("Should return HTTP status code 415 if content-type in `Content-Type` request header unsupported", async () => {
				const mockQueryFn = jest
					.fn()
					.mockResolvedValue({ rowCount: 1 });

				server.db = {
					query: mockQueryFn,
				};

				const response = await server.inject({
					method: "PUT",
					url: `/${mockPatientId}`,
					headers: {
						"content-type": "application/javascript",
					},
					payload: {
						preferences: [
							{
								id: 1,
								priority: 0,
								selected: 1,
							},
							{
								id: 2,
								priority: 1,
								selected: 2,
							},
						],
					},
				});

				expect(response.statusCode).toEqual(415);
			});

			test("Should return HTTP status code 500 if connection issue encountered", async () => {
				const mockQueryFn = jest
					.fn()
					.mockResolvedValue({ rowCount: 0 });

				server.db = {
					query: mockQueryFn,
				};

				const response = await server.inject({
					method: "PUT",
					url: `/${mockPatientId}`,
					headers: {
						"content-type": "application/json",
					},
					payload: {
						preferences: [
							{
								id: 1,
								priority: 0,
								selected: 1,
							},
							{
								id: 2,
								priority: 1,
								selected: 2,
							},
						],
					},
				});

				expect(mockQueryFn).toHaveBeenCalledTimes(2);
				expect(response.statusCode).toEqual(500);
			});
		});
	});
});
