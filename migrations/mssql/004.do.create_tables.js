// eslint-disable-next-line func-names
module.exports.generateSql = function () {
	return `IF OBJECT_ID('access.tokens', 'U') IS NULL CREATE TABLE access.tokens
    (
        id uniqueidentifier PRIMARY KEY NOT NULL DEFAULT newid(),
        [name] VARCHAR(MAX) NOT NULL,
        email VARCHAR(MAX) NOT NULL,
        [hash] VARCHAR(MAX) NOT NULL,
        salt VARCHAR(MAX) NOT NULL,
        scopes NVARCHAR(MAX) NOT NULL,
        expires DATETIME2 NOT NULL,
        created DATETIME2 NOT NULL DEFAULT CURRENT_TIMESTAMP,
        last_updated DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    );  
    
    
    IF OBJECT_ID('${process.env.DB_PATIENT_PREFERENCES_TYPE_TABLE}', 'U') IS NULL CREATE TABLE ${process.env.DB_PATIENT_PREFERENCES_TYPE_TABLE}
    (
        preference_type_id INT IDENTITY(1,1) NOT NULL,
        preference_type VARCHAR(MAX) NOT NULL,
        CONSTRAINT pk_preference_type_id PRIMARY KEY (preference_type_id)
    );
    
    IF OBJECT_ID('${process.env.DB_PATIENT_PREFERENCES_VALUE_TABLE}', 'U') IS NULL CREATE TABLE ${process.env.DB_PATIENT_PREFERENCES_VALUE_TABLE}
    (
        preference_value_id INT IDENTITY(1,1) NOT NULL,
        preference_value VARCHAR(255) NOT NULL,
        CONSTRAINT pk_preference_value_id PRIMARY KEY (preference_value_id)
    );
    
    IF OBJECT_ID('${process.env.DB_PATIENT_PREFERENCES_TABLE}', 'U') IS NULL CREATE TABLE ${process.env.DB_PATIENT_PREFERENCES_TABLE}
    (
        patient_id VARCHAR(255) NOT NULL,
        preference_type_id INT NOT NULL,
        preference_value_id INT NULL,
        preference_priority INT NULL,
        created DATETIME NOT NULL,
        last_updated DATETIME,
        CONSTRAINT ck_patient_preference PRIMARY KEY (patient_id, preference_type_id),
        CONSTRAINT fk_preference_type FOREIGN KEY (preference_type_id) REFERENCES ${process.env.DB_PATIENT_PREFERENCES_TYPE_TABLE}(preference_type_id),
        CONSTRAINT fk_preference_value FOREIGN KEY (preference_value_id) REFERENCES ${process.env.DB_PATIENT_PREFERENCES_VALUE_TABLE}(preference_value_id)
    );
    
    IF OBJECT_ID('${process.env.DB_READ_RECEIPT_DOCS_TABLE}', 'U') IS NULL CREATE TABLE ${process.env.DB_READ_RECEIPT_DOCS_TABLE}
    (
        patient_id VARCHAR(255) NOT NULL,
        guid CHAR(36) NOT NULL,
        ts DATETIME NOT NULL,
        CONSTRAINT ck_document_receipt PRIMARY KEY (patient_id, guid)
    );
    
    -- This table was created independent of this API, thus the mixture of snake case and camel case
    IF OBJECT_ID('${process.env.DB_DOCUMENT_REGISTER_TABLE}', 'U') IS NULL CREATE TABLE ${process.env.DB_DOCUMENT_REGISTER_TABLE}
    (
        GUID NVARCHAR(36) NOT NULL,
        fhir_id NVARCHAR(19) NULL,
        Title NVARCHAR(191) NULL,
        Clinic NVARCHAR(191) NULL,
        Document_Type NVARCHAR(191) NULL,
        Filesname NVARCHAR(191) NULL,
        URL NVARCHAR(191) NULL,
        Patient_Visible TINYINT NULL,
        CreatedDate DATETIME NULL,
        Modified DATETIME NULL,
        Specialty NVARCHAR(100) NULL,
        FullPath NVARCHAR(555) NULL,
        BaseURL NVARCHAR(50) NULL,
        BaseSite NVARCHAR(50) NULL,
        CONSTRAINT pk_documents_guid PRIMARY KEY (GUID)
    )`;
};
