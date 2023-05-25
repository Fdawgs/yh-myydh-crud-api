const escSq = require("../../../utils/escape-single-quotes");

/**
 * @author Frazer Smith
 * @description Builds SQL query string.
 * @param {object} options - Query string and database config values.
 * @param {('mssql'|'postgresql')} options.dbClient - Database client.
 * @param {string} options.patientId - Unique patient identifier.
 * @param {number} options.preferenceTypeId - Preference Type ID.
 * @param {number} options.preferenceValueId - Preference Value ID.
 * @param {number} options.preferencePriority - Preference Priority.
 * @param {string} options.patientPreferencesTable - Name and schema of patient preferences table.
 * @returns {string} Query string.
 */
const userInsert = ({
	dbClient,
	patientId,
	preferenceTypeId,
	preferenceValueId,
	preferencePriority,
	patientPreferencesTable,
}) => {
	if (dbClient === "postgresql") {
		return escSq`INSERT INTO ${patientPreferencesTable} (patient_id, preference_type_id, preference_value_id, preference_priority, created)
		VALUES('${patientId}', '${preferenceTypeId}', '${preferenceValueId}', '${preferencePriority}', CURRENT_TIMESTAMP)
		ON CONFLICT ON CONSTRAINT ck_patient_preference
		DO
   		UPDATE
		SET preference_priority = '${preferencePriority}',
		preference_value_id = '${preferenceValueId}',
		last_updated = CURRENT_TIMESTAMP;`;
	}

	return escSq`IF EXISTS(SELECT patient_id
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

/**
 * @author Frazer Smith
 * @description Builds SQL query string.
 * @param {object} options - Query string and database config values.
 * @param {string} options.patientId - Unique patient identifier.
 * @param {string} options.patientPreferencesTable - Name and schema of patient preferences table.
 * @param {string} options.patientPreferencesTypeTable - Name and schema of patient preferences type table.
 * @param {string} options.patientPreferencesValueTable - Name and schema of patient preferences value table.
 * @returns {string} Query string.
 */
const userSelect = ({
	patientId,
	patientPreferencesTable,
	patientPreferencesTypeTable,
	patientPreferencesValueTable,
}) => escSq`SELECT pat.patient_id AS "id",
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
