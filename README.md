<img alttext="Yeovil District Hospital Logo" src="https://github.com/Fdawgs/ydh-logos/raw/HEAD/images/ydh-full-logo-transparent-background.svg" width="480" />

# Yeovil District Hospital NHS Foundation Trust - MyYDH RESTful CRUD API

[![GitHub Release](https://img.shields.io/github/release/Fdawgs/ydh-myydh-crud-api.svg)](https://github.com/Fdawgs/ydh-myydh-crud-api/releases/latest/)
![Build Status](https://github.com/Fdawgs/ydh-myydh-crud-api/workflows/CI/badge.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/Fdawgs/ydh-myydh-crud-api/badge.svg?branch=master)](https://coveralls.io/github/Fdawgs/ydh-myydh-crud-api?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/Fdawgs/ydh-myydh-crud-api/badge.svg)](https://snyk.io/test/github/Fdawgs/ydh-myydh-crud-api)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)

> Yeovil District Hospital NHSFT's RESTful CRUD API for the MyYDH app

## Intro

This is [Yeovil District Hospital NHSFT](https://yeovilhospital.co.uk/)'s RESTful API, a Node.js application using the [Fastify](https://www.fastify.io/) web framework, built to support CRUD (Create, Read, Update, and Delete) functionality of patient contact preferences for the MyYDH patient and clinician app at https://my.ydh.nhs.uk.

## Prerequisites

-   [Node.js](https://nodejs.org/en/)
-   [SQL Server](https://www.microsoft.com/en-gb/sql-server/sql-server-downloads) or [PostgreSQL](https://www.postgresql.org/download/) (either as services/instances or Docker containers)

### Database Setup

1. Connect to your SQL Server or PostgreSQL instance and use the appropriate scripts found in [`./sql/`](./sql/) to create the tables required for this app to function
2. Create a separate user account with read/write access to the database where you have chosen to create these tables, and the tables themselves

Make a note of the credentials of the user created, the server, the database the tables reside in, and the name of the tables (if changed from the originals in the script), as these are needed for the `DB_` environment variables in the `.env` file mentioned in the following deployment sections.

## Setup

Perform the following steps before deployment:

1. Clone the repo
2. Navigate to the project directory
3. Run `npm install --ignore-scripts --production` to install dependencies
4. Make a copy of `.env.template` in the root directory and rename it to `.env`
5. Configure the application using the environment variables in `.env`

**Note:** Set the following environment variables in `.env` to meet NHS Digital's recommendation to retain 6 months' worth of logs:

-   `LOG_ROTATION_DATE_FORMAT="YYYY-MM-DD"`
-   `LOG_ROTATION_FREQUENCY="daily"`
-   `LOG_ROTATION_MAX_LOGS="180"`

## Deployment

### Standard Deployment

1. Run `npm start`

The service should be up and running on the port set in the config. You should see the following output in stdout or the log file specified using the `LOG_ROTATION_FILENAME` environment variable:

```json
{
	"level": "info",
	"time": "2020-12-01T09:48:08.612Z",
	"pid": 41896,
	"hostname": "MYCOMPUTER",
	"msg": "Server listening at http://0.0.0.0:8204"
}
```

You can now navigate to http://0.0.0.0:8204/docs to see the API documentation!

### Deploying Using Docker

This requires [Docker](https://www.docker.com/products) installed.

1. Run `docker compose up` (or `docker compose up -d` to run in background)

### Deploying Using PM2

If you are unable to deploy this into production using Docker, it is recommended that you use a process manager such as [PM2](https://pm2.keymetrics.io/).

1. Run `npm install -g pm2` to install pm2 globally
2. Launch application with `pm2 start .pm2.config.js`
3. Check the application has been deployed using `pm2 list` or `pm2 monit`

#### To Install as a Windows Service:

If using a Microsoft Windows OS utilise [pm2-installer](https://github.com/jessety/pm2-installer) to install PM2 as a Windows service.

**Note:** PM2 will automatically restart the application if `.env` is modified.

## Contributing

Contributions are welcome, and any help is greatly appreciated!

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to get started.
Please adhere to this project's [Code of Conduct](./CODE_OF_CONDUCT.md) when contributing.

## License

`ydh-myydh-crud-api` is licensed under the [MIT](./LICENSE) license.
