const faker = require("faker/locale/en_GB");
const getConfig = require(".");

describe("configuration", () => {
	const currentEnv = { ...process.env };

	beforeAll(() => {
		jest.resetModules();
	});

	afterEach(() => {
		jest.resetModules();
		Object.assign(process.env, currentEnv);
	});

	test("Should return values according to environment variables - SSL enabled and CORS disabled", async () => {
		const SERVICE_HOST = faker.internet.ip();
		const SERVICE_PORT = faker.random.number();
		const HTTPS_SSL_CERT_PATH =
			"./test_resources/test_ssl_cert/server.cert";
		const HTTPS_SSL_KEY_PATH = "./test_resources/test_ssl_cert/server.key";
		const CORS_ORIGIN = false;
		const LOG_LEVEL = faker.random.arrayElement([
			"debug",
			"warn",
			"silent",
		]);
		const AUTH_BEARER_TOKEN_ARRAY =
			'[{"service": "test", "value": "testtoken"}]';
		const DB_CONNECTION_STRING =
			"Server=localhost,1433;Database=database;User Id=username;Password=password;Encrypt=true";
		const DB_DOCUMENT_REGISTER_TABLE = "YDHAPPDOC.dbo.SPINDEX";
		const DB_PATIENT_PREFERENCES_TABLE = "patient.preferences";
		const DB_PATIENT_PREFERENCES_TYPE_TABLE = "lookup.preferenceType";
		const DB_PATIENT_PREFERENCES_VALUE_TABLE = "lookup.preferenceValue";
		const DB_READ_RECEIPT_DOCS_TABLE = "receipt.documents";

		Object.assign(process.env, {
			SERVICE_HOST,
			SERVICE_PORT,
			HTTPS_SSL_CERT_PATH,
			HTTPS_SSL_KEY_PATH,
			CORS_ORIGIN,
			LOG_LEVEL,
			AUTH_BEARER_TOKEN_ARRAY,
			DB_CONNECTION_STRING,
			DB_DOCUMENT_REGISTER_TABLE,
			DB_PATIENT_PREFERENCES_TABLE,
			DB_PATIENT_PREFERENCES_TYPE_TABLE,
			DB_PATIENT_PREFERENCES_VALUE_TABLE,
			DB_READ_RECEIPT_DOCS_TABLE,
		});

		const config = await getConfig();

		expect(config.authKeys).toContain("testtoken");

		expect(config.fastify).toEqual({
			host: SERVICE_HOST,
			port: SERVICE_PORT,
		});

		expect(config.fastifyInit.logger).toEqual(
			expect.objectContaining({
				formatters: { level: expect.any(Function) },
				level: LOG_LEVEL,
				serializers: {
					req: expect.any(Function),
					res: expect.any(Function),
				},
				timestamp: expect.any(Function),
			})
		);

		expect(config.fastifyInit.https).toEqual({
			cert: expect.any(Buffer),
			key: expect.any(Buffer),
		});

		expect(config.cors).toEqual({
			origin: CORS_ORIGIN,
			methods: ["Accept"],
			allowedHeaders: ["GET", "OPTIONS"],
		});

		expect(config.database).toEqual({
			connection: DB_CONNECTION_STRING,
			tables: {
				documentRegister: DB_DOCUMENT_REGISTER_TABLE,
				patientPref: DB_PATIENT_PREFERENCES_TABLE,
				patientPrefTypeLookup: DB_PATIENT_PREFERENCES_TYPE_TABLE,
				patientPrefValueLookup: DB_PATIENT_PREFERENCES_VALUE_TABLE,
				readReceipt: DB_READ_RECEIPT_DOCS_TABLE,
			},
		});
	});

	test("Should return values according to environment variables - PFX enabled and CORS enabled", async () => {
		const SERVICE_HOST = faker.internet.ip();
		const SERVICE_PORT = faker.random.number();
		const HTTPS_PFX_FILE_PATH =
			"./test_resources/test_ssl_cert/server.cert"; // I know it's not an actual PFX file
		const HTTPS_PFX_PASSPHRASE = faker.lorem.word();
		const CORS_ORIGIN = true;
		const LOG_LEVEL = faker.random.arrayElement([
			"debug",
			"warn",
			"silent",
		]);

		Object.assign(process.env, {
			SERVICE_HOST,
			SERVICE_PORT,
			HTTPS_PFX_FILE_PATH,
			HTTPS_PFX_PASSPHRASE,
			CORS_ORIGIN,
			LOG_LEVEL,
		});

		const config = await getConfig();

		expect(config.fastify).toEqual({
			host: SERVICE_HOST,
			port: SERVICE_PORT,
		});

		expect(config.fastifyInit.https).toEqual({
			passphrase: HTTPS_PFX_PASSPHRASE,
			pfx: expect.any(Buffer),
		});

		expect(config.cors).toEqual({
			origin: CORS_ORIGIN,
			methods: ["Accept"],
			allowedHeaders: ["GET", "OPTIONS"],
		});
	});

	test("Should return values according to environment variables - HTTPS disabled and CORS set to value", async () => {
		const SERVICE_HOST = faker.internet.ip();
		const SERVICE_PORT = faker.random.number();
		const CORS_ORIGIN = "https://ydh.nhs.uk";
		const LOG_LEVEL = faker.random.arrayElement([
			"debug",
			"warn",
			"silent",
		]);

		Object.assign(process.env, {
			SERVICE_HOST,
			SERVICE_PORT,
			CORS_ORIGIN,
			LOG_LEVEL,
		});

		const config = await getConfig();

		expect(config.fastify).toEqual({
			host: SERVICE_HOST,
			port: SERVICE_PORT,
		});

		expect(config.cors).toEqual({
			origin: CORS_ORIGIN,
			methods: ["Accept"],
			allowedHeaders: ["GET", "OPTIONS"],
		});
	});

	test("Should throw error if invalid PFX file path", async () => {
		const SERVICE_HOST = faker.internet.ip();
		const SERVICE_PORT = faker.random.number();
		const HTTPS_PFX_FILE_PATH = "./test_resources/test_ssl_cert/error.pfx";
		const HTTPS_PFX_PASSPHRASE = faker.lorem.word();
		const CORS_ORIGIN = true;
		const LOG_LEVEL = faker.random.arrayElement([
			"debug",
			"warn",
			"silent",
		]);

		Object.assign(process.env, {
			SERVICE_HOST,
			SERVICE_PORT,
			HTTPS_PFX_FILE_PATH,
			HTTPS_PFX_PASSPHRASE,
			CORS_ORIGIN,
			LOG_LEVEL,
		});

		await expect(getConfig()).rejects.toThrow();
	});

	test("Should throw error if invalid SSL cert file path", async () => {
		const SERVICE_HOST = faker.internet.ip();
		const SERVICE_PORT = faker.random.number();
		const HTTPS_SSL_CERT_PATH = "./test_resources/test_ssl_cert/error.cert";
		const HTTPS_SSL_KEY_PATH = "./test_resources/test_ssl_cert/error.key";
		const CORS_ORIGIN = true;
		const LOG_LEVEL = faker.random.arrayElement([
			"debug",
			"warn",
			"silent",
		]);

		Object.assign(process.env, {
			SERVICE_HOST,
			SERVICE_PORT,
			HTTPS_SSL_CERT_PATH,
			HTTPS_SSL_KEY_PATH,
			CORS_ORIGIN,
			LOG_LEVEL,
		});

		await expect(getConfig()).rejects.toThrow();
	});
});
