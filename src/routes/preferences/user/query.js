// Double-quoted alias required as PostgreSQL automatically converts columns to lower case if not quoted
const userInsert = ({
	dbClient,
	patientId,
	preferenceTypeId,
	preferenceValueId,
	preferencePriority,
	patientPreferencesTable,
}) => {
	if (dbClient === "postgresql") {
		return `INSERT INTO ${patientPreferencesTable} (patient_id, preference_type_id, preference_value_id, preference_priority, created)
		VALUES('${patientId}', '${preferenceTypeId}', '${preferenceValueId}', '${preferencePriority}', CURRENT_TIMESTAMP)
		ON CONFLICT ON CONSTRAINT ck_patient_preference
		DO
   		UPDATE
		SET preference_priority = '${preferencePriority}',
		preference_value_id = '${preferenceValueId}',
		last_updated = CURRENT_TIMESTAMP;`;
	}

	return `IF EXISTS(SELECT patient_id
		FROM ${patientPreferencesTable}
		WHERE patient_id = '${patientId}'
		AND preference_type_id = '${preferenceTypeId}')
		UPDATE ${patientPreferencesTable}
		SET preference_priority = '${preferencePriority}',
		preference_value_id = '${preferenceValueId}',
		last_updated = CURRENT_TIMESTAMP
		WHERE patient_id = '${patientId}'
		AND preference_type_id = '${preferenceTypeId}'
		ELSE
		INSERT INTO ${patientPreferencesTable} (patient_id, preference_type_id, preference_value_id, preference_priority, created)
		VALUES('${patientId}', '${preferenceTypeId}', '${preferenceValueId}', '${preferencePriority}', CURRENT_TIMESTAMP);`;
};

const userSelect = ({
	patientId,
	patientPreferencesTable,
	patientPreferencesTypeTable,
	patientPreferencesValueTable,
}) => `SELECT pat.patient_id AS "id",
pat.created AS "metaCreated",
pat.last_updated AS "metaLastUpdated",
pat.preference_value_id AS "preferenceValueId",
pat.preference_type_id AS "preferenceTypeId",
pptype.preference_type AS "preferenceTypeDisplay",
pat.preference_priority AS "preferenceTypePriority"
FROM ${patientPreferencesTable} pat
LEFT JOIN ${patientPreferencesTypeTable} pptype
ON pat.preference_type_id = pptype.preference_type_id
WHERE patient_id = '${patientId}';

SELECT pptype.preference_type_id AS "preferenceTypeId",
pptype.preference_type AS "preferenceTypeDisplay",
ppvalue.preference_value AS "preferenceOptionDisplay",
ppvalue.preference_value_id AS "preferenceOptionValue"
FROM ${patientPreferencesTypeTable} pptype
CROSS JOIN ${patientPreferencesValueTable} ppvalue;
`;

module.exports = { userInsert, userSelect };
