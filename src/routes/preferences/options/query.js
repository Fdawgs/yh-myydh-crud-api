const optionsSelect = ({
	patientPreferencesTypeTable,
	patientPreferencesValueTable,
}) => `
SELECT prefType.preferenceTypeId,
prefType.preferenceType AS preferenceTypeDisplay
FROM ${patientPreferencesTypeTable} prefType;

SELECT prefType.preferenceTypeId,
prefType.preferenceType AS preferenceTypeDisplay,
prefVal.preferenceValue AS preferenceOptionDisplay,
prefVal.preferenceValueId AS preferenceOptionValue
FROM ${patientPreferencesTypeTable} prefType
CROSS JOIN ${patientPreferencesValueTable} prefVal;`;

module.exports = { optionsSelect };
