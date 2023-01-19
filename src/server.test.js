const { chromium, firefox } = require("playwright");
const bcrypt = require("bcryptjs");
const { randomUUID } = require("crypto");
const Fastify = require("fastify");
const isHtml = require("is-html");
const startServer = require("./server");
const getConfig = require("./config");

const testId = randomUUID();

const testAccessToken = `ydhmyydh_${randomUUID().replace(/-/g, "_")}`;

const testHash = bcrypt.hashSync(testAccessToken, 10);

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
	"content-length": expect.stringMatching(/\d+/),
	"content-security-policy": "default-src 'self';frame-ancestors 'none'",
	"content-type": expect.stringContaining("text/plain"),
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
	"x-ratelimit-limit": expect.any(Number),
	"x-ratelimit-remaining": expect.any(Number),
	"x-ratelimit-reset": expect.any(Number),
};

const expResHeadersHtml = {
	...expResHeaders,
	"content-security-policy":
		"default-src 'self';base-uri 'self';img-src 'self' data:;object-src 'none';child-src 'self';frame-ancestors 'none';form-action 'self';upgrade-insecure-requests;block-all-mixed-content",
	"content-type": expect.stringContaining("text/html"),
	"x-xss-protection": "0",
};

const expResHeadersHtmlStatic = {
	...expResHeadersHtml,
	"accept-ranges": "bytes",
	"cache-control": "private, max-age=180",
	"content-length": expect.any(Number), // @fastify/static plugin returns content-length as number
	"content-security-policy":
		"default-src 'self';base-uri 'self';img-src 'self' data:;object-src 'none';child-src 'self';frame-ancestors 'none';form-action 'self';upgrade-insecure-requests;block-all-mixed-content;script-src 'self' 'unsafe-inline';style-src 'self' 'unsafe-inline'",
	etag: expect.any(String),
	expires: undefined,
	"last-modified": expect.any(String),
	pragma: undefined,
	"surrogate-control": undefined,
	vary: "accept-encoding",
};

const expeResHeadersPublicImage = {
	...expResHeaders,
	"accept-ranges": "bytes",
	"cache-control": "public, max-age=31536000, immutable",
	"content-length": expect.any(Number), // @fastify/static plugin returns content-length as number
	"content-type": expect.stringContaining("image/"),
	etag: expect.any(String),
	expires: undefined,
	"last-modified": expect.any(String),
	pragma: undefined,
	"surrogate-control": undefined,
	vary: "accept-encoding",
};

const expResHeadersJson = {
	...expResHeaders,
	"content-type": expect.stringContaining("application/json"),
};

const expResHeadersText = {
	...expResHeaders,
	"content-type": expect.stringContaining("text/plain"),
};

const expResHeadersXml = {
	...expResHeaders,
	"content-security-policy":
		"default-src 'self';base-uri 'self';img-src 'self' data:;object-src 'none';child-src 'self';frame-ancestors 'none';form-action 'self';upgrade-insecure-requests;block-all-mixed-content",
	"content-type": expect.stringContaining("application/xml"),
	"x-xss-protection": "0",
};

const expResHeaders4xxErrors = {
	...expResHeadersJson,
	vary: "accept-encoding",
};

const expResHeaders404Errors = {
	...expResHeadersJson,
	vary: undefined,
};

describe("Server Deployment", () => {
	const connectionTests = [
		{
			testName: "MSSQL Connection",
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
			testName: "PostgreSQL Connection",
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
	connectionTests.forEach((testObject) => {
		describe(`${testObject.testName}`, () => {
			beforeAll(() => {
				Object.assign(process.env, testObject.envVariables);
			});

			describe("Bearer Token Disabled", () => {
				let config;
				let server;

				beforeAll(async () => {
					Object.assign(process.env, {
						BEARER_TOKEN_AUTH_ENABLED: false,
					});
					config = await getConfig();

					server = Fastify();
					await server.register(startServer, config).ready();
				});

				afterAll(async () => {
					await server.close();
				});

				describe("/admin/healthcheck Route", () => {
					test("Should return `ok`", async () => {
						const response = await server.inject({
							method: "GET",
							url: "/admin/healthcheck",
							headers: {
								accept: "text/plain",
							},
						});

						expect(response.payload).toBe("ok");
						expect(response.headers).toEqual(expResHeaders);
						expect(response.statusCode).toBe(200);
					});

					test("Should return HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
						const response = await server.inject({
							method: "GET",
							url: "/admin/healthcheck",
							headers: {
								accept: "application/javascript",
							},
						});

						expect(JSON.parse(response.payload)).toEqual({
							error: "Not Acceptable",
							message: "Not Acceptable",
							statusCode: 406,
						});
						expect(response.headers).toEqual(expResHeadersJson);
						expect(response.statusCode).toBe(406);
					});
				});

				describe("Undeclared Route", () => {
					test("Should return HTTP status code 404 if route not found", async () => {
						const response = await server.inject({
							method: "GET",
							url: "/invalid",
							headers: {
								accept: "application/json",
							},
						});

						expect(JSON.parse(response.payload)).toEqual({
							error: "Not Found",
							message: "Route GET:/invalid not found",
							statusCode: 404,
						});

						expect(response.headers).toEqual(
							expResHeaders404Errors
						);
						expect(response.statusCode).toBe(404);
					});
				});

				describe("/preferences/options Route", () => {
					test("Should return HTTP status code 500 if connection issue encountered", async () => {
						const mockQueryFn = jest
							.fn()
							.mockRejectedValue(
								Error("Failed to connect to DB")
							);

						server.db = {
							query: mockQueryFn,
						};

						const response = await server.inject({
							method: "GET",
							url: "/preferences/options",
						});

						expect(mockQueryFn).toHaveBeenCalledTimes(1);
						expect(JSON.parse(response.payload)).toEqual({
							error: "Internal Server Error",
							message: "Internal Server Error",
							statusCode: 500,
						});
						expect(response.statusCode).toBe(500);
					});
				});
			});

			describe("Bearer Token Enabled", () => {
				let config;
				let server;

				beforeAll(async () => {
					Object.assign(process.env, {
						BEARER_TOKEN_AUTH_ENABLED: true,
					});
					config = await getConfig();

					server = Fastify();
					await server.register(startServer, config).ready();
				});

				afterAll(async () => {
					await server.close();
				});

				describe("/admin/healthcheck Route", () => {
					test("Should return `ok`", async () => {
						const response = await server.inject({
							method: "GET",
							url: "/admin/healthcheck",
							headers: {
								accept: "text/plain",
							},
						});

						expect(response.payload).toBe("ok");
						expect(response.headers).toEqual(expResHeaders);
						expect(response.statusCode).toBe(200);
					});

					test("Should return HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
						const response = await server.inject({
							method: "GET",
							url: "/admin/healthcheck",
							headers: {
								accept: "application/javascript",
							},
						});

						expect(JSON.parse(response.payload)).toEqual({
							error: "Not Acceptable",
							message: "Not Acceptable",
							statusCode: 406,
						});
						expect(response.headers).toEqual(expResHeadersJson);
						expect(response.statusCode).toBe(406);
					});
				});

				describe("Undeclared Route", () => {
					test("Should return HTTP status code 404 if route not found", async () => {
						const response = await server.inject({
							method: "GET",
							url: "/invalid",
							headers: {
								accept: "application/json",
							},
						});

						expect(JSON.parse(response.payload)).toEqual({
							error: "Not Found",
							message: "Route GET:/invalid not found",
							statusCode: 404,
						});

						expect(response.headers).toEqual(
							expResHeaders404Errors
						);
						expect(response.statusCode).toBe(404);
					});
				});

				describe("/preferences/options Route", () => {
					test("Should return HTTP status code 401 if bearer token invalid", async () => {
						const mockQueryFn = jest
							.fn()
							.mockResolvedValue(
								testObject.mocks.queryResults.bearerAuth.error
							);

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

						expect(JSON.parse(response.payload)).toEqual({
							error: "Unauthorized",
							message: "invalid authorization header",
							statusCode: 401,
						});
						expect(response.headers).toEqual({
							...expResHeadersJson,
							vary: "accept-encoding",
						});
						expect(response.statusCode).toBe(401);
					});

					test("Should return HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
						const mockQueryFn = jest
							.fn()
							.mockResolvedValue(
								testObject.mocks.queryResults.bearerAuth.ok
							);

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

						expect(JSON.parse(response.payload)).toEqual({
							error: "Not Acceptable",
							message: "Not Acceptable",
							statusCode: 406,
						});
						expect(response.headers).toEqual(
							expResHeaders4xxErrors
						);
						expect(response.statusCode).toBe(406);
					});

					test("Should return response if media type in `Accept` request header is `application/json`", async () => {
						const mockQueryFn = jest
							.fn()
							.mockResolvedValueOnce(
								testObject.mocks.queryResults.bearerAuth.ok
							)
							.mockResolvedValueOnce(
								testObject.mocks.queryResults.preferencesOptions
									.ok
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

						expect(response.headers).toEqual(expResHeadersJson);
						expect(response.statusCode).toBe(200);
					});

					test("Should return response if media type in `Accept` request header is `application/xml`", async () => {
						const mockQueryFn = jest
							.fn()
							.mockResolvedValueOnce(
								testObject.mocks.queryResults.bearerAuth.ok
							)
							.mockResolvedValueOnce(
								testObject.mocks.queryResults.preferencesOptions
									.ok
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

						expect(response.payload).toEqual(
							expect.stringContaining(
								'<?xml version="1.0" encoding="UTF-8"?>'
							)
						);
						expect(response.headers).toEqual(expResHeadersXml);
						expect(response.statusCode).toBe(200);
					});
				});
			});

			describe("Basic Auth", () => {
				let config;
				let server;

				beforeAll(async () => {
					Object.assign(process.env, {
						ADMIN_USERNAME: "admin",
						ADMIN_PASSWORD: "password",
					});
					config = await getConfig();

					server = Fastify();
					await server.register(startServer, config).ready();
				});

				afterAll(async () => {
					await server.close();
				});

				describe("/admin/access/bearer-token/:id Route", () => {
					const basicAuthTests = [
						{
							testName: "basic auth username invalid",
							authString: "invalidadmin:password",
						},
						{
							testName: "basic auth password invalid",
							authString: "admin:invalidpassword",
						},
						{
							testName:
								"basic auth username and password invalid",
							authString: "invalidadmin:invalidpassword",
						},
					];

					basicAuthTests.forEach((basicAuthTestObject) => {
						test(`Should return HTTP status code 401 if ${basicAuthTestObject.testName}`, async () => {
							const response = await server.inject({
								method: "GET",
								url: `/admin/access/bearer-token/${testId}`,
								headers: {
									authorization: `Basic ${Buffer.from(
										`${basicAuthTestObject.authString}`
									).toString("base64")}`,
								},
							});

							expect(JSON.parse(response.payload)).toEqual({
								error: "Unauthorized",
								message: "Unauthorized",
								statusCode: 401,
							});
							expect(response.headers).toEqual({
								...expResHeadersJson,
								vary: "accept-encoding",
							});
							expect(response.statusCode).toBe(401);
						});
					});

					test("Should return response if basic auth username and password valid", async () => {
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

						expect(response.headers).toEqual(expResHeadersJson);
						expect(response.statusCode).not.toBe(401);
						expect(response.statusCode).not.toBe(406);
					});

					test("Should return HTTP status code 406 if basic auth username and password valid, and media type in `Accept` request header is unsupported", async () => {
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

						expect(JSON.parse(response.payload)).toEqual({
							error: "Not Acceptable",
							message: "Not Acceptable",
							statusCode: 406,
						});
						expect(response.headers).toEqual(
							expResHeaders4xxErrors
						);
						expect(response.statusCode).toBe(406);
					});
				});
			});

			describe("CORS", () => {
				let config;
				let server;
				let currentEnv;

				beforeAll(() => {
					Object.assign(process.env, {
						CORS_ALLOWED_HEADERS:
							"Accept, Accept-Encoding, Accept-Language, Authorization, Content-Type, Origin, X-Forwarded-For, X-Requested-With",
						CORS_MAX_AGE: 7200,
					});
					currentEnv = { ...process.env };
				});

				afterEach(async () => {
					// Reset the process.env to default after each test
					Object.assign(process.env, currentEnv);

					await server.close();
				});

				const corsTests = [
					{
						testName: "CORS Disabled",
						envVariables: {
							CORS_ORIGIN: "",
						},
						request: {
							headers: {
								origin: null,
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
						testName: "CORS Enabled",
						envVariables: {
							CORS_ORIGIN: true,
						},
						request: {
							headers: {
								origin: "https://notreal.ydh.nhs.uk",
							},
						},
						expected: {
							response: {
								headers: {
									json: {
										...expResHeadersJson,
										"access-control-allow-origin":
											"https://notreal.ydh.nhs.uk",
									},
									text: {
										...expResHeadersText,
										"access-control-allow-origin":
											"https://notreal.ydh.nhs.uk",
									},
								},
							},
						},
					},
					{
						testName: "Cors Enabled and Set to String",
						envVariables: {
							CORS_ORIGIN: "https://notreal.ydh.nhs.uk",
						},
						request: {
							headers: {
								origin: "https://notreal.ydh.nhs.uk",
							},
						},
						expected: {
							response: {
								headers: {
									json: {
										...expResHeadersJson,
										"access-control-allow-origin":
											"https://notreal.ydh.nhs.uk",
									},
									text: {
										...expResHeadersText,
										"access-control-allow-origin":
											"https://notreal.ydh.nhs.uk",
									},
								},
							},
						},
					},
					{
						testName: "Cors Enabled and Set to Array of Strings",
						envVariables: {
							CORS_ORIGIN: [
								"https://notreal.ydh.nhs.uk",
								"https://notreal.sft.nhs.uk",
							],
						},
						request: {
							headers: {
								origin: "https://notreal.ydh.nhs.uk",
							},
						},
						expected: {
							response: {
								headers: {
									json: {
										...expResHeadersJson,
										"access-control-allow-origin":
											"https://notreal.ydh.nhs.uk",
									},
									text: {
										...expResHeadersText,
										"access-control-allow-origin":
											"https://notreal.ydh.nhs.uk",
									},
								},
							},
						},
					},
					{
						testName: "Cors Enabled and Set to Wildcard",
						envVariables: {
							CORS_ORIGIN: "*",
						},
						request: {
							headers: {
								origin: "https://notreal.ydh.nhs.uk",
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
				corsTests.forEach((corsTestObject) => {
					describe(`${corsTestObject.testName}`, () => {
						beforeAll(async () => {
							Object.assign(
								process.env,
								corsTestObject.envVariables
							);
							config = await getConfig();
						});

						beforeEach(async () => {
							server = Fastify();
							await server.register(startServer, config).ready();
						});

						describe("/admin/healthcheck Route", () => {
							test("Should return `ok`", async () => {
								const response = await server.inject({
									method: "GET",
									url: "/admin/healthcheck",
									headers: {
										accept: "text/plain",
										origin: corsTestObject.request.headers
											.origin,
									},
								});

								expect(response.payload).toBe("ok");
								expect(response.headers).toEqual(
									corsTestObject.expected.response.headers
										.text
								);
								expect(response.statusCode).toBe(200);
							});

							// Only applicable if CORS enabled
							if (testObject.envVariables.CORS_ORIGIN) {
								test("Should return response to CORS preflight request", async () => {
									const response = await server.inject({
										method: "OPTIONS",
										url: "/admin/healthcheck",
										headers: {
											"access-control-request-method":
												"GET",
											origin: testObject.request.headers
												.origin,
										},
									});

									expect(response.payload).toBe("");
									expect(response.headers).toEqual({
										...expResHeaders,
										"access-control-allow-headers":
											process.env.CORS_ALLOWED_HEADERS,
										"access-control-allow-methods":
											"GET, HEAD",
										"access-control-allow-origin":
											testObject.envVariables
												.CORS_ORIGIN === "*"
												? "*"
												: testObject.request.headers
														.origin,
										"access-control-max-age": String(
											process.env.CORS_MAX_AGE
										),
										"content-type": undefined,
										vary: "Origin",
									});
									expect(response.statusCode).toBe(204);
								});
							}

							test("Should return HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
								const response = await server.inject({
									method: "GET",
									url: "/admin/healthcheck",
									headers: {
										accept: "application/javascript",
										origin: corsTestObject.request.headers
											.origin,
									},
								});

								expect(JSON.parse(response.payload)).toEqual({
									error: "Not Acceptable",
									message: "Not Acceptable",
									statusCode: 406,
								});
								expect(response.headers).toEqual(
									corsTestObject.expected.response.headers
										.json
								);
								expect(response.statusCode).toBe(406);
							});
						});

						describe("Undeclared Route", () => {
							test("Should return HTTP status code 404 if route not found", async () => {
								const response = await server.inject({
									method: "GET",
									url: "/invalid",
									headers: {
										accept: "application/json",
										origin: corsTestObject.request.headers
											.origin,
									},
								});

								expect(JSON.parse(response.payload)).toEqual({
									error: "Not Found",
									message: "Route GET:/invalid not found",
									statusCode: 404,
								});
								expect(response.headers).toEqual(
									expResHeaders404Errors
								);
								expect(response.statusCode).toBe(404);
							});
						});
					});
				});
			});
		});
	});

	describe("API Documentation", () => {
		let config;
		let server;

		let browser;
		let page;

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
			server = Fastify(config.fastifyInit);
			await server.register(startServer, config).listen(config.fastify);
		});

		afterAll(async () => {
			await server.close();
		});

		describe("Content", () => {
			describe("/docs Route", () => {
				test("Should return HTML", async () => {
					const response = await server.inject({
						method: "GET",
						url: "/docs",
						headers: {
							accept: "text/html",
						},
					});

					expect(isHtml(response.payload)).toBe(true);
					expect(response.headers).toEqual(expResHeadersHtmlStatic);
					expect(response.statusCode).toBe(200);
				});
			});

			describe("/public Route", () => {
				test("Should return image", async () => {
					const response = await server.inject({
						method: "GET",
						url: "/public/images/icons/favicon.ico",
						headers: {
							accept: "*/*",
						},
					});

					expect(response.headers).toEqual(expeResHeadersPublicImage);
					expect(response.statusCode).toBe(200);
				});
			});
		});

		describe("Frontend", () => {
			afterEach(async () => {
				await page.close();
				await browser.close();
			});

			// Webkit not tested as it is flakey in context of Playwright
			const browsers = [chromium, firefox];
			browsers.forEach((browserType) => {
				test(`Should render docs page without error components - ${browserType.name()}`, async () => {
					browser = await browserType.launch();
					page = await browser.newPage();

					await page.goto("http://localhost:3000/docs");
					expect(await page.title()).toBe(
						"MyYDH CRUD API | Documentation"
					);
					/**
					 * Checks redoc has not rendered an error component:
					 * https://github.com/Redocly/redoc/blob/main/src/components/ErrorBoundary.tsx
					 */
					const heading = page.locator("h1 >> nth=0");
					await heading.waitFor();

					expect(await heading.textContent()).not.toEqual(
						expect.stringMatching(/something\s*went\s*wrong/i)
					);
				});
			});
		});
	});
});
