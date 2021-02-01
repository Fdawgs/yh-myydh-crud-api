<img alttext="Yeovil District Hospital Logo" src="https://yeovilhospital.co.uk/wp-content/uploads/2017/03/Yeovil_Hospital_Logo.jpg" width="480" />

# Yeovil District Hospital NHS Foundation Trust - MyYDH RESTful CRUD API

[![GitHub Release](https://img.shields.io/github/release/Fdawgs/ydh-myydh-crud-api.svg)](https://github.com/Fdawgs/ydh-myydh-crud-api/releases/latest/) ![Build Status](https://github.com/Fdawgs/ydh-myydh-crud-api/workflows/CI/badge.svg?branch=master) [![Coverage Status](https://coveralls.io/repos/github/Fdawgs/ydh-myydh-crud-api/badge.svg?branch=master)](https://coveralls.io/github/Fdawgs/ydh-myydh-crud-api?branch=master) [![Known Vulnerabilities](https://snyk.io/test/github/Fdawgs/ydh-myydh-crud-api/badge.svg)](https://snyk.io/test/github/Fdawgs/ydh-myydh-crud-api) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)

> Yeovil District Hospital NHSFT's RESTful CRUD API for the MyYDH app

## Intro

This is [Yeovil District Hospital NHSFT](https://yeovilhospital.co.uk/)'s RESTful API, a Node.js application using the [Fastify](https://www.fastify.io/) web framework, built to support CRUD (Create, Read, Update, and Delete) functionality of patient contact preferences for the MyYDH patient and clinician app at https://my.ydh.nhs.uk.

## Prerequisites

-   [Node.js](https://nodejs.org/en/)
-   [SQL Server](https://www.microsoft.com/en-gb/sql-server/sql-server-downloads)

### SQL Server Setup

1. Connect to your SQL Server instance and use the script found in `./sql/create_tables.sql` to create the tables required for this app to function
2. Create a separate user account with read/write access to the database where you have chosen to create these tables, and the tables themselves

Make a note of the credentials of the user created, the server, the database the tables reside in, and the name of the tables (if changed from the originals in the script), as these are needed for the `DB_` environment variables in the `.env` file mentioned in the following deployment sections.

## Deployment

### Standard Deployment

1. Navigate to the repo
2. Run `npm install --production` to install dependencies
3. Make a copy of `.env.template` in the root directory and rename to `.env`
4. Configure the application using the environment variables in `.env`
5. Run `npm start`

The service should now be up and running on the port set in the config. You should see the following output in stdout or the log file specified using the `LOG_ROTATION_FILENAME` environment variable:

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

1. Make a copy of `.env.template` in the root directory and rename to `.env`
2. Configure the application using the global variables in `.env`
3. Run `docker-compose up`

### Deploying Using PM2

If you are unable to deploy this into production using Docker, it is recommended that you use a process manager such as [PM2](https://pm2.keymetrics.io/).

1. Navigate to the repo
2. Run `npm install --production` to install dependencies
3. Make a copy of `.env.template` in the root directory and rename to `.env`
4. Configure the application using the global variables in `.env`
5. Run `npm install -g pm2` to install pm2 globally
6. Launch application with `pm2 start .pm2.config.js`
7. Check the application has been deployed using `pm2 list` or `pm2 monit`

#### To Install as a Windows Service:

If using a Microsoft Windows OS utilise [pm2-installer](https://github.com/jessety/pm2-installer) to install PM2 as a Windows service.

**Note:** PM2 has been configured to automatically restart the application if modifications are made to `.env`.

## Contributing

Please see [CONTRIBUTING.md](https://github.com/Fdawgs/ydh-myydh-crud-api/blob/master/CONTRIBUTING.md) for more details regarding contributing to this project.

## License

`ydh-myydh-crud-api` is licensed under the [MIT](https://github.com/Fdawgs/ydh-myydh-crud-api/blob/master/LICENSE) license.
