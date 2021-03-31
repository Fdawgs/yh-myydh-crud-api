const Util = require(".");

const obj = {
	test1: undefined,
	test2: null,
	test3: [{ testobj: null }],
	test4: 2,
};

describe("Object Cleaning Utility", () => {
	test("Should return object", () => {
		const util = Util();

		expect(typeof util).toBe("object");
	});
	test("Should remove key where value is undefined or null", () => {
		const util = Util(obj);

		expect(typeof util.test1).toBe("undefined");
		expect(typeof util.test2).toBe("undefined");
		expect(Object.keys(util.test3[0]).length).toBe(0);
		expect(util.test4).toBe(2);
	});
});
