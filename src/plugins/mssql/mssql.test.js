const faker = require("faker");
const Fastify = require("fastify");
const plugin = require(".");
const getConfig = require("../../config");

describe("mssql plugin", () => {
	let options;
	let server;

	const query =
		"SELECT table_schema, table_name FROM information_schema.tables";
	const client = {
		query: jest.fn().mockResolvedValue({}),
	};

	beforeAll(async () => {
		options = await getConfig();

		server = Fastify();
		server.register(plugin, options);
		server.route({
			method: "GET",
			url: "/",
			handler: async () => {
				const fakeClient = await server.mssql.connect();
				return fakeClient.query(query);
			},
		});

		await server.ready();
		server.mssql.connect = jest.fn();
	});

	beforeEach(() => {
		jest.resetAllMocks();
	});

	afterAll(() => {
		server.close();
	});

	test("Should instrument request with mssql plugin", async () => {
		const result = faker.lorem.word();

		client.query.mockResolvedValue(result);
		server.mssql.connect.mockResolvedValue(client);

		const response = await server.inject({
			method: "GET",
			url: "/",
		});

		expect(response.statusCode).toEqual(200);
		expect(response.payload).toEqual(result);
		expect(client.query).toHaveBeenNthCalledWith(1, query);
	});
});
