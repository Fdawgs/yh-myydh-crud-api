const fp = require("fastify-plugin");

/**
 * @author Frazer Smith
 * @author NextGen Healthcare
 * @description Converts date param operator to corresponding value.
 * @param {string} operator - Date param operator, in any letter case.
 * @returns {string} converted date param operator.
 */
function convDateParamOperator(operator) {
	switch (operator.toLowerCase()) {
		case "ap":
			return "=";
		case "eb":
			return "<";
		case "eq":
			return "=";
		case "ge":
			return ">=";
		case "gt":
			return ">";
		case "le":
			return "<=";
		case "lt":
			return "<";
		case "ne":
			return "!=";
		case "sa":
			return ">";
		default:
			return "=";
	}
}

/**
 * @author Frazer Smith
 * @description Plugin that decorates Fastify instance with `convertDateParamOperator` function,
 * which convert date param operators to corresponding values.
 * @param {import("fastify").FastifyInstance} server - Fastify instance.
 */
async function plugin(server) {
	server.decorate("convertDateParamOperator", convDateParamOperator);
}

module.exports = fp(plugin, {
	fastify: "4.x",
	name: "convert-date-param-operator",
});
