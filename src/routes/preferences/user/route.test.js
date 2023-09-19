"use strict";

const Fastify = require("fastify");
const sensible = require("@fastify/sensible");
const route = require(".");
const getConfig = require("../../../config");
const cleanObject = require("../../../plugins/clean-object");
const sharedSchemas = require("../../../plugins/shared-schemas");

const testPatientId = 9999999999;

const testReqBody = {
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
};

const testPatientPreferencesDbResult = [
	{
		id: "9999999999",
		metaCreated: "2021-01-07T10:49:03.503Z",
		metaLastUpdated: "2021-01-08T10:03:50.130Z",
		preferenceValueId: 1,
		preferenceTypeId: 1,
		preferenceTypeDisplay: "SMS",
		preferenceTypePriority: 0,
	},
];

const testPatientPreferencesValuesDbResult = [
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
];

const expResBody = {
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

describe("User route", () => {
	const connectionTests = [
		{
			testName: "MSSQL connection",
			envVariables: {
				DB_CLIENT: "mssql",
			},
			mocks: {
				queryResults: {
					get: {
						error: {
							recordsets: [[], []],
						},
						ok: {
							recordsets: [
								testPatientPreferencesDbResult,
								testPatientPreferencesValuesDbResult,
							],
						},
					},
					put: {
						error: {
							rowsAffected: [0, 0],
						},
						ok: {
							rowsAffected: [1, 1],
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
					get: {
						error: [{}, {}],
						ok: [
							{
								rows: testPatientPreferencesDbResult,
							},
							{
								rows: testPatientPreferencesValuesDbResult,
							},
						],
					},
					put: { error: { rowCount: 0 }, ok: { rowCount: 1 } },
				},
			},
		},
	];
	connectionTests.forEach((testObject) => {
		describe(`${testObject.testName}  - with request scopes`, () => {
			let config;
			/** @type {Fastify.FastifyInstance} */
			let server;

			beforeAll(async () => {
				Object.assign(process.env, {
					BEARER_TOKEN_AUTH_ENABLED: true,
					...testObject.envVariables,
				});
				config = await getConfig();

				server = Fastify();
				await server
					.register(cleanObject)
					.decorateRequest("scopes", null)
					.addHook("preValidation", async (req) => {
						req.scopes = [
							"preferences/user.put",
							"preferences/user.read",
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

			describe("GET requests", () => {
				it("Returns user preferences", async () => {
					const mockQueryFn = jest
						.fn()
						.mockResolvedValue(
							testObject.mocks.queryResults.get.ok
						);

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "GET",
						url: `/${testPatientId}`,
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(1);
					expect(JSON.parse(response.body)).toStrictEqual(expResBody);
					expect(response.statusCode).toBe(200);
				});

				it("Returns HTTP status code 404 if no values returned from database", async () => {
					const mockQueryFn = jest
						.fn()
						.mockResolvedValue(
							testObject.mocks.queryResults.get.error
						);

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "GET",
						url: `/${testPatientId}`,
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(1);
					expect(JSON.parse(response.body)).toStrictEqual({
						error: "Not Found",
						message: "User not found",
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
						url: `/${testPatientId}`,
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(1);
					expect(JSON.parse(response.body)).toStrictEqual({
						error: "Internal Server Error",
						message: "Failed to connect to DB",
						statusCode: 500,
					});
					expect(response.statusCode).toBe(500);
				});
			});

			describe("PUT requests", () => {
				it("Upserts user preferences", async () => {
					const mockQueryFn = jest
						.fn()
						.mockResolvedValue(
							testObject.mocks.queryResults.put.ok
						);

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "PUT",
						url: `/${testPatientId}`,
						headers: {
							"content-type": "application/json",
						},
						body: testReqBody,
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(2);
					expect(response.body).toBe("");
					expect(response.statusCode).toBe(204);
				});

				it("Returns HTTP status code 415 if content-type in `Content-Type` request header unsupported", async () => {
					const mockQueryFn = jest
						.fn()
						.mockResolvedValue(
							testObject.mocks.queryResults.put.ok
						);

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "PUT",
						url: `/${testPatientId}`,
						headers: {
							"content-type": "application/javascript",
						},
						body: testReqBody,
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(0);
					expect(JSON.parse(response.body)).toStrictEqual({
						error: "Unsupported Media Type",
						message:
							"Unsupported Media Type: application/javascript",
						statusCode: 415,
					});
					expect(response.statusCode).toBe(415);
				});

				it("Returns HTTP status code 500 if rows were not inserted", async () => {
					const mockQueryFn = jest
						.fn()
						.mockResolvedValue(
							testObject.mocks.queryResults.put.error
						);

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "PUT",
						url: `/${testPatientId}`,
						headers: {
							"content-type": "application/json",
						},
						body: testReqBody,
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(2);
					expect(JSON.parse(response.body)).toStrictEqual({
						error: "Internal Server Error",
						message: "2 rows were not inserted",
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
						method: "PUT",
						url: `/${testPatientId}`,
						headers: {
							"content-type": "application/json",
						},
						body: testReqBody,
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(2);
					expect(JSON.parse(response.body)).toStrictEqual({
						error: "Internal Server Error",
						message: "Failed to connect to DB",
						statusCode: 500,
					});
					expect(response.statusCode).toBe(500);
				});
			});
		});

		describe(`${testObject.testName}  - without request scopes`, () => {
			let config;
			/** @type {Fastify.FastifyInstance} */
			let server;

			beforeAll(async () => {
				Object.assign(process.env, {
					BEARER_TOKEN_AUTH_ENABLED: true,
					...testObject.envVariables,
				});
				config = await getConfig();

				server = Fastify();
				await server
					.register(cleanObject)
					.register(sensible)
					.register(sharedSchemas)
					.register(route, config)
					.ready();
			});

			afterAll(async () => {
				await server.close();
			});

			describe("GET requests", () => {
				it("Returns HTTP status code 401 if not in permitted access", async () => {
					const response = await server.inject({
						method: "GET",
						url: `/${testPatientId}`,
					});

					expect(JSON.parse(response.body)).toStrictEqual({
						error: "Unauthorized",
						message:
							"You do not have permission to perform an HTTP GET request on this route",
						statusCode: 401,
					});
					expect(response.statusCode).toBe(401);
				});
			});

			describe("PUT requests", () => {
				it("Returns HTTP status code 401 if not in permitted access", async () => {
					const response = await server.inject({
						method: "PUT",
						url: `/${testPatientId}`,
						headers: {
							"content-type": "application/json",
						},
						body: testReqBody,
					});

					expect(JSON.parse(response.body)).toStrictEqual({
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
