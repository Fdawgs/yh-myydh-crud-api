IF NOT EXISTS ( SELECT name FROM sys.schemas WHERE name = N'lookup' ) EXEC('CREATE SCHEMA lookup');

IF NOT EXISTS ( SELECT name FROM sys.schemas WHERE name = N'patient' ) EXEC('CREATE SCHEMA patient');

IF NOT EXISTS ( SELECT name FROM sys.schemas WHERE name = N'receipt' ) EXEC('CREATE SCHEMA receipt');

IF NOT EXISTS ( SELECT name FROM sys.schemas WHERE name = N'register' ) EXEC('CREATE SCHEMA register');