const registerSelect = ({
	timestamp,
	operator,
	documentRegisterTable,
	page,
	perPage,
}) => `
SELECT COUNT(*) AS total
FROM ${documentRegisterTable}
WHERE Modified ${operator} '${timestamp}';

SELECT GUID AS 'guid',
fhir_id,
Title AS 'title',
Specialty AS 'specialty',
Clinic AS 'clinic',
Document_Type AS 'document_type',
Filesname AS 'file_name',
URL AS 'url',
CreatedDate AS 'created_date',
Modified AS 'modified'
FROM ${documentRegisterTable}
WHERE Modified ${operator} '${timestamp}'
ORDER BY Modified DESC
OFFSET ${page * perPage} ROWS
FETCH NEXT ${perPage} ROWS ONLY`;

module.exports = { registerSelect };
