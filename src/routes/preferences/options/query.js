"use strict";

const escSq = require("../../../utils/escape-single-quotes");

/**
 * @author Frazer Smith
 * @description Builds SQL query string.
 * @param {object} options - Query string and database config values.
 * @param {string} options.patientPreferencesTypeTable - Name and schema of patient preferences type table.
 * @param {string} options.patientPreferencesValueTable - Name and schema of patient preferences value table.
 * @returns {string} Query string.
 */
const optionsSelect = ({
	patientPreferencesTypeTable,
	patientPreferencesValueTable,
}) => escSq`
SELECT pptype.preference_type_id AS "preferenceTypeId",
pptype.preference_type AS "preferenceTypeDisplay"
FROM ${patientPreferencesTypeTable} pptype;

SELECT pptype.preference_type_id AS "preferenceTypeId",
pptype.preference_type AS "preferenceTypeDisplay",
ppvalue.preference_value AS "preferenceOptionDisplay",
ppvalue.preference_value_id AS "preferenceOptionValue"
FROM ${patientPreferencesTypeTable} pptype
CROSS JOIN ${patientPreferencesValueTable} ppvalue;`;

module.exports = { optionsSelect };
