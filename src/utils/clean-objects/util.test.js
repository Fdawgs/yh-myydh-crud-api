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

		expect(typeof util).toEqual("object");
	});
	test("Should remove key where value is undefined or null", () => {
		const util = Util(obj);

		expect(typeof util.test1).toEqual("undefined");
		expect(typeof util.test2).toEqual("undefined");
		expect(Object.keys(util.test3[0]).length).toEqual(0);
		expect(util.test4).toEqual(2);
	});
});
