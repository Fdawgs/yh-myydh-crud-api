/**
 * @author Frazer Smith
 * @author NextGen Healthcare
 * @param {string} operator - Date param operator.
 * @description Convert date param operator to corresponding value.
 * @returns {string} converted date param operator.
 */
module.exports = function util(operator) {
	switch (operator.toLowerCase()) {
		case "ap":
			return "=";
		case "eb":
			return "<";
		case "eq":
			return "=";
		case "ge":
			return ">=";
		case "gt":
			return ">";
		case "le":
			return "<=";
		case "lt":
			return "<";
		case "ne":
			return "!=";
		case "sa":
			return ">";
		default:
			return "=";
	}
};
