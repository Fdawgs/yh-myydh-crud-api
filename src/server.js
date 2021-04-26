const autoLoad = require("fastify-autoload");
const fp = require("fastify-plugin");
const { NotAcceptable } = require("http-errors");
const path = require("path");

// Import plugins
const accepts = require("fastify-accepts");
const bearer = require("fastify-bearer-auth");
const helmet = require("fastify-helmet");
const disableCache = require("fastify-disablecache");
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
	// Enable plugins
	server
		.register(accepts)

		.register(disableCache)

		// Process load and 503 response handling
		.register(underPressure, {
			maxEventLoopDelay: 1000,
			maxHeapUsedBytes: 100000000,
			maxRssBytes: 100000000,
			maxEventLoopUtilization: 0.98,
		})

		.register(swagger, config.swagger)

		// Use Helmet to set response security headers: https://helmetjs.github.io/
		.register(helmet, (instance) => ({
			contentSecurityPolicy: {
				directives: {
					...helmet.contentSecurityPolicy.getDefaultDirectives(),
					"form-action": ["'self'"],
					"img-src": ["'self'", "data:", "validator.swagger.io"],
					"script-src": ["'self'"].concat(instance.swaggerCSP.script),
					"style-src": ["'self'", "https:"].concat(
						instance.swaggerCSP.style
					),
				},
			},
			referrerPolicy: {
				/**
				 * "no-referrer" will only be used as a fallback if "strict-origin-when-cross-origin"
				 * is not supported by the browser
				 */
				policy: ["no-referrer", "strict-origin-when-cross-origin"],
			},
		}))

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
