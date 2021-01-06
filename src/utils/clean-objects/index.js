/**
 * @author Frazer Smith
 * @author Felix Meyer-Wolters
 * @description Removes key value pairs from an object where the value is null or undefined.
 * Adapted from Felix's answer at https://stackoverflow.com/a/38340730
 * @param {object=} object - Object to be parsed and cleaned.
 * @returns {object} cleaned object.
 *
 */
module.exports = function util(object = {}) {
	const obj = object;
	Object.keys(obj).forEach((key) => {
		if (obj[key] && typeof obj[key] === "object") {
			util(obj[key]); // recursive
		} else if (obj[key] === null || obj[key] === undefined) {
			// eslint-disable-next-line no-param-reassign
			delete obj[key];
		}
	});
	return obj;
};
