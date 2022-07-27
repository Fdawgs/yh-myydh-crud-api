const Fastify = require("fastify");
const plugin = require(".");

describe("Clean-Object Plugin", () => {
	let server;

	beforeAll(async () => {
		server = Fastify();

		await server.register(plugin);
		server.route({
			method: "PUT",
			url: "/",
			handler(req, res) {
				res.send(server.cleanObject(req.body));
			},
		});

		server.route({
			method: "PUT",
			url: "/empty",
			handler(req, res) {
				res.send(server.cleanObject());
			},
		});

		await server.ready();
	});

	afterAll(async () => {
		await server.close();
	});

	test("Should remove keys from request object where value is undefined or null", async () => {
		const response = await server.inject({
			method: "PUT",
			url: "/",
			headers: {
				"content-type": "application/json",
			},
			payload: {
				test1: undefined,
				test2: null,
				test3: [{ testobj: null }],
				test4: 2,
			},
		});

		expect(JSON.parse(response.payload)).toEqual({ test3: [{}], test4: 2 });
		expect(response.statusCode).toBe(200);
	});

	test("Should return empty object if request payload not passed to plugin function", async () => {
		const response = await server.inject({
			method: "PUT",
			url: "/empty",
		});

		expect(JSON.parse(response.payload)).toEqual({});
		expect(response.statusCode).toBe(200);
	});
});
