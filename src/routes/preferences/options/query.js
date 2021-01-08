const optionsSelect = ({
	patientPreferencesTypeTable,
	patientPreferencesValueTable,
}) => `
SELECT prefType.preferenceTypeId AS preference_type_id,
prefType.preferenceType AS preference_type_display
FROM ${patientPreferencesTypeTable} prefType;

SELECT prefType.preferenceTypeId AS preference_type_id,
prefType.preferenceType AS preference_type_display,
prefVal.preferenceValue AS preference_option_display,
prefVal.preferenceValueId AS preference_option_value
FROM ${patientPreferencesTypeTable} prefType
CROSS JOIN ${patientPreferencesValueTable} prefVal;`;

module.exports = { optionsSelect };
