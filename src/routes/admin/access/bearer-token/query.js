const escSq = require("../../../../utils/escape-single-quotes");

/**
 * @author Frazer Smith
 * @description Build SQL query string.
 * @param {object} options - Query string and database config values.
 * @param {string} options.id - Logical id of the artifact.
 * @returns {string} Query string.
 */
const accessDelete = ({ id }) => escSq`DELETE
 FROM access.tokens
 WHERE id = '${id}';`;

/**
 * @author Frazer Smith
 * @description Build SQL query string.
 * @param {object} options - Query string and database config values.
 * @param {string} options.id - Logical id of the artifact.
 * @returns {string} Query string.
 */
const accessGetRead = ({ id }) => escSq`SELECT
    id,
    name,
    email,
    scopes,
    hash,
    salt,
    expires,
    created,
    last_updated
FROM access.tokens
WHERE id = '${id}';`;

/**
 * @author Frazer Smith
 * @description Build SQL query string.
 * @param {object} options - Query string and database config values.
 * @param {string} options.whereClausePredicates - WHERE clause predicates.
 * @param {number} options.page - Page to retrieve.
 * @param {number} options.perPage - Number of bearer token records to return per page.
 * @returns {string} Query string.
 */
const accessGetSearch = ({ whereClausePredicates, page, perPage }) => `
SELECT COUNT(DISTINCT id) AS total
FROM access.tokens
WHERE ${whereClausePredicates};

SELECT DISTINCT
    id,
    name,
    email,
    scopes,
    hash,
    salt,
    expires,
    created,
    last_updated
FROM access.tokens
WHERE ${whereClausePredicates}
ORDER BY created DESC
OFFSET ${page * perPage} ROWS
FETCH NEXT ${perPage} ROWS ONLY;`;

/**
 * @author Frazer Smith
 * @description Build SQL query string.
 * @param {object} options - Query string and database config values.
 * @param {('mssql'|'postgresql')} options.client - Database client.
 * @param {string} options.name - Type of matching value.
 * @param {string} options.email - Matching Value.
 * @param {string} options.scopes - JSON string containing actions the bearer token can perform.
 * @param {string} options.hash - Hashed bearer token.
 * @param {string} options.salt - Salt used on hashed bearer token.
 * @param {string=} options.expires - Datetime the bearer token expires.
 * @returns {string} Query string.
 */
const accessPost = ({ client, name, email, scopes, hash, salt, expires }) =>
	escSq`INSERT INTO access.tokens (name, email, scopes, hash, salt, expires)
    ${client === "mssql" ? "OUTPUT Inserted.id, Inserted.scopes" : ""}
    VALUES ('${name}', '${email}', '${scopes}', '${hash}', '${salt}', '${expires}')
    ${client === "postgresql" ? "RETURNING id, scopes" : ""};`;

module.exports = {
	accessDelete,
	accessGetRead,
	accessGetSearch,
	accessPost,
};
