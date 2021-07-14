const faker = require("faker/locale/en_GB");
const Fastify = require("fastify");
const startServer = require("./server");
const getConfig = require("./config");

const mockId = faker.datatype.number({
	min: 1,
	max: 10,
});
const mockLastModified = faker.date.past().toISOString().split("T")[0];
const mockPage = faker.datatype.number({
	min: 1,
	max: 10,
});
const mockPatientId = faker.datatype.number({
	min: 1000000000,
	max: 9999999999,
});
const mockTimeStamp = faker.date.past().toISOString();

// TODO: look at standing up test SQL Server instance with Docker and disable skip for this
describe.skip("End-To-End", () => {
	let config;
	let server;

	beforeAll(async () => {
		config = await getConfig();

		server = Fastify();
		server.register(startServer, config);

		server.mssql = {
			query: jest.fn(),
		};

		await server.ready();
	});

	afterAll(async () => {
		await server.close();
	});

	describe("/healthcheck Route", () => {
		test("Should return `ok`", async () => {
			const response = await server.inject({
				method: "GET",
				url: "/healthcheck",
				headers: {
					accept: "text/plain",
				},
			});

			expect(response.statusCode).toEqual(200);
			expect(response.payload).toEqual("ok");
		});

		test("Should return HTTP status code 406 if media type in `Accept` request header is unsupported", async () => {
			const response = await server.inject({
				method: "GET",
				url: "/healthcheck",
				headers: {
					accept: "application/javascript",
				},
			});

			expect(response.statusCode).toEqual(406);
		});
	});

	describe("/documents/receipt Route", () => {
		const url = "/documents/receipt";

		test("Should return HTTP status code 406 if content-type in `Accept` request header unsupported", async () => {
			const response = await server.inject({
				method: "PUT",
				url: `${url}/${mockId}`,
				headers: {
					accept: "application/javascript",
					authorization: "Bearer testtoken",
				},
				query: {
					patientId: mockPatientId,
					timestamp: mockTimeStamp,
				},
			});

			expect(response.statusCode).toEqual(406);
		});
	});

	describe("/documents/register Route", () => {
		const url = "/documents/register";

		test("Should return documents from register", async () => {
			const response = await server.inject({
				method: "GET",
				url,
				headers: {
					accept: "application/json",
					authorization: "Bearer testtoken",
				},
				query: {
					lastModified: mockLastModified,
					perPage: mockPage,
					page: mockPage,
				},
			});

			expect(JSON.parse(response.payload)).toEqual({
				data: [],
				meta: {
					pagination: {
						total: 0,
						per_page: mockPage,
						current_page: mockPage,
						total_pages: 0,
					},
				},
			});
			expect(response.statusCode).toEqual(200);
		});

		test("Should return HTTP status code 406 if content-type in `Accept` request header unsupported", async () => {
			const response = await server.inject({
				method: "GET",
				url,
				headers: {
					accept: "application/javascript",
					authorization: "Bearer testtoken",
				},
				query: {
					lastModified: mockLastModified,
					perPage: mockPage,
					page: mockPage,
				},
			});

			expect(response.statusCode).toEqual(406);
		});
	});

	describe("/preferences/options Route", () => {
		const url = "/preferences/options";

		test("Should return HTTP status code 406 if content-type in `Accept` request header unsupported", async () => {
			const response = await server.inject({
				method: "GET",
				url,
				headers: {
					accept: "application/javascript",
					authorization: "Bearer testtoken",
				},
			});

			expect(response.statusCode).toEqual(406);
		});
	});

	describe("/preferences/user Route", () => {
		const url = "/preferences/user";

		test("Should return HTTP status code 406 if content-type in `Accept` request header unsupported", async () => {
			const response = await server.inject({
				method: "PUT",
				url: `${url}/${mockPatientId}`,
				headers: {
					accept: "application/javascript",
					authorization: "Bearer testtoken",
				},
				payload: {
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
				},
			});

			expect(response.statusCode).toEqual(406);
		});
	});
});
