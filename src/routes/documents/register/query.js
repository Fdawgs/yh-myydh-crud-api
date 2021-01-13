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

SELECT GUID AS guid,
fhir_id AS fhirId,
Title AS title,
Specialty AS specialty,
Clinic AS clinic,
Document_Type AS documentType,
Filesname AS fileName,
FullPath AS fullPath,
URL AS url,
CreatedDate AS createdDate,
Modified AS modifiedDate,
patient_visible AS patientVisible
FROM ${documentRegisterTable}
WHERE Modified ${operator} '${timestamp}'
ORDER BY Modified DESC
OFFSET ${page * perPage} ROWS
FETCH NEXT ${perPage} ROWS ONLY;`;

module.exports = { registerSelect };
