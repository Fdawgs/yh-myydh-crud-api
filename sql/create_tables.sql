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

CREATE TABLE lookup.preferenceType
(
    preferenceTypeId INT IDENTITY(1,1) NOT NULL,
    preferenceType VARCHAR(MAX) NOT NULL,
    CONSTRAINT PK_PreferenceTypeId PRIMARY KEY (preferenceTypeId)
);
GO

CREATE TABLE lookup.preferenceValue
(
    preferenceValueId INT IDENTITY(1,1) NOT NULL,
    preferenceValue VARCHAR(255) NOT NULL,
    CONSTRAINT PK_PreferenceValueId PRIMARY KEY (preferenceValueId)
);
GO

CREATE TABLE patient.preferences
(
    patientId VARCHAR(255) NOT NULL,
    preferenceTypeId INT NOT NULL,
    preferenceValueId INT NULL,
    preferencePriority INT NULL,
    created DATETIME NOT NULL,
    lastUpdated DATETIME,
    CONSTRAINT CK_PatientPreference PRIMARY KEY (patientId, preferenceTypeId),
    CONSTRAINT FK_PreferenceType FOREIGN KEY (preferenceTypeId) REFERENCES lookup.preferenceType(preferenceTypeId),
    CONSTRAINT FK_PreferenceValue FOREIGN KEY (preferenceValueId) REFERENCES lookup.preferenceValue(preferenceValueid)
);
GO 


CREATE TABLE receipt.documents
(
    patientId VARCHAR(255) NOT NULL,
    [guid] CHAR(36) NOT NULL,
    ts DATETIME NOT NULL,
    CONSTRAINT CK_DocumentReceipt PRIMARY KEY (patientId, [guid])
);
GO 