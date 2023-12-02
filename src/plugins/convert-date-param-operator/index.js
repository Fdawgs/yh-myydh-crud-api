"use strict";

const fp = require("fastify-plugin");

const operatorMap = {
	ap: "=",
	eb: "<",
	eq: "=",
	ge: ">=",
	gt: ">",
	le: "<=",
	lt: "<",
	ne: "!=",
	sa: ">",
};

/**
 * @author Frazer Smith
 * @description Plugin that decorates Fastify instance with `convertDateParamOperator` function,
 * which convert date param operators to corresponding values.
 * @param {import("fastify").FastifyInstance} server - Fastify instance.
 */
async function plugin(server) {
	/**
	 * @author Frazer Smith
	 * @description Converts date param operator to corresponding value.
	 * @param {string} operator - Date param operator, in any letter case.
	 * @returns {string} converted date param operator.
	 */
	function convDateParamOperator(operator) {
		return operatorMap[operator.toLowerCase()] || "=";
	}

	server.decorate("convertDateParamOperator", convDateParamOperator);
}

module.exports = fp(plugin, {
	fastify: "4.x",
	name: "convert-date-param-operator",
});
