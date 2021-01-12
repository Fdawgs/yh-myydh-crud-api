const Fastify = require("fastify");
const plugin = require(".");
const getConfig = require("../../../config");

describe("options", () => {
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

		test("Should return preference options", async () => {
			const mockQueryFn = jest.fn().mockResolvedValue({
				recordsets: [
					[
						{
							preference_type_id: 1,
							preference_type_display: "SMS",
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
				url: "/",
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
				url: "/",
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
				url: "/",
			});

			expect(mockQueryFn).toHaveBeenCalledTimes(1);
			expect(response.statusCode).toEqual(500);
		});
	});
});
