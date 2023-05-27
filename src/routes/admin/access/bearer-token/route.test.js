const { randomUUID } = require("crypto");
const Fastify = require("fastify");
const sensible = require("@fastify/sensible");
const route = require(".");
const getConfig = require("../../../../config");
const cleanObject = require("../../../../plugins/clean-object");
const convertDateParamOperator = require("../../../../plugins/convert-date-param-operator");
const sharedSchemas = require("../../../../plugins/shared-schemas");

const testPage = 1;

const testDate1 = "2018-08-01";
const testDate2 = "2022-11-07";

const testId = randomUUID();

const testReqBody = {
	name: "Test Clinical System Supplier Product",
	email: "testFirstName.testLastName@somersetft.nhs.uk",
	expires: "2022-11-07",
	scopes: ["documents/register.search", "documents/receipt.delete"],
};

const testDbResult = {
	id: testId,
	name: testReqBody.name,
	email: testReqBody.email,
	hash: "testhash",
	expires: testReqBody.expires,
	created: "2022-01-18T14:07:48.190Z",
	last_updated: "2022-01-18T14:07:48.190Z",
};

const testResRecord = {
	id: testId,
	access: {
		name: testDbResult.name,
		email: testDbResult.email,
		expires: testDbResult.expires,
		hash: testDbResult.hash,
		scopes: testReqBody.scopes,
	},
	meta: {
		created: testDbResult.created,
		last_updated: testDbResult.last_updated,
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
			url: `http://localhost/access/bearer-token/${testId}`,
			...testResRecord,
		},
	],
};

describe("Access route", () => {
	const connectionTests = [
		{
			testName: "MSSQL connection",
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
										...testDbResult,
										scopes: JSON.stringify(
											testReqBody.scopes
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
										...testDbResult,
										scopes: JSON.stringify(
											testReqBody.scopes
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
											testReqBody.scopes
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
			testName: "PostgreSQL connection",
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
									...testDbResult,
									scopes: testReqBody.scopes,
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
										...testDbResult,
										scopes: testReqBody.scopes,
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
									scopes: testReqBody.scopes,
								},
							],
						},
					},
					put: { error: { rowCount: 0 }, ok: { rowCount: 1 } },
				},
			},
		},
	];
	describe.each(connectionTests)("$testName", ({ envVariables, mocks }) => {
		let config;
		let server;

		beforeAll(async () => {
			Object.assign(process.env, envVariables);
			config = await getConfig();

			server = Fastify();
			await server
				.register(cleanObject)
				.register(convertDateParamOperator)
				.register(sensible)
				.register(sharedSchemas)
				.register(route, config)
				.ready();
		});

		afterAll(async () => {
			await server.close();
		});

		describe("/:id DELETE requests", () => {
			it("Deletes a bearer token record", async () => {
				const mockQueryFn = jest
					.fn()
					.mockResolvedValue(mocks.queryResults.delete.ok);

				server.db = {
					query: mockQueryFn,
				};

				const response = await server.inject({
					method: "DELETE",
					url: `/${testId}`,
				});

				expect(mockQueryFn).toHaveBeenCalledTimes(1);
				expect(response.body).toBe("");
				expect(response.statusCode).toBe(204);
			});

			it("Returns HTTP status code 404 if bearer token record missing or already deleted", async () => {
				const mockQueryFn = jest
					.fn()
					.mockResolvedValue(mocks.queryResults.delete.error);

				server.db = {
					query: mockQueryFn,
				};

				const response = await server.inject({
					method: "DELETE",
					url: `/${testId}`,
				});

				expect(mockQueryFn).toHaveBeenCalledTimes(1);
				expect(JSON.parse(response.body)).toEqual({
					error: "Not Found",
					message:
						"Bearer token record does not exist or has already been deleted",
					statusCode: 404,
				});
				expect(response.statusCode).toBe(404);
			});

			it("Returns HTTP status code 500 if connection issue encountered", async () => {
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
				expect(JSON.parse(response.body)).toEqual({
					error: "Internal Server Error",
					message: "Failed to connect to DB",
					statusCode: 500,
				});
				expect(response.statusCode).toBe(500);
			});
		});

		describe("/:id GET requests", () => {
			it("Returns bearer token record", async () => {
				const mockQueryFn = jest
					.fn()
					.mockResolvedValue(mocks.queryResults.getRead.ok);

				server.db = {
					query: mockQueryFn,
				};

				const response = await server.inject({
					method: "GET",
					url: `/${testId}`,
				});

				expect(mockQueryFn).toHaveBeenCalledTimes(1);
				expect(JSON.parse(response.body)).toEqual(testResRecord);
				expect(response.statusCode).toBe(200);
			});

			it("Returns HTTP status code 404 if bearer token record missing", async () => {
				const mockQueryFn = jest
					.fn()
					.mockResolvedValue(mocks.queryResults.getRead.error);

				server.db = {
					query: mockQueryFn,
				};

				const response = await server.inject({
					method: "GET",
					url: `/${testId}`,
				});

				expect(mockQueryFn).toHaveBeenCalledTimes(1);
				expect(JSON.parse(response.body)).toEqual({
					error: "Not Found",
					message: "Bearer token record not found",
					statusCode: 404,
				});
				expect(response.statusCode).toBe(404);
			});

			it("Returns HTTP status code 500 if connection issue encountered", async () => {
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
				expect(JSON.parse(response.body)).toEqual({
					error: "Internal Server Error",
					message: "Failed to connect to DB",
					statusCode: 500,
				});
				expect(response.statusCode).toBe(500);
			});
		});

		describe("/ GET requests", () => {
			it("Returns bearer token record, using all query string parameters", async () => {
				const mockQueryFn = jest
					.fn()
					.mockResolvedValue(mocks.queryResults.getSearch.ok);

				server.db = {
					query: mockQueryFn,
				};

				const response = await server.inject({
					method: "GET",
					url: "/",
					query: {
						"access.name": testDbResult.name,
						"access.email": testDbResult.email,
						"access.expires": testDbResult.expires,
						"access.scopes": "documents/register.search",
						"meta.created": testDate1,
						"meta.last_updated": testDate1,
						per_page: testPage,
						page: testPage,
					},
				});

				expect(mockQueryFn).toHaveBeenCalledTimes(1);
				expect(JSON.parse(response.body)).toEqual(expSearchResult);
				expect(response.statusCode).toBe(200);
			});

			it("Returns bearer token record, using more than one `access.expires`, `access.scopes`, meta.created`, and `meta.last_updated` query string params", async () => {
				const mockQueryFn = jest
					.fn()
					.mockResolvedValue(mocks.queryResults.getSearch.ok);

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
				expect(JSON.parse(response.body)).toEqual(expSearchResult);
				expect(response.statusCode).toBe(200);
			});

			it("Returns bearer token record, using operators in the `access.expires`, meta.created`, and `meta.last_updated` query string params", async () => {
				const mockQueryFn = jest
					.fn()
					.mockResolvedValue(mocks.queryResults.getSearch.ok);

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
				expect(JSON.parse(response.body)).toEqual(expSearchResult);
				expect(response.statusCode).toBe(200);
			});

			it("Returns no bearer token records if table empty", async () => {
				const mockQueryFn = jest.fn().mockResolvedValue({});

				server.db = {
					query: mockQueryFn,
				};

				const response = await server.inject({
					method: "GET",
					url: "/",
					query: {
						"access.name": testDbResult.name,
					},
				});

				expect(mockQueryFn).toHaveBeenCalledTimes(1);
				expect(JSON.parse(response.body)).toEqual({
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

			it("Returns HTTP status code 400 if no query string params present", async () => {
				const mockQueryFn = jest
					.fn()
					.mockResolvedValue(mocks.queryResults.getSearch.error);

				server.db = {
					query: mockQueryFn,
				};

				const response = await server.inject({
					method: "GET",
					url: "/",
				});

				expect(mockQueryFn).toHaveBeenCalledTimes(0);
				expect(JSON.parse(response.body)).toEqual({
					error: "Bad Request",
					message: "No valid query string parameters provided",
					statusCode: 400,
				});
				expect(response.statusCode).toBe(400);
			});

			it("Returns HTTP status code 500 if connection issue encountered", async () => {
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
						"access.name": testDbResult.name,
					},
				});

				expect(mockQueryFn).toHaveBeenCalledTimes(1);
				expect(JSON.parse(response.body)).toEqual({
					error: "Internal Server Error",
					message: "Failed to connect to DB",
					statusCode: 500,
				});
				expect(response.statusCode).toBe(500);
			});
		});

		describe("/ POST requests", () => {
			it("Creates bearer token record", async () => {
				const mockQueryFn = jest
					.fn()
					.mockResolvedValue(mocks.queryResults.post.ok);

				server.db = {
					query: mockQueryFn,
				};

				const response = await server.inject({
					method: "POST",
					url: "/",
					headers: {
						"content-type": "application/json",
					},
					body: testReqBody,
				});

				expect(mockQueryFn).toHaveBeenCalledTimes(1);
				expect(JSON.parse(response.body)).toEqual({
					id: testId,
					access: {
						token: expect.stringMatching(/^ydhmyydh_/i),
						scopes: testReqBody.scopes,
					},
				});
				expect(response.headers).toMatchObject({
					location: expect.stringContaining(
						`/admin/access/bearer-token/${testId}`
					),
				});
				expect(response.statusCode).toBe(201);
			});

			it("Creates bearer token record without optional body properties", async () => {
				const mockQueryFn = jest
					.fn()
					.mockResolvedValue(mocks.queryResults.post.ok);

				server.db = {
					query: mockQueryFn,
				};

				const trimmedtestReqBody = {
					...testReqBody,
					email: undefined,
					expires: undefined,
				};

				const response = await server.inject({
					method: "POST",
					url: "/",
					headers: {
						"content-type": "application/json",
					},
					body: trimmedtestReqBody,
				});

				expect(mockQueryFn).toHaveBeenCalledTimes(1);
				expect(JSON.parse(response.body)).toEqual({
					id: testId,
					access: {
						token: expect.stringMatching(/^ydhmyydh_/i),
						scopes: testReqBody.scopes,
					},
				});
				expect(response.statusCode).toBe(201);
			});

			it("Returns HTTP status code 415 if content-type in `Content-Type` request header unsupported", async () => {
				const mockQueryFn = jest
					.fn()
					.mockResolvedValue(mocks.queryResults.post.ok);

				server.db = {
					query: mockQueryFn,
				};

				const response = await server.inject({
					method: "POST",
					url: "/",
					headers: {
						"content-type": "application/javascript",
					},
					body: testReqBody,
				});

				expect(mockQueryFn).toHaveBeenCalledTimes(0);
				expect(JSON.parse(response.body)).toEqual({
					error: "Unsupported Media Type",
					message: "Unsupported Media Type: application/javascript",
					statusCode: 415,
				});
				expect(response.statusCode).toBe(415);
			});

			it("Returns HTTP status code 500 if unable to create a bearer token record", async () => {
				const mockQueryFn = jest
					.fn()
					.mockResolvedValue(mocks.queryResults.post.error);

				server.db = {
					query: mockQueryFn,
				};

				const response = await server.inject({
					method: "POST",
					url: "/",
					headers: {
						"content-type": "application/json",
					},
					body: testReqBody,
				});

				expect(mockQueryFn).toHaveBeenCalledTimes(1);
				expect(JSON.parse(response.body)).toEqual({
					error: "Internal Server Error",
					message: "Failed to create bearer token record",
					statusCode: 500,
				});
				expect(response.statusCode).toBe(500);
			});

			it("Returns HTTP status code 500 if connection issue encountered", async () => {
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
					body: testReqBody,
				});

				expect(mockQueryFn).toHaveBeenCalledTimes(1);
				expect(JSON.parse(response.body)).toEqual({
					error: "Internal Server Error",
					message: "Failed to connect to DB",
					statusCode: 500,
				});
				expect(response.statusCode).toBe(500);
			});
		});
	});
});
