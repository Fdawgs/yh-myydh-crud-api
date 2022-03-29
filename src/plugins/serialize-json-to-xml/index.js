const fp = require("fastify-plugin");
const js2xmlparser = require("js2xmlparser");
const secJSON = require("secure-json-parse");

/**
 * @author Frazer Smith
 * @description On-send plugin that adds support for serialization
 * of JSON responses, allowing them to be returned as XML if the
 * accepts request header explicitly includes the "application/xml"
 * media type before "application/json".
 * @param {object} server - Fastify instance.
 */
async function plugin(server) {
	server.addHook("onSend", async (req, res, payload) => {
		/**
		 * Ensure it does not attempt to serialise non-JSON responses,
		 * by default Fastify sets response type to json if it has not
		 * been explicitly defined
		 */
		if (res.getHeader("content-type").includes("json")) {
			/**
			 * If XML is the preferred response type if both XML
			 * and JSON are declared
			 */
			if (
				req.accepts().type(["application/json", "application/xml"]) ===
				"application/xml"
			) {
				let parsedPayload = payload;

				try {
					parsedPayload = secJSON.parse(payload);
				} catch (err) {
					// Do nothing, payload already object
				}

				/* istanbul ignore else */
				if (typeof parsedPayload === "object") {
					res.type("application/xml; charset=utf-8");
					return js2xmlparser.parse("response", parsedPayload, {
						format: {
							doubleQuotes: true,
						},
						declaration: {
							encoding: "UTF-8",
						},
					});
				}
			}
		}

		return payload;
	});
}

module.exports = fp(plugin, {
	fastify: "3.x",
	name: "serialize-json-to-xml",
	dependencies: ["fastify-accepts"],
});
