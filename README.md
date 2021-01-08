<img alttext="Yeovil District Hospital Logo" src="https://yeovilhospital.co.uk/wp-content/uploads/2017/03/Yeovil_Hospital_Logo.jpg" width="480" />

# Yeovil District Hospital NHS Foundation Trust - YDH App Backend CRUD API

[![GitHub Release](https://img.shields.io/github/release/Fdawgs/ydh-app-api-next.svg)](https://github.com/Fdawgs/ydh-app-api-next/releases/latest/) ![Build Status](https://github.com/Fdawgs/ydh-app-api-next/workflows/CI/badge.svg?branch=main) [![Coverage Status](https://coveralls.io/repos/github/Fdawgs/ydh-app-api-next/badge.svg?branch=main)](https://coveralls.io/github/Fdawgs/ydh-app-api-next?branch=main) [![Known Vulnerabilities](https://snyk.io/test/github/Fdawgs/ydh-app-api-next/badge.svg)](https://snyk.io/test/github/Fdawgs/ydh-app-api-next) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

> Yeovil District Hospital NHSFT's YDH App backend API to support CRUD functionality

## Intro

This is [Yeovil District Hospital NHSFT](https://yeovilhospital.co.uk/)'s backend API, a Node.js application using the [Fastify](https://www.fastify.io/) web framework, built to support CRUD (Create, Read, Update, and Delete) functionality of patient contact preferences for the patient and clinician app at https://my.ydh.nhs.uk.

## Prerequisites

-   [Node.js](https://nodejs.org/en/)
-   [SQL Server](https://www.microsoft.com/en-gb/sql-server/sql-server-downloads)
-   [Yarn](https://classic.yarnpkg.com)

## Deployment

### Standard deployment

1. Navigate to the repo
2. Run `yarn install --production` to install dependencies
3. Make a copy of `.env.template` in the root directory and rename to `.env`
4. Configure the application using the environment variables in `.env`
5. Run `yarn start`

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

### Deploying using Docker

This requires [Docker](https://www.docker.com/products) installed.

1. Make a copy of `.env.template` in the root directory and rename to `.env`
2. Configure the application using the global variables in `.env`
3. Run `docker-compose up`

### Deploying using PM2

If you are unable to deploy this into production using Docker, it is recommended that you use a process manager such as [PM2](https://pm2.keymetrics.io/).

1. Navigate to the repo
2. Run `yarn install --production` to install dependencies
3. Make a copy of `.env.template` in the root directory and rename to `.env`
4. Configure the application using the global variables in `.env`
5. Run `yarn global add pm2` to install pm2 globally
6. Launch application with `pm2 start .pm2.config.js --env production`
7. Check the application has been deployed using `pm2 list` or `pm2 monit`

#### To install as a Windows service:

Yeovil District Hospital NHSFT is heavily entrenched in Microsoft's ecosystem; utilise [pm2-installer](https://github.com/jessety/pm2-installer) to easily install PM2 as a Windows service.

**Note:** PM2 has been configured to automatically restart the application if modifications are made to `.env`.

## Contributing

Please see [CONTRIBUTING.md](https://github.com/Fdawgs/ydh-app-api-next/blob/main/CONTRIBUTING.md) for more details regarding contributing to this project.

## License

`ydh-app-api-next` is licensed under the [MIT](https://github.com/Fdawgs/ydh-app-api-next/blob/main/LICENSE) license.
