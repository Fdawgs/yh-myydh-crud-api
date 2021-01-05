/**
 * Fastify uses AJV for JSON Schema Validation,
 * see https://www.fastify.io/docs/latest/Validation-and-Serialization/
 *
 * This validation protects against XSS and HPP attacks.
 */
const headerSchema = {
	type: "object",
	properties: {
		Authorization: {
			description: "Bearer token for authorization",
			examples: ["Bearer testtoken"],
			type: "string",
		},
	},
	required: ["Authorization"],
};

// TODO: Add 300 response schema
const registerGetSchema = {
	description: "Retrieve document metadata from register",
	headers: headerSchema,
	querystring: {
		type: "object",
		properties: {
			lastModified: {
				description: "Last modified datetime of document",
				examples: [
					"2021-01-01",
					"ge2021-01-01T00:00:01",
					"ge2021-01-01",
					"2021-01-01T00:00:01",
				],
				type: "string",
				pattern:
					"^(?:eq|ne|ge|le|gt|lt|sa|eb|ap|)\\d{4}-\\d{2}-\\d{2}(?:T\\d{2}\\:\\d{2}\\:\\d{2}|)$",
			},
			page: {
				description: "Page to retrieve",
				default: "1",
				examples: ["1", "10"],
				type: "string",
				pattern: "^\\d{1,}$",
			},
			perPage: {
				description: "Number of documents to return per page",
				default: "1",
				examples: ["1", "10"],
				type: "string",
				pattern: "^\\d{1,}$",
			},
		},
		required: ["lastModified"],
	},
	response: {
		200: {
			type: "object",
			properties: {
				data: {
					type: "array",
					items: {
						type: "object",
						properties: {
							GUID: {
								examples: ["EXAMPLE-GUID"],
								type: "string",
							},
							fhir_id: {
								examples: ["99999"],
								type: "number",
							},
							Title: {
								examples: [
									"99999   DUCK 11 July 2015 11 27.pdf",
								],
								type: "string",
							},
							Clinic: {
								examples: ["CLO/BIA"],
								type: "string",
							},
							Document_Type: {
								examples: ["Clinic Letter"],
								type: "string",
							},
							Filesname: {
								examples: [
									"99999   DUCK 11 July 2015 11 27.pdf",
								],
								type: "string",
							},
							URL: {
								examples: [
									"https://notreal.ydh.nhs.uk/sites/MedicalRecords1/_layouts/15/DocIdRedir.aspx?ID=EXAMPLE-GUID",
								],
								type: "string",
							},
							CreatedDate: {
								examples: ["2015-09-30T05:40:14.000Z"],
								format: "date-time",
								type: "string",
							},
							Modified: {
								examples: ["2020-08-10T03:51:54.000Z"],
								format: "date-time",
								type: "string",
							},
							Specialty: {
								examples: ["General Surgery"],
								type: "string",
							},
						},
					},
				},

				meta: {
					type: "object",
					properties: {
						pagination: {
							type: "object",
							properties: {
								total: {
									examples: [0, 1, 10],
									type: "number",
								},
								per_page: {
									default: 1,
									examples: [1, 10],
									type: "number",
								},
								current_page: {
									default: 1,
									examples: [1, 10],
									type: "number",
								},
								total_pages: {
									examples: [1, 10],
									type: "number",
								},
							},
						},
					},
				},
			},
		},
	},
};

// TODO: Add 200 and 300 response schema
const receiptDeleteSchema = {
	description: "Delete document read receipt",
	headers: headerSchema,
	params: {
		type: "object",
		properties: {
			id: {
				description: "Logical id of the artifact",
				examples: ["EXAMPLE-GUID"],
				type: "number",
			},
		},
		required: ["id"],
	},
	querystring: {
		type: "object",
		properties: {
			patientId: {
				description: "Unique patient identifier",
				examples: [9999999999],
				type: "number",
			},
		},
		required: ["patientId"],
	},
};

// TODO: Add 200 and 300 response schema
const receiptPutSchema = {
	description: "Create document read receipt",
	headers: headerSchema,
	params: {
		type: "object",
		properties: {
			id: {
				description: "Logical id of the artifact",
				examples: ["EXAMPLE-GUID"],
				type: "number",
			},
		},
		required: ["id"],
	},
	querystring: {
		type: "object",
		properties: {
			patientId: {
				description: "Unique patient identifier",
				examples: [9999999999],
				type: "number",
			},
			timestamp: {
				description: "Read time of document",
				format: "date-time",
				type: "string",
			},
		},
		required: ["patientId", "timestamp"],
	},
};

module.exports = { registerGetSchema, receiptDeleteSchema, receiptPutSchema };
