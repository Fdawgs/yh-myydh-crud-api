/* eslint-disable no-console */
const { chromium, firefox } = require("playwright");
const crypto = require("crypto");
const Fastify = require("fastify");
const isHtml = require("is-html");
const startServer = require("./server");
const getConfig = require("./config");

const testId = "b8e7265c-4733-44be-9238-7d7b8718fb88";

const testKey = `ydhmyydh_${crypto.randomUUID().replace(/-/g, "_")}`;

const testSalt = crypto.randomBytes(16).toString("hex");
const testHash = crypto
	.pbkdf2Sync(testKey, testSalt, 1000, 64, "sha512")
	.toString("hex");

const testScopes = ["preferences/options.search"];

const testResult = {
	name: "MyYDH Frontend SPA",
	salt: testSalt,
	hash: testHash,
};

const expResHeaders = {
	"cache-control": "no-store, max-age=0, must-revalidate",
	connection: "keep-alive",
	"content-length": expect.stringMatching(/\d+/),
	"content-security-policy": "default-src 'self';frame-ancestors 'none'",
	"content-type": expect.stringContaining("text/plain"),
	date: expect.any(String),
	"expect-ct": "max-age=0",
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
		"default-src 'self';base-uri 'self';img-src 'self' data:;object-src 'none';child-src 'self' blob:;frame-ancestors 'none';form-action 'self';upgrade-insecure-requests;block-all-mixed-content;script-src 'self' 'unsafe-inline';style-src 'self' 'unsafe-inline'",
	etag: expect.any(String),
	"last-modified": expect.any(String),
	vary: "accept-encoding",
};
delete expResHeadersHtmlStatic.expires;
delete expResHeadersHtmlStatic.pragma;
delete expResHeadersHtmlStatic["surrogate-control"];

const expResHeadersJson = {
	...expResHeaders,
	"content-type": expect.stringContaining("application/json"),
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
delete expResHeaders4xxErrors["keep-alive"];

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
										...testResult,
										scopes: JSON.stringify(testScopes),
									},
								],
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
									...testResult,
									scopes: testScopes,
								},
							],
						},
					},
				},
			},
		},
	];
	connectionTests.forEach((testObject) => {
		describe(`${testObject.testName}`, () => {
			beforeAll(async () => {
				Object.assign(process.env, testObject.envVariables);
			});

			describe("End-To-End - Bearer Token Disabled", () => {
				let config;
				let server;

				beforeAll(async () => {
					Object.assign(process.env, {
						BEARER_TOKEN_AUTH_ENABLED: false,
					});
					config = await getConfig();

					server = Fastify();
					server.register(startServer, config);

					await server.ready();
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
							expResHeaders4xxErrors
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
						expect(response.headers).toEqual(
							expResHeadersHtmlStatic
						);
						expect(response.statusCode).toBe(200);
					});
				});
			});

			describe("End-To-End - Bearer Token Enabled", () => {
				let config;
				let server;

				beforeAll(async () => {
					Object.assign(process.env, {
						BEARER_TOKEN_AUTH_ENABLED: true,
					});
					config = await getConfig();

					server = Fastify();
					server.register(startServer, config);

					await server.ready();
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
							expResHeaders4xxErrors
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
								authorization: `Bearer ${testKey}`,
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

					test("Should return response if media type in `Accept` request header is `application/json`", async () => {
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
								accept: "application/json",
								authorization: `Bearer ${testKey}`,
							},
						});

						expect(response.headers).toEqual(expResHeadersJson);
						expect(response.statusCode).not.toBe(406);
					});

					test("Should return response if media type in `Accept` request header is `application/xml`", async () => {
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
								accept: "application/xml",
								authorization: `Bearer ${testKey}`,
							},
						});

						expect(response.payload).toEqual(
							expect.stringContaining(
								'<?xml version="1.0" encoding="UTF-8"?>'
							)
						);
						expect(response.headers).toEqual(expResHeadersXml);
						expect(response.statusCode).not.toBe(406);
					});
				});
			});

			describe("End-To-End - Basic Auth", () => {
				let config;
				let server;

				beforeAll(async () => {
					Object.assign(process.env, {
						ADMIN_USERNAME: "admin",
						ADMIN_PASSWORD: "password",
					});
					config = await getConfig();

					server = Fastify();
					server.register(startServer, config);

					await server.ready();
				});

				afterAll(async () => {
					await server.close();
				});

				describe("/admin/access/bearer-token/:id Route", () => {
					test("Should return HTTP status code 401 if basic auth username invalid", async () => {
						const response = await server.inject({
							method: "GET",
							url: `/admin/access/bearer-token/${testId}`,
							headers: {
								authorization: `Basic ${Buffer.from(
									"invalidadmin:password"
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

					test("Should return HTTP status code 401 if basic auth password invalid", async () => {
						const response = await server.inject({
							method: "GET",
							url: `/admin/access/bearer-token/${testId}`,
							headers: {
								authorization: `Basic ${Buffer.from(
									"admin:invalidpassword"
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
						expect(response.headers).toEqual(expResHeadersJson);
						expect(response.statusCode).toBe(406);
					});
				});
			});
		});
	});

	describe("API Documentation Frontend", () => {
		let config;
		let server;

		let browser;
		let page;

		beforeAll(async () => {
			Object.assign(process.env, {
				SERVICE_HOST: "localhost",
				SERVICE_PORT: "8204",
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
			delete config.fastifyInit.logger;
			server = Fastify(config.fastifyInit);
			server.register(startServer, config);

			await server.listen(config.fastify);
		});

		afterAll(async () => {
			await server.close();
		});

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

				await page.goto("http://localhost:8204/docs");
				expect(await page.title()).toBe(
					"MyYDH CRUD API | Documentation"
				);
				/**
				 * Checks redoc has not rendered an error component
				 * https://github.com/Redocly/redoc/blob/master/src/components/ErrorBoundary.tsx
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
