const Fastify = require("fastify");
const plugin = require(".");

describe("Convert-Date-Param-Operator Plugin", () => {
	let server;

	beforeAll(async () => {
		server = Fastify();

		server.register(plugin);
		server.route({
			method: "PUT",
			url: "/",
			handler(req, res) {
				res.send(server.convertDateParamOperator(req.body));
			},
		});

		await server.ready();
	});

	afterAll(async () => {
		await server.close();
	});

	test("Should convert date param operators to expected value", async () => {
		const values = {
			ap: "=",
			eb: "<",
			eq: "=",
			ge: ">=",
			gt: ">",
			le: "<=",
			lt: "<",
			ne: "!=",
			sa: ">",
			default: "=",
		};

		await Promise.all(
			Object.keys(values).map(async (key) => {
				const response = await server.inject({
					method: "PUT",
					url: "/",
					headers: {
						"content-type": "text/plain",
					},
					payload: `${key}`,
				});

				// eslint-disable-next-line security/detect-object-injection
				expect(response.payload).toEqual(values[key]);
				expect(response.statusCode).toBe(200);

				return response.statusCode;
			})
		);
	});
});
