"use strict";

const Fastify = require("fastify");
const plugin = require(".");

describe("Convert-Date-Param-Operator plugin", () => {
	/** @type {Fastify.FastifyInstance} */
	let server;

	beforeAll(async () => {
		server = Fastify();

		await server.register(plugin);
		server.put("/", (req, res) => {
			res.send(server.convertDateParamOperator(req.body));
		});

		await server.ready();
	});

	afterAll(async () => {
		await server.close();
	});

	it("Converts date param operators to expected value", async () => {
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

		expect.assertions(Object.keys(values).length * 2);
		await Promise.all(
			Object.keys(values).map((key) =>
				server
					.inject({
						method: "PUT",
						url: "/",
						headers: {
							"content-type": "text/plain",
						},
						body: `${key}`,
					})
					.then((response) => {
						expect(response.body).toStrictEqual(values[key]);
						expect(response.statusCode).toBe(200);

						return response.statusCode;
					})
			)
		);
	});
});
