require("dotenv").config();

const envSchema = require("env-schema");
const S = require("fluent-json-schema");
const fsp = require("fs").promises;
const pino = require("pino");
const rotatingLogStream = require("file-stream-rotator");

const { name, description, version } = require("../../package.json");

/**
 * @author Frazer Smith
 * @description Convert string boolean to boolean.
 * @param {string} param - CORS parameter.
 * @returns {string|boolean} CORS parameter.
 */
function parseCorsParameter(param) {
	if (param === "true") {
		return true;
	}
	if (param === "false") {
		return false;
	}
	return param;
}

/**
 * @author Frazer Smith
 * @description Validate environment variables and build server config.
 * @returns {object} Server config.
 */
async function getConfig() {
	// Validate env variables
	const env = envSchema({
		dotenv: true,
		schema: S.object()
			.prop("SERVICE_HOST", S.string())
			.prop("SERVICE_PORT", S.number())
			.prop("HTTPS_PFX_PASSPHRASE", S.anyOf([S.string(), S.null()]))
			.prop("HTTPS_PFX_FILE_PATH", S.anyOf([S.string(), S.null()]))
			.prop("HTTPS_SSL_CERT_PATH", S.anyOf([S.string(), S.null()]))
			.prop("HTTPS_SSL_KEY_PATH", S.anyOf([S.string(), S.null()]))
			.prop("CORS_ORIGIN", S.string().default("false"))
			.prop(
				"LOG_LEVEL",
				S.string()
					.enum([
						"fatal",
						"error",
						"warn",
						"info",
						"debug",
						"trace",
						"silent",
					])
					.default("info")
			)
			.prop("LOG_ROTATION_DATE_FORMAT", S.string().default("YYYY-MM-DD"))
			.prop("LOG_ROTATION_FILENAME", S.anyOf([S.string(), S.null()]))
			.prop(
				"LOG_ROTATION_FREQUENCY",
				S.string().enum(["custom", "daily", "test"]).default("daily")
			)
			.prop("LOG_ROTATION_MAX_LOGS", S.anyOf([S.string(), S.null()]))
			.prop("LOG_ROTATION_MAX_SIZE", S.anyOf([S.string(), S.null()])),
	});

	const config = {
		fastify: {
			host: env.SERVICE_HOST,
			port: env.SERVICE_PORT,
		},
		fastifyInit: {
			/**
			 * See https://www.fastify.io/docs/v3.8.x/Logging/
			 * and https://getpino.io/#/docs/api for logger options
			 */
			logger: {
				formatters: {
					level(label) {
						return { level: label };
					},
				},
				level: env.LOG_LEVEL || "info",
				serializers: {
					req(req) {
						return pino.stdSerializers.req(req);
					},
					res(res) {
						return pino.stdSerializers.res(res);
					},
				},
				timestamp: () => pino.stdTimeFunctions.isoTime(),
				// Rotation options: https://github.com/rogerc/file-stream-rotator/#options
				stream: rotatingLogStream.getStream({
					date_format: env.LOG_ROTATION_DATE_FORMAT || "YYYY-MM-DD",
					filename: env.LOG_ROTATION_FILENAME,
					frequency: env.LOG_ROTATION_FREQUENCY || "daily",
					max_logs: env.LOG_ROTATION_MAX_LOG,
					size: env.LOG_ROTATION_MAX_SIZE,
					verbose: false,
				}),
			},
			ignoreTrailingSlash: true,
		},
		cors: {
			origin: parseCorsParameter(env.CORS_ORIGIN) || false,
			methods: ["Accept"],
			allowedHeaders: ["GET", "OPTIONS"],
		},
		swagger: {
			routePrefix: "/docs",
			exposeRoute: true,
			swagger: {
				info: {
					title: name,
					description,
					version,
				},
			},
		},
	};

	// Enable HTTPS using cert/key or passphrase/pfx combinations
	if (env.HTTPS_SSL_CERT_PATH && env.HTTPS_SSL_KEY_PATH) {
		try {
			config.fastifyInit.https = {
				cert: await fsp.readFile(env.HTTPS_SSL_CERT_PATH),
				key: await fsp.readFile(env.HTTPS_SSL_KEY_PATH),
			};
		} catch (err) {
			throw Error(
				`No such file or directory ${err.path} for SSL cert/key, falling back to HTTP`
			);
		}
	}

	if (env.HTTPS_PFX_PASSPHRASE && env.HTTPS_PFX_FILE_PATH) {
		try {
			config.fastifyInit.https = {
				passphrase: env.HTTPS_PFX_PASSPHRASE,
				pfx: await fsp.readFile(env.HTTPS_PFX_FILE_PATH),
			};
		} catch (err) {
			throw Error(
				`No such file or directory ${err.path} for PFX file, falling back to HTTP`
			);
		}
	}

	return config;
}

module.exports = getConfig;
