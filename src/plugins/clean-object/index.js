/* eslint-disable security/detect-object-injection */

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
	 * or undefined. Adapted from Felix's answer at https://stackoverflow.com/a/38340730
	 * @param {object=} object - Object to be parsed and cleaned.
	 * @returns {object} cleaned object.
	 */
	function cleanObject(object = {}) {
		const obj = object;
		Object.keys(obj).forEach((key) => {
			if (obj[key] && typeof obj[key] === "object") {
				cleanObject(obj[key]);
			} else if (obj[key] === null || obj[key] === undefined) {
				delete obj[key];
			}
		});
		return obj;
	}

	server.decorate("cleanObject", cleanObject);
}

module.exports = fp(plugin, {
	fastify: "4.x",
	name: "clean-object",
});
