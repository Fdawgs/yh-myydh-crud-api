const receiptDelete = ({ id, patientId, readReceiptTable }) => `DELETE
FROM ${readReceiptTable}
WHERE guid = '${id}'
   AND patient_id = '${patientId}';`;

const receiptInsert = ({
	id,
	patientId,
	timestamp,
	readReceiptTable,
}) => `IF EXISTS(SELECT guid
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

module.exports = { receiptDelete, receiptInsert };
