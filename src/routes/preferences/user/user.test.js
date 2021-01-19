const faker = require("faker/locale/en_GB");
const Fastify = require("fastify");
const plugin = require(".");
const getConfig = require("../../../config");

const mockPatientId = faker.random.number({
	min: 1000000000,
	max: 9999999999,
});

describe("user", () => {
	describe("GET requests", () => {
		let options;
		let server;

		beforeAll(async () => {
			options = await getConfig();

			server = Fastify();
			server.register(plugin, options);

			await server.ready();
		});

		afterAll(() => {
			server.close();
		});

		test("Should return user preferences", async () => {
			const mockQueryFn = jest.fn().mockResolvedValue({
				recordsets: [
					[
						{
							id: "9999999999",
							meta_created: "2021-01-07T10:49:03.503Z",
							meta_lastupdated: "2021-01-08T10:03:50.130Z",
							preferenceValueId: 1,
							preference_type_id: 1,
							preference_type_display: "SMS",
							preference_type_priority: 0,
						},
					],
					[
						{
							preference_type_id: 1,
							preference_type_display: "SMS",
							preference_option_display: "yes",
							preference_option_value: 1,
						},
						{
							preference_type_id: 1,
							preference_type_display: "SMS",
							preference_option_display: "no",
							preference_option_value: 2,
						},
					],
				],
			});

			server.mssql = {
				query: mockQueryFn,
			};

			const response = await server.inject({
				method: "GET",
				url: `/${mockPatientId}`,
			});

			expect(mockQueryFn).toHaveBeenCalledTimes(1);
			expect(response.statusCode).toEqual(200);
		});

		test("Should return HTTP status code 404 if no values returned from database", async () => {
			const mockQueryFn = jest.fn().mockResolvedValue({
				recordsets: [[], []],
			});

			server.mssql = {
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

			server.mssql = {
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

	describe("PUT requests", () => {
		let options;
		let server;

		beforeAll(async () => {
			options = await getConfig();

			server = Fastify();
			server.register(plugin, options);

			await server.ready();
		});

		afterAll(() => {
			server.close();
		});

		test("Should upsert user preferences", async () => {
			const mockQueryFn = jest.fn().mockResolvedValue({
				rowsAffected: [1],
			});

			server.mssql = {
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

		test("Should return HTTP status code 500 if connection issue encountered", async () => {
			const mockQueryFn = jest.fn().mockResolvedValue({
				rowsAffected: [0],
			});

			server.mssql = {
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
