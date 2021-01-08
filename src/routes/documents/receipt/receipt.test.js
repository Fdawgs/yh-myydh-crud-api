const faker = require("faker/locale/en_GB");
const Fastify = require("fastify");
const plugin = require(".");
const getConfig = require("../../../config");

const mockId = faker.random.number({
	min: 1,
	max: 10,
});
const mockPatientId = faker.random.number({
	min: 1000000000,
	max: 9999999999,
});
const mockTimeStamp = faker.date.past().toISOString();

describe("receipt", () => {
	describe("DELETE requests", () => {
		let options;
		let server;

		beforeAll(async () => {
			options = await getConfig();

			server = Fastify();
			server.register(plugin, options);

			await server.ready();
		});

		beforeEach(() => {
			jest.resetAllMocks();
		});

		afterAll(() => {
			server.close();
		});

		test("Should delete a document read receipt", async () => {
			const mockQueryFn = jest.fn().mockResolvedValue({
				rowsAffected: [1],
			});

			server.mssql = {
				query: mockQueryFn,
			};

			const response = await server.inject({
				method: "DELETE",
				url: "/",
				params: {
					id: mockId,
				},
				query: {
					patientId: mockPatientId,
				},
			});

			expect(mockQueryFn).toHaveBeenCalledTimes(1);
			expect(response.statusCode).toEqual(204);
		});

		test("Should return HTTP status code 404 if document missing or already deleted", async () => {
			const mockQueryFn = jest.fn().mockResolvedValue({
				rowsAffected: [0],
			});

			server.mssql = {
				query: mockQueryFn,
			};

			const response = await server.inject({
				method: "DELETE",
				url: "/",
				params: {
					id: mockId,
				},
				query: {
					patientId: mockPatientId,
				},
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
				method: "DELETE",
				url: "/",
				params: {
					id: mockId,
				},
				query: {
					patientId: mockPatientId,
				},
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

		beforeEach(() => {
			jest.resetAllMocks();
		});

		afterAll(() => {
			server.close();
		});

		test("Should create a document read receipt", async () => {
			const mockQueryFn = jest.fn().mockResolvedValue({
				rowsAffected: [1],
			});

			server.mssql = {
				query: mockQueryFn,
			};

			const response = await server.inject({
				method: "PUT",
				url: "/",
				params: {
					id: mockId,
				},
				query: {
					patientId: mockPatientId,
					timestamp: mockTimeStamp,
				},
			});

			expect(mockQueryFn).toHaveBeenCalledTimes(1);
			expect(response.statusCode).toEqual(204);
		});

		test("Should fail to create document read receipt if client cannot write to database", async () => {
			const mockQueryFn = jest.fn().mockResolvedValue({
				rowsAffected: [0],
			});

			server.mssql = {
				query: mockQueryFn,
			};

			const response = await server.inject({
				method: "PUT",
				url: "/",
				params: {
					id: mockId,
				},
				query: {
					patientId: mockPatientId,
					timestamp: mockTimeStamp,
				},
			});

			expect(mockQueryFn).toHaveBeenCalledTimes(1);
			expect(response.statusCode).toEqual(500);
		});

		test("Should throw error", async () => {
			const mockQueryFn = jest
				.fn()
				.mockRejectedValue(Error("Failed to connect to DB"));

			server.mssql = {
				query: mockQueryFn,
			};

			const response = await server.inject({
				method: "PUT",
				url: "/",
				params: {
					id: mockId,
				},
				query: {
					patientId: mockPatientId,
					timestamp: mockTimeStamp,
				},
			});

			expect(mockQueryFn).toHaveBeenCalledTimes(1);
			expect(response.statusCode).toEqual(500);
		});
	});
});
