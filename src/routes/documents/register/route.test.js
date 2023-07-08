"use strict";

const Fastify = require("fastify");
const sensible = require("@fastify/sensible");
const route = require(".");
const getConfig = require("../../../config");
const cleanObject = require("../../../plugins/clean-object");
const convertDateParamOperator = require("../../../plugins/convert-date-param-operator");
const sharedSchemas = require("../../../plugins/shared-schemas");

const testPage = 2;

const testLastModified1 = "2018-08-01";
const testLastModified2 = "2022-11-07";

const mockRecord = {
	guid: "EXAMPLEGUID-0123456789-99999",
	fhirId: "99999",
	title: "99999 DUCK 11 July 2015 11 27.pdf",
	clinic: "CLO/BIA",
	documentType: "Clinic Letter",
	fileName: "99999 DUCK 11 July 2015 11 27.pdf",
	baseUrl: "https://notreal.somersetft.nhs.uk",
	baseSite: "/sites/MedicalRecords1",
	fullPath: "./path/path/path",
	url: "https://notreal.somersetft.nhs.uk/sites/MedicalRecords1/_layouts/15/DocIdRedir.aspx?ID=EXAMPLEGUID-0123456789-99999",
	createdDate: "2015-09-30T05:40:14.000Z",
	modifiedDate: "2020-08-10T03:51:54.000Z",
	specialty: "General Surgery",
	patientVisible: 1,
};

const expResBody = {
	data: [],
	meta: {
		pagination: {
			total: 1,
			per_page: expect.any(Number),
			current_page: expect.any(Number),
			total_pages: 1,
		},
	},
};
expResBody.data.push(mockRecord);

const expResBodyEmpty = {
	data: [],
	meta: {
		pagination: {
			total: 0,
			per_page: expect.any(Number),
			current_page: expect.any(Number),
			total_pages: 0,
		},
	},
};

const mockMsSqlQueryResults = {
	recordsets: [
		[
			{
				total: 1,
			},
		],
		[],
	],
	recordset: [
		{
			total: 1,
		},
	],
	output: {},
	rowsAffected: [1, 1],
};
mockMsSqlQueryResults.recordsets[1].push(mockRecord);

const mockPostgreSqlQueryResults = [
	{ rowCount: 1, rows: [{ total: "1" }] },
	{
		rowCount: 1,
		rows: [],
	},
];
mockPostgreSqlQueryResults[1].rows.push(mockRecord);

describe("Register route", () => {
	const connectionTests = [
		{
			testName: "MSSQL connection",
			envVariables: {
				DB_CLIENT: "mssql",
			},
			mocks: {
				queryResults: mockMsSqlQueryResults,
			},
		},
		{
			testName: "PostgreSQL connection",
			envVariables: {
				DB_CLIENT: "postgresql",
			},
			mocks: {
				queryResults: mockPostgreSqlQueryResults,
			},
		},
	];
	connectionTests.forEach((testObject) => {
		describe(`${testObject.testName}  - with request scopes`, () => {
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
					.register(cleanObject)
					.register(convertDateParamOperator)
					.decorateRequest("scopes", null)
					.addHook("preValidation", async (req) => {
						req.scopes = ["documents/register.search"];
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
				it("Returns documents from register", async () => {
					const mockQueryFn = jest
						.fn()
						.mockResolvedValue(testObject.mocks.queryResults);

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "GET",
						url: "/",
						query: {
							lastModified: testLastModified1,
							perPage: testPage,
							page: testPage,
						},
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(1);
					expect(JSON.parse(response.body)).toStrictEqual(expResBody);
					expect(response.statusCode).toBe(200);
				});

				it("Returns no documents from register if table empty", async () => {
					const mockQueryFn = jest.fn().mockResolvedValue({});

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "GET",
						url: "/",
						query: {
							lastModified: testLastModified1,
							perPage: testPage,
							page: testPage,
						},
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(1);
					expect(JSON.parse(response.body)).toStrictEqual(
						expResBodyEmpty
					);
					expect(response.statusCode).toBe(200);
				});

				it("Returns documents from register using default pagination values", async () => {
					const mockQueryFn = jest
						.fn()
						.mockResolvedValue(testObject.mocks.queryResults);

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "GET",
						url: "/",
						query: {
							lastModified: testLastModified1,
						},
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(1);
					expect(JSON.parse(response.body)).toStrictEqual(expResBody);
					expect(response.statusCode).toBe(200);
				});

				it("Returns documents from register using more than one lastModified querystring param", async () => {
					const mockQueryFn = jest
						.fn()
						.mockResolvedValue(testObject.mocks.queryResults);

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "GET",
						url: "/",
						query: {
							lastModified: [
								testLastModified1,
								testLastModified2,
							],
							perPage: testPage,
							page: testPage,
						},
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(1);
					expect(JSON.parse(response.body)).toStrictEqual(expResBody);
					expect(response.statusCode).toBe(200);
				});

				it("Returns documents from register using an operator in the lastModified querystring param", async () => {
					const mockQueryFn = jest
						.fn()
						.mockResolvedValue(testObject.mocks.queryResults);

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "GET",
						url: "/",
						query: {
							lastModified: `ge${testLastModified1}`,
						},
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(1);
					expect(JSON.parse(response.body)).toStrictEqual(expResBody);
					expect(response.statusCode).toBe(200);
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
							lastModified: testLastModified1,
							perPage: testPage,
							page: testPage,
						},
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
		});

		describe(`${testObject.testName}  - without request scopes`, () => {
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
			describe("GET requests", () => {
				it("Returns HTTP status code 401 if not in permitted access", async () => {
					const response = await server.inject({
						method: "GET",
						url: "/",
						query: {
							lastModified: testLastModified1,
							perPage: testPage,
							page: testPage,
						},
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
		});
	});
});
