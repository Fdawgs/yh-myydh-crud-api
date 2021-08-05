SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE SCHEMA lookup;
GO

CREATE SCHEMA patient;
GO

CREATE SCHEMA receipt;
GO

CREATE SCHEMA register;
GO

CREATE TABLE lookup.preference_type
(
    preference_type_id INT IDENTITY(1,1) NOT NULL,
    preference_type VARCHAR(MAX) NOT NULL,
    CONSTRAINT pk_preference_type_id PRIMARY KEY (preference_type_id)
);
GO

CREATE TABLE lookup.preference_value
(
    preference_value_id INT IDENTITY(1,1) NOT NULL,
    preference_value VARCHAR(255) NOT NULL,
    CONSTRAINT pk_preference_value_id PRIMARY KEY (preference_value_id)
);
GO

CREATE TABLE patient.preferences
(
    patient_id VARCHAR(255) NOT NULL,
    preference_type_id INT NOT NULL,
    preference_value_id INT NULL,
    preference_priority INT NULL,
    created DATETIME NOT NULL,
    last_updated DATETIME,
    CONSTRAINT ck_patient_preference PRIMARY KEY (patient_id, preference_type_id),
    CONSTRAINT fk_preference_type FOREIGN KEY (preference_type_id) REFERENCES lookup.preference_type(preference_type_id),
    CONSTRAINT fk_preference_value FOREIGN KEY (preference_value_id) REFERENCES lookup.preference_value(preference_value_id)
);
GO

CREATE TABLE receipt.documents
(
    patient_id VARCHAR(255) NOT NULL,
    guid CHAR(36) NOT NULL,
    ts DATETIME NOT NULL,
    CONSTRAINT ck_document_receipt PRIMARY KEY (patient_id, guid)
);
GO

-- This table was created independent of this API, thus the mixture of snake case and camel case
CREATE TABLE register.documents
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
)
GO 