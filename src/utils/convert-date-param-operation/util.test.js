const Util = require(".");

describe("Data Param Operator Utility", () => {
	test("Should return expected value", () => {
		const values = {
			ap: "=",
			eb: "<",
			eq: "=",
			ge: ">=",
			gt: ">",
			le: "<=",
			lt: "<",
			ne: "!=",
			sa: ">",
			failure: "=",
		};

		Object.keys(values).forEach((key) => {
			const result = Util(key);
			expect(result).toEqual(values[key]);
		});
	});
});
