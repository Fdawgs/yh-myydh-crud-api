IF NOT EXISTS ( SELECT name FROM sys.schemas WHERE name = N'patient' ) EXEC('CREATE SCHEMA patient');