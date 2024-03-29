"use strict";

const Postgrator = require("postgrator");
const migrate = require("./migrate");

jest.mock("postgrator");
// Mock MSSQL and PostgreSQL clients to prevent DB connection attempts
jest.mock("mssql", () => ({
	ConnectionPool: jest.fn().mockImplementation(() => ({
		connect: jest.fn().mockResolvedValue(undefined),
		close: jest.fn().mockResolvedValue(undefined),
		config: { database: "test" },
	})),
}));
jest.mock("pg");

describe("Migrate script", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

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
	describe.each(connectionTests)("$testName", ({ envVariables }) => {
		beforeAll(() => {
			Object.assign(process.env, envVariables);
		});

		it("Runs migrations", async () => {
			const mockMigrate = jest.fn().mockResolvedValue([]);
			const mockLog = jest
				.spyOn(console, "log")
				// Used to silence log printing to CLI
				.mockImplementation(() => {});

			// @ts-ignore
			Postgrator.mockImplementation(() => ({ migrate: mockMigrate }));

			await migrate();

			expect(mockMigrate).toHaveBeenCalledTimes(1);
			expect(mockLog).toHaveBeenCalledTimes(2);
			expect(mockLog).toHaveBeenNthCalledWith(
				1,
				"No migrations run, already on latest schema version"
			);
			expect(mockLog).toHaveBeenNthCalledWith(2, "Migration complete");

			mockLog.mockRestore();
		});

		it("Runs migrations and only logs once if migrations run", async () => {
			const mockMigrate = jest.fn().mockResolvedValue([1]);
			const mockLog = jest
				.spyOn(console, "log")
				// Used to silence log printing to CLI
				.mockImplementation(() => {});

			// @ts-ignore
			Postgrator.mockImplementation(() => ({ migrate: mockMigrate }));

			await migrate();

			expect(mockMigrate).toHaveBeenCalledTimes(1);
			expect(mockLog).toHaveBeenCalledTimes(1);
			expect(mockLog).toHaveBeenNthCalledWith(1, "Migration complete");

			mockLog.mockRestore();
		});

		it("Throws error, and exits, if issue encountered", async () => {
			const mockMigrate = jest.fn().mockImplementation(async () => {
				throw new Error();
			});
			const mockLog = jest
				.spyOn(console, "error")
				// Used to silence log printing to CLI
				.mockImplementation(() => {});

			// @ts-ignore
			Postgrator.mockImplementation(() => ({ migrate: mockMigrate }));

			await migrate();

			expect(process.exitCode).toBe(1);
			expect(mockMigrate).toHaveBeenCalledTimes(1);
			expect(mockLog).toHaveBeenCalledWith(expect.any(Error));

			mockLog.mockRestore();
		});
	});
});
