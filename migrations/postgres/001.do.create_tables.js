module.exports.generateSql = function () {
	return `CREATE SCHEMA IF NOT EXISTS lookup;

        CREATE SCHEMA IF NOT EXISTS patient;
        
        CREATE SCHEMA IF NOT EXISTS receipt;
        
        CREATE SCHEMA IF NOT EXISTS register;
        
        CREATE TABLE IF NOT EXISTS ${process.env.DB_PATIENT_PREFERENCES_TYPE_TABLE}
        (
            preference_type_id INT GENERATED ALWAYS AS IDENTITY,
            preference_type VARCHAR NOT NULL,
            CONSTRAINT pk_preference_type_id PRIMARY KEY (preference_type_id)
        );
        
        CREATE TABLE IF NOT EXISTS ${process.env.DB_PATIENT_PREFERENCES_VALUE_TABLE}
        (
            preference_value_id INT GENERATED ALWAYS AS IDENTITY,
            preference_value VARCHAR NOT NULL,
            CONSTRAINT pk_preference_value_id PRIMARY KEY (preference_value_id)
        );
        
        CREATE TABLE IF NOT EXISTS ${process.env.DB_PATIENT_PREFERENCES_TABLE}
        (
            patient_id VARCHAR (255) NOT NULL,
            preference_type_id INT NOT NULL,
            preference_value_id INT NULL,
            preference_priority INT NULL,
            created TIMESTAMP NOT NULL,
            last_updated TIMESTAMP,
            CONSTRAINT ck_patient_preference PRIMARY KEY (patient_id, preference_type_id),
            CONSTRAINT fk_preference_type FOREIGN KEY (preference_type_id) REFERENCES lookup.preference_type (preference_type_id),
            CONSTRAINT fk_preference_value FOREIGN KEY (preference_value_id) REFERENCES lookup.preference_value (preference_value_id)
        );
        
        
        CREATE TABLE IF NOT EXISTS ${process.env.DB_READ_RECEIPT_DOCS_TABLE}
        (
            patient_id VARCHAR (255) NOT NULL,
            guid CHAR (36) NOT NULL,
            ts TIMESTAMP NOT NULL,
            CONSTRAINT ck_document_receipt PRIMARY KEY (patient_id, guid)
        );
        
        -- This table was created independent of this API, thus the mixture of snake case and camel case
        -- PostgreSQL will force these all to lower case columns
        CREATE TABLE
        IF NOT EXISTS ${process.env.DB_DOCUMENT_REGISTER_TABLE}
        (
            GUID VARCHAR (36) NOT NULL,
            fhir_id VARCHAR (19) NULL,
            Title VARCHAR (191) NULL,
            Clinic VARCHAR (191) NULL,
            Document_Type VARCHAR (191) NULL,
            Filesname VARCHAR (191) NULL,
            URL VARCHAR (191) NULL,
            Patient_Visible SMALLINT NULL,
            CreatedDate TIMESTAMP NULL,
            Modified TIMESTAMP NULL,
            Specialty VARCHAR (100) NULL,
            FullPath VARCHAR (555) NULL,
            BaseURL VARCHAR (50) NULL,
            BaseSite VARCHAR (50) NULL,
            CONSTRAINT pk_documents_guid PRIMARY KEY (GUID)
        );`;
};
