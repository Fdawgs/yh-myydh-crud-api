"use strict";

/**
 * @author Frazer Smith
 * @description Builds SQL query string.
 * @param {object} options - Query string and database config values.
 * @param {('mssql'|'postgresql')} options.client - Database client.
 * @param {string} options.whereClausePredicates - WHERE clause predicates.
 * @param {string} options.documentRegisterTable - Name and schema of document register table.
 * @param {number} options.page - Page to retrieve.
 * @param {number} options.perPage - Number of documents to return per page.
 * @returns {string} Query string.
 */
const registerSelect = ({
	client,
	whereClausePredicates,
	documentRegisterTable,
	page,
	perPage,
}) => `
SELECT COUNT(*)${
	/**
	 * Cast from string to int.
	 * @see {@link https://node-postgres.com/features/types | Node-Postgres Type Parsing}
	 */
	client === "postgresql" ? "::int" : ""
} AS total
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
ORDER BY CreatedDate ASC
OFFSET ${page * perPage} ROWS
FETCH NEXT ${perPage} ROWS ONLY;`;

module.exports = { registerSelect };
