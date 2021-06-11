const autoLoad = require("fastify-autoload");
const fp = require("fastify-plugin");
const { NotAcceptable } = require("http-errors");
const path = require("path");

// Import plugins
const accepts = require("fastify-accepts");
const bearer = require("fastify-bearer-auth");
const compress = require("fastify-compress");
const helmet = require("fastify-helmet");
const disableCache = require("fastify-disablecache");
const flocOff = require("fastify-floc-off");
const rateLimit = require("fastify-rate-limit");
const swagger = require("fastify-swagger");
const underPressure = require("under-pressure");
const mssql = require("./plugins/mssql");

// Import healthcheck route
const healthCheck = require("./routes/healthcheck");

/**
 * @author Frazer Smith
 * @description Build Fastify instance
 * @param {Function} server - Fastify instance.
 * @param {object} config - Fastify configuration values
 */
async function plugin(server, config) {
	// Register plugins
	server
		.register(accepts)

		.register(disableCache)

		.register(flocOff)

		.register(compress, { inflateIfDeflated: true })

		// Process load and 503 response handling
		.register(underPressure, config.processLoad)

		// Rate limiting and 429 response handling
		.register(rateLimit, config.rateLimit)

		.register(swagger, config.swagger)

		// Use Helmet to set response security headers: https://helmetjs.github.io/
		.register(helmet, {
			contentSecurityPolicy: {
				directives: {
					...helmet.contentSecurityPolicy.getDefaultDirectives(),
					"child-src": ["'self'"],
					"frame-ancestors": ["'none'"],
					"form-action": ["'self'"],
				},
			},
			referrerPolicy: {
				/**
				 * "no-referrer" will only be used as a fallback if "strict-origin-when-cross-origin"
				 * is not supported by the browser
				 */
				policy: ["no-referrer", "strict-origin-when-cross-origin"],
			},
		})

		// Basic healthcheck route to ping
		.register(healthCheck)

		/**
		 * Encapsulate plugins and routes into secured child context, so that swagger and
		 * healthcheck routes do not inherit `accepts` preHandler, or bearer token auth
		 */
		.register(async (securedContext) => {
			securedContext
				.addHook("preHandler", async (req, res) => {
					if (req.accepts().type(["json"]) !== "json") {
						res.send(NotAcceptable());
					}
				})
				.register(bearer, { keys: config.authKeys })
				.register(mssql, config)
				// Import and register service routes
				.register(autoLoad, {
					dir: path.join(__dirname, "routes"),
					ignorePattern: /healthcheck/,
					options: config,
				});
		});
}

module.exports = fp(plugin);
