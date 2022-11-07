const Fastify = require("fastify");
const sensible = require("@fastify/sensible");
const route = require(".");
const getConfig = require("../../../config");
const sharedSchemas = require("../../../plugins/shared-schemas");

const testId = 1;
const testPatientId = 9999999999;
const testTimeStamp = "2018-08-01T03:51:54.000Z";

describe("Receipt Route", () => {
	const connectionTests = [
		{
			testName: "MSSQL Connection",
			envVariables: {
				DB_CLIENT: "mssql",
			},
			mocks: {
				queryResults: {
					error: { rowsAffected: [0] },
					ok: { rowsAffected: [1] },
				},
			},
		},
		{
			testName: "PostgreSQL Connection",
			envVariables: {
				DB_CLIENT: "postgresql",
			},
			mocks: {
				queryResults: {
					error: { rowCount: 0 },
					ok: { rowCount: 1 },
				},
			},
		},
	];
	connectionTests.forEach((testObject) => {
		describe(`${testObject.testName}  - With Request Scopes`, () => {
			let config;
			let server;

			beforeAll(async () => {
				Object.assign(process.env, {
					BEARER_TOKEN_AUTH_ENABLED: true,
					...testObject.envVariables,
				});
				config = await getConfig();

				server = Fastify();
				await server
					.addHook("preValidation", async (req) => {
						req.scopes = [
							"documents/receipt.delete",
							"documents/receipt.put",
						];
					})
					.register(sensible)
					.register(sharedSchemas)
					.register(route, config)
					.ready();
			});

			afterAll(async () => {
				await server.close();
			});

			describe("DELETE Requests", () => {
				test("Should delete a document read receipt", async () => {
					const mockQueryFn = jest
						.fn()
						.mockResolvedValue(testObject.mocks.queryResults.ok);

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "DELETE",
						url: `/${testId}`,
						query: {
							patientId: testPatientId,
						},
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(1);
					expect(response.payload).toBe("");
					expect(response.statusCode).toBe(204);
				});

				test("Should return HTTP status code 404 if document missing or already deleted", async () => {
					const mockQueryFn = jest
						.fn()
						.mockResolvedValue(testObject.mocks.queryResults.error);

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "DELETE",
						url: `/${testId}`,
						query: {
							patientId: testPatientId,
						},
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(1);
					expect(JSON.parse(response.payload)).toEqual({
						error: "Not Found",
						message:
							"Record does not exist or has already been deleted",
						statusCode: 404,
					});
					expect(response.statusCode).toBe(404);
				});

				test("Should return HTTP status code 500 if connection issue encountered", async () => {
					const mockQueryFn = jest
						.fn()
						.mockRejectedValue(Error("Failed to connect to DB"));

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "DELETE",
						url: `/${testId}`,
						query: {
							patientId: testPatientId,
						},
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(1);
					expect(JSON.parse(response.payload)).toEqual({
						error: "Internal Server Error",
						message: "Error: Failed to connect to DB",
						statusCode: 500,
					});
					expect(response.statusCode).toBe(500);
				});
			});

			describe("PUT Requests", () => {
				test("Should upsert document read receipt", async () => {
					const mockQueryFn = jest
						.fn()
						.mockResolvedValue(testObject.mocks.queryResults.ok);

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "PUT",
						url: `/${testId}`,
						query: {
							patientId: testPatientId,
							timestamp: testTimeStamp,
						},
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(1);
					expect(response.payload).toBe("");
					expect(response.statusCode).toBe(204);
				});

				test("Should return HTTP status code 500 if rows were not inserted", async () => {
					const mockQueryFn = jest
						.fn()
						.mockResolvedValue(testObject.mocks.queryResults.error);

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "PUT",
						url: `/${testId}`,
						query: {
							patientId: testPatientId,
							timestamp: testTimeStamp,
						},
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(1);
					expect(JSON.parse(response.payload)).toEqual({
						error: "Internal Server Error",
						message: "Error: No rows were inserted",
						statusCode: 500,
					});
					expect(response.statusCode).toBe(500);
				});

				test("Should return HTTP status code 500 if connection issue encountered", async () => {
					const mockQueryFn = jest
						.fn()
						.mockRejectedValue(Error("Failed to connect to DB"));

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "PUT",
						url: `/${testId}`,
						query: {
							patientId: testPatientId,
							timestamp: testTimeStamp,
						},
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(1);
					expect(JSON.parse(response.payload)).toEqual({
						error: "Internal Server Error",
						message: "Error: Failed to connect to DB",
						statusCode: 500,
					});
					expect(response.statusCode).toBe(500);
				});
			});
		});

		describe(`${testObject.testName}  - Without Request Scopes`, () => {
			let config;
			let server;

			beforeAll(async () => {
				Object.assign(process.env, {
					BEARER_TOKEN_AUTH_ENABLED: true,
					...testObject.envVariables,
				});
				config = await getConfig();

				server = Fastify();
				await server
					.register(sensible)
					.register(sharedSchemas)
					.register(route, config)
					.ready();
			});

			afterAll(async () => {
				await server.close();
			});

			describe("DELETE Requests", () => {
				test("Should return HTTP status code 401 if not in permitted access", async () => {
					const response = await server.inject({
						method: "DELETE",
						url: `/${testId}`,
						query: {
							patientId: testPatientId,
						},
					});

					expect(JSON.parse(response.payload)).toEqual({
						error: "Unauthorized",
						message:
							"You do not have permission to perform an HTTP DELETE request on this route",
						statusCode: 401,
					});
					expect(response.statusCode).toBe(401);
				});
			});

			describe("PUT Requests", () => {
				test("Should return HTTP status code 401 if not in permitted access", async () => {
					const response = await server.inject({
						method: "PUT",
						url: `/${testId}`,
						query: {
							patientId: testPatientId,
							timestamp: testTimeStamp,
						},
					});

					expect(JSON.parse(response.payload)).toEqual({
						error: "Unauthorized",
						message:
							"You do not have permission to perform an HTTP PUT request on this route",
						statusCode: 401,
					});
					expect(response.statusCode).toBe(401);
				});
			});
		});
	});
});
