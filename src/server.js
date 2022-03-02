const autoLoad = require("fastify-autoload");
const fp = require("fastify-plugin");
const path = require("upath");
const secJSON = require("secure-json-parse");

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
const { toXML } = require("jstoxml");
const underPressure = require("under-pressure");
const clean = require("./plugins/clean-object");
const convertDateParamOperator = require("./plugins/convert-date-param-operator");
const db = require("./plugins/db");
const sharedSchemas = require("./plugins/shared-schemas");

/**
 * @author Frazer Smith
 * @description Build Fastify instance.
 * @param {object} server - Fastify instance.
 * @param {object} config - Fastify configuration values.
 */
async function plugin(server, config) {
	// Register plugins
	server
		// Accept header handler
		.register(accepts)

		// Support Content-Encoding
		.register(compress, { inflateIfDeflated: true })

		// Database connection
		.register(db, config.database)

		// Opt-out of Google's FLoC advertising-surveillance network
		.register(flocOff)

		// Use Helmet to set response security headers: https://helmetjs.github.io/
		.register(helmet, config.helmet)

		// Utility functions and error handlers
		.register(sensible)

		// Re-usable schemas
		.register(sharedSchemas)

		// Generate OpenAPI/Swagger schemas
		.register(swagger, config.swagger)

		// Process load and 503 response handling
		.register(underPressure, config.processLoad)

		// Additional utility functions
		.register(clean)
		.register(convertDateParamOperator);

	await server
		// Rate limiting and 429 response handling
		.register(rateLimit, config.rateLimit);

	// Register routes
	server
		// Ensure rate limit also applies to 4xx and 5xx responses
		.addHook("onSend", server.rateLimit())

		/*
		 * `x-xss-protection` and `content-security-policy` is set by default by Helmet.
		 * These are only useful for HTML/XML content; the only CSP directive that
		 * is of use to other content is "frame-ancestors 'none'" to stop responses
		 * from being wrapped in iframes and used for clickjacking attacks.
		 */
		.addHook("onSend", async (req, res) => {
			if (
				res.getHeader("content-type") !== undefined &&
				!res.getHeader("content-type")?.includes("html") &&
				!res.getHeader("content-type")?.includes("xml")
			) {
				res.raw.setHeader(
					"content-security-policy",
					"default-src 'self';frame-ancestors 'none'"
				);
				res.raw.removeHeader("x-xss-protection");
			}
			return res;
		})

		// Import and register admin routes
		.register(autoLoad, {
			dir: path.joinSafe(__dirname, "routes", "admin"),
			options: { ...config, prefix: "admin" },
		})

		/**
		 * Encapsulate plugins and routes into secured child context, so that admin and docs
		 * routes do not inherit `accepts` preHandler or bearer token auth plugin.
		 * See https://www.fastify.io/docs/latest/Encapsulation/ for more info
		 */
		.register(async (securedContext) => {
			securedContext
				// Set response headers to disable client-side caching
				.register(disableCache);

			if (config.bearerTokenAuthKeys) {
				securedContext.register(bearer, {
					keys: config.bearerTokenAuthKeys,
					errorResponse: (err) => ({
						statusCode: 401,
						error: "Unauthorized",
						message: err.message,
					}),
				});
			}

			securedContext
				// Catch unsupported Accept header media types
				.addHook("preValidation", async (req, res) => {
					if (
						!["application/json", "application/xml"].includes(
							req
								.accepts()
								.type(["application/json", "application/xml"])
						)
					) {
						throw res.notAcceptable();
					}
				})

				// Serialize response
				.addHook("onSend", async (req, res, payload) => {
					let newPayload;

					switch (
						req
							.accepts()
							.type(["application/json", "application/xml"])
					) {
						case "application/xml":
							res.header(
								"content-type",
								"application/xml; charset=utf-8"
							);
							newPayload = toXML(JSON.parse(payload), {
								header: '<?xml version="1.0" encoding="UTF-8"?>',
							});
							break;

						case "application/json":
						default:
							newPayload = payload;
							break;
					}

					return newPayload;
				})
				// Import and register service routes
				.register(autoLoad, {
					dir: path.joinSafe(__dirname, "routes"),
					ignorePattern: /(admin|docs)/,
					options: config,
				});
		})

		/**
		 * Encapsulate the docs routes into a child context, so that the
		 * CSP can be relaxed without impacting security of other routes
		 */
		.register(async (publicContext) => {
			const relaxedHelmetConfig = secJSON.parse(
				JSON.stringify(config.helmet)
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
				// Set relaxed response headers
				.register(helmet, relaxedHelmetConfig)

				// Register static files in ./src/public
				.register(staticPlugin, {
					root: path.joinSafe(__dirname, "public"),
					immutable: true,
					maxAge: "365 days",
				})

				// Register redoc module to allow for js to be used in ./src/public/docs.html
				.register(staticPlugin, {
					root: path.joinSafe(
						__dirname,
						"..",
						"node_modules",
						"redoc",
						"bundles"
					),
					prefix: "/redoc/",
					decorateReply: false,
					maxAge: "1 day",
				})
				.register(autoLoad, {
					dir: path.joinSafe(__dirname, "routes", "docs"),
					options: { ...config, prefix: "docs" },
				});
		});
}

module.exports = fp(plugin, { fastify: "3.x", name: "server" });
