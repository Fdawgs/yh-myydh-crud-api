const Postgrator = require("postgrator");
const migrate = require("./migrate");

jest.mock("postgrator");

describe("Migrate script", () => {
	const connectionTests = [
		{
			testName: "MSSQL connection",
			envVariables: {
				DB_CLIENT: "mssql",
				DB_CONNECTION_STRING:
					"Server=localhost,1433;Database=master;User Id=sa;Password=Password!;Encrypt=true;TrustServerCertificate=true;",
			},
		},
		{
			testName: "PostgreSQL connection",
			envVariables: {
				DB_CLIENT: "postgresql",
				DB_CONNECTION_STRING:
					"postgresql://postgres:password@localhost:5432/myydh_crud_api",
			},
		},
	];
	connectionTests.forEach((testObject) => {
		describe(`${testObject.testName}`, () => {
			beforeAll(() => {
				Object.assign(process.env, testObject.envVariables);
			});

			test("Should run migrations", async () => {
				const mockMigrate = jest.fn().mockResolvedValue([]);
				const mockLog = jest
					.spyOn(console, "log")
					// Used to silence log printing to CLI
					.mockImplementation(() => {});

				Postgrator.mockImplementation(() => ({ migrate: mockMigrate }));

				await migrate();

				expect(mockMigrate).toHaveBeenCalledTimes(1);
				expect(mockLog).toHaveBeenCalledTimes(2);
			});

			test("Should throw error, and exit, if issue encountered", async () => {
				const mockMigrate = jest.fn().mockImplementation(async () => {
					throw new Error();
				});

				const mockLog = jest
					.spyOn(console, "error")
					// Used to silence log printing to CLI
					.mockImplementation(() => {});

				Postgrator.mockImplementation(() => ({ migrate: mockMigrate }));

				await migrate();

				expect(process.exitCode).toBe(1);
				expect(mockMigrate).toHaveBeenCalledTimes(1);
				expect(mockLog).toHaveBeenCalledTimes(1);
			});
		});
	});
});
