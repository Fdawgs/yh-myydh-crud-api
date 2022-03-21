/* eslint-disable jest/no-disabled-tests */
const faker = require("faker");
const Fastify = require("fastify");
const sensible = require("fastify-sensible");
const route = require(".");
const getConfig = require("../../../../config");
const cleanObject = require("../../../../plugins/clean-object");
const convertDateParamOperator = require("../../../../plugins/convert-date-param-operator");
const sharedSchemas = require("../../../../plugins/shared-schemas");

const testPage = 1;

const testDate1 = faker.date.past().toISOString().split("T")[0];
const testDate2 = faker.date.past().toISOString().split("T")[0];

const testId = "b8e7265c-4733-44be-9238-7d7b8718fb88";
const testPayload = {
	name: "MyYDH Frontend SPA",
	email: "example@example.com",
	expires: faker.date.past().toISOString().split("T")[0],
	scopes: ["documents/register.search", "documents/receipt.delete"],
};

const testResult = {
	id: testId,
	name: testPayload.name,
	email: testPayload.email,
	hash: "testhash",
	salt: "testsalt",
	expires: testPayload.expires,
	created: "2022-01-18T14:07:48.190Z",
	last_updated: "2022-01-18T14:07:48.190Z",
};

const testRecord = {
	id: testId,
	access: {
		name: testResult.name,
		email: testResult.email,
		expires: testResult.expires,
		hash: testResult.hash,
		salt: testResult.salt,
		scopes: testPayload.scopes,
	},
	meta: {
		created: testResult.created,
		last_updated: testResult.last_updated,
	},
};

const expSearchResult = {
	link: expect.any(String),
	meta: {
		pagination: {
			total: expect.any(Number),
			per_page: testPage,
			current_page: testPage,
			total_pages: expect.any(Number),
		},
	},
	entry: [
		{
			url: expect.any(String),
			...testRecord,
		},
	],
};

describe("Access Route", () => {
	const connectionTests = [
		{
			testName: "MSSQL Connection",
			envVariables: {
				DB_CLIENT: "mssql",
			},
			mocks: {
				queryResults: {
					delete: {
						error: { rowsAffected: [0] },
						ok: { rowsAffected: [1] },
					},
					getRead: {
						error: {
							recordsets: [],
						},
						ok: {
							recordsets: [
								[
									{
										...testResult,
										scopes: JSON.stringify(
											testPayload.scopes
										),
									},
								],
							],
						},
					},
					getSearch: {
						error: {
							recordsets: [[], []],
						},
						ok: {
							recordsets: [
								[{ total: 1 }],
								[
									{
										...testResult,
										scopes: JSON.stringify(
											testPayload.scopes
										),
									},
								],
							],
						},
					},
					post: {
						error: {
							recordsets: [],
						},
						ok: {
							recordsets: [
								[
									{
										id: testId,
										scopes: JSON.stringify(
											testPayload.scopes
										),
									},
								],
							],
						},
					},
					put: {
						error: {
							rowsAffected: [0],
						},
						ok: {
							rowsAffected: [1],
						},
					},
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
					delete: {
						error: { rowCount: 0 },
						ok: { rowCount: 1 },
					},
					getRead: {
						error: {
							rows: [],
						},
						ok: {
							rows: [
								{
									...testResult,
									scopes: testPayload.scopes,
								},
							],
						},
					},
					getSearch: {
						error: {
							rows: [],
						},
						ok: [
							{ rows: [{ total: 1 }] },
							{
								rows: [
									{
										...testResult,
										scopes: testPayload.scopes,
									},
								],
							},
						],
					},
					post: {
						error: {
							rows: [],
						},
						ok: {
							rows: [
								{
									id: testId,
									scopes: testPayload.scopes,
								},
							],
						},
					},
					put: { error: { rowCount: 0 }, ok: { rowCount: 1 } },
				},
			},
		},
	];
	connectionTests.forEach((testObject) => {
		describe(`${testObject.testName}`, () => {
			let config;
			let server;

			beforeAll(async () => {
				Object.assign(process.env, testObject.envVariables);
				config = await getConfig();

				server = Fastify();
				server
					.register(cleanObject)
					.register(convertDateParamOperator)
					.register(sensible)
					.register(sharedSchemas)
					.register(route, config);

				await server.ready();
			});

			afterAll(async () => {
				await server.close();
			});

			describe("/:id DELETE Requests", () => {
				test("Should delete a bearer token record", async () => {
					const mockQueryFn = jest
						.fn()
						.mockResolvedValue(
							testObject.mocks.queryResults.delete.ok
						);

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "DELETE",
						url: `/${testId}`,
					});

					// expect(mockQueryFn).toHaveBeenCalledTimes(1);
					expect(response.payload).toBe("");
					expect(response.statusCode).toBe(204);
				});

				test("Should return HTTP status code 404 if bearer token record missing or already deleted", async () => {
					const mockQueryFn = jest
						.fn()
						.mockResolvedValue(
							testObject.mocks.queryResults.delete.error
						);

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "DELETE",
						url: `/${testId}`,
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(1);
					expect(JSON.parse(response.payload)).toEqual({
						error: "Not Found",
						message:
							"Bearer token record does not exist or has already been deleted",
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
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(1);
					expect(JSON.parse(response.payload)).toEqual({
						error: "Internal Server Error",
						message:
							"Unable to delete bearer token record from database",
						statusCode: 500,
					});
					expect(response.statusCode).toBe(500);
				});
			});

			describe("/:id GET Requests", () => {
				test("Should return bearer token record", async () => {
					const mockQueryFn = jest
						.fn()
						.mockResolvedValue(
							testObject.mocks.queryResults.getRead.ok
						);

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "GET",
						url: `/${testId}`,
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(1);
					expect(JSON.parse(response.payload)).toEqual(testRecord);
					expect(response.statusCode).toBe(200);
				});

				test("Should return HTTP status code 404 if bearer token record missing", async () => {
					const mockQueryFn = jest
						.fn()
						.mockResolvedValue(
							testObject.mocks.queryResults.getRead.error
						);

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "GET",
						url: `/${testId}`,
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(1);
					expect(JSON.parse(response.payload)).toEqual({
						error: "Not Found",
						message: "Bearer token record not found",
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
						method: "GET",
						url: `/${testId}`,
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(1);
					expect(JSON.parse(response.payload)).toEqual({
						error: "Internal Server Error",
						message: "Unable to return result from database",
						statusCode: 500,
					});
					expect(response.statusCode).toBe(500);
				});
			});

			describe("/ GET Requests", () => {
				test("Should return bearer token record, using all query string parameters", async () => {
					const mockQueryFn = jest
						.fn()
						.mockResolvedValue(
							testObject.mocks.queryResults.getSearch.ok
						);

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "GET",
						url: "/",
						query: {
							"access.name": testResult.name,
							"access.email": testResult.email,
							"access.expires": testResult.expires,
							"access.scopes": "documents/register.search",
							"meta.created": testDate1,
							"meta.last_updated": testDate1,
							per_page: testPage,
							page: testPage,
						},
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(1);
					expect(JSON.parse(response.payload)).toEqual(
						expSearchResult
					);
					expect(response.statusCode).toBe(200);
				});

				test("Should return bearer token record, using more than one `access.expires`, `access.scopes`, meta.created`, and `meta.last_updated` query string params", async () => {
					const mockQueryFn = jest
						.fn()
						.mockResolvedValue(
							testObject.mocks.queryResults.getSearch.ok
						);

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "GET",
						url: "/",
						query: {
							"access.expires": [testDate1, testDate2],
							"access.scopes": [
								"documents/register.search",
								"documents/receipt.delete",
							],
							"meta.created": [testDate1, testDate2],
							"meta.last_updated": [testDate1, testDate2],
						},
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(1);
					expect(JSON.parse(response.payload)).toEqual(
						expSearchResult
					);
					expect(response.statusCode).toBe(200);
				});

				test("Should return bearer token record, using operators in the `access.expires`, meta.created`, and `meta.last_updated` query string params", async () => {
					const mockQueryFn = jest
						.fn()
						.mockResolvedValue(
							testObject.mocks.queryResults.getSearch.ok
						);

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "GET",
						url: "/",
						query: {
							"access.expires": `ge${testDate1}`,
							"meta.created": `ge${testDate1}`,
							"meta.last_updated": `ge${testDate1}`,
						},
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(1);
					expect(JSON.parse(response.payload)).toEqual(
						expSearchResult
					);
					expect(response.statusCode).toBe(200);
				});

				test("Should return no bearer token records if table empty", async () => {
					const mockQueryFn = jest.fn().mockResolvedValue({});

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "GET",
						url: "/",
						query: {
							"access.name": testResult.name,
						},
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(1);
					expect(JSON.parse(response.payload)).toEqual({
						link: expect.any(String),
						meta: {
							pagination: {
								total: 0,
								per_page: testPage,
								current_page: testPage,
								total_pages: 0,
							},
						},
						entry: [],
					});
					expect(response.statusCode).toBe(200);
				});

				test("Should return HTTP status code 400 if no query string params present", async () => {
					const mockQueryFn = jest
						.fn()
						.mockResolvedValue(
							testObject.mocks.queryResults.getSearch.error
						);

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "GET",
						url: "/",
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(0);
					expect(JSON.parse(response.payload)).toEqual({
						error: "Bad Request",
						message: "No valid query string parameters provided",
						statusCode: 400,
					});
					expect(response.statusCode).toBe(400);
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
						query: {
							"access.name": testResult.name,
						},
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(1);
					expect(JSON.parse(response.payload)).toEqual({
						error: "Internal Server Error",
						message: "Unable to return result(s) from database",
						statusCode: 500,
					});
					expect(response.statusCode).toBe(500);
				});
			});

			describe("/ POST Requests", () => {
				test("Should create bearer token record", async () => {
					const mockQueryFn = jest
						.fn()
						.mockResolvedValue(
							testObject.mocks.queryResults.post.ok
						);

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "POST",
						url: "/",
						headers: {
							"content-type": "application/json",
						},
						payload: testPayload,
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(1);
					expect(JSON.parse(response.payload)).toEqual({
						id: testId,
						access: {
							token: expect.stringMatching(/^ydhmyydh_/im),
							scopes: testPayload.scopes,
						},
					});
					expect(response.headers).toMatchObject({
						location: expect.stringContaining(
							`/admin/access/bearer-token/${testId}`
						),
					});
					expect(response.statusCode).toBe(201);
				});

				test("Should create bearer token record without optional body properties", async () => {
					const mockQueryFn = jest
						.fn()
						.mockResolvedValue(
							testObject.mocks.queryResults.post.ok
						);

					server.db = {
						query: mockQueryFn,
					};

					const trimmedTestPayload = { ...testPayload };
					delete trimmedTestPayload.email;
					delete trimmedTestPayload.expires;

					const response = await server.inject({
						method: "POST",
						url: "/",
						headers: {
							"content-type": "application/json",
						},
						payload: trimmedTestPayload,
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(1);
					expect(JSON.parse(response.payload)).toEqual({
						id: testId,
						access: {
							token: expect.stringMatching(/^ydhmyydh_/im),
							scopes: testPayload.scopes,
						},
					});
					expect(response.statusCode).toBe(201);
				});

				test("Should return HTTP status code 415 if content-type in `Content-Type` request header unsupported", async () => {
					const mockQueryFn = jest
						.fn()
						.mockResolvedValue(
							testObject.mocks.queryResults.post.ok
						);

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "POST",
						url: "/",
						headers: {
							"content-type": "application/javascript",
						},
						payload: testPayload,
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(0);
					expect(JSON.parse(response.payload)).toEqual({
						error: "Unsupported Media Type",
						message:
							"Unsupported Media Type: application/javascript",
						statusCode: 415,
					});
					expect(response.statusCode).toBe(415);
				});

				test("Should return HTTP status code 500 if unable to update a bearer token record", async () => {
					const mockQueryFn = jest
						.fn()
						.mockResolvedValue(
							testObject.mocks.queryResults.post.error
						);

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "POST",
						url: "/",
						headers: {
							"content-type": "application/json",
						},
						payload: testPayload,
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(1);
					expect(JSON.parse(response.payload)).toEqual({
						error: "Internal Server Error",
						message:
							"Unable to add bearer token record to database",
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
						method: "POST",
						url: "/",
						headers: {
							"content-type": "application/json",
						},
						payload: testPayload,
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(1);
					expect(JSON.parse(response.payload)).toEqual({
						error: "Internal Server Error",
						message:
							"Unable to add bearer token record to database",
						statusCode: 500,
					});
					expect(response.statusCode).toBe(500);
				});
			});
		});
	});
});
