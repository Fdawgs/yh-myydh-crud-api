// Double-quoted alias required as PostgreSQL automatically converts columns to lower case if not quoted
const registerSelect = ({
	whereClausePredicates,
	documentRegisterTable,
	page,
	perPage,
}) => `
SELECT COUNT(*) AS total
FROM ${documentRegisterTable}
WHERE ${whereClausePredicates};

SELECT GUID AS guid,
fhir_id AS "fhirId",
Title AS title,
Specialty AS specialty,
Clinic AS clinic,
Document_Type AS "documentType",
Filesname AS "fileName",
BaseURL AS "baseUrl",
BaseSite AS "baseSite",
FullPath AS "fullPath",
URL AS url,
CreatedDate AS "createdDate",
Modified AS "modifiedDate",
patient_visible AS "patientVisible"
FROM ${documentRegisterTable}
WHERE ${whereClausePredicates}
ORDER BY Modified DESC
OFFSET ${page * perPage} ROWS
FETCH NEXT ${perPage} ROWS ONLY;`;

module.exports = { registerSelect };
