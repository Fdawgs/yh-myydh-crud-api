const receiptDelete = ({ id, patientId, readReceiptTable }) => `DELETE
FROM ${readReceiptTable}
WHERE guid = '${id}'
   AND patient_id = '${patientId}';`;

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
