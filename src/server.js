const autoLoad = require("fastify-autoload");
const fp = require("fastify-plugin");
const { NotAcceptable } = require("http-errors");
const path = require("path");

// Import plugins
const accepts = require("fastify-accepts");
const bearer = require("fastify-bearer-auth");
const cors = require("fastify-cors");
const helmConfig = require("helmet");
const helmet = require("fastify-helmet");
const disableCache = require("fastify-disablecache");
const swagger = require("fastify-swagger");
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

		// Use CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
		.register(cors, config.cors)

		.register(disableCache)

		.register(swagger, config.swagger)

		// Use Helmet to set response security headers: https://helmetjs.github.io/
		.register(helmet, (instance) => ({
			contentSecurityPolicy: {
				directives: {
					...helmConfig.contentSecurityPolicy.getDefaultDirectives(),
					"form-action": ["'self'"],
					"img-src": ["'self'", "data:", "validator.swagger.io"],
					"script-src": ["'self'"].concat(instance.swaggerCSP.script),
					"style-src": ["'self'", "https:"].concat(
						instance.swaggerCSP.style
					),
				},
			},
		}))

		.register(healthCheck)

		/**
		 * Encapsulate plugins and routes into secured child context, so that swagger and
		 * healthcheck routes do not inherit `accepts` preHandler bearer token auth plugin
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
