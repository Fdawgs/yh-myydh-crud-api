const fp = require("fastify-plugin");

/**
 * @author Frazer Smith
 * @author NextGen Healthcare
 * @param {string} operator - Date param operator, in any letter case.
 * @description Convert date param operator to corresponding value.
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
 * @param {object} server - Fastify instance.
 */
async function plugin(server) {
	server.decorate("convertDateParamOperator", convDateParamOperator);
}

module.exports = fp(plugin, {
	fastify: "3.x",
	name: "convert-date-param-operator",
});
