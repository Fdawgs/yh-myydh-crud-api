"use strict";

const { randomUUID } = require("node:crypto");
const { hashSync } = require("bcryptjs");
const { firefox } = require("playwright");
const Fastify = require("fastify");
const startServer = require("./server");
const getConfig = require("./config");

const testId = randomUUID();

const testAccessToken = `ydhmyydh_${randomUUID().replace(/-/gu, "_")}`;

const testHash = hashSync(testAccessToken, 10);

const testScopes = ["preferences/options.search"];

const testDbBearerToken = {
	name: "Test Clinical System Supplier Product",
	hash: testHash,
};

// Tests "No match" error thrown in hashed-bearer-auth plugin
const testDbBearerTokenInvalid = {
	name: "Test Clinical System Supplier Product",
	hash: "brown",
};

const testDbPreferenceTypeOptions = [
	{
		preferenceTypeId: 1,
		preferenceTypeDisplay: "SMS",
	},
];

const testDbPreferenceValueOptions = [
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

const expResHeaders = {
	"cache-control": "no-store, max-age=0, must-revalidate",
	connection: "keep-alive",
	"content-length": expect.stringMatching(/\d+/u),
	"content-security-policy": "default-src 'self';frame-ancestors 'none'",
	"content-type": expect.stringMatching(/^text\/plain; charset=utf-8$/iu),
	date: expect.any(String),
	expires: "0",
	"permissions-policy": "interest-cohort=()",
	pragma: "no-cache",
	"referrer-policy": "no-referrer",
	"strict-transport-security": "max-age=31536000; includeSubDomains",
	"surrogate-control": "no-store",
	vary: "Origin, accept-encoding",
	"x-content-type-options": "nosniff",
	"x-dns-prefetch-control": "off",
	"x-download-options": "noopen",
	"x-frame-options": "SAMEORIGIN",
	"x-permitted-cross-domain-policies": "none",
	"x-ratelimit-limit": expect.stringMatching(/\d+/u),
	"x-ratelimit-remaining": expect.stringMatching(/\d+/u),
	"x-ratelimit-reset": expect.stringMatching(/\d+/u),
};

const expResHeadersHtml = {
	...expResHeaders,
	"content-security-policy":
		"default-src 'self';base-uri 'self';img-src 'self' data:;object-src 'none';child-src 'self';frame-ancestors 'none';form-action 'self';upgrade-insecure-requests;block-all-mixed-content",
	"content-type": expect.stringMatching(/^text\/html; charset=utf-8$/iu),
	"x-xss-protection": "0",
};

const expResHeadersHtmlStatic = {
	...expResHeadersHtml,
	"accept-ranges": "bytes",
	"cache-control": "public, max-age=300",
	"content-length": expect.stringMatching(/\d+/u),
	"content-security-policy":
		"default-src 'self';base-uri 'self';img-src 'self' data:;object-src 'none';child-src 'self';frame-ancestors 'none';form-action 'self';upgrade-insecure-requests;block-all-mixed-content;script-src 'self' 'unsafe-inline';style-src 'self' 'unsafe-inline'",
	etag: expect.any(String),
	"last-modified": expect.any(String),
	vary: "accept-encoding",
};
delete expResHeadersHtmlStatic.expires;
delete expResHeadersHtmlStatic.pragma;
delete expResHeadersHtmlStatic["surrogate-control"];

const expResHeadersPublicImage = {
	...expResHeaders,
	"accept-ranges": "bytes",
	"cache-control": "public, max-age=31536000, immutable",
	"content-length": expect.stringMatching(/\d+/u),
	"content-type": expect.stringMatching(/^image\//iu),
	etag: expect.any(String),
	"last-modified": expect.any(String),
	vary: "accept-encoding",
};
delete expResHeadersPublicImage.expires;
delete expResHeadersPublicImage.pragma;
delete expResHeadersPublicImage["surrogate-control"];

const expResHeadersJson = {
	...expResHeaders,
	"content-type": expect.stringMatching(
		/^application\/json; charset=utf-8$/iu
	),
};

const expResHeadersText = {
	...expResHeaders,
	"content-type": expect.stringMatching(/^text\/plain; charset=utf-8$/iu),
};

const expResHeadersXml = {
	...expResHeaders,
	"content-security-policy":
		"default-src 'self';base-uri 'self';img-src 'self' data:;object-src 'none';child-src 'self';frame-ancestors 'none';form-action 'self';upgrade-insecure-requests;block-all-mixed-content",
	"content-type": expect.stringMatching(
		/^application\/xml; charset=utf-8$/iu
	),
	"x-xss-protection": "0",
};

const expResHeaders4xxErrors = {
	...expResHeadersJson,
	vary: "accept-encoding",
};

const expResHeaders401BasicAuthErrors = {
	...expResHeaders4xxErrors,
	"www-authenticate": 'Basic charset="UTF-8"',
};

const expResHeaders404Errors = {
	...expResHeadersJson,
};
delete expResHeaders404Errors.vary;

const expResHeaders5xxErrors = {
	...expResHeadersJson,
	vary: "accept-encoding",
};

// Mock MSSQL and PostgreSQL clients to prevent DB connection attempts
jest.mock("mssql", () => ({
	connect: jest.fn().mockResolvedValue({
		close: jest.fn().mockResolvedValue(undefined),
	}),
	query: jest.fn().mockResolvedValue({ recordsets: [[{ example: "test" }]] }),
}));
jest.mock("pg", () => ({
	Pool: jest.fn().mockImplementation(() => ({
		end: jest.fn().mockResolvedValue(undefined),
		query: jest.fn().mockResolvedValue({ rows: [{ example: "test" }] }),
	})),
}));

describe("Server deployment", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	const connectionTests = [
		{
			testName: "MSSQL connection",
			envVariables: {
				DB_CLIENT: "mssql",
				DB_CONNECTION_STRING:
					"Server=localhost,1433;Database=master;User Id=sa;Password=Password!;Encrypt=true;TrustServerCertificate=true;",
			},
			mocks: {
				queryResults: {
					bearerAuth: {
						error: {
							recordsets: [[]],
						},
						ok: {
							recordsets: [
								[
									{
										...testDbBearerToken,
										scopes: JSON.stringify(testScopes),
									},
									{
										...testDbBearerTokenInvalid,
										scopes: JSON.stringify(testScopes),
									},
								],
							],
						},
					},
					preferencesOptions: {
						ok: {
							recordsets: [
								testDbPreferenceTypeOptions,
								testDbPreferenceValueOptions,
							],
						},
					},
				},
			},
		},
		{
			testName: "PostgreSQL connection",
			envVariables: {
				DB_CLIENT: "postgresql",
				DB_CONNECTION_STRING:
					"postgresql://postgres:password@localhost:5432/myydh_crud_api",
			},
			mocks: {
				queryResults: {
					bearerAuth: {
						error: {
							rows: [],
						},
						ok: {
							rows: [
								{
									...testDbBearerToken,
									scopes: testScopes,
								},
								{
									...testDbBearerTokenInvalid,
									scopes: testScopes,
								},
							],
						},
					},
					preferencesOptions: {
						ok: [
							{
								rows: testDbPreferenceTypeOptions,
							},
							{
								rows: testDbPreferenceValueOptions,
							},
						],
					},
				},
			},
		},
	];
	describe.each(connectionTests)("$testName", ({ envVariables, mocks }) => {
		beforeAll(() => {
			Object.assign(process.env, envVariables);
		});

		describe("Bearer token disabled", () => {
			let config;
			/** @type {Fastify.FastifyInstance} */
			let server;

			beforeAll(async () => {
				Object.assign(process.env, {
					BEARER_TOKEN_AUTH_ENABLED: false,
				});
				config = await getConfig();

				server = Fastify({ pluginTimeout: 0 });
				await server.register(startServer, config).ready();
			});

			afterAll(async () => {
				await server.close();
			});

			describe("/admin/healthcheck route", () => {
				it("Returns `ok`", async () => {
					const response = await server.inject({
						method: "GET",
						url: "/admin/healthcheck",
						headers: {
							accept: "text/plain",
						},
					});

					expect(response.body).toBe("ok");
					expect(response.headers).toStrictEqual(expResHeaders);
					expect(response.statusCode).toBe(200);
				});

				it("Returns HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
					const response = await server.inject({
						method: "GET",
						url: "/admin/healthcheck",
						headers: {
							accept: "application/javascript",
						},
					});

					expect(JSON.parse(response.body)).toStrictEqual({
						error: "Not Acceptable",
						message: "Not Acceptable",
						statusCode: 406,
					});
					expect(response.headers).toStrictEqual(expResHeadersJson);
					expect(response.statusCode).toBe(406);
				});
			});

			describe("Undeclared route", () => {
				it("Returns HTTP status code 404 if route not found", async () => {
					const response = await server.inject({
						method: "GET",
						url: "/invalid",
						headers: {
							accept: "application/json",
						},
					});

					expect(JSON.parse(response.body)).toStrictEqual({
						error: "Not Found",
						message: "Route GET:/invalid not found",
						statusCode: 404,
					});

					expect(response.headers).toStrictEqual(
						expResHeaders404Errors
					);
					expect(response.statusCode).toBe(404);
				});
			});

			describe("/preferences/options route", () => {
				it("Returns HTTP status code 500 if connection issue encountered", async () => {
					const mockQueryFn = jest
						.fn()
						.mockRejectedValue(
							new Error("Failed to connect to DB")
						);

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "GET",
						url: "/preferences/options",
					});

					expect(mockQueryFn).toHaveBeenCalledTimes(1);
					expect(JSON.parse(response.body)).toStrictEqual({
						error: "Internal Server Error",
						message: "Internal Server Error",
						statusCode: 500,
					});
					expect(response.statusCode).toBe(500);
				});
			});
		});

		describe("Bearer token enabled", () => {
			let config;
			/** @type {Fastify.FastifyInstance} */
			let server;

			beforeAll(async () => {
				Object.assign(process.env, {
					BEARER_TOKEN_AUTH_ENABLED: true,
				});
				config = await getConfig();

				server = Fastify({ pluginTimeout: 0 });
				await server.register(startServer, config).ready();
			});

			afterAll(async () => {
				await server.close();
			});

			describe("/admin/healthcheck route", () => {
				it("Returns `ok`", async () => {
					const response = await server.inject({
						method: "GET",
						url: "/admin/healthcheck",
						headers: {
							accept: "text/plain",
						},
					});

					expect(response.body).toBe("ok");
					expect(response.headers).toStrictEqual(expResHeaders);
					expect(response.statusCode).toBe(200);
				});

				it("Returns HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
					const response = await server.inject({
						method: "GET",
						url: "/admin/healthcheck",
						headers: {
							accept: "application/javascript",
						},
					});

					expect(JSON.parse(response.body)).toStrictEqual({
						error: "Not Acceptable",
						message: "Not Acceptable",
						statusCode: 406,
					});
					expect(response.headers).toStrictEqual(expResHeadersJson);
					expect(response.statusCode).toBe(406);
				});
			});

			describe("Undeclared route", () => {
				it("Returns HTTP status code 404 if route not found", async () => {
					const response = await server.inject({
						method: "GET",
						url: "/invalid",
						headers: {
							accept: "application/json",
						},
					});

					expect(JSON.parse(response.body)).toStrictEqual({
						error: "Not Found",
						message: "Route GET:/invalid not found",
						statusCode: 404,
					});

					expect(response.headers).toStrictEqual(
						expResHeaders404Errors
					);
					expect(response.statusCode).toBe(404);
				});
			});

			describe("/preferences/options route", () => {
				it("Returns HTTP status code 401 if bearer token invalid", async () => {
					const mockQueryFn = jest
						.fn()
						.mockResolvedValue(mocks.queryResults.bearerAuth.error);

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "GET",
						url: "/preferences/options",
						headers: {
							accept: "application/json",
							authorization: "Bearer invalid",
						},
					});

					expect(JSON.parse(response.body)).toStrictEqual({
						error: "Unauthorized",
						message: "invalid authorization header",
						statusCode: 401,
					});
					expect(response.headers).toStrictEqual({
						...expResHeadersJson,
						vary: "accept-encoding",
					});
					expect(response.statusCode).toBe(401);
				});

				it("Returns HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
					const mockQueryFn = jest
						.fn()
						.mockResolvedValue(mocks.queryResults.bearerAuth.ok);

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "GET",
						url: "/preferences/options",
						headers: {
							accept: "application/javascript",
							authorization: `Bearer ${testAccessToken}`,
						},
					});

					expect(JSON.parse(response.body)).toStrictEqual({
						error: "Not Acceptable",
						message: "Not Acceptable",
						statusCode: 406,
					});
					expect(response.headers).toStrictEqual(
						expResHeaders4xxErrors
					);
					expect(response.statusCode).toBe(406);
				});

				it("Returns response if media type in `Accept` request header is `application/json`", async () => {
					const mockQueryFn = jest
						.fn()
						.mockResolvedValueOnce(mocks.queryResults.bearerAuth.ok)
						.mockResolvedValueOnce(
							mocks.queryResults.preferencesOptions.ok
						);

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "GET",
						url: "/preferences/options",
						headers: {
							accept: "application/json",
							authorization: `Bearer ${testAccessToken}`,
						},
					});

					expect(response.headers).toStrictEqual(expResHeadersJson);
					expect(response.statusCode).toBe(200);
				});

				it("Returns an XML response if media type in `Accept` request header is `application/xml`", async () => {
					const mockQueryFn = jest
						.fn()
						.mockResolvedValueOnce(mocks.queryResults.bearerAuth.ok)
						.mockResolvedValueOnce(
							mocks.queryResults.preferencesOptions.ok
						);

					server.db = {
						query: mockQueryFn,
					};

					const response = await server.inject({
						method: "GET",
						url: "/preferences/options",
						headers: {
							accept: "application/xml",
							authorization: `Bearer ${testAccessToken}`,
						},
					});

					expect(response.body).toMatch(
						/^<\?xml version="1.0" encoding="UTF-8"\?>/u
					);
					expect(response.headers).toStrictEqual(expResHeadersXml);
					expect(response.statusCode).toBe(200);
				});
			});
		});

		describe("Basic auth", () => {
			let config;
			/** @type {Fastify.FastifyInstance} */
			let server;

			beforeAll(async () => {
				Object.assign(process.env, {
					ADMIN_USERNAME: "admin",
					ADMIN_PASSWORD: "password",
				});
				config = await getConfig();

				server = Fastify({ pluginTimeout: 0 });
				await server.register(startServer, config).ready();
			});

			afterAll(async () => {
				await server.close();
			});

			describe("/admin/access/bearer-token/:id route", () => {
				/** @todo use `it.concurrent.each()` once it is no longer experimental */
				it.each([
					{
						testName: "basic auth username invalid",
						authString: "invalidadmin:password",
					},
					{
						testName: "basic auth password invalid",
						authString: "admin:invalidpassword",
					},
					{
						testName: "basic auth username and password invalid",
						authString: "invalidadmin:invalidpassword",
					},
				])(
					"Returns HTTP status code 401 if $testName",
					async ({ authString }) => {
						const response = await server.inject({
							method: "GET",
							url: `/admin/access/bearer-token/${testId}`,
							headers: {
								authorization: `Basic ${Buffer.from(
									`${authString}`
								).toString("base64")}`,
							},
						});

						expect(JSON.parse(response.body)).toStrictEqual({
							error: "Unauthorized",
							message: "Unauthorized",
							statusCode: 401,
						});
						expect(response.headers).toStrictEqual(
							expResHeaders401BasicAuthErrors
						);
						expect(response.statusCode).toBe(401);
					}
				);

				it("Returns response if basic auth username and password valid", async () => {
					const response = await server.inject({
						method: "GET",
						url: `/admin/access/bearer-token/${testId}`,
						headers: {
							accept: "application/json",
							authorization: `Basic ${Buffer.from(
								"admin:password"
							).toString("base64")}`,
						},
					});

					expect(response.headers).toStrictEqual(expResHeadersJson);
					expect(response.statusCode).not.toBe(401);
					expect(response.statusCode).not.toBe(406);
				});

				it("Returns HTTP status code 406 if basic auth username and password valid, and media type in `Accept` request header is unsupported", async () => {
					const response = await server.inject({
						method: "GET",
						url: "/admin/access/bearer-token",
						headers: {
							accept: "application/javascript",
							authorization: `Basic ${Buffer.from(
								"admin:password"
							).toString("base64")}`,
						},
					});

					expect(JSON.parse(response.body)).toStrictEqual({
						error: "Not Acceptable",
						message: "Not Acceptable",
						statusCode: 406,
					});
					expect(response.headers).toStrictEqual(
						expResHeaders4xxErrors
					);
					expect(response.statusCode).toBe(406);
				});
			});
		});

		describe("CORS", () => {
			let config;
			/** @type {{[key: string]: any}} */
			let currentEnv;
			/** @type {Fastify.FastifyInstance} */
			let server;

			beforeAll(() => {
				Object.assign(process.env, {
					CORS_ALLOWED_HEADERS:
						"Accept, Accept-Encoding, Accept-Language, Authorization, Content-Type, Origin, X-Forwarded-For, X-Requested-With",
					CORS_MAX_AGE: 7200,
				});
				currentEnv = { ...process.env };
			});

			const corsTests = [
				{
					testName: "CORS disabled",
					corsEnvVariables: {
						CORS_ORIGIN: "",
					},
					request: {
						headers: {
							origin: "",
						},
					},
					expected: {
						response: {
							headers: {
								json: expResHeadersJson,
								text: expResHeadersText,
							},
						},
					},
				},
				{
					testName: "CORS enabled",
					corsEnvVariables: {
						CORS_ORIGIN: true,
					},
					request: {
						headers: {
							origin: "https://notreal.somersetft.nhs.uk",
						},
					},
					expected: {
						response: {
							headers: {
								json: {
									...expResHeadersJson,
									"access-control-allow-origin":
										"https://notreal.somersetft.nhs.uk",
								},
								text: {
									...expResHeadersText,
									"access-control-allow-origin":
										"https://notreal.somersetft.nhs.uk",
								},
							},
						},
					},
				},
				{
					testName: "CORS enabled and set to string",
					corsEnvVariables: {
						CORS_ORIGIN: "https://notreal.somersetft.nhs.uk",
					},
					request: {
						headers: {
							origin: "https://notreal.somersetft.nhs.uk",
						},
					},
					expected: {
						response: {
							headers: {
								json: {
									...expResHeadersJson,
									"access-control-allow-origin":
										"https://notreal.somersetft.nhs.uk",
								},
								text: {
									...expResHeadersText,
									"access-control-allow-origin":
										"https://notreal.somersetft.nhs.uk",
								},
							},
						},
					},
				},
				{
					testName: "CORS enabled and set to array of strings",
					corsEnvVariables: {
						CORS_ORIGIN: [
							"https://notreal.somersetft.nhs.uk",
							"https://notreal.sft.nhs.uk",
						],
					},
					request: {
						headers: {
							origin: "https://notreal.somersetft.nhs.uk",
						},
					},
					expected: {
						response: {
							headers: {
								json: {
									...expResHeadersJson,
									"access-control-allow-origin":
										"https://notreal.somersetft.nhs.uk",
								},
								text: {
									...expResHeadersText,
									"access-control-allow-origin":
										"https://notreal.somersetft.nhs.uk",
								},
							},
						},
					},
				},
				{
					testName: "CORS enabled and set to wildcard",
					corsEnvVariables: {
						CORS_ORIGIN: "*",
					},
					request: {
						headers: {
							origin: "https://notreal.somersetft.nhs.uk",
						},
					},
					expected: {
						response: {
							headers: {
								json: {
									...expResHeadersJson,
									"access-control-allow-origin": "*",
								},
								text: {
									...expResHeadersText,
									"access-control-allow-origin": "*",
								},
							},
						},
					},
				},
			];
			describe.each(corsTests)(
				"$testName",
				({ corsEnvVariables, expected, request }) => {
					beforeAll(async () => {
						Object.assign(process.env, corsEnvVariables);
						config = await getConfig();

						server = Fastify({ pluginTimeout: 0 });
						await server.register(startServer, config).ready();
					});

					afterAll(async () => {
						// Reset the process.env to default after each test
						Object.assign(process.env, currentEnv);

						await server.close();
					});

					describe("/admin/healthcheck route", () => {
						it("Returns `ok`", async () => {
							const response = await server.inject({
								method: "GET",
								url: "/admin/healthcheck",
								headers: {
									accept: "text/plain",
									origin: request.headers.origin,
								},
							});

							expect(response.body).toBe("ok");
							expect(response.headers).toStrictEqual(
								expected.response.headers.text
							);
							expect(response.statusCode).toBe(200);
						});

						// Only applicable if CORS enabled
						if (corsEnvVariables.CORS_ORIGIN) {
							it("Returns response to CORS preflight request", async () => {
								const expResHeadersCors = {
									...expResHeaders,
									"access-control-allow-headers":
										process.env.CORS_ALLOWED_HEADERS,
									"access-control-allow-methods": "GET, HEAD",
									"access-control-allow-origin":
										corsEnvVariables.CORS_ORIGIN === "*"
											? "*"
											: request.headers.origin,
									"access-control-max-age": String(
										process.env.CORS_MAX_AGE
									),
									vary: "Origin",
								};
								delete expResHeadersCors["content-type"];

								const response = await server.inject({
									method: "OPTIONS",
									url: "/admin/healthcheck",
									headers: {
										"access-control-request-method": "GET",
										origin: request.headers.origin,
									},
								});

								expect(response.body).toBe("");
								expect(response.headers).toStrictEqual(
									expResHeadersCors
								);
								expect(response.statusCode).toBe(204);
							});
						}

						it("Returns HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
							const response = await server.inject({
								method: "GET",
								url: "/admin/healthcheck",
								headers: {
									accept: "application/javascript",
									origin: request.headers.origin,
								},
							});

							expect(JSON.parse(response.body)).toStrictEqual({
								error: "Not Acceptable",
								message: "Not Acceptable",
								statusCode: 406,
							});
							expect(response.headers).toStrictEqual(
								expected.response.headers.json
							);
							expect(response.statusCode).toBe(406);
						});
					});

					describe("Undeclared route", () => {
						it("Returns HTTP status code 404 if route not found", async () => {
							const response = await server.inject({
								method: "GET",
								url: "/invalid",
								headers: {
									accept: "application/json",
									origin: request.headers.origin,
								},
							});

							expect(JSON.parse(response.body)).toStrictEqual({
								error: "Not Found",
								message: "Route GET:/invalid not found",
								statusCode: 404,
							});
							expect(response.headers).toStrictEqual(
								expResHeaders404Errors
							);
							expect(response.statusCode).toBe(404);
						});
					});
				}
			);
		});
	});

	describe("API documentation", () => {
		let config;
		/** @type {Fastify.FastifyInstance} */
		let server;

		beforeAll(async () => {
			Object.assign(process.env, {
				HOST: "localhost",
				PORT: "3000",
				HTTPS_PFX_PASSPHRASE: "",
				HTTPS_PFX_FILE_PATH: "",
				HTTPS_SSL_CERT_PATH: "",
				HTTPS_SSL_KEY_PATH: "",
				HTTPS_HTTP2_ENABLED: "",
				DB_CLIENT: "postgresql",
				DB_CONNECTION_STRING:
					"postgresql://postgres:password@localhost:5432/myydh_crud_api",
			});
			config = await getConfig();

			// Turn off logging for test runs
			config.fastifyInit.logger = undefined;
			// @ts-ignore
			server = Fastify({ ...config.fastifyInit, pluginTimeout: 0 });
			await server.register(startServer, config).listen(config.fastify);
		});

		afterAll(async () => {
			await server.close();
		});

		describe("Content", () => {
			describe("/docs route", () => {
				it("Returns HTML", async () => {
					const response = await server.inject({
						method: "GET",
						url: "/docs",
						headers: {
							accept: "text/html",
						},
					});

					expect(response.body).toMatchSnapshot();
					expect(response.headers).toStrictEqual(
						expResHeadersHtmlStatic
					);
					expect(response.statusCode).toBe(200);
				});
			});

			describe("/public route", () => {
				it("Returns image", async () => {
					const response = await server.inject({
						method: "GET",
						url: "/public/images/icons/favicon.ico",
						headers: {
							accept: "*/*",
						},
					});

					expect(response.headers).toStrictEqual(
						expResHeadersPublicImage
					);
					expect(response.statusCode).toBe(200);
				});
			});
		});

		describe("Frontend", () => {
			it("Renders docs page without error components", async () => {
				const browserType = await firefox.launch();
				const page = await browserType.newPage();

				await page.goto("http://localhost:3000/docs");
				await expect(page.title()).resolves.toBe(
					"MyYDH CRUD API | Documentation"
				);
				/**
				 * Checks redoc has not rendered an error component.
				 * @see {@link https://github.com/Redocly/redoc/blob/main/src/components/ErrorBoundary.tsx | Redoc ErrorBoundary component}
				 */
				const heading = page.locator("h1 >> nth=0");
				await heading.waitFor();

				await expect(heading.textContent()).resolves.not.toMatch(
					/something\s*went\s*wrong/iu
				);

				await page.close();
				await browserType.close();
			});
		});
	});

	describe("Error handling", () => {
		let config;
		/** @type {Fastify.FastifyInstance} */
		let server;

		beforeAll(async () => {
			config = await getConfig();

			server = Fastify({ pluginTimeout: 0 });
			await server.register(startServer, config);

			server
				.get("/error", async () => {
					throw new Error("test");
				})
				.get("/error/503", async () => {
					const error = new Error("test");
					error.statusCode = 503;
					throw error;
				});

			await server.ready();
		});

		afterAll(async () => {
			await server.close();
		});

		describe("/error route", () => {
			it("Returns HTTP status code 500", async () => {
				const response = await server.inject({
					method: "GET",
					url: "/error",
					headers: {
						accept: "*/*",
					},
				});

				expect(JSON.parse(response.body)).toStrictEqual({
					error: "Internal Server Error",
					message: "Internal Server Error",
					statusCode: 500,
				});
				expect(response.headers).toStrictEqual(expResHeaders5xxErrors);
				expect(response.statusCode).toBe(500);
			});

			it("Returns HTTP status code 503 and does not override error message", async () => {
				const response = await server.inject({
					method: "GET",
					url: "/error/503",
					headers: {
						accept: "*/*",
					},
				});

				expect(JSON.parse(response.body)).toStrictEqual({
					error: "Service Unavailable",
					message: "test",
					statusCode: 503,
				});
				expect(response.headers).toStrictEqual(expResHeaders5xxErrors);
				expect(response.statusCode).toBe(503);
			});
		});
	});
});
