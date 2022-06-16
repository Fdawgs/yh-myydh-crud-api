<a href="https://yeovilhospital.co.uk/">
	<img alttext="Yeovil District Hospital Logo" src="https://github.com/Fdawgs/ydh-logos/raw/HEAD/images/ydh-full-logo-transparent-background.svg" width="480" />
</a>

# Yeovil District Hospital NHS Foundation Trust - MyYDH RESTful CRUD API

[![GitHub Release](https://img.shields.io/github/release/Fdawgs/ydh-myydh-crud-api.svg)](https://github.com/Fdawgs/ydh-myydh-crud-api/releases/latest/)
![Build Status](https://github.com/Fdawgs/ydh-myydh-crud-api/workflows/CI/badge.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/Fdawgs/ydh-myydh-crud-api/badge.svg?branch=master)](https://coveralls.io/github/Fdawgs/ydh-myydh-crud-api?branch=master)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)

> Yeovil District Hospital NHSFT's RESTful CRUD API for the MyYDH app

## Intro

This is [Yeovil District Hospital NHSFT](https://yeovilhospital.co.uk/)'s MyYDH RESTful API, a Node.js application using the [Fastify](https://www.fastify.io/) web framework, built to support CRUD (Create, Read, Update, and Delete) functionality of patient contact preferences for the [MyYDH patient and clinician app](https://my.ydh.nhs.uk/).

## Prerequisites

-   [Node.js](https://nodejs.org/en/) >=16.0.0 (if running outside of Docker)
-   [SQL Server](https://www.microsoft.com/en-gb/sql-server/sql-server-downloads) >=13.0.1601.5 or [PostgreSQL](https://www.postgresql.org/download/) >=9.4 (either as services/instances or Docker containers)

## Setup

Perform the following steps before deployment:

1. Clone or download the repo
2. Navigate to the project directory
3. Make a copy of `.env.template` in the root directory and rename it to `.env`
4. Configure the application using the environment variables in `.env`

> **Note**
> You will need to create a database before using it in the `DB_CONNECTION_STRING` environment variable (this does not apply if using the included Docker Compose file to deploy)

> **Note**
> Set the following environment variables in `.env` to meet NHS Digital's recommendation to retain 6 months' worth of logs:
>
> -   `LOG_ROTATION_DATE_FORMAT="YYYY-MM-DD"`
> -   `LOG_ROTATION_FREQUENCY="daily"`
> -   `LOG_ROTATION_MAX_LOGS="180"`

## Deployment

### Standard Deployment

1. Run `npm ci --ignore-scripts --production` to install dependencies
2. Run `npm start`

The service should be up and running on the port set in the config. You should see output similar to the following in stdout or in the log file specified using the `LOG_ROTATION_FILENAME` environment variable:

```json
{
	"level": "info",
	"time": "2022-01-10T10:17:35.556Z",
	"pid": 18,
	"hostname": "MYCOMPUTER",
	"msg": "Connecting to MSSQL DB"
}
```

```json
{
	"level": "info",
	"time": "2022-01-10T10:17:35.558Z",
	"pid": 18,
	"hostname": "MYCOMPUTER",
	"msg": "MSSQL DB connection opened"
}
```

```json
{
	"level": "info",
	"time": "2022-01-10T10:17:35.760Z",
	"pid": 18,
	"hostname": "MYCOMPUTER",
	"msg": "Server listening at http://0.0.0.0:8204"
}
```

To quickly test it, use [Insomnia](https://insomnia.rest/) and import the example requests from `./test_resources/insomnia_test_requests.json`.

### Deploying Using Docker

This requires [Docker](https://www.docker.com) installed.

1. Run `docker compose up` (or `docker compose up -d` to run in the background)

### Deploying Using PM2

If you are unable to deploy this into production using Docker, it is recommended that you use a process manager such as [PM2](https://pm2.keymetrics.io/).

1. Run `npm ci --ignore-scripts --production` to install dependencies
2. Run `npm i -g pm2` to install pm2 globally
3. Launch application with `pm2 start .pm2.config.js`
4. Check the application has been deployed using `pm2 list` or `pm2 monit`

#### To Install as a Windows Service:

If using a Microsoft Windows OS utilise [pm2-installer](https://github.com/jessety/pm2-installer) to install PM2 as a Windows service.

> **Note**
> PM2 will automatically restart the application if `.env` is modified.

## Usage

### Accessing API Documentation

API documentation can be found at `/docs`:

<img alttext="Screenshot of YDH MyYDH CRUD API documentation page" src="https://raw.githubusercontent.com/Fdawgs/ydh-myydh-crud-api/master/docs/images/api_documentation_screenshot.png" width="720">

### Generating Bearer Tokens for Access

If `BEARER_TOKEN_AUTH_ENABLED` is set to `true` in the `.env` file, you will need to generate bearer tokens for a client/service to access the `/preferences` and `/user` routes of the API.
To do this make a POST request to the `/admin/access/bearer-token` route, which is protected with Basic auth (provide the admin username and password from the `.env` file):

Example body of POST request:

```json
{
	"name": "Example Mirth Connect instance",
	"email": "frazer.smith@ydh.nhs.uk",
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

The bearer token is hashed, salted, and stored in the `access.tokens` database table.
As such, if a client/service forgets their token, you will need to generate a new one for them and delete the old one.

## Contributing

Contributions are welcome, and any help is greatly appreciated!

See [the contributing guide](./CONTRIBUTING.md) for details on how to get started.
Please adhere to this project's [Code of Conduct](./CODE_OF_CONDUCT.md) when contributing.

## License

`ydh-myydh-crud-api` is licensed under the [MIT](./LICENSE) license.
