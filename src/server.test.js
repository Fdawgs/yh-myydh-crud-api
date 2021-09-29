const Fastify = require("fastify");
const startServer = require("./server");
const getConfig = require("./config");

const expResHeaders = {
	"content-security-policy": "default-src 'self';frame-ancestors 'none'",
	"x-dns-prefetch-control": "off",
	"expect-ct": "max-age=0",
	"x-frame-options": "SAMEORIGIN",
	"strict-transport-security": "max-age=31536000; includeSubDomains",
	"x-download-options": "noopen",
	"x-content-type-options": "nosniff",
	"x-permitted-cross-domain-policies": "none",
	"referrer-policy": "no-referrer",
	"surrogate-control": "no-store",
	"cache-control": "no-store, max-age=0, must-revalidate",
	pragma: "no-cache",
	expires: "0",
	"permissions-policy": "interest-cohort=()",
	vary: "Origin, accept-encoding",
	"x-ratelimit-limit": expect.any(Number),
	"x-ratelimit-remaining": expect.any(Number),
	"x-ratelimit-reset": expect.any(Number),
	"content-type": expect.stringContaining("text/plain"),
	"content-length": expect.any(String),
	date: expect.any(String),
	connection: "keep-alive",
};

const expResHeadersJson = {
	...expResHeaders,
	...{ "content-type": expect.stringContaining("application/json") },
};

const expResHeaders4xxErrors = {
	...expResHeadersJson,
};
delete expResHeaders4xxErrors.vary;

describe("Server Deployment", () => {
	describe("MSSQL Connection", () => {
		beforeAll(async () => {
			Object.assign(process.env, {
				DB_CLIENT: "mssql",
				DB_CONNECTION_STRING:
					"Server=localhost,1433;Database=master;User Id=sa;Password=Password!;Encrypt=true;TrustServerCertificate=true;",
			});
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

					expect(response.headers).toEqual(
						expect.objectContaining(expResHeaders)
					);
					expect(response.payload).toEqual("ok");
					expect(response.statusCode).toEqual(200);
				});

				test("Should return HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
					const response = await server.inject({
						method: "GET",
						url: "/admin/healthcheck",
						headers: {
							accept: "application/javascript",
						},
					});

					expect(response.headers).toEqual(
						expect.objectContaining(expResHeadersJson)
					);
					expect(response.statusCode).toEqual(406);
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

					expect(response.headers).toEqual(
						expect.objectContaining(expResHeaders)
					);
					expect(response.payload).toEqual("ok");
					expect(response.statusCode).toEqual(200);
				});

				test("Should return HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
					const response = await server.inject({
						method: "GET",
						url: "/admin/healthcheck",
						headers: {
							accept: "application/javascript",
						},
					});

					expect(response.headers).toEqual(
						expect.objectContaining(expResHeadersJson)
					);
					expect(response.statusCode).toEqual(406);
				});
			});
		});
	});

	describe("PostgreSQL Connection", () => {
		beforeAll(async () => {
			Object.assign(process.env, {
				DB_CLIENT: "postgresql",
				DB_CONNECTION_STRING:
					"postgresql://postgres:password@localhost:5432/myydh_crud_api",
			});
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

					expect(response.headers).toEqual(
						expect.objectContaining(expResHeaders)
					);
					expect(response.payload).toEqual("ok");
					expect(response.statusCode).toEqual(200);
				});

				test("Should return HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
					const response = await server.inject({
						method: "GET",
						url: "/admin/healthcheck",
						headers: {
							accept: "application/javascript",
						},
					});

					expect(response.headers).toEqual(
						expect.objectContaining(expResHeadersJson)
					);
					expect(response.statusCode).toEqual(406);
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

					expect(response.headers).toEqual(
						expect.objectContaining(expResHeaders)
					);
					expect(response.payload).toEqual("ok");
					expect(response.statusCode).toEqual(200);
				});

				test("Should return HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
					const response = await server.inject({
						method: "GET",
						url: "/admin/healthcheck",
						headers: {
							accept: "application/javascript",
						},
					});

					expect(response.headers).toEqual(
						expect.objectContaining(expResHeadersJson)
					);
					expect(response.statusCode).toEqual(406);
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

					expect(response.headers).toEqual(
						expect.objectContaining(expResHeaders4xxErrors)
					);
					expect(response.statusCode).toEqual(401);
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

					expect(response.headers).toEqual(
						expect.objectContaining(expResHeadersJson)
					);
					expect(response.statusCode).toEqual(406);
				});
			});
		});
	});
});
