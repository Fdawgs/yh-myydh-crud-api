/* eslint-disable no-param-reassign -- Mutating original object is intended */

"use strict";

const fp = require("fastify-plugin");

/**
 * @author Frazer Smith
 * @description Plugin that decorates Fastify instance with `cleanObject` function,
 * which removes key value pairs from an object where the value is null or undefined.
 * @param {import("fastify").FastifyInstance} server - Fastify instance.
 */
async function plugin(server) {
	/**
	 * @author Frazer Smith
	 * @author Felix Meyer-Wolters
	 * @description Recursively removes key value pairs from an object where the value is null
	 * or undefined.
	 * @param {object} [object] - Object to be parsed and cleaned.
	 * @returns {object} Cleaned object.
	 */
	function cleanObject(object = {}) {
		Object.keys(object).forEach((key) => {
			if (object[key] && typeof object[key] === "object") {
				cleanObject(object[key]);
			} else if (object[key] === null || object[key] === undefined) {
				delete object[key];
			}
		});
		return object;
	}

	server.decorate("cleanObject", cleanObject);
}

module.exports = fp(plugin, {
	fastify: "4.x",
	name: "clean-object",
});
