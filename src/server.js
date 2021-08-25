const autoLoad = require("fastify-autoload");
const fp = require("fastify-plugin");
const path = require("path");

// Import plugins
const accepts = require("fastify-accepts");
const bearer = require("fastify-bearer-auth");
const compress = require("fastify-compress");
const disableCache = require("fastify-disablecache");
const flocOff = require("fastify-floc-off");
const helmet = require("fastify-helmet");
const rateLimit = require("fastify-rate-limit");
const sensible = require("fastify-sensible");
const staticPlugin = require("fastify-static");
const swagger = require("fastify-swagger");
const underPressure = require("under-pressure");
const db = require("./plugins/db");
const sharedSchemas = require("./plugins/shared-schemas");

// Helmet config
const helmetConfig = {
	contentSecurityPolicy: {
		directives: {
			"default-src": ["'self'"],
			"base-uri": ["'self'"],
			"img-src": ["'self'", "data:"],
			"object-src": ["'none'"],
			"child-src": ["'self'"],
			"frame-ancestors": ["'none'"],
			"form-action": ["'self'"],
			"upgrade-insecure-requests": [],
			"block-all-mixed-content": [],
		},
	},
	hsts: {
		maxAge: 31536000,
	},
};

/**
 * @author Frazer Smith
 * @description Build Fastify instance.
 * @param {Function} server - Fastify instance.
 * @param {object} config - Fastify configuration values.
 */
async function plugin(server, config) {
	// Register plugins
	server
		// Accept header handler
		.register(accepts)

		// Support Content-Encoding
		.register(compress, { inflateIfDeflated: true })

		// Set response headers to disable client-side caching
		.register(disableCache)

		// Opt-out of Google's FLoC advertising-surveillance network
		.register(flocOff)

		// Use Helmet to set response security headers: https://helmetjs.github.io/
		.register(helmet, helmetConfig)

		// Rate limiting and 429 response handling
		.register(rateLimit, config.rateLimit)

		// Utility functions and error handlers
		.register(sensible)

		// Re-usable schemas
		.register(sharedSchemas)

		// Process load and 503 response handling
		.register(underPressure, config.processLoad)

		// Register static files in ./src/public
		.register(staticPlugin, {
			root: path.join(__dirname, "public"),
			prefix: "/public/",
		})

		// Register redoc module to allow for js to be used in ./src/public/docs.html
		.register(staticPlugin, {
			root: path.join(
				__dirname,
				"..",
				"node_modules",
				"redoc",
				"bundles"
			),
			prefix: "/redoc/",
			decorateReply: false,
		})

		// Generate OpenAPI/Swagger schemas
		.register(swagger, config.swagger)

		// Import and register admin routes
		.register(autoLoad, {
			dir: path.join(__dirname, "routes"),
			ignorePattern: /(docs|documents|preferences)/,
			options: config,
		})

		/**
		 * Encapsulate plugins and routes into secured child context, so that admin and docs
		 * routes do not inherit `accepts` preHandler or bearer token auth plugin.
		 * See https://www.fastify.io/docs/latest/Encapsulation/ for more info
		 */
		.register(async (securedContext) => {
			if (config.bearerTokenAuthKeys) {
				securedContext.register(bearer, {
					keys: config.bearerTokenAuthKeys,
				});
			}

			securedContext
				// Catch unsupported Accept header media types
				.addHook("preHandler", async (req, res) => {
					if (
						!["application/json"].includes(
							req.accepts().type(["application/json"])
						)
					) {
						res.notAcceptable();
					}
				})
				.register(db, config.database)
				// Import and register service routes
				.register(autoLoad, {
					dir: path.join(__dirname, "routes"),
					ignorePattern: /(admin|docs)/,
					options: config,
				});
		})

		/**
		 * Encapsulate the doc routes into a secured child context, so that
		 * the CSP can be relaxed without impacting security of other routes
		 */
		.register(async (publicContext) => {
			const relaxedHelmetConfig = JSON.parse(
				JSON.stringify(helmetConfig)
			);
			Object.assign(
				relaxedHelmetConfig.contentSecurityPolicy.directives,
				{
					"script-src": ["'self'", "'unsafe-inline'"],
					"style-src": ["'self'", "'unsafe-inline'"],
					"child-src": ["'self'", "blob:"],
				}
			);

			publicContext
				.register(helmet, relaxedHelmetConfig)
				.register(autoLoad, {
					dir: path.join(__dirname, "routes"),
					ignorePattern: /(admin|documents|preferences)/,
					options: config,
				});
		});
}

module.exports = fp(plugin, { fastify: "3.x", name: "server" });
