const faker = require("faker/locale/en_GB");
const Fastify = require("fastify");
const plugin = require(".");
const getConfig = require("../../../config");

const mockPage = faker.random.number({
	min: 1,
	max: 10,
});

const mockLastModified = faker.date.past().toISOString().split("T")[0];

describe("register", () => {
	describe("GET requests", () => {
		let options;
		let server;

		beforeAll(async () => {
			options = await getConfig();

			server = Fastify();
			server.register(plugin, options);

			await server.ready();
		});

		afterAll(() => {
			server.close();
		});

		test("Should return documents from register", async () => {
			const mockQueryFn = jest.fn().mockResolvedValue({
				recordsets: [
					[
						{
							total: 1,
						},
					],
					[
						{
							guid: "EXAMPLEGUID-0123456789-99999",
							fhirId: "99999",
							title: "99999 DUCK 11 July 2015 11 27.pdf",
							clinic: "CLO/BIA",
							documentType: "Clinic Letter",
							fileName: "99999 DUCK 11 July 2015 11 27.pdf",
							fullPath: "./path/path/path",
							url:
								"https://notreal.ydh.nhs.uk/sites/MedicalRecords1/_layouts/15/DocIdRedir.aspx?ID=EXAMPLEGUID-0123456789-99999",
							createdDate: "2015-09-30T05:40:14.000Z",
							modifiedDate: "2020-08-10T03:51:54.000Z",
							specialty: "General Surgery",
							patientVisible: 1,
						},
					],
				],
				recordset: [
					{
						total: 1,
					},
				],
				output: {},
				rowsAffected: [1, 1],
			});

			server.mssql = {
				query: mockQueryFn,
			};

			const response = await server.inject({
				method: "GET",
				url: "/",
				query: {
					lastModified: mockLastModified,
					perPage: mockPage,
					page: mockPage,
				},
			});

			expect(mockQueryFn).toHaveBeenCalledTimes(1);
			expect(response.statusCode).toEqual(200);
		});

		test("Should return documents from register using an operator in the lastModified querystring param", async () => {
			const mockQueryFn = jest.fn().mockResolvedValue({
				recordsets: [
					[
						{
							total: 1,
						},
					],
					[
						{
							guid: "EXAMPLEGUID-0123456789-99999",
							fhirId: "99999",
							title: "99999 DUCK 11 July 2015 11 27.pdf",
							clinic: "CLO/BIA",
							documentType: "Clinic Letter",
							fileName: "99999 DUCK 11 July 2015 11 27.pdf",
							fullPath: "./path/path/path",
							url:
								"https://notreal.ydh.nhs.uk/sites/MedicalRecords1/_layouts/15/DocIdRedir.aspx?ID=EXAMPLEGUID-0123456789-99999",
							createdDate: "2015-09-30T05:40:14.000Z",
							modifiedDate: "2020-08-10T03:51:54.000Z",
							specialty: "General Surgery",
							patientVisible: 1,
						},
					],
				],
				recordset: [
					{
						total: 1,
					},
				],
				output: {},
				rowsAffected: [1, 1],
			});

			server.mssql = {
				query: mockQueryFn,
			};

			const response = await server.inject({
				method: "GET",
				url: "/",
				query: {
					lastModified: `ge${mockLastModified}`,
				},
			});

			expect(mockQueryFn).toHaveBeenCalledTimes(1);
			expect(response.statusCode).toEqual(200);
		});

		test("Should return HTTP status code 500 if connection issue encountered", async () => {
			const mockQueryFn = jest
				.fn()
				.mockRejectedValue(Error("Failed to connect to DB"));

			server.mssql = {
				query: mockQueryFn,
			};

			const response = await server.inject({
				method: "GET",
				url: "/",
				query: {
					lastModified: mockLastModified,
					perPage: mockPage,
					page: mockPage,
				},
			});

			expect(mockQueryFn).toHaveBeenCalledTimes(1);
			expect(response.statusCode).toEqual(500);
		});
	});
});
