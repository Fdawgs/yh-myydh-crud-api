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
			const mockQueryFn = jest
				.fn()
				.mockImplementation(() => ({ recordSet: [1] }));

			server.mssql = {
				query: () => {
					mockQueryFn();
				},
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

		test("Should throw error", async () => {
			const mockQueryFn = jest.fn().mockImplementation(() => {
				throw new Error("Failed to connect to DB");
			});

			server.mssql = {
				query: () => {
					mockQueryFn();
				},
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

	describe("POST requests", () => {
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
			const mockQueryFn = jest
				.fn()
				.mockImplementation(() => ({ recordSet: [1] }));

			server.mssql = {
				query: () => {
					mockQueryFn();
				},
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

		test("Should throw error", async () => {
			const mockQueryFn = jest.fn().mockImplementation(() => {
				throw new Error("Failed to connect to DB");
			});

			server.mssql = {
				query: () => {
					mockQueryFn();
				},
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
