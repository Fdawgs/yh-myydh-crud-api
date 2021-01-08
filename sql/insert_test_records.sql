SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

INSERT INTO lookup.preferenceType
    (preferenceType)
VALUES
    ('SMS'),
    ('Email'),
    ('Phone'),
    ('Letters');
GO

INSERT INTO lookup.preferenceValue
    (preferenceValue)
VALUES
    ('yes'),
    ('no');
GO

INSERT INTO patient.preferences
    (patientId, preferenceTypeId, preferenceValueId, preferencePriority, created)
VALUES
    (1, 1, 1, 0, CURRENT_TIMESTAMP),
    (1, 2, 2, 1, CURRENT_TIMESTAMP),
    (1, 3, 1, 2, CURRENT_TIMESTAMP),
    (1, 4, 2, 3, CURRENT_TIMESTAMP),
    (2, 1, 1, 0, CURRENT_TIMESTAMP),
    (2, 2, 2, 1, CURRENT_TIMESTAMP);
GO