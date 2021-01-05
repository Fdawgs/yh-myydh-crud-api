const S = require("fluent-json-schema");

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://www.fastify.io/docs/latest/Validation-and-Serialization/
 *
 * This validation protects against XSS and HPP attacks.
 */
const headerSchema = S.object().prop(
	"Authorization",
	S.string().description("Bearer token for authorization").required()
);

// TODO: Add 300 response schema
const optionsGetSchema = {
	description:
		"Retrieve default available list of patient contact preferences that can be set",
	headers: headerSchema,
	response: {
		200: {
			type: "object",
			properties: {
				preferences: {
					type: "array",
					items: {
						type: "object",
						properties: {
							type: {
								type: "object",
								properties: {
									display: {
										type: "string",
									},
									id: {
										type: "number",
									},
									priority: {
										type: "number",
									},
									selected: {
										type: "number",
									},
									options: {
										type: "array",
										items: {
											type: "object",
											properties: {
												display: {
													type: "string",
												},
												value: {
													type: "number",
												},
											},
										},
									},
								},
							},
						},
					},
				},
			},
		},
	},
};

const userGetSchema = {
	params: {
		type: "object",
		properties: {
			id: {
				description: "Unique patient identifier",
				examples: [1],
				type: "number",
			},
		},
		required: ["id"],
	},
};

const userPutSchema = {
	params: {
		type: "object",
		properties: {
			id: {
				description: "Unique patient identifier",
				examples: [1],
				type: "number",
			},
		},
		required: ["id"],
	},
};

module.exports = { optionsGetSchema, userGetSchema, userPutSchema };
