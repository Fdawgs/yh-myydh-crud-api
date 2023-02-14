const util = require(".");

describe("Escape-Single-Quote util", () => {
	test("Should replace single-quote character in string expression with two adjacent single quotes", () => {
		const response = util`${"Yeovil's"} Hospital`;
		expect(response).toBe("Yeovil''s Hospital");
	});

	test("Should fail to replace single-quote character in object expression with two adjacent single quotes", () => {
		const response = util`${{ "Yeovil's": "test" }} Hospital`;
		expect(response).toBe("[object Object] Hospital");
	});

	test("Should fail to replace single-quote character in array expression with two adjacent single quotes", () => {
		const response = util`${["Yeovil's", "Bar's"]} Hospital`;
		expect(response).toBe("Yeovil's,Bar's Hospital");
	});
});
