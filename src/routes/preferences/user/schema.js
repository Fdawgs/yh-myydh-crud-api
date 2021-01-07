const S = require("fluent-json-schema");

/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://www.fastify.io/docs/latest/Validation-and-Serialization/
 *
 * This validation protects against XSS and HPP attacks.
 */
const userGetSchema = {
	params: S.object().prop(
		"id",
		S.number().description("Unique patient identifier").examples([1])
	),
	response: {
		404: S.object()
			.prop("statusCode", S.number().const(404))
			.prop("error", S.string().const("Not Found"))
			.prop("message", S.string().const("User not found")),
		500: S.object()
			.prop("statusCode", S.number().const(500))
			.prop("error", S.string().const("Internal Server Error"))
			.prop(
				"message",
				S.string().const("Unable to return result(s) from database")
			),
	},
};

const userPutSchema = {
	params: S.object().prop(
		"id",
		S.number().description("Unique patient identifier").examples([1])
	),
	body: S.object().prop(
		"preferences",
		S.array().items(
			S.object()
				.prop("id", S.number().required())
				.prop("priority", S.number().required())
				.prop("selected", S.number().required())
		)
	),
	response: {
		204: S.null(),
		400: S.object()
			.prop("statusCode", S.number().const(400))
			.prop("error", S.string().const("Bad Request"))
			.prop(
				"message",
				S.string().const("Malformed body or body missing")
			),
		500: S.object()
			.prop("statusCode", S.number().const(500))
			.prop("error", S.string().const("Internal Server Error"))
			.prop(
				"message",
				S.string().const(
					"Unable to update patient preference in database"
				)
			),
	},
};

module.exports = { userGetSchema, userPutSchema };
