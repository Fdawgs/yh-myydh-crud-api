// Double-quoted alias required as PostgreSQL automatically converts columns to lower case if not quoted
const optionsSelect = ({
	patientPreferencesTypeTable,
	patientPreferencesValueTable,
}) => `
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
