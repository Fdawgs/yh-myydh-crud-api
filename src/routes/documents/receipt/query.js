/**
 * @author Frazer Smith
 * @description Build SQL query string.
 * @param {object} options - Query string and database config values.
 * @param {string} options.id - Logical id of the artifact.
 * @param {string} options.patientId - Unique patient identifier.
 * @param {string} options.readReceiptTable - Name and schema of document read receipt table.
 * @returns {string} Query string.
 */
const receiptDelete = ({ id, patientId, readReceiptTable }) => `DELETE
FROM ${readReceiptTable}
WHERE guid = '${id}'
   AND patient_id = '${patientId}';`;

/**
 * @author Frazer Smith
 * @description Build SQL query string.
 * @param {object} options - Query string and database config values.
 * @param {('mssql'|'postgresql')} options.dbClient - Database client.
 * @param {string} options.id - Logical id of the artifact.
 * @param {string} options.patientId - Unique patient identifier.
 * @param {string} options.timestamp - Read time of document.
 * @param {string} options.readReceiptTable - Name and schema of document read receipt table.
 * @returns {string} Query string.
 */
const receiptInsert = ({
	dbClient,
	id,
	patientId,
	timestamp,
	readReceiptTable,
}) => {
	if (dbClient === "postgresql") {
		return `INSERT INTO ${readReceiptTable} (guid, patient_id, ts)
      VALUES('${id}', '${patientId}', '${timestamp}')
		ON CONFLICT ON CONSTRAINT ck_document_receipt
		DO
   	UPDATE
		SET ts = '${timestamp}';`;
	}

	return `IF EXISTS(SELECT guid
        FROM ${readReceiptTable}
          WHERE guid = '${id}'
          AND patient_id = '${patientId}')
UPDATE ${readReceiptTable}
 SET ts = '${timestamp}'
WHERE guid = '${id}'
 AND patient_id = '${patientId}'
 ELSE
INSERT INTO ${readReceiptTable} (guid, patient_id, ts)
   VALUES('${id}', '${patientId}', '${timestamp}');`;
};

module.exports = { receiptDelete, receiptInsert };
