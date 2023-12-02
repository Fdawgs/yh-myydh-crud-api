> **Note**
> This repository is unmaintained as of 2023-05-03 as
> I am no longer employed by Somerset NHS Foundation Trust.

<a href="https://somersetft.nhs.uk/yeovilhospital/">
	<img alttext="Somerset NHSFT logo" src="https://raw.githubusercontent.com/Fdawgs/yh-myydh-crud-api/main/docs/images/somerset-nhsft-logo-left-aligned-transparent-background.png" width="480" />
</a>

# Yeovil Hospital - MyYDH RESTful CRUD API

[![GitHub release](https://img.shields.io/github/release/Fdawgs/yh-myydh-crud-api.svg)](https://github.com/Fdawgs/yh-myydh-crud-api/releases/latest/)
[![Build status](https://github.com/Fdawgs/yh-myydh-crud-api/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Fdawgs/yh-myydh-crud-api/actions/workflows/ci.yml)
[![Coverage status](https://coveralls.io/repos/github/Fdawgs/yh-myydh-crud-api/badge.svg?branch=main)](https://coveralls.io/github/Fdawgs/yh-myydh-crud-api?branch=main)
[![code style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)

> Yeovil Hospital's RESTful CRUD API for the MyYDH app

## Overview

This is [Yeovil Hospital](https://somersetft.nhs.uk/yeovilhospital/)'s MyYDH RESTful API, a Node.js application using the [Fastify](https://fastify.io/) web framework, built to support CRUD (Create, Read, Update, and Delete) functionality of patient contact preferences for the [MyYDH patient and clinician app](https://my.ydh.nhs.uk/).

## Prerequisites

-   [Node.js](https://nodejs.org/en/) >=18.12.1 (if running outside of Docker)
-   [SQL Server](https://microsoft.com/en-gb/sql-server/sql-server-downloads) >=13.0.1601.5 or [PostgreSQL](https://postgresql.org/download/) >=9.4 (either as services/instances or Docker containers)

## Setup

Perform the following steps before deployment:

1. Download and extract the [latest release asset](https://github.com/Fdawgs/yh-myydh-crud-api/releases/latest)
2. Navigate to the extracted directory
3. Make a copy of `.env.template` in the root directory and rename it to `.env`
4. Configure the application using the environment variables in `.env`

> **Note**
> You will need to create a database before using it in the `DB_CONNECTION_STRING` environment variable (this does not apply if using the included Docker Compose file to deploy)

> **Note**
> Set the following environment variables in `.env` to meet NHS England's recommendation to retain six months' worth of logs:
>
> -   `LOG_ROTATION_DATE_FORMAT="YYYY-MM-DD"`
> -   `LOG_ROTATION_FREQUENCY="daily"`
> -   `LOG_ROTATION_MAX_LOGS="180d"`

## Deployment

### Standard deployment

1. Run `npm ci --ignore-scripts --omit=dev` to install dependencies
2. Run `npm start`

The service should be up and running on the port set in the config. Output similar to the following should appear in stdout or in the log file specified using the `LOG_ROTATION_FILENAME` environment variable:

```json
{
	"level": "info",
	"time": "2022-10-20T08:06:32.354Z",
	"pid": 18604,
	"hostname": "MYCOMPUTER",
	"msg": "Connecting to MSSQL DB"
}
```

```json
{
	"level": "info",
	"time": "2022-10-20T08:06:32.381Z",
	"pid": 18604,
	"hostname": "MYCOMPUTER",
	"msg": "MSSQL DB connection opened"
}
```

```json
{
	"level": "info",
	"time": "2022-10-20T08:06:32.934Z",
	"pid": 18604,
	"hostname": "MYCOMPUTER",
	"msg": "Server listening at http://127.0.0.1:51616"
}
```

To test it, use [Insomnia](https://insomnia.rest/) and import the example requests from `./test_resources/insomnia_test_requests.json`.

### Deploying using Docker

This requires [Docker](https://docker.com) installed.

1. Run `docker compose up` (or `docker compose up -d` to run in the background)

### Deploying using PM2

If this cannot be deployed into production using Docker, use a process manager such as [PM2](https://pm2.keymetrics.io/).

1. Run `npm ci --ignore-scripts --omit=dev` to install dependencies
2. Run `npm i -g pm2` to install pm2 globally
3. Launch the application with `pm2 start .pm2.config.js`
4. Check that the application has been deployed using `pm2 list` or `pm2 monit`

#### To install as a Windows service:

If using a Microsoft Windows OS utilise [pm2-installer](https://github.com/jessety/pm2-installer) to install PM2 as a Windows service.

> **Note**
> PM2 will automatically restart the application if `.env` is modified.

## Usage

### Accessing API documentation

API documentation can be found at `/docs`:

<img alttext="Screenshot of MyYDH CRUD API documentation page" src="https://raw.githubusercontent.com/Fdawgs/yh-myydh-crud-api/main/docs/images/api_documentation_screenshot.png" width="720">

The underlying OpenAPI definitions are found at `/docs/openapi`.

### Generating bearer tokens for access

If `BEARER_TOKEN_AUTH_ENABLED` is set to `true` in the `.env` file, you will need to generate bearer tokens for a client/service to access the `/preferences` and `/user` routes of the API.
To do this make a POST request to the `/admin/access/bearer-token` route, which is protected with Basic auth (provide the admin username and password from the `.env` file):

Example body of POST request:

```json
{
	"name": "Example Mirth Connect instance",
	"email": "frazer.smith@somersetft.nhs.uk",
	"expires": "2022-03-09",
	"scopes": ["documents/register.search", "documents/receipt.delete"]
}
```

If successful, something similar to the following will be returned:

```json
{
	"id": "39E9A19D-CA7B-4401-AF1E-F346223AB1AB",
	"access": {
		"token": "ydhmyydh_69150f68_5066_4923_a042_653343af84cf",
		"scopes": ["documents/register.search", "documents/receipt.delete"]
	}
}
```

Provide the client/service with the value in `access.token`, for them to use as bearer tokens when making requests.

The bearer token is bcrypt-hashed and stored in the `access.tokens` database table.
If a client/service forgets their token, you will need to generate a new one for them and delete the old one.

## Contributing

Contributions are welcome, and any help is greatly appreciated!

See [the contributing guide](./CONTRIBUTING.md) for details on how to get started.
Please adhere to this project's [Code of Conduct](./CODE_OF_CONDUCT.md) when contributing.

## License

`yh-myydh-crud-api` is licensed under the [MIT](./LICENSE) license.
