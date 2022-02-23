/* eslint-disable no-console */
/* eslint-disable security-node/detect-crlf */
const { chromium, firefox } = require("playwright");
const Fastify = require("fastify");
const isHtml = require("is-html");
const startServer = require("./server");
const getConfig = require("./config");

const expResHeaders = {
	"cache-control": "no-store, max-age=0, must-revalidate",
	connection: "keep-alive",
	"content-length": expect.anything(),
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

describe("Server Deployment", () => {
	const connectionTests = [
		{
			testName: "MSSQL Connection",
			envVariables: {
				DB_CLIENT: "mssql",
				DB_CONNECTION_STRING:
					"Server=localhost,1433;Database=master;User Id=sa;Password=Password!;Encrypt=true;TrustServerCertificate=true;",
			},
		},
		{
			testName: "PostgreSQL Connection",
			envVariables: {
				DB_CLIENT: "postgresql",
				DB_CONNECTION_STRING:
					"postgresql://postgres:password@localhost:5432/myydh_crud_api",
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
						AUTH_BEARER_TOKEN_ARRAY: "",
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
						AUTH_BEARER_TOKEN_ARRAY:
							'[{"service": "test", "value": "testtoken"}]',
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

				describe("/preferences/options Route", () => {
					test("Should return HTTP status code 401 if bearer token invalid", async () => {
						const response = await server.inject({
							method: "GET",
							url: "/preferences/options",
							headers: {
								accept: "application/json",
								authorization: "Bearer invalid",
							},
						});

						expect(response.headers).toEqual({
							...expResHeadersJson,
							vary: "accept-encoding",
						});
						expect(response.statusCode).toBe(401);
					});

					test("Should return HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
						const response = await server.inject({
							method: "GET",
							url: "/preferences/options",
							headers: {
								accept: "application/javascript",
								authorization: "Bearer testtoken",
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

					test("Should return response if media type in `Accept` request header is supported", async () => {
						const response = await server.inject({
							method: "GET",
							url: "/preferences/options",
							headers: {
								accept: "application/json",
								authorization: "Bearer testtoken",
							},
						});

						expect(response.headers).toEqual(expResHeadersJson);
						expect(response.statusCode).not.toBe(406);
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
