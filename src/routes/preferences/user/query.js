const userInsert = ({
	patientId,
	preferenceTypeId,
	preferenceValueId,
	preferencePriority,
	patientPreferencesTable,
}) => `IF EXISTS(SELECT patientId 
FROM ${patientPreferencesTable}
WHERE patientId = '${patientId}'
AND preferenceTypeId = '${preferenceTypeId}')
UPDATE ${patientPreferencesTable}
SET preferencePriority = '${preferencePriority}',
preferenceValueId = '${preferenceValueId}',
lastUpdated = CURRENT_TIMESTAMP
WHERE patientId = '${patientId}'
AND preferenceTypeId = '${preferenceTypeId}'
ELSE
INSERT INTO ${patientPreferencesTable} (patientId, preferenceTypeId, preferenceValueId, preferencePriority, created)
VALUES('${patientId}', '${preferenceTypeId}', '${preferenceValueId}', '${preferencePriority}', CURRENT_TIMESTAMP)`;

const userSelect = ({
	patientId,
	patientPreferencesTable,
	patientPreferencesTypeTable,
	patientPreferencesValueTable,
}) => `SELECT pat.patientId AS id,
pat.created AS meta_created,
pat.lastUpdated AS meta_lastupdated,
pat.preferenceValueId,
pat.preferenceTypeId AS preference_type_id,
prefType.preferenceType AS preference_type_display,
pat.preferencePriority AS preference_type_priority
FROM ${patientPreferencesTable} pat
LEFT JOIN ${patientPreferencesTypeTable} prefType
ON pat.preferenceTypeId = prefType.preferenceTypeId
WHERE patientId = '${patientId}';

SELECT prefType.preferenceTypeId AS preference_type_id,
prefType.preferenceType AS preference_type_display,
prefVal.preferenceValue AS preference_option_display,
prefVal.preferenceValueId AS preference_option_value
FROM ${patientPreferencesTypeTable} prefType
CROSS JOIN ${patientPreferencesValueTable} prefVal;
`;

module.exports = { userInsert, userSelect };
