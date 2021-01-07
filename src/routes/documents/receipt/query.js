const receiptDelete = ({ id, patientId, readReceiptTable }) => `DELETE
FROM ${readReceiptTable}
WHERE guid = '${id}'
   AND patientId = '${patientId}'`;

const receiptInsert = ({
	id,
	patientId,
	timestamp,
	readReceiptTable,
}) => `IF EXISTS(SELECT guid 
        FROM ${readReceiptTable}
          WHERE guid = '${id}'
          AND patientId = '${patientId}')
UPDATE ${readReceiptTable}
 SET ts = '${timestamp}'
WHERE guid = '${id}'
 AND patientId = '${patientId}'
 ELSE
INSERT INTO ${readReceiptTable} (guid, patientId, ts)
   VALUES('${id}', '${patientId}', '${timestamp}')`;

module.exports = { receiptDelete, receiptInsert };
