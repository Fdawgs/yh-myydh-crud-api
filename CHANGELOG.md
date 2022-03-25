# Changelog

All notable changes to this project will be documented in this file.

## [7.1.0](https://github.com/Fdawgs/ydh-myydh-crud-api/compare/v7.0.0...v7.1.0) (2022-03-25)


### Features

* **routes/admin/access:** add `location` header to 201 responses ([#711](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/711)) ([f78de1e](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/f78de1e0b5f54420095e848f527528f8b93babc8))


### Bug Fixes

* **routes/docs:** add ie unsupported script ([403b99e](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/403b99e586fd8f9edbedd1f32f976a26e039f026))
* **routes/docs:** resolve cwe-676 ([0b5047b](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/0b5047b5ae44cd5526d955b35e186513b363a313))
* **server:** disable cache for all routes besides documentation ([89f4e43](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/89f4e43a59c3c45a6f2f0229bddeebb2824568a1))


### Documentation

* improve readability ([3e54cca](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/3e54cca1df62c8fc7c46d667435f74a49d12c137))
* **readme:** update min version of node, mssql, and postgres ([297715e](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/297715ec9a1c660fddf3b543b970c319c2fac619))


### Improvements

* **server:** return instead of break in switch statement ([03556cf](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/03556cfad818b75c9c9250e4371cd6ae6d3c8967))
* **server:** use new hook config option for rate-limit plugin ([dab601b](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/dab601b9b3435b8cfeb0005b3d538d1cb8fa4d43))


### Miscellaneous

* **.github/workflows/optimise-images:** reorder event list ([399f9eb](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/399f9eb520efff9e0e020aa9d3aa253200794e6d))
* **scripts:** remove redundant gitkraken fix from prepare script ([941ac63](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/941ac63e85b5fcf5985069c9362f97ecca809b8c))
* **scripts:** use shorter arg aliases; remove debugging args from jest ([dbe6c7e](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/dbe6c7eadca160bac989f30ca2c96b7ca6342220))


### Continuous Integration

* add job step names, workflow comments, and whitespace ([7148a32](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/7148a326b975fd41d5743f18628b0a958020d009))
* **codeql-analysis:** remove unused autobuild step ([ed2152a](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/ed2152a3469a017e830b74ab15347dcb972fca43))
* **codeql:** grant minimum permissions to run; rename file ([#714](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/714)) ([76682c5](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/76682c5346778de47ec0ce0ffcdd99d7645e5651))
* only save pr number artifact for dependabot ([75431a7](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/75431a72898bc865c33ce2c931d7ea062952326b))
* use docker compose v2 ([87d2e18](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/87d2e182f85ccaac2877e5ea55e0c3cf821b3f01))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 16.2.1 to 16.2.3 ([431123e](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/431123e8f6ac0d9088e5e9c32109b9f8fa2bdd75))
* **deps-dev:** bump autocannon from 7.7.0 to 7.8.0 ([3a02930](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/3a02930d32a9a520c384583ca8fe57f826a71535))
* **deps-dev:** bump eslint from 8.10.0 to 8.11.0 ([49dab66](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/49dab66e55a067a309ffc006a5edbe31711bbdaf))
* **deps-dev:** bump eslint-plugin-jest from 26.1.1 to 26.1.3 ([5169f60](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/5169f60c6f3b026b52d53968c12e11a9f1aabfa4))
* **deps-dev:** bump eslint-plugin-jsdoc from 37.9.7 to 38.0.6 ([87cf527](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/87cf527994cc944766fe31bdccfef512a103d296))
* **deps-dev:** bump playwright from 1.19.2 to 1.20.1 ([0966f34](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/0966f34d15a00f5005a90c0e769b069e492a17f8))
* **deps-dev:** bump prettier from 2.5.1 to 2.6.0 ([812a91b](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/812a91bf71bc7450443daf0e7897ec60cc93e014))
* **deps-dev:** replace `faker` with `@faker-js/faker` ([#732](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/732)) ([f0e778f](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/f0e778f73ca2174bec876ed1858218a2093a8068))
* **deps:** bump env-schema from 3.5.2 to 4.0.0 ([6c36a7d](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/6c36a7d48dae8386c4d2080dbbeb7afd7a22324a))
* **deps:** bump fastify-accepts from 2.1.0 to 2.2.0 ([485bdd5](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/485bdd5807181cfe731dbb13c2bf13b2106321a0))
* **deps:** bump fastify-static from 4.5.0 to 4.6.1 ([0d37fee](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/0d37fee761c2158c9ebeee381063a6fd2c145602))
* **deps:** bump hadolint/hadolint-action from 1.6.0 to 1.7.0 ([3065cec](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/3065cec4741e6e14dd59b2976727a1c3329e9d90))
* **deps:** bump jstoxml from 3.2.0 to 3.2.2 ([f717f93](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/f717f93afce6e97146ddd3a20f5094ed573d3568))
* **deps:** bump minimist from 1.2.5 to 1.2.6 ([5940bd8](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/5940bd85cbd45ae9484d168a2d93a530d28bcbb8))
* **deps:** bump peter-evans/create-pull-request from 3 to 4 ([1a3bc0f](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/1a3bc0f9660873834bec386f1471d75c895a8bd1))
* **deps:** bump pino from 7.8.1 to 7.9.2 ([53eefaf](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/53eefafea1f78fa1ff3e551d5cee142facba8049))
* **deps:** bump pino-pretty from 7.5.3 to 7.5.4 ([144ad21](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/144ad2138335ab35f7427c10bd0a8ce155ae927c))
* **deps:** bump redoc from 2.0.0-rc.64 to 2.0.0-rc.65 ([0d87c0e](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/0d87c0ef256653c2f0b2a379a27763499984bff7))
* **deps:** bump sub-dependencies ([#733](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/733)) ([3667511](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/3667511f460cc69a231e5bf1b40ba3515c27902e))

## [7.0.0](https://github.com/Fdawgs/ydh-myydh-crud-api/compare/v6.4.1...v7.0.0) (2022-03-10)


### ⚠ BREAKING CHANGES

* **routes:** `admin/access` route moved to `admin/access/bearer-token`
* **admin/access:** `access.scopes` search param no longer case-insensitive
* **config:** `ADMIN_PASSWORD` env variable now has minimum length of 8 characters
* **routes/admin:** `AUTH_BEARER_TOKEN_ARRAY` env variable removed
* **migrations/mssql:** merge `create schema` queries

### Features

* **routes/admin:** add access route ([6a4332c](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/6a4332c4fd83d174380938441bcac32c23915d61))


### Bug Fixes

* **admin/access:** searching using `access.scopes` ([0bfa647](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/0bfa6477f1bfd3d29f9b34b9b511a1883ca0e889))
* **config:** enforce minimum length for `ADMIN_PASSWORD` env variable ([bf93742](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/bf93742d67ecf6d58db3b6009dcb630c1c42c604))
* **plugins/hashed-bearer-auth:** log client name ([6484723](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/6484723e40a1b208e4d13538d4ac9442c21d48e8))


### Miscellaneous

* **plugins/db:** whitespace in switch statement ([53c18f4](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/53c18f48bdb1462eb6c96412a134c7371be44e21))
* **routes/schemas:** update `produces` and `consumes` values ([39050af](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/39050af0ae4f721267f0d7ed9c72103d69783b95))


### Dependencies

* **deps:** bump fastify from 3.27.3 to 3.27.4 ([9a14063](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/9a1406316214e91ac4e267b1a549159619f7b42f))
* **deps:** bump jstoxml from 3.1.0 to 3.2.0 ([69bd77d](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/69bd77d60bdab9c008866c463f46b2699cca4476))
* **deps:** bump pino from 7.8.0 to 7.8.1 ([ab24c5f](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/ab24c5f6e8669c53ab2f2e5a4e5afaf82fa5481d))


### Improvements

* **migrate:** use db variable in switch statement ([6a6cd98](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/6a6cd98f83657d73a0b1a8b031be1e50291d61bd))
* **migrations/mssql:** merge `create schema` queries ([e7d939d](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/e7d939d61904e3d86c1d74d4be4aa66a675705ee))
* **routes/admin/access/b-t:** remove unused param ([674b6cd](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/674b6cdaee70c047b9544c8f0f3f5b5835573d37))
* **routes:** move `admin/access` to `admin/access/bearer-token` ([072dafb](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/072dafb49409838e4fa03fff265db673eeba98d5))

### [6.4.1](https://github.com/Fdawgs/ydh-myydh-crud-api/compare/v6.4.0...v6.4.1) (2022-03-08)


### Bug Fixes

* **config:** redact request auth header from logs ([72249fd](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/72249fda1378bf7a1105eeaca56ba94d5921fcca))
* **docker-compose:** declare `DB_CLIENT` env variable ([e262791](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/e2627912986d78af63289b6988490b0a7539cf90))
* **document/register/schema:** expand datetime search pattern ([65f8274](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/65f82740eaaba1b5f95d27f27e158b8cfb184d7a))
* **plugins/shared-schemas:** use `examples` not `enum` for 404 responses ([3e20854](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/3e20854976b7abf18343bc674d93ccfa825aab00))


### Improvements

* **public/images/icons:** compress apple-touch-icons ([#685](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/685)) ([980d619](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/980d61904d28eb34dbb460c947380bd4ceebdda0))
* **routes/docs:** move html and redoc out of root context ([8e18bf7](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/8e18bf7fbf714dfa7512489fd1b6f6e48019f4b5))
* **routes:** add `preValidation` hooks directly into routes ([adf3f85](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/adf3f85d6a6089135d682429ad91cea657f6f37a))
* **server:** move db and db util functions to root context ([6333aa8](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/6333aa8a1d8ec5550591f2a13de6800d15fa237c))


### Documentation

* **readme:** move api docs access to usage section ([ae050a7](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/ae050a70b58851721be89eeaa3c4d9a01df7f297))


### Continuous Integration

* add image optimisation workflow ([#688](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/688)) ([cf99a27](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/cf99a27596cc6aef6a148955c21d53b74f261ac6))
* only install chromium and firefox with playwright ([3a9123f](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/3a9123f47ca93be1be256af64c0c48996a280ea7))


### Miscellaneous

* **.env.template:** double-quote example strings ([#686](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/686)) ([e77433f](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/e77433fad41f60e2517c31994d1f7b761535f4f0))
* auto-compress images ([#689](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/689)) ([e6a555a](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/e6a555ade1a5f02e96b2b7620fdde8ed828d27f4))


### Dependencies

* **deps-dev:** bump eslint-config-prettier from 8.4.0 to 8.5.0 ([7db0c86](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/7db0c86876ce8a34ee1f4054ec68b316e27cf0fb))
* **deps-dev:** bump eslint-plugin-jsdoc from 37.9.4 to 37.9.5 ([27977c9](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/27977c9c505523fae292353feb6c82e415116df8))
* **deps-dev:** bump eslint-plugin-jsdoc from 37.9.5 to 37.9.7 ([f99dad1](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/f99dad17b997e10f895772df7850bbebd2c0b1c7))
* **deps:** bump actions/checkout from 2 to 3 ([0092287](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/0092287c0b3f926b84479a67cf3440f303363f77))
* **deps:** bump fastify from 3.27.2 to 3.27.3 ([89a31ec](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/89a31ece879f37cca9c4339e2e695290dcad60cc))
* **deps:** bump fluent-json-schema from 3.0.1 to 3.1.0 ([b4d6469](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/b4d64692439e4fadd90f34300951291b47f11411))
* **deps:** bump jstoxml from 2.2.9 to 3.1.0 ([7d8faa2](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/7d8faa2ac54551d6f68e1441efc9ae684e67bb17))
* **deps:** bump pino-pretty from 7.5.1 to 7.5.3 ([b7d39a4](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/b7d39a48c40c6b60f53dd7990d14cc24136109fb))

## [6.4.0](https://github.com/Fdawgs/ydh-myydh-crud-api/compare/v6.3.12...v6.4.0) (2022-02-28)


### Features

* **routes:** support `application/xml` responses ([#670](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/670)) ([bf1d952](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/bf1d952f237caa5d03e58c603e45e4f5a68e6f85))


### Bug Fixes

* **config:** renew rate-limit if user attempts req in limit time window ([#640](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/640)) ([0d51e3a](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/0d51e3a5f74aca241ec29971142c1b576386e26c))
* **migrate:** catch errors thrown ([c00d9cf](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/c00d9cf24197c351d558cb9378007abe1e3f5911))
* **public/docs:** add x-ua-compatible meta tag ([8a5effe](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/8a5effef3dd63fff0ae67bdd353e9d8984688010))


### Improvements

* **config:** call `Error` as constructor, not function ([10a4587](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/10a4587420d9c34192767a5e562c925faa382e72))
* **migrate:** allow for function to be exported ([e4ccc9a](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/e4ccc9abe747a4b18e0294a07327cfd5e3c7e954))
* **public:** remove unused web app manifest and icons ([9be9162](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/9be9162ff5c85bdd6f9e80cd7ed9fed759068a89))


### Miscellaneous

* **public:** add more apple-touch-icon sizes ([d0a4986](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/d0a4986ff98654133f077a484421fedd20a66c95))
* **public:** rename mask-icon ([092a7d0](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/092a7d0f8c2cb458bff83c66ee485b98a6f6f1fa))
* remove trailing whitespace ([e869ba7](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/e869ba7fa8dca7139165b931bd4a27a7ff106cfa))
* **routes:** update cors inline comment ([#643](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/643)) ([4806ae5](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/4806ae5396efda85dfb156e606abc82347611a4c))


### Dependencies

* **dependabot:** major tags no longer need ignore support ([f2d5388](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/f2d53880587c6e4c031b7244c0f269611e08b717))
* **deps-dev:** bump @commitlint/cli from 16.1.0 to 16.2.1 ([ee56a03](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/ee56a034cf9d285c8ec2645a517029a1a6134b33))
* **deps-dev:** bump @commitlint/config-conventional ([1109daa](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/1109daa9ace320365f63152ba768cbc6e4b718af))
* **deps-dev:** bump autocannon from 7.6.0 to 7.7.0 ([8471e9e](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/8471e9ed291a895591ce615a640ec49670eeba3a))
* **deps-dev:** bump eslint from 8.8.0 to 8.9.0 ([b7f1747](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/b7f17477a62b41ff0885f03de93ec4ecc766cc2c))
* **deps-dev:** bump eslint from 8.9.0 to 8.10.0 ([3f08f10](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/3f08f10e3eee4cbfeb85d2722f70488d837e30bb))
* **deps-dev:** bump eslint-config-prettier from 8.3.0 to 8.4.0 ([14bb6c8](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/14bb6c8c0299a84c99eb0935733df67bcb38b351))
* **deps-dev:** bump eslint-plugin-jest from 26.0.0 to 26.1.1 ([3074783](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/3074783903d3c1383f776cf76c491e0a83a88880))
* **deps-dev:** bump eslint-plugin-jsdoc from 37.7.0 to 37.9.4 ([03c6e40](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/03c6e408533955e0d77ecb9063e71720aca66ceb))
* **deps-dev:** bump jest from 27.4.7 to 27.5.1 ([40d14e1](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/40d14e1fb2b8fa302a0b047034a4444d997c135f))
* **deps-dev:** bump playwright from 1.18.1 to 1.19.1 ([ca80625](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/ca80625672dfe959c3a273673a71b20e08f8d156))
* **deps-dev:** bump playwright from 1.19.1 to 1.19.2 ([3fa50e5](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/3fa50e5fa6902060e3f90e1e2e682e9c8d646d9d))
* **deps:** bump actions/github-script from 5 to 6 ([dcb8015](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/dcb8015e1d933759f361701c6c39f8aabdc4ab17))
* **deps:** bump actions/setup-node from 2 to 3 ([4dade2e](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/4dade2e8126154f12ccf9ee491ea97a6e2027d18))
* **deps:** bump dotenv from 15.0.0 to 16.0.0 ([0cab74d](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/0cab74dc1005596d90cf07916313c6b0992265a3))
* **deps:** bump fastify from 3.27.0 to 3.27.2 ([44f257f](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/44f257f3dd3f0aa94dd50bb768cd418a00dfbeaf))
* **deps:** bump fastify-autoload from 3.10.0 to 3.11.0 ([c6f0040](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/c6f0040c6f2ba5d8f6b3c758e0c055181f93b293))
* **deps:** bump fastify-bearer-auth from 6.1.0 to 6.2.0 ([dcd14a1](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/dcd14a1839e76b89b022239d204a6cc557b64e97))
* **deps:** bump fastify-cors from 6.0.2 to 6.0.3 ([79643cf](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/79643cf1329dad5d8bb1fe36f64afbbc310538d9))
* **deps:** bump fastify-disablecache from 2.0.5 to 2.0.6 ([6885228](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/68852286c4c2092accba728fcee852f653f3815f))
* **deps:** bump fastify-floc-off from 1.0.4 to 1.0.5 ([87c3c93](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/87c3c9343f0821352955ad30140029895c220cad))
* **deps:** bump fastify-rate-limit from 5.7.0 to 5.7.2 ([0f9e124](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/0f9e124af30a51c15701834746235505574cc9e8))
* **deps:** bump fastify-swagger from 4.12.0 to 4.15.0 ([1d2420e](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/1d2420e17c6a245378b8efcab64e26c1effd0850))
* **deps:** bump follow-redirects from 1.14.7 to 1.14.8 ([7791310](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/77913100f46a06d73aa894f61e1c395765847abd))
* **deps:** bump mssql from 8.0.1 to 8.0.2 ([385310c](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/385310c3150fe3a73ab0369569604f7ce4ec2c9c))
* **deps:** bump pg from 8.7.1 to 8.7.3 ([728b558](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/728b5588d75b5dc6d83aa781db51ef9298ba6dc7))
* **deps:** bump pino from 7.6.5 to 7.8.0 ([610b221](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/610b221552e1d17153e0b808303c9727ea0c1c5d))
* **deps:** bump postgrator from 5.0.0 to 5.0.1 ([c82ff40](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/c82ff40b36879eceb18ff75537dbebc441bdf9e6))
* **deps:** bump prismjs from 1.26.0 to 1.27.0 ([143ecf8](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/143ecf8203c2cc9ed3762fa81f0df977aac4c32d))
* **deps:** bump redoc from 2.0.0-rc.63 to 2.0.0-rc.64 ([a9f5933](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/a9f59339e8150fa89d4dc41a7e8535d17d5c7a9c))
* **deps:** bump simple-get from 3.1.0 to 3.1.1 ([7b11ead](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/7b11ead9191c20deaa30f348bb8e2fff32e96409))
* **deps:** bump sub-dependencies ([#681](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/681)) ([ea94d3d](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/ea94d3d67042ac84e4ea3668087c05bdd97c66a1))

### [6.3.12](https://github.com/Fdawgs/ydh-myydh-crud-api/compare/v6.3.11...v6.3.12) (2022-02-01)


### Bug Fixes

* **migrations:** database value for mssql ([38398ae](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/38398aeb8f6308ae5c3f7d6449d086dcab9a931f))
* **migrations:** remove mention of database; use one set by deployer ([69d15eb](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/69d15ebfb4f11fd79d506023fb796d670c5d9f38))
* **plugins/db:** log error if connection fails ([#629](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/629)) ([875751e](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/875751efbd8799c6ce3bceb860c2dfa2a0ce0e39))
* **routes/docs:** resolve `token "definitions" does not exist` error ([#604](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/604)) ([cac071e](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/cac071e234489a252db455bafb3057b3373f6f02))
* **routes/preferences/user:** add 415 response to schema ([fe0858c](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/fe0858c6cc7ff6e40b07b194c5d210f50b24651d))
* **routes:** escape single-quote characters ([c3bf8cb](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/c3bf8cb9b1c31a987ece1763cb2c311fd17e9834))
* **routes:** ignore additional props in req and res body objects ([b411b7f](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/b411b7f754039468e85769822ab1611dc36ec5fb))


### Improvements

* **config:** use boolean schemas ([#608](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/608)) ([257ebed](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/257ebed5c3db06d239805079432a436406e3526e))
* **server:** reorder plugin registers ([2e41fcf](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/2e41fcf309d7da3a53c4103ca750838a946484db))


### Miscellaneous

* **config:** update doc page description ([#607](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/607)) ([9f9168f](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/9f9168f8b26b03101b617aad309fe04143489283))
* **migrations:** ignore func-names eslint rule ([1e84360](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/1e84360c005e016583c66db0b37d7beb91997aa1))
* move test records sql to test_resources folder ([4b0d33f](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/4b0d33fdb4fe7acff7fe6affdfe584d744d1b9dd))
* **plugins/convert-date-param-operator:** update param description ([ae3925a](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/ae3925a300014737be5b49e53b56420a0fc48031))


### Continuous Integration

* install playwright ([dfd1f3c](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/dfd1f3cff1650def967db7bc3dd8dd95171cfd4c))


### Dependencies

* **dependabot:** ignore minor and patch commit-lint updates ([#611](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/611)) ([241dc19](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/241dc196b0b6f293ecb0c30f56f3b0003ea55a1c))
* **dependabot:** use default open-pull-requests-limit value ([c3c9146](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/c3c9146124f488cf02f28a8101bce3fc778fb8f6))
* **deps-dev:** add playwright ([5492849](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/5492849cf21bf75485532150c9d5f44880c2d08c))
* **deps-dev:** bump @commitlint/cli from 16.0.2 to 16.1.0 ([63ea052](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/63ea052f7ea101409892580ba0c83ce1973c361c))
* **deps-dev:** bump autocannon from 7.5.1 to 7.6.0 ([82904ef](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/82904efdb7422291bc4bb9de84f4d263d6680477))
* **deps-dev:** bump eslint from 8.6.0 to 8.7.0 ([bd389df](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/bd389dfec922b1599592380a1ebab7175b5901f1))
* **deps-dev:** bump eslint from 8.7.0 to 8.8.0 ([38d77e1](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/38d77e17988274c37083da5b10977123dae46371))
* **deps-dev:** bump eslint-plugin-jest from 25.3.4 to 26.0.0 ([253a97c](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/253a97c9df3470d401128bfc334a40698f228f58))
* **deps-dev:** bump eslint-plugin-jsdoc from 37.6.1 to 37.7.0 ([cbdd1ac](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/cbdd1ac75ff4292025dce1ca9578ec95ea104696))
* **deps-dev:** bump eslint-plugin-security-node from 1.1.0 to 1.1.1 ([0152191](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/015219132975595b3b11994660416693a4850b22))
* **deps-dev:** pin faker version ([b262584](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/b2625846eec221224e1af6951cae58f6ab7b19a8))
* **deps:** bump dotenv from 10.0.0 to 14.3.2 ([da8c0d7](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/da8c0d720a0f3c13b578dd19edaf84e9a18a19c2))
* **deps:** bump dotenv from 14.3.2 to 15.0.0 ([8165123](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/8165123f357e244e04ab609c61cf51035aec882e))
* **deps:** bump env-schema from 3.5.1 to 3.5.2 ([81638ae](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/81638ae1ec12201da642a7101966de53a6db03a2))
* **deps:** bump fastify from 3.25.3 to 3.27.0 ([90cbf5f](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/90cbf5ff223d4ddc6b028cfdc5f5c927a1260b50))
* **deps:** bump fastify-helmet from 5.3.2 to 7.0.1 ([#627](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/627)) ([27929a3](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/27929a37c6ad3166d322dbd375cc2e0fa2c67087))
* **deps:** bump fastify-plugin from 3.0.0 to 3.0.1 ([df57f6c](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/df57f6c97a08c350385d28ff6246c46db8f0e828))
* **deps:** bump file-stream-rotator from 0.5.7 to 0.6.1 ([99f9196](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/99f9196554b07bed12144611a28207af582bb89f))
* **deps:** bump mssql from 7.3.0 to 8.0.1 ([7bd7784](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/7bd778457923548dd3226f812ed189874ab41fc0))
* **deps:** bump pino from 7.6.2 to 7.6.4 ([7395abc](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/7395abc2bfecfbbb0fa282974fe5cbfa977692b1))
* **deps:** bump pino from 7.6.4 to 7.6.5 ([13945cc](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/13945cc6d402de7dccb2a5d89aa66efe46fdac1c))
* **deps:** bump pino-pretty from 7.3.0 to 7.5.0 ([faec636](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/faec6365afe7d7ba8c9430cf7eef04297b2a92e8))
* **deps:** bump pino-pretty from 7.5.0 to 7.5.1 ([5472012](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/54720128ecaab34b27770756ec61018c3648087c))
* **deps:** bump redoc from 2.0.0-rc.59 to 2.0.0-rc.61 ([db4178b](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/db4178b111bb7aae2d49185f40e65af9348f0514))
* **deps:** bump redoc from 2.0.0-rc.61 to 2.0.0-rc.63 ([#634](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/634)) ([504fa56](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/504fa56845b6ccfd31af641516712ee1aef4fed3))
* **deps:** bump sub-dependencies ([#639](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/639)) ([89bdb16](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/89bdb1600d61beefe6a31872d10e6148a496139a))

### [6.3.11](https://github.com/Fdawgs/ydh-myydh-crud-api/compare/v6.3.10...v6.3.11) (2022-01-10)


### Documentation

* **readme:** update intro ([ab9c15e](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/ab9c15e159ad72d03f81c4bd3594851d6a598df9))


### Dependencies

* add postgrator to deployment process ([f5b0766](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/f5b07666d6d34faf95e457425ed860a132b98735))
* **deps-dev:** bump @commitlint/cli from 16.0.1 to 16.0.2 ([b185a6d](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/b185a6df9148efa0f54b46cae2fd3c21380c0968))
* **deps-dev:** bump eslint-plugin-jsdoc from 37.5.1 to 37.6.1 ([92cb71e](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/92cb71ee89bf8fec8286ed155c2cc98d9c7a3dd4))
* **deps:** add pg-connection-string ([d6bcb7b](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/d6bcb7b11496eed3641dfd2956d2fad1639b5d30))
* **deps:** add postgrator ([8e0ed6c](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/8e0ed6c0efd52556a013addf3a69b3ffee9fb58f))
* **deps:** bump fastify-autoload from 3.9.0 to 3.10.0 ([518a42e](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/518a42ebccf7636411fc991f935381401c0d241f))
* **deps:** bump fastify-disablecache from 2.0.4 to 2.0.5 ([66609e7](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/66609e7be27b743451e73a79a5d55d76195d77d9))
* **deps:** bump fastify-floc-off from 1.0.3 to 1.0.4 ([cb339f6](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/cb339f6494a4304b67f1fa9ed3d3154c882349ca))
* **deps:** bump fastify-swagger from 4.13.0 to 4.13.1 ([6f164e2](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/6f164e20f8c7de6d214890c3747fb837f0dad9cf))
* **docker-compose:** connect to postgresql image ([ed9a0b5](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/ed9a0b57b6cbe67dacba4d4ea72e86ee0d68fd76))
* **docker-compose:** fix healthcheck test script ([8360a6c](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/8360a6c59f80e0e04950441cde6f15d23037d62b))

### [6.3.10](https://github.com/Fdawgs/ydh-myydh-crud-api/compare/v6.3.9...v6.3.10) (2022-01-06)


### Bug Fixes

* **routes/docs:** remove cors support ([137744f](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/137744fdc55d51a989e64a244e68c8bb9b2d711d))


### Documentation

* **contributing:** add mention of husky pre-commit hook ([0175f8b](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/0175f8b17cbab94f32312b27d0f0fc3339b7532b))
* **contributing:** add step for `lint:licenses` script ([a7261be](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/a7261be14eb2d2a9bfba0c3bd56a964563685869))


### Continuous Integration

* remove spellcheck workflow ([#586](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/586)) ([ea39027](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/ea3902740ecb511a42a9a5d68a61241d3d58afba))


### Miscellaneous

* add istanbul inline comments ([334eb9d](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/334eb9de1b10ee83e0dbeefb5faa3f84dbac5bc0))
* fix `server` jsdoc tag param type ([dc4ceb0](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/dc4ceb00dc9e5322134a72eb421aba38c0a7fe42))
* **scripts:** remove invalid license identifier from `lint:licenses` ([2eb73ba](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/2eb73ba3f2ae8985f0d9d23344c425a2be1fc036))
* **scripts:** remove non-permissive bsd license from accepted list ([#587](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/587)) ([c328596](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/c32859605bba470d0b9fcef3a924a6ebcf648353))
* **scripts:** remove unused package from excluded list ([571481a](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/571481ae3414affe7c6e554a080dc25fd785929b))
* **server:** update inline comment re helmet defaults ([8052725](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/80527258b52881cf54c3f40c06fe97edbf0a0380))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 15.0.0 to 16.0.1 ([e8fe2ac](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/e8fe2ac2f6c69f1e13917e8d32c50de90d754e4e))
* **deps-dev:** bump @commitlint/config-conventional ([ba081df](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/ba081dfd12c71b887cbf8d406a1945c8ffd3cac8))
* **deps-dev:** bump autocannon from 7.5.0 to 7.5.1 ([bc64379](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/bc64379822777cadde5e78c6bd9e96b2a163df90))
* **deps-dev:** bump eslint from 8.5.0 to 8.6.0 ([7418d23](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/7418d23b988baf46a11f013c9e0f3e39551f4d3f))
* **deps-dev:** bump eslint-plugin-import from 2.25.3 to 2.25.4 ([c19f5d5](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/c19f5d5820e26f8dda1b6bf8a660835c40f17a0b))
* **deps-dev:** bump eslint-plugin-jest from 25.3.0 to 25.3.3 ([d0141d4](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/d0141d4d6c1e5c339666b310e7687731e9980485))
* **deps-dev:** bump eslint-plugin-jest from 25.3.3 to 25.3.4 ([4926ca1](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/4926ca1fd26f9b39256aaa11d9ecf90967723c5e))
* **deps-dev:** bump eslint-plugin-jsdoc from 37.4.0 to 37.5.0 ([24c555c](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/24c555c86fb64114649b65a596732ca95a2616df))
* **deps-dev:** bump eslint-plugin-jsdoc from 37.5.0 to 37.5.1 ([e1b16eb](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/e1b16ebdaf17ec215ed20b7b2d192c2d63f31861))
* **deps-dev:** bump jest from 27.4.5 to 27.4.7 ([032e021](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/032e0213f9387010fca3c2a20b9de9a36d9bdfbd))
* **deps:** bump fastify from 3.25.1 to 3.25.3 ([1112626](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/1112626e9c2e9f3b425d4266fe0926c62b533205))
* **deps:** bump fastify-bearer-auth from 6.0.0 to 6.1.0 ([32e8126](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/32e812694c56e8ea8a8c0d6d7a021f7aa213cd0a))
* **deps:** bump GoogleCloudPlatform/release-please-action from 2 to 3 ([f218248](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/f2182481ae31f2dc7e18fe4f7066d90e089851f1))
* **deps:** bump pino from 7.6.0 to 7.6.2 ([4098ca8](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/4098ca8e34ffade0c2b556a90f1646683e4a7766))
* **deps:** bump sub-dependencies ([#593](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/593)) ([93ce8f8](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/93ce8f8d2b9c8eca86b9723eb4519a41cdc89924))

### [6.3.9](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v6.3.8...v6.3.9) (2021-12-21)


### Miscellaneous

* **husky/pre-commit:** add `lint:licenses` script ([#540](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/540)) ([b2e9da7](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b2e9da7fcfe4fdefe3dd428f226f2889b62a08cb))
* ignore `.yarnclean` and `yarn.lock` ([#542](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/542)) ([7945ee7](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/7945ee76678cc0b54b43721861482377ec2d2790))


### Documentation

* **coc:** reduce verbosity ([32bdaae](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/32bdaae631257c10441c15a4ed89d66aa9dc7789))
* **contributing:** add mention of husky pre-commit hook ([85595ad](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/85595ad51d1e3cebfbf7ec5bd1982628836e5ed5))
* fix broken docker links ([de6011a](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/de6011a3d7f8b3ac26e21de9ccb1e0d7c2d7d91d))
* **readme:** tidy prerequisite and deployment steps ([5c9bc8d](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/5c9bc8d4350c60a8f9e50f828f0638dc648a905a))


### Dependencies

* **dependabot:** ignore minor and patch github-actions updates ([#536](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/536)) ([92909e9](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/92909e91e5e7636958a365d5136a1ff757d06356))
* **dependabot:** ignore minor and patch release-please-action updates ([#554](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/554)) ([277106c](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/277106c86fb5bdf072d79f204921153b0d54bee8))
* **deps-dev:** bump @commitlint/cli from 14.1.0 to 15.0.0 ([aa4aa32](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/aa4aa327b732deff7ae5ff43d64630557a8cf07c))
* **deps-dev:** bump @commitlint/config-conventional ([8d68071](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/8d680719d6930a7918737ad65a07488d03f9a9a3))
* **deps-dev:** bump eslint from 8.2.0 to 8.3.0 ([b256ffa](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b256ffa650e9b678b28b848481c710e12503468a))
* **deps-dev:** bump eslint from 8.3.0 to 8.5.0 ([b394385](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b394385287fa15ae82c7d918fc0b6177aa3f0107))
* **deps-dev:** bump eslint-plugin-jest from 25.2.4 to 25.3.0 ([3397476](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/3397476542d9f6c84d89be6de04fd2eedc7fd38a))
* **deps-dev:** bump eslint-plugin-jsdoc from 37.0.3 to 37.1.0 ([881950b](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/881950b5ffa308b1e5b6d86f073a1722f77021b8))
* **deps-dev:** bump eslint-plugin-jsdoc from 37.1.0 to 37.4.0 ([af371d3](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/af371d393c344fda32e4a53690b4ca5cd456fd82))
* **deps-dev:** bump eslint-plugin-promise from 5.1.1 to 5.2.0 ([24a6aec](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/24a6aec3ab4d634f13ba10d7a9f896b1ec859b7c))
* **deps-dev:** bump eslint-plugin-promise from 5.2.0 to 6.0.0 ([a7e61f0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/a7e61f02d4729abef79b0dc8c851043d28a9ed93))
* **deps-dev:** bump eslint-plugin-security-node from 1.0.14 to 1.1.0 ([b482495](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b4824952891f137bb85ec7e2c6549aba3a75854f))
* **deps-dev:** bump jest from 27.3.1 to 27.4.3 ([dca3cb6](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/dca3cb6ff31a98adce99ed84f9131615004ccc75))
* **deps-dev:** bump jest from 27.4.3 to 27.4.5 ([17f5447](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/17f5447b3b1045c52a60ed5958c4a40475e7d5e0))
* **deps-dev:** bump prettier from 2.4.1 to 2.5.0 ([77eb1de](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/77eb1deacf9e846ed9f729597935caa115e39c10))
* **deps-dev:** bump prettier from 2.5.0 to 2.5.1 ([35045a4](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/35045a4a1b72b29ce13f8cfdbbe5adbd4d4ab1b1))
* **deps:** bump env-schema from 3.5.0 to 3.5.1 ([fca9a9f](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/fca9a9fe288ac4168b0c5d2967d1df030c951d59))
* **deps:** bump fastify from 3.24.0 to 3.24.1 ([dca61b6](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/dca61b67fc66126e8f74bdc9c57847315612af08))
* **deps:** bump fastify from 3.24.1 to 3.25.1 ([94411e0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/94411e0b5c41e5405b29dcf40cf73c8c103f1bed))
* **deps:** bump fastify-compress from 3.6.1 to 3.7.0 ([03766ca](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/03766ca9841fdafd433c48f02fac6a379621c863))
* **deps:** bump fastify-compress from 3.7.0 to 4.0.1 ([36fc729](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/36fc7290043db5b69e9080674e3e869906d56950))
* **deps:** bump fastify-rate-limit from 5.6.2 to 5.7.0 ([37b6a1f](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/37b6a1f22d20783ba81dae2691ae394a87607b55))
* **deps:** bump fastify-swagger from 4.12.6 to 4.13.0 ([81f954a](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/81f954a1254a5c44c87f793e954b2671d671f27d))
* **deps:** bump GoogleCloudPlatform/release-please-action ([595aa1c](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/595aa1cbd284b5b90ff478330ee6c11b9eebd4c0))
* **deps:** bump mssql from 7.2.1 to 7.3.0 ([ccc030c](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/ccc030c0bb7177a96d5a7a9d35e24f2d9e880239))
* **deps:** bump pino from 7.2.0 to 7.5.1 ([b3f1092](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b3f109218d7c3e61bc07971fa9b425c522c61517))
* **deps:** bump pino from 7.5.1 to 7.6.0 ([8f6bb7e](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/8f6bb7eb849778e883ba9328c3ec35515be87d3e))
* **deps:** bump pino-pretty from 7.2.0 to 7.3.0 ([309fcb5](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/309fcb56bcb3c806a544e88531b50a0071a91702))
* **deps:** bump redoc from 2.0.0-rc.57 to 2.0.0-rc.58 ([ca6ca39](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/ca6ca39d9f3a3463ab02aa587f3225e115b46726))
* **deps:** bump redoc from 2.0.0-rc.58 to 2.0.0-rc.59 ([7f90513](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/7f90513e1cbeb79b80c934cd3fc6bc4248b511b3))

### [6.3.8](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v6.3.7...v6.3.8) (2021-11-16)


### Continuous Integration

* trigger workflows when drafts marked as "ready to review" ([#530](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/530)) ([82291ad](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/82291adf26f4e71a0099d27a8af21aa335ddb064))


### Improvements

* **routes:** link errors to requests in logs ([#531](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/531)) ([6c19071](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/6c190712451ed135f8b8be1c360892cf747be3d3))
* **routes:** throw errors not return ([#528](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/528)) ([457f10d](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/457f10da8cd5d6269d31bb9c1f85b3b50ed086fe))


### Dependencies

* **deps-dev:** bump eslint-plugin-import from 2.25.2 to 2.25.3 ([9a7d007](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/9a7d00760d324419ec872ecd4738cd319780786b))
* **deps-dev:** bump nodemon from 2.0.14 to 2.0.15 ([ba6a67f](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/ba6a67fde666f33e7bc080848874ff12b094002f))
* **deps:** bump fastify from 3.23.1 to 3.24.0 ([324a312](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/324a3128491f36a5b45d989f3b319924d445527b))
* **deps:** bump pino from 7.1.0 to 7.2.0 ([f721296](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/f721296cad1b7cae9c51fdd300c4bd5d99b1d1c8))

### [6.3.7](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v6.3.6...v6.3.7) (2021-11-09)


### Miscellaneous

* **.env.template:** add note regarding required logging variables ([686979d](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/686979d0a7352690d20014753c501777403ad251))
* **config:** rename `fsp` variable to `fs` ([478e293](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/478e293795b0af10454eb28d579338132fc919cc))


### Dependencies

* **deps-dev:** bump eslint from 8.1.0 to 8.2.0 ([4bb6c5a](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/4bb6c5af974c55ceaeae1d1151b8bfe05c0e1f76))
* **deps-dev:** bump eslint-config-airbnb-base from 14.2.1 to 15.0.0 ([b658259](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b658259bc1bf1768696efc0ca83234c966bb8a05))
* **deps-dev:** bump eslint-plugin-jest from 25.2.2 to 25.2.4 ([9c3d337](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/9c3d337bffcd4d698dd8c6964637887334e609cf))
* **deps:** bump env-schema from 3.4.0 to 3.5.0 ([1e05469](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/1e054693d5fbfd8beda638396eee6c150936ff69))
* **deps:** bump fastify from 3.22.1 to 3.23.1 ([eb0e67c](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/eb0e67c6937d061e86046951334392eba4819d06))


### Improvements

* **config:** normalize https cert file paths ([01bd2ec](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/01bd2ec866b4837b199eaad50b8e132eba18e0a3))
* **config:** normalize logging filepath ([e1637ca](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/e1637cae86be5b2d08c9053beb6e9b0fd3b5a4ae))
* **plugins/db:** `default` clause as last clause ([#526](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/526)) ([22f0789](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/22f0789c340fff1eedebd03e954fbac0e7edf51a))
* **routes:** throw `notAcceptable` errors not return ([#520](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/520)) ([edcc1f2](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/edcc1f29402f71c07935dfe361b21d3778d5b99e))
* **server:** use `path.joinSafe()` over `path.join()` ([#519](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/519)) ([a0d9bc5](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/a0d9bc5fe2678797d98e8014c0672c319da78ff7))


### Continuous Integration

* **ci:** do not run clean-up on draft prs ([e3c3821](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/e3c38215f9ea874429f29dbac44b7e0ab44868dd))
* **spell-check:** do not run on draft prs ([e796ae9](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/e796ae9f85d649f5fc1397aaf001b17cee1a3485))
* use actions/setup-node's cache option ([#517](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/517)) ([1bb48cc](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/1bb48cc9337dad1f4c5a1cdddd413695964c8782))

### [6.3.6](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v6.3.5...v6.3.6) (2021-11-04)


### Bug Fixes

* **routes/documents/register:** empty results handling ([#509](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/509)) ([3022b32](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/3022b329862db955c1479f7f07deafb94d95d0fe))


### Miscellaneous

* **.prettierrc:** only enable `bracketSameLine` for html ([#506](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/506)) ([5b4bdfe](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/5b4bdfee2f66ffb6fcde26094250e7612d444f38))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 13.2.1 to 14.1.0 ([37c845d](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/37c845d8501b4013a260a7b4243101ba8df23b16))
* **deps-dev:** bump @commitlint/config-conventional ([4823ac9](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/4823ac994ecfcf7b88ec37621beb09082343bcc4))
* **deps-dev:** bump eslint from 7.32.0 to 8.1.0 ([a561f82](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/a561f820f9498db8eead80458a50e58f7bfea455))
* **deps:** bump actions/checkout from 2.3.5 to 2.4.0 ([6329d55](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/6329d5579877f15d0398951e1c85721522069d65))
* **deps:** bump fastify-sensible from 3.1.1 to 3.1.2 ([98c1ae4](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/98c1ae48ee06186d278d9aa8f54e9dfd9b9a3402))
* **deps:** bump fastify-static from 4.4.2 to 4.5.0 ([4607117](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/4607117c221d0fd53cf3136064c4d77a71cd4482))
* **deps:** bump pino from 7.0.5 to 7.1.0 ([dc6635e](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/dc6635eefcaa6d02dba967e6fe83918088189b6a))
* **deps:** bump pino-pretty from 7.1.0 to 7.2.0 ([13beb8e](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/13beb8ecaa7f90683e43ef05fe0279ce65dee3d2))
* **docker:** update postgres image from 13-alpine to 14-alpine ([#484](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/484)) ([d68a696](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/d68a696992ccc5643452f12f8a9465b4a73b26d1))

### [6.3.5](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v6.3.4...v6.3.5) (2021-10-29)


### Bug Fixes

* **config:** remove additional env variables ([#483](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/483)) ([5961977](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/59619774532baa203f8203444cf5fffdc8e0b829))
* **routes:** remove additional properties from req body and query ([#482](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/482)) ([3cebeaa](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/3cebeaad48ba255f717db5f4616b5c309717968d))


### Documentation

* bump coc from v2.0.0 to v2.1.0 ([#479](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/479)) ([b5d53bb](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b5d53bbc16264ab4d6c2370d9776d1e37b890b21))


### Improvements

* use secure-json-parse for json parsing ([0f37252](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/0f37252f7a9c4d8bef178f09369fc394069ee386))


### Miscellaneous

* **.eslintrc:** remove redundant `impliedStrict` option ([#477](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/477)) ([a81f1c0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/a81f1c0a98670d16158181a65d937b3c641f2e7d))
* **routes/redirect:** use raw regex over string for pattern ([#481](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/481)) ([0fceac1](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/0fceac1eeeed6f2cf8ec26e86b2612b6c2bbf22c))
* **routes:** update inline comment re injection attacks ([e6b5848](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/e6b584872bac6f6a99825e4d8e79af015c37e807))


### Dependencies

* **deps-dev:** bump autocannon from 7.4.0 to 7.5.0 ([665deb5](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/665deb536e1215086d8aba68080a53dbb8a6f11f))
* **deps-dev:** bump eslint-plugin-jest from 25.0.5 to 25.2.2 ([9a9f0a8](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/9a9f0a8ac17ffd184514f5dc7e72ee08618d02c4))
* **deps-dev:** bump eslint-plugin-jsdoc from 36.1.1 to 37.0.3 ([d03646e](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/d03646e5b21c2dac3fc5ddee6adc208cfb1d825c))
* **deps-dev:** bump eslint-plugin-promise from 5.1.0 to 5.1.1 ([0cacd47](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/0cacd47faaa50525ad76f73405112ac6c0eebd95))
* **deps-dev:** bump husky from 7.0.2 to 7.0.4 ([fede292](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/fede292887914cc6e72fc1deeef3e209cb166d34))
* **deps-dev:** bump jest from 27.2.5 to 27.3.1 ([214ff6e](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/214ff6e0fc8cc56a9b28ac0ca975a2a1eff2eb66))
* **deps-dev:** bump nodemon from 2.0.13 to 2.0.14 ([57a1e18](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/57a1e1869bd15765db7f5bf5eb42139d4d0990c3))
* **deps:** add secure-json-parse ([a3e2c5a](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/a3e2c5ae03ee23bb67c725c933b36f132e2690cb))
* **deps:** bump actions/checkout from 2.3.4 to 2.3.5 ([d24c79e](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/d24c79e93d4ee48d0af198658554dad34a27386b))
* **deps:** bump fastify from 3.22.0 to 3.22.1 ([966a329](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/966a32906ec8f8c5c14e030f1677f6e9e7d69e11))
* **deps:** bump fastify-compress from 3.6.0 to 3.6.1 ([7f7f182](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/7f7f1827b1dd1327b7a0e253bbec34273bb69990))
* **deps:** bump fastify-disablecache from 2.0.3 to 2.0.4 ([c6ded7f](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/c6ded7f194cda92e9273a69282ca0f9e9b099d48))
* **deps:** bump fastify-floc-off from 1.0.2 to 1.0.3 ([12e02eb](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/12e02eb9c0152b579295dfa890567073d207fc74))
* **deps:** bump fastify-swagger from 4.12.4 to 4.12.6 ([56b687b](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/56b687bbdc2f686dc7fc9af6abc1b4fade3676e4))
* **deps:** bump pino from 6.13.3 to 7.0.5 ([95ade14](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/95ade1418c6a3fbe61b0cbee535cb380a5e84312))
* **deps:** bump pino-pretty from 7.0.1 to 7.1.0 ([be246c6](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/be246c61c1a196391d3b53f0c931018b758c7722))
* update lockfile from v1 to v2; bump sub-dependencies ([#500](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/500)) ([8718884](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/87188844e505513cb39abc578b6b974d566ae39b))

### [6.3.4](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v6.3.3...v6.3.4) (2021-10-13)


### Bug Fixes

* **routes/docs:** remove cors support ([45b7352](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/45b7352dd1aeac718bb412d56177c194b3a821f0))


### Documentation

* **readme:** move url into link ([#466](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/466)) ([77eaf17](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/77eaf1705f7d3ee0c54d2c8794a2aed805ef0e37))


### Miscellaneous

* **.eslintrc:** remove inaccurate sourcetype ([#463](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/463)) ([b7765ab](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b7765abe4afb4173aa111c7db396dc7e1927534e))
* **.vscode:** remove deprecated settings ([#465](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/465)) ([4f78b55](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/4f78b5573f003f8d54c4210a18ed4a54e7a5cc7b))
* apply eslint rules per line, not file-wide ([bd94d52](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/bd94d528b5734df3c161d2c57b922e9d7410cd11))
* **routes:** add missing jsdoc tag for `options.bearertokenauthkeys` ([3153173](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/3153173d77c31d25b733ca6fd42cda401c6e5291))
* **server:** update inline comment re clickjacking ([8dcc748](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/8dcc748df8990ac502d324fd41f221a793b94b0e))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 13.2.0 to 13.2.1 ([28c12ce](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/28c12ceb7fa131c6d4d33835130cfaca47dbabdc))
* **deps-dev:** bump eslint-plugin-import from 2.24.2 to 2.25.2 ([2e124a5](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/2e124a5de9da02847ca3ac04cc2b8782e87b87d2))
* **deps-dev:** bump eslint-plugin-jest from 24.5.2 to 25.0.5 ([3551ac5](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/3551ac5c66dd99396f2abc30fe5d4526247cd73a))
* **deps-dev:** bump eslint-plugin-jsdoc from 36.1.0 to 36.1.1 ([38c9bb4](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/38c9bb4a65a7f58db0244a37c9e3e4ca376843b9))
* **deps-dev:** bump jest from 27.2.4 to 27.2.5 ([f86a5a2](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/f86a5a24b27251bbb7fe50de8433100d66a00210))
* **deps:** bump fastify-static from 4.2.4 to 4.4.1 ([9cde05e](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/9cde05e83cd0058478812c3331330067d9b9a71c))
* **deps:** bump fastify-static from 4.4.1 to 4.4.2 ([684f8da](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/684f8da8fa5947cbd8f5333294f4d575db27f156))
* **deps:** bump redoc from 2.0.0-rc.56 to 2.0.0-rc.57 ([6d14f72](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/6d14f72d6a96fe5b5bd112ceb580cdea764dad16))
* **deps:** bump wagoid/commitlint-github-action from 4.1.5 to 4.1.9 ([a876377](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/a8763772c887c6f4356aeada563fb15ffc3b6caa))

### [6.3.3](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v6.3.2...v6.3.3) (2021-10-06)


### Bug Fixes

* **routes/docs/json:** add missing cache-control header ([a05d22b](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/a05d22b622ca67f4a556e1d8bf78d6634a325933))


### Dependencies

* **deps-dev:** bump eslint-plugin-jest from 24.5.0 to 24.5.2 ([7f6b749](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/7f6b749432c0b688566bd5a0fbf1f05770008bd5))
* **deps:** bump fastify-static from 4.2.3 to 4.2.4 ([59d8d70](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/59d8d70e0f2e4d100eb6558cfe6c2bbb6ca2c4a4))
* **deps:** bump fastify-swagger from 4.12.3 to 4.12.4 ([8fadab5](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/8fadab54002f126d1acf8a3fd8e1637992ceb2c1))
* **deps:** bump GoogleCloudPlatform/release-please-action ([5b3e8e4](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/5b3e8e4bf674e9864a25158ca6ba2a4f0f339cc3))
* **deps:** bump hadolint/hadolint-action from 1.5.0 to 1.6.0 ([c3c4458](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/c3c4458ed646bfcc160807c16f5f0f5e0a470179))
* **deps:** bump under-pressure from 5.7.0 to 5.8.0 ([340dbd3](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/340dbd39bb984ba7c37d76a2eb32315e185173dd))
* **deps:** bump wagoid/commitlint-github-action from 4.1.4 to 4.1.5 ([ccaa392](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/ccaa39262c7b4ca277efbe5b1a33b19fb217e2ba))


### Improvements

* **public/docs:** move css from inline to own file ([#462](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/462)) ([173860a](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/173860ad09e1c8f0e2de7d59f59f47b1ad3997a0))
* **routes/docs:** allow for html to be cached for 3 minutes ([5c6ddd9](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/5c6ddd9c696e49e3997aed42c2fdf5fc3b255ce0))
* **server:** allow for redoc js to be cached for 1 day ([23ffcf2](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/23ffcf20632e18b4ecbf7ca3abdc5afd010b90b8))
* **server:** use aggressive caching for static files ([4200ecc](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/4200ecc307c7917883ad726f62729f33d66bc923))

### [6.3.2](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v6.3.1...v6.3.2) (2021-10-01)


### Improvements

* **routes:** move cors options route config to config file ([b878dd7](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b878dd7a20a7d0359d1d7a5f284419f55ba48d02))
* **server:** exclude all html and xml responses from transform ([#440](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/440)) ([c690d7c](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/c690d7ca2d4f2decdc2499a89b2f53319370a50b))
* **server:** move helmet config to config file ([fe8ff21](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/fe8ff217943ece9a43db32c0f6c61b1c7f44e1d7))
* **server:** reduce globbing use when registering routes ([#439](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/439)) ([cad0505](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/cad0505d137ef5af6c613c53458c74dde0d14ea6))
* **server:** reduce response header size ([66928cc](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/66928cc7eaeff532dd34b271830ca6290ce0d81b))


### Continuous Integration

* **automerge:** update location of octokit rest methods ([d22545e](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/d22545e3de0a886a719fa4d9144bb55302400a37))
* ignore hadolint rule DL3018 ([6347770](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/63477706cb11bfb8967ea42434786c56cb8f6084))
* update hadolint-action namespace ([74418c9](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/74418c97bb1149b4bb75b4382e99eaabca74b2d6))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 13.1.0 to 13.2.0 ([24fe35c](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/24fe35c7b34a3171f1576b028703d1cf7c991d6b))
* **deps-dev:** bump @commitlint/config-conventional ([1ae4b5c](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/1ae4b5c97520a292947394fc6de62eeeca8b0dfd))
* **deps-dev:** bump eslint-plugin-jest from 24.4.2 to 24.5.0 ([08fbf93](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/08fbf934c5ffbac9b2d2ea2fc0cd345af2f46a3a))
* **deps-dev:** bump jest from 27.2.1 to 27.2.4 ([ee3bd1b](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/ee3bd1b16416500b8aec8a6b74cd16999d068996))
* **deps:** bump actions/github-script from 4.1 to 5 ([0c3852c](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/0c3852c808d2f55dec36d0e7b8f88d685705f656))
* **deps:** bump actions/setup-node from 2.4.0 to 2.4.1 ([ee604fb](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/ee604fb72fb4527840c332ba83e8a868dab5c90a))
* **deps:** bump fastify from 3.21.6 to 3.22.0 ([d967b63](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/d967b631f92a4552f70a0ed90a10e3d2069bfaa9))
* **deps:** bump fastify-swagger from 4.12.0 to 4.12.3 ([712eb24](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/712eb24b6a345ff2fcf65eb56cbf24fe16a397bc))
* **docker:** remove package versioning ([a4c2e01](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/a4c2e015f865384403e346583dff643471a801d9))


### Miscellaneous

* **.prettierrc:** enable `bracketsameline` option ([#450](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/450)) ([5153c8e](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/5153c8e32abb3e489d3681177de1b8be45bbad0f))
* tidy inline comments re plugins ([e90727b](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/e90727b06467239e11e3cd0f6d2a30ff2d89d43c))

### [6.3.1](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v6.3.0...v6.3.1) (2021-09-24)


### Bug Fixes

* **public/site.webmanifest:** set name values ([a5495df](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/a5495dfc4b7ca6917f776142a2bcfa6795987df1))
* **routes/docs:** add missing content-type response header ([d415cac](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/d415cac0f436f6b5989d365c283190ac80e738b3))


### Documentation

* **readme:** add link to hospital logo ([#426](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/426)) ([6a3eb97](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/6a3eb97fe2904c84db56da5a9e3f93408de13f07))


### Dependencies

* **deps-dev:** add eslint-plugin-security-node ([#427](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/427)) ([795561b](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/795561b08a68d226f061c853aca401772ab0a327))
* **deps-dev:** bump eslint-plugin-jest from 24.4.0 to 24.4.2 ([e4bfb96](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/e4bfb96ae1d9e0f3b3f0e3514f1cba95e123b7c9))
* **deps-dev:** bump glob from 7.1.7 to 7.2.0 ([a5fc0e9](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/a5fc0e955c19296b6baa0b54a253d19fa701e9f2))
* **deps-dev:** bump jest from 27.2.0 to 27.2.1 ([cfb93c1](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/cfb93c1598e5ec0cd6709f05565b4c5de006c5b4))
* **deps-dev:** bump nodemon from 2.0.12 to 2.0.13 ([182dd0d](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/182dd0de150b842eb01223a68ef74e77a8b0ee57))
* **deps-dev:** bump prettier from 2.4.0 to 2.4.1 ([5092647](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/509264781d547105ad08486cdd0e6b7c060e59bb))
* **deps:** bump fastify from 3.21.1 to 3.21.3 ([bb21557](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/bb2155775d2d4e40ee80b3feaadf724f1d98b930))
* **deps:** bump fastify from 3.21.3 to 3.21.6 ([782f4a2](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/782f4a2e995cf9d1a0334d0b863c8b7d3a408867))
* **deps:** bump fastify-accepts from 2.0.1 to 2.1.0 ([40b849f](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/40b849f6a3deb8ff15ac854091665e96129c4a20))
* **deps:** bump GoogleCloudPlatform/release-please-action ([6bf035e](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/6bf035e3ef618c20bc1c5c6a8c4a7d8c007d805f))
* **deps:** bump pino from 6.13.2 to 6.13.3 ([dbda534](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/dbda53455dde0222b4fdb081782cd3622ec18e7c))
* **deps:** bump pino-pretty from 7.0.0 to 7.0.1 ([72c0681](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/72c0681815471df43e94f9edf1ec8f0eab5c4ee2))
* **deps:** bump prismjs from 1.24.1 to 1.25.0 ([e5e58c6](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/e5e58c699e2ecaecdde0b49f3bed5b6416e85e47))
* **docker:** bump curl from 7.79.0-r0 to 7.79.1-r0 ([#428](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/428)) ([93ddc31](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/93ddc31a4e3b4f88e8c9e8c94da3ded063adf27e))


### Miscellaneous

* **.env.template:** document `SERVICE_HOST` default ([#416](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/416)) ([94f96e8](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/94f96e87b53617136b8f1755fd25c86b84c30e64))
* **config:** tidy openapi description ([#420](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/420)) ([7520a55](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/7520a5541673a9a33a7f7ab4d488f99df8c62814))
* **plugins/clean-object:** remove outdated eslint comment ([97e90f0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/97e90f0e4cce122b98fef7c6a23b753e0b50549b))
* **plugins/db:** correct jsdoc tag ([b094020](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b0940208e51f974214780b2bb57f7bc6cd8227e9))
* **public/docs:** add `-moz-tab-size` css property ([2c908fb](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/2c908fb6541f582569edbb493fee51e2e3c22912))
* **public:** move icons from public/ to public/images/icons ([2ed8917](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/2ed89176b695400ff9b78a51f734e3d56b5ace0a))
* **server:** update inline comments re child contexts ([8db14db](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/8db14db16d3b7dd8bb374e48bb07b7448820266b))


### Improvements

* **public/docs:** defer redoc script loading ([d08bf30](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/d08bf30a7ea8b9ab95cd18b5c7887d8db6eaa38e))
* **routes/docs:** enable caching of static files ([01d4cf6](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/01d4cf62e7fc3dbf9f69f96ddf5b2bd010fc25b7))
* **routes/documents/register:** remove param reassign ([bdfb4d5](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/bdfb4d5064fb30f15b2ff858a7bd30a86c6b1755))
* **routes/documents/register:** Replace use of of global `isNaN` ([907a77e](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/907a77e2ceda715be77fafc0d16b1f7d03bddc5f))
* **routes/prefers/user:** use optional chaining ([75a20f1](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/75a20f1839c7f54bc0bc09f7ff0b5008b0f59e80))
* **server:** move loading of static files into public context ([8befc51](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/8befc514778c11ff4c4a0170d705e6e5eece720b))

## [6.3.0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v6.2.1...v6.3.0) (2021-09-15)


### Features

* **config:** support HTTP/2 via `HTTPS_HTTP2_ENABLED` env variable ([#405](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/405)) ([f139fd5](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/f139fd5a2b83037b83f8ff917bba4020b058f9d6))


### Improvements

* async/await usage ([8d85fe6](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/8d85fe6d6a0e2a23ac48d83f8a2503f6c2f4a2ab))


### Miscellaneous

* **.dockerignore:** ignore development documentation ([fa7fc2a](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/fa7fc2ae394779e2d86b88215a149bc1c9549369))
* **.husky/.gitignore:** remove now redundant file ([245bffe](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/245bffeea9c164eccd0caf539e5aaca6e981f219))
* **package:** update benchmark script ([65c64a7](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/65c64a7b70194a80fecba5fbfca6b9d09d37da87))


### Dependencies

* **deps-dev:** bump jest from 27.1.1 to 27.2.0 ([0fd7ea6](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/0fd7ea665c62613cb6cbba4652238bd2ae81d5d4))
* **deps:** bump env-schema from 3.3.0 to 3.4.0 ([7ecd88c](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/7ecd88c73618ce832f5fb2987cdfcab97f23a0de))
* **deps:** bump fastify from 3.21.0 to 3.21.1 ([1975461](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/19754619ec22a95d4d1c7dc04cf42c0ea6e876f4))
* **deps:** bump fastify-autoload from 3.8.1 to 3.9.0 ([3962213](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/3962213754185f10ac5d84a1befdb0910c0968f1))
* **deps:** bump fastify-swagger from 4.11.0 to 4.12.0 ([ef41b0e](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/ef41b0eae2e8d78c2ac1914a321a96eccc166641))
* **deps:** bump GoogleCloudPlatform/release-please-action ([78a7d3f](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/78a7d3fa4a9d7b7ee8726da3a11689f7dbcb7d41))
* **deps:** bump sub-dependencies ([#415](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/415)) ([6d68b87](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/6d68b871b808946ffcf35696c7d76a98071ee49d))
* **deps:** bump wagoid/commitlint-github-action from 4.1.1 to 4.1.4 ([e9039f1](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/e9039f1ee305acf4872e3dd93c20fbb5fb9b58e3))
* **docker:** bump curl from 7.67.0-r5 to 7.79.0-r0 ([22a6e89](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/22a6e897ed1e6ac8749ff11fe862700aa8bc01e1))

### [6.2.1](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v6.2.0...v6.2.1) (2021-09-09)


### Continuous Integration

* **ci:** revert to workflow-run-clean-action from github concurrency ([e02950f](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/e02950fa8106e67a62a45c75fba81479116d07b5))
* **link-check:** ignore link to `./sql/` directory ([#391](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/391)) ([4e08b3f](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/4e08b3fedda4337f0b90709db484289b2314e6a8))


### Miscellaneous

* **.prettierrc:** override defaults for html, css, and scss files ([#392](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/392)) ([0ced595](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/0ced595384f635f354e458292877470105c4e49c))
* **.vscode:** add `mhutchie.git-graph` extension ([cf549a4](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/cf549a4a302912ac9ffdeedbb3ff2291172fef83))


### Dependencies

* **deps-dev:** bump eslint-plugin-jsdoc from 36.0.8 to 36.1.0 ([2daa7b0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/2daa7b0378b9449b4a4baa0616e55a4e1af13ae8))
* **deps-dev:** bump jest from 27.1.0 to 27.1.1 ([f5933c6](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/f5933c62baac16cdc5d902d6fda0b634cb6cf33c))
* **deps-dev:** bump prettier from 2.3.2 to 2.4.0 ([0308e38](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/0308e385b1faa70c383449c7356f492ab75809be))
* **deps:** bump axios from 0.21.1 to 0.21.4 ([d86ab71](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/d86ab713e05196a4d9db5cfd7e1b7f3d011d7a53))
* **deps:** bump fastify from 3.20.2 to 3.21.0 ([c3535bf](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/c3535bfdfa7dd1a55679accadae15bfd049b1a49))
* **deps:** bump fastify-swagger from 4.9.1 to 4.11.0 ([4930d26](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/4930d2662141132a348d1bbdcdcaded52f69465d))
* **deps:** bump GoogleCloudPlatform/release-please-action ([8980729](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/89807290d40d8a6114eb0bce6fef6f08c7fe13b8))
* **deps:** bump pino from 6.13.1 to 6.13.2 ([99e7e45](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/99e7e4503af99f55dc48c653777204001458c91c))
* **deps:** bump pino-pretty from 6.0.0 to 7.0.0 ([95cc6d7](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/95cc6d77119dc6064777c49fe01232a4571bbbbf))


### Improvements

* **plugins:** convert `clean-objects` util to server plugin ([0a57d54](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/0a57d54749d21e937f38315a16fde927f8a881eb))
* **plugins:** convert date param util to server plugin ([1db0c40](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/1db0c40967315a67a8530f533ca00230d18859b0))
* **routes:** use opt chaining over switches ([#393](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/393)) ([2e34cda](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/2e34cda522ecb5fe0256b31afe8d7b14f70e7a31))

## [6.2.0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v6.1.2...v6.2.0) (2021-09-06)


### Features

* **config:** add option to set `Access-Control-Max-Age` CORS header ([#382](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/382)) ([8350e20](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/8350e20be567b54c35faf3b0a384ea1c5ad0a746))


### Bug Fixes

* **server:** rate limit all 4xx and 5xx responses ([9e7e99e](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/9e7e99ec01391779325dc21dc14ab36feabe9ec5))


### Miscellaneous

* **.env.template:** clarify on required variables ([debdbb2](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/debdbb2e98b7dace882e9c256eba419106db34e5))
* **.env.template:** remove api key array value ([#381](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/381)) ([e61f962](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/e61f962c7a28754e193ee500bc6437f1047a0857))
* **.env.template:** remove rate limit value ([0b33e58](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/0b33e5835febb109ab0d8e9ff0a7449f2710300c))
* **.github:** use new YAML configured GitHub issue forms ([#384](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/384)) ([60853ba](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/60853ba0966fdbc5751eb85b894ad2312f07befd))


### Continuous Integration

* **ci:** replace workflow-run-cleanup-action with github concurrency ([#385](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/385)) ([6419f9a](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/6419f9a9defd3107e79b46926d1d8b0df4b83db3))


### Improvements

* **public:** compress images ([#386](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/386)) ([2b428e0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/2b428e0e420b782f063e860c1bc8c5eac4e9b328))


### Dependencies

* **deps:** bump fastify-disablecache from 2.0.2 to 2.0.3 ([6107ff6](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/6107ff67e6eb0705d999e7a710e61a60c4c2f5bc))
* **deps:** bump fastify-floc-off from 1.0.1 to 1.0.2 ([f5cb009](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/f5cb009d27c1f6fa4f0109e6dda4994cfa87ec50))

### [6.1.2](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v6.1.1...v6.1.2) (2021-09-01)


### Bug Fixes

* **config:** bearer token security scheme format ([#371](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/371)) ([a61e6d3](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/a61e6d306d90ebc53e89c922396dedd71ac4a039))


### Dependencies

* **deps-dev:** bump jest from 27.0.6 to 27.1.0 ([c07aa62](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/c07aa62621f943d50bf8decf5b86fc45ac9d4a62))
* **deps:** bump fastify-rate-limit from 5.6.1 to 5.6.2 ([ab907c0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/ab907c0c5eedbc19bbf6a03bc187fc4b630033a6))
* **deps:** bump fastify-swagger from 4.9.0 to 4.9.1 ([ec0c869](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/ec0c869dfe9ad5977e84d5aea42ac35e76146409))

### [6.1.1](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v6.1.0...v6.1.1) (2021-08-26)


### Bug Fixes

* add 401 shared response schema ([90b4a18](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/90b4a18e8a0490f6f0e6085e89f6b82a48e7ce4e))
* **plugin/shared-schemas:** remove enum for 500 error messages ([fe402ce](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/fe402ce60dfb5183a8460856ec18906f276fa905))
* **server:** rate-limiting not affecting 406 responses ([3c7e6d6](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/3c7e6d6b038752bacbba7f1875b7b4a41fc2c204))
* **server:** standardise 401 response schema ([92aa2a9](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/92aa2a9d387eafd840d8f0a0d5e1b953b2330ee2))

## [6.1.0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v6.0.1...v6.1.0) (2021-08-25)


### Features

* **routes/docs:** replace swagger ui with redoc ui ([#357](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/357)) ([4288f13](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/4288f13b0a5167f09acd2d537ea0c008ca818d37))


### Bug Fixes

* add 503 response schema ([67f9a16](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/67f9a167e673aab29e821abf22e939d4f477c10d))


### Documentation

* **readme:** add note regarding log retention for nhs digital ([fe194d0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/fe194d0697955d5fc5aa76b9d175294d4a9e3cfa))


### Improvements

* add clearer summaries and descriptions for route schemas ([bf908cb](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/bf908cbfe5d6bc00cd72908f379a35e9cd1110b2))
* add shared 406 and 429 response schemas ([dcbe29f](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/dcbe29f6a85b102c248d5c2dda9e8235ab980122))
* move 404 and 500 responses to `shared-schema` plugin ([d7b7825](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/d7b7825bf0452a4649eaaf0d21be5739e445589a))


### Miscellaneous

* **config:** remove excess word in inline comment ([35d7fd7](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/35d7fd70fe64b8ad6afd6918c2b95be59f985119))


### Dependencies

* **deps-dev:** bump eslint-plugin-import from 2.24.0 to 2.24.2 ([f19ad66](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/f19ad66851317bdb7bdd97165f4bf3f43f051c91))
* **deps-dev:** bump eslint-plugin-jsdoc from 36.0.7 to 36.0.8 ([b9d312a](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b9d312a7d8060386fbe3563b51681557c0123d87))
* **deps-dev:** bump husky from 7.0.1 to 7.0.2 ([efb4c0b](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/efb4c0b66beaa44b387d7d3426115058604d1b2f))
* **deps:** bump actions/github-script from 4.0.2 to 4.1 ([7c357cb](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/7c357cb53b76a6fb5e3d5f86ee677a4ff8d9dcdc))
* **deps:** bump fastify-autoload from 3.8.0 to 3.8.1 ([2f3c5d7](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/2f3c5d752481ceac8e4e31097d481dc86e67f4bc))
* **deps:** bump mssql from 7.2.0 to 7.2.1 ([222f423](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/222f42365e06984ee3a0238a8fbc3bb687762e00))
* **deps:** bump pino from 6.13.0 to 6.13.1 ([e624a0c](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/e624a0c049d03c846ea3228dc997aee1e7aacad7))
* **deps:** bump pino-pretty from 5.1.3 to 6.0.0 ([ae6909d](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/ae6909dd52466762a28b0f2fe37bd2290d28ecb7))
* **deps:** bump sub dependencies ([1bfe809](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/1bfe8096888e1c38eac7183c58ab86cb55e24daa))

### [6.0.1](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v6.0.0...v6.0.1) (2021-08-19)


### Bug Fixes

* **server:** allow bearer token auth to be disabled ([8f9c93f](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/8f9c93f7dd791ff7f7883580d9fc8fabd4a250e7))


### Continuous Integration

* add `postgres` and `mssql` services; only test on ubuntu ([af81bec](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/af81bec3d25305ebff7303cdc41c11222ee540aa))


### Miscellaneous

* declare postgres db name ([a38d0b7](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/a38d0b76fa14f07e53a869c02ca0362d3f5ce49e))
* **docker-compose:** add postgresql image ([eb21290](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/eb21290663358b2d4193f2b0b8d0889dfe7b06e4))
* **env.template:** use double quotes ([2afc0fb](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/2afc0fbd5a96b88f686fe3e0bbfe3ec7a74e1f25))
* **package:** add docker test db scripts ([1e7c006](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/1e7c00622a6e63c7b3a6a1eae905d6fd0b35a8e5))
* **sql/mssql:** add database creation and use statements ([e7896bc](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/e7896bc35b5868c8e1574513a6271a08e7f9e8f5))


### Documentation

* **contributing:** add links to mentioned applications ([219c3ca](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/219c3caa6a16a9d1d7537bf57c99846ca0cd68a8))
* **contributing:** add mention of docker test db scripts ([13e0566](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/13e0566495454ddc203832272d526113956fa3c6))
* **readme:** add mention of docker container images ([fbcab9d](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/fbcab9dfd54ca999712ccf243b1a22159bd31662))


### Dependencies

* **deps:** bump fastify-rate-limit from 5.6.0 to 5.6.1 ([3618358](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/361835869dd8640473f57eaa4742451af5afc6b4))
* **deps:** bump fastify-swagger from 4.8.4 to 4.9.0 ([d40b315](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/d40b3155451cf81e59f12690e6ba397e9f56238b))

## [6.0.0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v5.0.0...v6.0.0) (2021-08-17)


### ⚠ BREAKING CHANGES

* **routes:** `/healthcheck` moved to `/admin/healthcheck`

### Features

* **routes/admin/healthcheck:** add cors header support ([0faffb0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/0faffb00e3dea5c374b5ad7cfb62d0a535761200))


### Bug Fixes

* **config:** allow for empty logger env variables ([af25ce9](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/af25ce9e0b7cc81d5c54746c798839c524b469b6))
* **config:** defaults for undeclared variables ([048da35](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/048da35e8def8f6e8308e3e6f43c2cf746604cd7))
* **routes/documents/receipt:** set 404 response to correct method ([59d66b0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/59d66b01f7892c935fe501f6d18c85f06665197e))
* **routes/preferences/user/schema:** remove unused 400 response ([6c54df9](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/6c54df91d6da3a11abdf8821df8bde23fcd50b35))
* **server:** ignore admin route in secured context ([fc2188f](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/fc2188fe21fb1a4a1b9d7562d4c49883e2e29212))


### Improvements

* **config:** consolidate logger pretty print conditional ([9e6adc3](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/9e6adc3fa8455887a3941714060a9df79cb01054))
* replace `http-errors` with `fastify-sensible` plugin ([d939694](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/d939694760b3090e56c318df2c291a8afae15c18))
* **routes/redirect/schema:** consolidate `required` keywords ([a4e93d4](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/a4e93d4cf999a480991c825a679f2a65989066d3))
* **routes:** `/healthcheck` moved to `/admin/healthcheck` ([341df76](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/341df766a01e06d17b132e86aac9a99b0a4ae603))


### Dependencies

* **deps-dev:** bump eslint-plugin-jsdoc from 36.0.6 to 36.0.7 ([27f82e9](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/27f82e9822bfa0aa9aaba84eb7a81a30371322b4))
* **deps:** bump env-schema from 3.2.0 to 3.3.0 ([3aa169b](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/3aa169b15adf4545d4d8924a7be14f46cacc2d0a))
* **deps:** bump fastify from 3.20.1 to 3.20.2 ([ab1a704](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/ab1a704b65d2f82d097440d9694b59023c8ac61a))
* **deps:** bump pino-pretty from 5.1.2 to 5.1.3 ([04434d0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/04434d02190ffa7fbc2bde95f09e7112a2148175))


### Miscellaneous

* **config:** sort process load variables alphabetically ascending ([451c41b](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/451c41b35367c0bc89f3799aec7d2efae609431e))
* **env:** document default logger values ([f4c90c8](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/f4c90c82420cf1311f2807f5b1f681af06bb40bf))
* **env:** standardise, sort, and group env variables ([f36b4bb](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/f36b4bb6d71ea51a3bcb7863b6bfa86d12944d07))
* **routes/documents/receipt:** sort route registers alphabetically ([25f9213](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/25f9213b5893b47cb65718974980b04bf92a091d))

## [5.0.0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v4.0.0...v5.0.0) (2021-08-09)


### ⚠ BREAKING CHANGES

* **plugins/db:** add support for postgresql client
* **sql:** camel case column and tables names have been replaced with lower case snake case names, to allow for the API to more easily be used with other databases like PostgreSQL and MySQL. Existing tables and columns will need to be renamed or rebuilt

### Features

* **plugins/db:** add support for postgresql client ([#326](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/326)) ([b38a7f7](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b38a7f7a96ab3ba5977e434577597c1b5b81fc5f))


### Bug Fixes

* **app:** logging grammar fixes ([d840953](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/d8409530608ba8415d6c25012a2a3f45f40e7a38))
* **sql:** make guid column not null ([9b4b53c](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/9b4b53cc239b92497b66e94cc26c7b66070374c3))


### Miscellaneous

* **env:** update example tables ([f330aab](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/f330aab6d9e46815ed80a9f51e8eefd69f4bc36b))
* **plugins/db:** rename `mssql` plugin to db agnostic `db` ([6a98f4d](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/6a98f4d8d39114c91a93451d1a8d46d40d8f6174))
* **plugins/db:** update plugin name in metadata ([6baac9d](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/6baac9d60ef0e658a237652d7212485fd884d9f2))
* **plugins/mssql:** rename `mssql` decorator to db agnostic `db` ([2cf30a8](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/2cf30a89c6fa7b5373dfce5d7b0e0936fafab1aa))
* **routes:** add jsdoc tags for query functions ([b0e0415](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b0e0415081270357f1a15acc4db92b907bb348d3))
* **sql:** add test record insert statement for documents register ([513eecc](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/513eecc9203aa085e94982395646b290930bfa1c))
* **sql:** rename query files to reflect t-sql syntax contained ([b3535dd](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b3535ddadae08a1b0d9ea3fcba2fff628fcd8a18))
* **sql:** use snake case for column and table names ([74054f6](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/74054f6cb368b32f3f6c9ad32107a6db1d47b2b1))
* **utils/clean-objects:** resolve `Expected no lines between tags` ([bf8791e](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/bf8791e27564c80d3dd7254d954be408ffd3ff34))


### Improvements

* **plugins/db:** log on opening/closing connections ([cb9a796](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/cb9a7963de76ce9617ebcd087b3da8b7fdfc5a99))
* **plugins/mssql:** decouple from config; increase portability ([9a0dc92](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/9a0dc92b477c4484869632e14cd407035d8d7626))
* **sql:** add index to guid column of register.documents table ([#333](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/333)) ([7bc297d](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/7bc297dde0ddfdde20ce9801385c908194e10df8))


### Dependencies

* **deps-dev:** bump eslint-plugin-import from 2.23.4 to 2.24.0 ([7be7b21](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/7be7b2178264ab91ed1f8c2740183177badf7da3))
* **deps:** bump actions/setup-node from 2.3.0 to 2.3.1 ([5658bf0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/5658bf0e0e6954ca9c0c5a2f337e19f0eb3b8836))
* **deps:** bump actions/setup-node from 2.3.1 to 2.3.2 ([d85731c](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/d85731c254b7db3df16cda470e9853fc84d823ab))
* **deps:** bump actions/setup-node from 2.3.2 to 2.4.0 ([b219c69](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b219c69631b44d35c94569742ee42ba5c0f1900f))
* **deps:** bump env-schema from 3.1.0 to 3.2.0 ([a97151f](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/a97151f69e745c856ccde1e01106224f30c50504))
* **deps:** bump fastify from 3.19.2 to 3.20.1 ([d2f7835](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/d2f78359222ed5e24c21411082afe707cd2a8d78))
* **deps:** bump fastify-swagger from 4.8.3 to 4.8.4 ([5e842a4](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/5e842a41f493b8ac3a7574c8d59da817f197f472))
* **deps:** bump pg from 8.6.0 to 8.7.1 ([89e23d7](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/89e23d78cba9aea01a881599935d2aedccbc4c88))

## [4.0.0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v3.2.6...v4.0.0) (2021-08-02)


### ⚠ BREAKING CHANGES

* minimum required version of node increased from 12 to 14 to allow for new ECMAScript syntax to be used

### Bug Fixes

* **docker-compose:** wrap variables in quotes ([#304](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/304)) ([418d6ca](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/418d6ca907aa230c7e1be21797eddfffbb1d7323))
* **server:** remove test response header ([#302](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/302)) ([03a790f](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/03a790f74079ce7de500441d289f26880aa540c1))


### Dependencies

* **deps-dev:** bump eslint from 7.31.0 to 7.32.0 ([f1be11e](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/f1be11e8ccbd9d54f6bdfc5f7f7ee7b08aa8ebc4))
* **deps:** bump actions/setup-node from 2.2.0 to 2.3.0 ([4b08671](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/4b08671fa311c290ee6d224d38c5c1e78946cbba))
* **deps:** bump dependencies ([#315](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/315)) ([d65ed82](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/d65ed827eeafb07795bdbacef6e9dbcb44ce3f1a))
* **deps:** bump GoogleCloudPlatform/release-please-action ([416bde9](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/416bde929fbffde08b57b195b295656e404ebfd6))
* **deps:** bump mssql from 7.1.3 to 7.2.0 ([a65c9e2](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/a65c9e268f38953531d3e8729d3260097d4157d4))
* **docker:** bump curl from 7.67.0-r4 to 7.67.0-r5 ([#314](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/314)) ([a55f174](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/a55f1749cd36298a3daf31f10f3603daf5bd2ed4))


### Miscellaneous

* grammar fixes for jsdoc tags ([#317](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/317)) ([72bc832](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/72bc8322d18e44b34e249231e3e7f1ceaf8670ed))
* increase minimum required version of node from 12 to 14 ([#320](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/320)) ([e51c2d3](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/e51c2d3df506214b5ece0de119a1f5e2d88bcc04))

### [3.2.6](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v3.2.5...v3.2.6) (2021-07-19)


### Bug Fixes

* **package:** move `pino-pretty` to production dependency list ([#295](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/295)) ([a474d00](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/a474d00ec4e198f293eefe29f88f1f178ecaf1eb))


### Improvements

* **routes/healthcheck:** do not treat routes as plugin ([b2bdbce](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b2bdbcece6523e77ac1c713ebef87e03b9c878a9))
* **routes/healthcheck:** move `Accept` header handling back to hook ([51d6db9](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/51d6db9b518da10e002361ca134af6908e5183d3))
* **server:** use full media type for `Accept` header filtering ([db66901](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/db669010643f68f17268643347bb0960da568a56))


### Dependencies

* **deps-dev:** bump eslint from 7.30.0 to 7.31.0 ([a50aab8](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/a50aab887d3255d3038b93f386a8b3d711ae58bd))
* **deps-dev:** bump eslint-plugin-jsdoc from 35.4.3 to 35.4.5 ([e159355](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/e15935517811e91a54eddedb820b966df972464a))
* **deps:** bump fastify from 3.19.0 to 3.19.1 ([df2c4a9](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/df2c4a92590e2f45a20aad3ebde3c3249a890953))
* **deps:** bump fastify-cors from 6.0.1 to 6.0.2 ([1061cab](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/1061caba21c346f79fd10b1da39cf26508c7cbaf))
* **deps:** bump wagoid/commitlint-github-action from 3.1.4 to 4.1.1 ([1171fb7](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/1171fb7d29dcab5f8bd4006e12b624a04599f409))


### Miscellaneous

* change mentions of "MIME type" to "media type" ([#290](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/290)) ([f114fc8](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/f114fc80a5323154b58d74759780612b18166e86))
* **env.template:** use double quotes ([e00a4c9](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/e00a4c96f2f356e3beeaa3e455062bccb78811da))
* **server:** sort plugin registering alphabetically ascending ([06a7de5](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/06a7de54218cb8ca51c9241fda23450d83b4c040))
* **test_resources:** fix name of test requests file ([e53bcb4](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/e53bcb4522cdbeefb536b3859bb98aa9bbcd9e99))
* **test_resources:** minor header tweaks ([add6319](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/add631908938d42a4aed86de89075f32c9e31357))
* **test_resources:** update test calls with new headers ([3bc9915](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/3bc9915f96e2641df061af7139e9884fe972fdae))
* update jsdoc tag comments ([#301](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/301)) ([7aeb792](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/7aeb79269137e1645f96b5ae72aeea7fe6d12ed1))
* update plugin metadata for server dependency graph ([1ff74b6](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/1ff74b6353b5d533936f4ee52c331212ba40345a))

### [3.2.5](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v3.2.4...v3.2.5) (2021-07-12)


### Bug Fixes

* **routes:** `Accept` header handling encapsulation ([#282](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/282)) ([8e780a7](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/8e780a7ef06a8310bc1ef7e276d5bbd3233261b5))


### Miscellaneous

* **vscode:** remove user space config setting ([63df0ad](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/63df0ad2035b74500e25b40e2f4fecdba281fd79))


### Dependencies

* **deps-dev:** bump eslint-plugin-jsdoc from 35.4.2 to 35.4.3 ([fecb242](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/fecb242588f0dc917809c41e131f440ec75300da))
* **deps-dev:** bump nodemon from 2.0.10 to 2.0.12 ([9a44dd6](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/9a44dd6de6920b98cd7a8876a34bba0c25f4e957))
* **deps:** bump env-schema from 3.0.1 to 3.1.0 ([8f99ce3](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/8f99ce392cd62eec31dba9003824a54a04c44d6d))
* **deps:** bump fastify-swagger from 4.8.2 to 4.8.3 ([c1d7a9c](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/c1d7a9c5beafbf2b62f1f519f813fcfe36d6f2d3))
* **deps:** bump fluent-json-schema from 3.0.0 to 3.0.1 ([472aa2d](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/472aa2de8e27c2674f48fedc8d9303921df321d5))
* **deps:** bump pino from 6.11.3 to 6.12.0 ([2cb11e2](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/2cb11e2a72a78fac4f2c9141ecd50a67b20b7278))

### [3.2.4](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v3.2.3...v3.2.4) (2021-07-09)


### Bug Fixes

* **routes/healthcheck:** add `Accept` request header handling ([a9d7a48](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/a9d7a487086eedbe73330f4ee4e64b94d9bac2ba))


### Miscellaneous

* **server:** clarify on accept request header handling ([3caae5c](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/3caae5c8c355d1506b78a860ed2e804ef511dc96))
* **vscode:** disable redhat telemetry ([6b52968](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/6b529687f6085afdb4afaa86d018bd27348e16d9))


### Dependencies

* **deps-dev:** bump autocannon from 7.3.0 to 7.4.0 ([1319036](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/131903606f9f38221f7788fc5f29a4a7621e9cca))
* **deps-dev:** bump eslint from 7.29.0 to 7.30.0 ([b532323](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b53232351a1a5d6884da67e9359bff741fc0dff8))
* **deps-dev:** bump eslint-plugin-jsdoc from 35.4.0 to 35.4.1 ([b3a6160](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b3a6160ecf8da262bc0a6c3302fe5b6f0e038520))
* **deps-dev:** bump eslint-plugin-jsdoc from 35.4.1 to 35.4.2 ([61e2542](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/61e2542a2998f896fe77fbca13f1669716c0672f))
* **deps-dev:** bump husky from 6.0.0 to 7.0.0 ([3fe468f](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/3fe468f49c1d064b93ad111aa81e11a0fea872bd))
* **deps-dev:** bump husky from 7.0.0 to 7.0.1 ([8d4ee30](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/8d4ee30147f0fc541aab28bce02f586fbe33d315))
* **deps-dev:** bump jest from 27.0.5 to 27.0.6 ([b24365e](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b24365e0b418e41da8610d3ae1239db7e46d694c))
* **deps-dev:** bump nodemon from 2.0.7 to 2.0.9 ([7c3471d](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/7c3471d5bdc6b13a9bec23d3d7d56f4064285b82))
* **deps-dev:** bump nodemon from 2.0.9 to 2.0.10 ([b7b589d](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b7b589dd5595c192cd683b89928731e2a1d7a768))
* **deps-dev:** bump pino-pretty from 5.0.2 to 5.1.0 ([b6e26fc](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b6e26fca3b7cedc663fc1d62d1b61adffa1f16d9))
* **deps-dev:** bump pino-pretty from 5.1.0 to 5.1.1 ([17455d4](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/17455d40a8d7a47d61283dc148e6e45de707ffd6))
* **deps-dev:** bump prettier from 2.3.1 to 2.3.2 ([b14ce27](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b14ce275f7bb6d8b4fb0fbce8e1ba930c23e953c))
* **deps:** bump actions/setup-node from 2.1.5 to 2.2.0 ([37155d8](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/37155d813240f9bc86914182eff7d4115ed2599e))
* **deps:** bump coverallsapp/github-action from 1.1.2 to 1.1.3 ([e77554c](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/e77554c2145d42eed2d17b625db772a959699336))
* **deps:** bump fastify from 3.18.0 to 3.18.1 ([074c9dd](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/074c9dd720bad855e46a03eade780440ed99b4f5))
* **deps:** bump fastify from 3.18.1 to 3.19.0 ([247fc5c](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/247fc5c8474e4f47295e228be65ef355162e4bfa))
* **deps:** bump fastify-helmet from 5.3.1 to 5.3.2 ([3df5f6c](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/3df5f6c29c1467838b8ffe06d7a289a0e35c7e18))
* **deps:** bump fastify-swagger from 4.8.0 to 4.8.2 ([add1e99](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/add1e998e7cbd0272bffcaae7262c32f8113be98))

### [3.2.3](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v3.2.2...v3.2.3) (2021-06-22)


### Bug Fixes

* **server:** increase `Strict-Transport-Security` max age to 365 days ([052fb0f](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/052fb0fc663381a007dcd782cf9da2e08b104402))
* **server:** revert `Referrer-Policy` directives to "no-referrer" only ([c0e5017](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/c0e5017dbfaced7ec65ca46f5f4807869d086279))
* **server:** use stricter `Content-Security-Policy` values ([888ea32](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/888ea32e4bac43ce508a0c47570c00ffd7c65c99))


### Continuous Integration

* **link-check:** reduce frequency from weekly to monthly ([#251](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/251)) ([2223459](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/2223459640c31b0a17bdf19b10d282bce633f6c7))


### Miscellaneous

* **server:** clarify on what each registered plugin does ([439341a](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/439341a6516e23842862bf57317f7ae8da78e08f))


### Dependencies

* **deps-dev:** bump eslint from 7.28.0 to 7.29.0 ([698d4eb](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/698d4eb21aec6f136a022bf31145f3daaa6961cb))
* **deps-dev:** bump eslint-plugin-jsdoc from 35.3.0 to 35.4.0 ([6d0b65e](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/6d0b65eccc0e3d4f4ee1d9244b9e504556038611))
* **deps-dev:** bump jest from 27.0.4 to 27.0.5 ([4b540f1](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/4b540f1314c8e88d66d56b125b32c7c6cda6b3eb))
* **deps:** bump fastify-autoload from 3.7.1 to 3.8.0 ([0a18dab](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/0a18dab0cc7fbd3492d2420b116e1f6240579a7c))
* **deps:** bump fastify-bearer-auth from 5.1.0 to 6.0.0 ([feda524](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/feda52480af1d0ab8e95fdc828db8b9d7fdb3ae3))
* **deps:** bump fastify-swagger from 4.7.0 to 4.8.0 ([46b3f97](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/46b3f978a497ae250f46255c61bc24595834e806))
* **deps:** bump under-pressure from 5.6.0 to 5.7.0 ([651c05c](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/651c05cf39d355539c3885d5f7b3dcfe076cf089))

### [3.2.2](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v3.2.1...v3.2.2) (2021-06-17)


### Dependencies

* **deps:** bump actions/upload-artifact from 2.2.3 to 2.2.4 ([c8c2225](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/c8c22251891fb140194f3fa528f3f627c1a51d86))
* **deps:** bump fastify from 3.17.0 to 3.18.0 ([68d4858](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/68d48580aaabd2ed8a22bb207a1f56ccf8476a75))
* **deps:** bump fastify-disablecache from 2.0.1 to 2.0.2 ([12edee1](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/12edee15ee6e6b67eb26daf22d81d6749f5b4b0e))

### [3.2.1](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v3.2.0...v3.2.1) (2021-06-16)


### Bug Fixes

* **config:** prettyprint conditional ([#242](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/242)) ([fddc5cc](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/fddc5ccc6c93aa3a95e3f99d461b066db0080c4b))


### Dependencies

* **deps-dev:** bump eslint-plugin-jsdoc from 35.1.3 to 35.3.0 ([e46c14c](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/e46c14cbf51f78537d7b1d7f84790391d00c8fe3))
* **deps:** bump fastify-compress from 3.5.0 to 3.6.0 ([cf43d57](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/cf43d578bc6847efe046a796f5e9fdf6bdeb9a32))
* **deps:** bump fastify-disablecache from 2.0.0 to 2.0.1 ([a3375b6](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/a3375b67c426f34630621ff6d50370975bd6a951))

## [3.2.0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v3.1.3...v3.2.0) (2021-06-11)


### Features

* **server:** add content-encoding support ([#239](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/239)) ([174477e](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/174477ea3cd014a62262a855e3b86bb4330b1ad3))


### Dependencies

* **deps:** bump mssql from 7.1.0 to 7.1.3 ([521b08c](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/521b08c5353b9e0897ddb93df34a323213bcfb8e))

### [3.1.3](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v3.1.2...v3.1.3) (2021-06-09)


### Bug Fixes

* **server:** remove swagger from csp for all routes apart from doc route ([dbdbf3b](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/dbdbf3bf5fdeefb9fdee7c0d9807c5811d132106))
* **server:** set `frame-ancestors` csp to `'none'`; add `child-src` csp ([debc025](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/debc025c0a0fb5910915bd7e36a87f06202a5dde))


### Dependencies

* **deps-dev:** bump eslint from 7.27.0 to 7.28.0 ([8dad2f3](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/8dad2f30fc564944d119ff4bdb907535e16511c2))
* **deps-dev:** bump eslint-plugin-jsdoc from 35.1.2 to 35.1.3 ([c78756c](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/c78756c476fa73676153950e0f85ec0cc81efaf5))
* **deps-dev:** bump jest from 27.0.3 to 27.0.4 ([1816d23](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/1816d23d8515a9d57385548c7147bece96c7e8e0))
* **deps-dev:** bump prettier from 2.3.0 to 2.3.1 ([4f1a013](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/4f1a013199f6c5a869e70e62b18f98b48bf858ce))
* **deps:** bump glob-parent from 5.1.1 to 5.1.2 ([130e5b8](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/130e5b809f2e99637e36d092ed99f688b36eef83))
* **deps:** bump normalize-url from 4.5.0 to 4.5.1 ([d65535d](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/d65535dbc2bf90de5ad266f3ee19f2a08927c1c9))
* **deps:** bump trim-newlines from 3.0.0 to 3.0.1 ([b20a9a2](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b20a9a2eb1e56144b789dbc07c95a8fc157c8ddd))

### [3.1.2](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v3.1.1...v3.1.2) (2021-06-02)


### Continuous Integration

* remove redundant docker build job ([a919aab](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/a919aab356e54b775688a3a47476449027cd9312))


### Documentation

* **readme:** add note regarding using `docker compose up` ([fd09508](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/fd09508754f4769d1cc28d5d0f1ddbf9dad30e17))
* **readme:** grammar and wordiness fixes ([a5b9987](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/a5b998710ce382e81ca4b9c7b11ee38bc20340f0))
* **readme:** update contributing section ([7ab1851](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/7ab1851e9641547a53000454f5643e6996bdf03f))


### Dependencies

* **deps-dev:** bump eslint-plugin-import from 2.23.3 to 2.23.4 ([72ebee6](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/72ebee6ea45b59b0a1e85a49d0167913ce83264a))
* **deps-dev:** bump eslint-plugin-jsdoc from 35.0.0 to 35.1.2 ([56dd3f8](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/56dd3f8fbdc1b1b362b3e4b4fb8c5f756f90866d))
* **deps-dev:** bump jest from 27.0.1 to 27.0.3 ([20491c0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/20491c0d5f418e978109d80e0419a847df805965))
* **deps-dev:** bump pino-pretty from 5.0.0 to 5.0.1 ([3211cf9](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/3211cf985565135231155f452dc79d34b70b0cec))
* **deps-dev:** bump pino-pretty from 5.0.1 to 5.0.2 ([06e8fa2](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/06e8fa2a5c5587255d6f4fea05623410e8a5ba49))
* **deps:** bump actions/cache from 2.1.5 to 2.1.6 ([fa2f514](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/fa2f514e08fe738e4ae2d9285c9fb1cd36c1bdee))
* **deps:** bump fastify from 3.16.2 to 3.17.0 ([11e1d6d](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/11e1d6d1e9cef0363f7d48f53b45c6e7c63e5d9f))
* **docker-compose:** use oci labels ([e60f447](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/e60f447632ee5ac59d2339802d9e91f533830fed))
* **dockerignore:** add test and dev files ([9cb7808](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/9cb78089f5022f85b83c8d9e1e6e95ed0f64f522))
* **docker:** update workdir; install curl ([bfa9067](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/bfa90671c0956eb05e2050ed35e0dd33224106f9))
* **docker:** use correct curl version ([5035e9b](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/5035e9be6bac7075581da7207e905787873bc99e))
* **docker:** use native logging, healthcheck, restart and res handling ([68128b2](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/68128b2a6a3edbfcb40b8aab9ed56730f2c251ee))

### [3.1.1](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v3.1.0...v3.1.1) (2021-05-27)


### Miscellaneous

* **workflows:** remove `stale.yml` ([ba47733](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/ba477335d6f93076a689da57e5c3b72eb51f11b8))


### Dependencies

* **deps-dev:** bump jest from 27.0.0 to 27.0.1 ([34a9ecc](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/34a9eccf56a09e877acb111f5cbad5219618fb24))
* **deps-dev:** bump pino-pretty from 4.8.0 to 5.0.0 ([5d2d881](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/5d2d88145a6dfb3d09d31d768156eda4eba82c33))
* **deps:** bump fastify from 3.15.1 to 3.16.2 ([c12e11f](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/c12e11fef30871133fdd71d9861ebbe3470bc9e3))


### Continuous Integration

* **cd:** move perf optimizations and refactoring into same section ([659c4c0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/659c4c03c2ec2dff21aaad813b51f2b84ad46f6b))

## [3.1.0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v3.0.3...v3.1.0) (2021-05-25)


### Features

* **routes/documents/register:** support multiple `lastModified` params ([0116bf1](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/0116bf1b8f4432bd4841e1a95f8be263d06c4f8e))


### Continuous Integration

* fix key usage in `action/setup-node` ([b47430c](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b47430ca6a4f5fd8b85b00da923843a3de5128ce))


### Miscellaneous

* **ci:** replace `node-version` key with shorter `node` ([#198](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/198)) ([1ea352d](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/1ea352de12c0e04357744c39f1b52ec528aa73d0))
* **dockerfile:** consolidate consecutive `run` instructions ([#200](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/200)) ([d50ada2](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/d50ada20296b3028d40293170178eaf1f886d530))
* **env:** remove pre-filled process load env values in template ([#203](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/203)) ([8ec0afc](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/8ec0afc604ae3a314b66e0f13ef7a90f6abd98a9))
* **routes/documents/register:** remove redundant branches ([db40ded](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/db40ded640e06130e37d17f1d83e976ea4f777ae))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 12.1.1 to 12.1.4 ([b37b72e](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b37b72ee00405a9fee9fc9bcc2a66b3c2610e6b2))
* **deps-dev:** bump @commitlint/config-conventional ([3f7c1d6](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/3f7c1d6a1a4ba11d516caa9eb2b3e51826c2c2bc))
* **deps-dev:** bump eslint from 7.26.0 to 7.27.0 ([cc58fbc](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/cc58fbcbb4db2cfaab87e4f9523aee81baaff4e0))
* **deps-dev:** bump eslint-plugin-import from 2.22.1 to 2.23.3 ([caf4b0c](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/caf4b0c1f78b246b097de6a17914dc95ab074073))
* **deps-dev:** bump eslint-plugin-jsdoc from 34.0.1 to 35.0.0 ([17e3f8f](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/17e3f8fa669636488127246e00f262ea27edd0db))
* **deps-dev:** bump jest from 26.6.3 to 27.0.0 ([31d1211](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/31d121123de22f40c51f87ac33abf0d6b746a03a))
* **deps:** bump actions/stale from 3.0.18 to 3.0.19 ([4014ec6](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/4014ec6d3aeeb5be1fbe6f1143c81b024eaf29b5))
* **deps:** bump dotenv from 9.0.2 to 10.0.0 ([59fed6f](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/59fed6f5fde32d9d9e53e09c60b079d8b65f3c60))
* **deps:** bump mssql from 7.0.0 to 7.1.0 ([7216d3a](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/7216d3a36454a55205b1cf12c9538ec293276732))
* **deps:** bump wagoid/commitlint-github-action from 3.1.3 to 3.1.4 ([a9db0c2](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/a9db0c2cb7613154928a66e7fddca2d6bb12e03c))

### [3.0.3](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v3.0.2...v3.0.3) (2021-05-11)


### Bug Fixes

* **config:** `LOG_LEVEL` env variable validation ([d36fd1f](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/d36fd1f528f4c950738e341b98ad482b4ed02fd7))


### Continuous Integration

* **link-check:** run once a week on monday ([cf86213](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/cf86213b418188b07aac375f22dbf3ab811bbed3))


### Dependencies

* **deps-dev:** bump autocannon from 7.2.0 to 7.3.0 ([77554b3](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/77554b3955debc6aaffaec5681e750267f5300c7))
* **deps-dev:** bump eslint from 7.25.0 to 7.26.0 ([34efbf4](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/34efbf4aa6c9108c4e5e4ead76a11d64bbb0670d))
* **deps-dev:** bump eslint-plugin-jsdoc from 33.1.0 to 34.0.1 ([3f67485](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/3f6748596395cebacf1604bbfc69245d5e4fe8a9))
* **deps-dev:** bump pino-pretty from 4.7.1 to 4.8.0 ([ae530f9](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/ae530f9a898ca5476c5b82e41b76fd1db8f39e1b))
* **deps-dev:** bump prettier from 2.2.1 to 2.3.0 ([#194](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/194)) ([647a42b](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/647a42b948be2344f4dfd11853bc47a95c025899))
* **deps:** bump brpaz/hadolint-action from 1.4.0 to 1.5.0 ([c5541fc](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/c5541fccf93f0ee909966f0bdd458db829874b4e))
* **deps:** bump dotenv from 9.0.0 to 9.0.2 ([fadebb9](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/fadebb95d3f97426eb8fffb10742bb868c35ad09))
* **deps:** bump fastify-cors from 6.0.0 to 6.0.1 ([c137f1e](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/c137f1e3eee988afa794b61a329cb982963203bc))
* **deps:** bump fluent-json-schema from 2.0.4 to 3.0.0 ([90feb81](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/90feb81a522601bdd6d6cdfc7090412ac8383401))
* **deps:** bump wagoid/commitlint-github-action from 3.1.1 to 3.1.3 ([85f04df](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/85f04df0254cbebc7551c256f8a3ed0aee0b77a9))

### [3.0.2](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v3.0.1...v3.0.2) (2021-05-07)


### Dependencies

* **deps-dev:** bump eslint-plugin-jsdoc from 33.0.0 to 33.1.0 ([0676da0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/0676da04e895a134e676c3019683d2bf9a15fa7c))
* **deps-dev:** bump glob from 7.1.6 to 7.1.7 ([4debfbc](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/4debfbcd43e0dbb809dba54f061644a184bd5c1d))
* **deps:** bump dotenv from 8.2.0 to 9.0.0 ([84c74f5](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/84c74f55c4da20ddf23b78a124209e33ca76eea8))
* **deps:** bump fastify-floc-off from 1.0.0 to 1.0.1 ([f76dcb4](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/f76dcb4904a10be3cd5b2e72a6b83b236297a653))
* **deps:** bump GoogleCloudPlatform/release-please-action ([7ff79b4](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/7ff79b4286ae856f8226ae7d999441bd2cd76ce1))
* **deps:** bump lodash from 4.17.20 to 4.17.21 ([6f37b8d](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/6f37b8d7a6bf58f374b826107380c37cd67b2bd3))
* **deps:** bump mssql from 6.3.1 to 7.0.0 ([6eaca11](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/6eaca111d7ef4199a1828cec49a675d65afc2911))
* **deps:** bump wagoid/commitlint-github-action from v3.1.0 to v3.1.1 ([8854095](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/88540958a943bfd1fe2e10014cfaf92126115167))

### [3.0.1](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v3.0.0...v3.0.1) (2021-05-04)


### Documentation

* **readme:** compress duplicate setup steps into a single section ([#173](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/173)) ([1d5c50d](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/1d5c50df99992e6dd2972a2eeb0c8d147c0975f9))


### Dependencies

* **deps:** bump fastify from 3.15.0 to 3.15.1 ([ad964d6](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/ad964d6a23e6b4d8e8ee689f4e5feaa27a853158))
* **deps:** bump GoogleCloudPlatform/release-please-action ([eba9923](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/eba99235ad3abf4f61e8dc0fc242e359da4d2b08))

## [3.0.0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v2.0.0...v3.0.0) (2021-04-30)


### ⚠ BREAKING CHANGES

* remove support for nodejs v10, as it is EOL as of 2021-04-30

### Features

* **config:** allow for rate and process limits to be user configured ([82d1ced](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/82d1ced102374baa588162022eb95f55230c92a3))
* **server:** add process-load/503 handling ([78aa4b4](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/78aa4b482ce37c1e83da1524b40b246b532dabee))
* **server:** add rate limiter ([8d183cd](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/8d183cdc3d2ad26c858570ffd287dff6381c5240))
* **server:** disable google floc support ([8dfce45](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/8dfce4545754868e8eb53080b80460cbd94a6eca))


### Bug Fixes

* **config:** plugin defaults ([50c8b9c](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/50c8b9c18abae56da9700e8c8d9140160b5068e3))
* **config:** re-add removed defaults ([13d1ff0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/13d1ff0b9538a752b2cbd97e91caf0db199f2ba7))
* **routes:** hide options routes from swagger docs ([08a1ae7](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/08a1ae7164727beca789e660017d76599fdc2af4))


### Miscellaneous

* **config:** remove redundant conditionals ([4d07d2e](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/4d07d2efd51d32dd420e55465cf653a6abf999d0))
* **env:** add whitespace ([3a48c7c](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/3a48c7c976d662d6234ac904d9e3799877f9f0a3))
* remove support for nodejs v10 ([53a5d81](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/53a5d81bdae3bc6a9d17baff483c30d2e1f767e0))
* **routes:** replace snakecase with camelcase ([9c9d1d6](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/9c9d1d643c4414e981ee34c04c45430b45979dba))


### Continuous Integration

* add nodejs v16 to unit test matrix ([11d08c3](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/11d08c340977dbd71de0acf5a45570a270c14992))
* do not run coveralls steps/jobs on forks ([7318ad9](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/7318ad9b0a269a1c90b1cce669b6c775118ac2a7))
* **link-check:** fix skip regex ([4089a2c](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/4089a2c4bca86b261a8a0d18c60bd9d7e448e885))
* **typoci:** add "pino" to excluded words ([57765fb](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/57765fbf137264ffb058f81fb9a3887e6cf95d3a))


### Documentation

* grammar and readability fixes ([e2b56ea](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/e2b56eaf0e3037e2f3666b322526d17203f83940))


### Dependencies

* **deps-dev:** bump autocannon from 7.0.5 to 7.2.0 ([fdf4315](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/fdf4315dbd2f554d1170b1276c143adc7e6b193f))
* **deps-dev:** bump eslint from 7.23.0 to 7.25.0 ([1899a0a](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/1899a0a2a9d02ff8a162e5c650081ae49375fd15))
* **deps-dev:** bump eslint-config-prettier from 8.1.0 to 8.3.0 ([f431b26](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/f431b26d0789ed327bf259d4a6e749106b0ad0e9))
* **deps-dev:** bump eslint-plugin-jest from 24.3.4 to 24.3.6 ([471f419](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/471f4195d14b0b58adb5eb9a4c4acb2d7ffa9056))
* **deps-dev:** bump eslint-plugin-jsdoc from 32.3.0 to 33.0.0 ([80060da](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/80060da5038abbb91cabb487e13970c7eaf6b3d5))
* **deps-dev:** bump eslint-plugin-promise from 4.3.1 to 5.1.0 ([044600d](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/044600da9585c6e43981fc10aa09e76b0a7c2fee))
* **deps-dev:** bump faker from 5.5.2 to 5.5.3 ([d13abb3](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/d13abb338b2081145884eb58927aa72042889756))
* **deps:** bump actions/cache from v2.1.4 to v2.1.5 ([7c1edee](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/7c1edee4e8cb5b527d5854529503692b407dcc40))
* **deps:** bump actions/github-script from v3.1.1 to v4.0.2 ([45dd861](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/45dd861865abe83beeae7cbfa3df6737342b2220))
* **deps:** bump actions/upload-artifact from v2.2.2 to v2.2.3 ([19dc231](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/19dc23195219fca3c26f1968bca6564f1325c620))
* **deps:** bump brpaz/hadolint-action from v1.3.1 to v1.4.0 ([7b60048](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/7b60048a2223b0834f05fa8adaf41812699d7afd))
* **deps:** bump fastify from 3.14.1 to 3.15.0 ([49ef354](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/49ef354224e8da18d45fb422d4b5a78d5c291778))
* **deps:** bump fastify-autoload from 3.6.0 to 3.7.1 ([584e0ce](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/584e0cec107ed97c69176e6764297c2cc197cfdd))
* **deps:** bump fastify-cors from 5.2.0 to 6.0.0 ([7b59a98](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/7b59a985cd52738622c99a152e407bba384a0223))
* **deps:** bump fastify-disablecache from 1.0.6 to 2.0.0 ([416fef3](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/416fef378c48fbd592ed7217511fdff3a988dbb4))
* **deps:** bump fastify-swagger from 4.5.0 to 4.7.0 ([864bfb0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/864bfb0738f8f9af82ea08b3fde87e8843edec36))
* **deps:** bump GoogleCloudPlatform/release-please-action ([0c84fc9](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/0c84fc9cea0743497778f0fcbac73e8632ea1e19))
* **deps:** bump pino from 6.11.2 to 6.11.3 ([0e761ed](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/0e761ed9a59b6394f388159fcc86cb56578633b6))
* **deps:** bump typoci/spellcheck-action from v0.4.0 to v1.1.0 ([514fe6f](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/514fe6f6255f2ce327f331e07d451f99268e659a))

## [2.0.0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v1.4.0...v2.0.0) (2021-04-06)


### ⚠ BREAKING CHANGES

* `CORS_METHODS` env variable removed

### Features

* add support for cors preflight requests ([c27d9f5](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/c27d9f5e704e260232f6a76c0778dc07bb184fba))
* **config:** support `access-control-allow-credentials` cors header ([860ee55](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/860ee556e30f410814450eacb51412968444fc6f))


### Bug Fixes

* **config:** comma-delimited string support for cors origin value ([883fe36](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/883fe3668bae2b174ad587723eb5bb2d8d805493))
* **config:** remove cors_methods from schema validation ([28a2f08](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/28a2f0812e9b08cc98e7c4ad514a5992be2d0406))


### Miscellaneous

* **env.template:** add default cors settings ([a98703b](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/a98703bbdb13df311fdc1715b69b5cf876856407))
* **env.template:** add note discouraging reflecting cors origin ([155fec3](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/155fec3aa95d5bf117cbd0d60ab71e3587a9e011))
* **env.template:** remove bad example ([6bb158a](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/6bb158a5578ec0c6214bb6e57f8d4146f64abd11))
* **tests:** standardise test file names ([92cf197](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/92cf19760f388c1811ccc9f78564ce5b89b2f385))


### Continuous Integration

* add cleanup-run job ([d48eb7a](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/d48eb7a667edfb02f59b647827426585b312922f))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 12.0.1 to 12.1.1 ([e35fa57](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/e35fa577e17e07608232b5708e7ab4e03f72e5ac))
* **deps-dev:** bump @commitlint/config-conventional ([4e6b57e](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/4e6b57efe425a9d3014e332db170d0265d8b6252))
* **deps-dev:** bump eslint-plugin-jest from 24.3.2 to 24.3.4 ([1b09191](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/1b091915bead66c753735ad14a218dd98e8e1aab))
* **deps-dev:** bump faker from 5.5.1 to 5.5.2 ([99d3887](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/99d38873f22d8d4bd0f98f9fd442157ffc09b3a2))
* **deps:** bump actions/github-script from v3.1.0 to v3.1.1 ([14972f0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/14972f023f4ab7fd504dec9c5ad79d50c2424f7f))
* **deps:** bump fastify-swagger from 4.4.2 to 4.5.0 ([1b77758](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/1b777581c179c2ad253e43e08a5a5f777faaafbf))
* **deps:** bump wagoid/commitlint-github-action from v3.0.6 to v3.1.0 ([cf782ae](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/cf782aed1d55f82ecc1398e42062f60d40222449))

## [1.4.0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v1.3.1...v1.4.0) (2021-03-30)


### Features

* **server:** use `strict-origin-when-cross-origin` referrer policy ([c99058e](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/c99058ec78575cac73a7bfc2d3d8feb7029a775b))


### Miscellaneous

* **config:** move `pino-pretty` config out of script ([29bbbb7](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/29bbbb79654a8d521f1416486cead45772851eb1))
* **prettierignore:** add yarn lock file ([a743252](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/a74325296d366b1d568b87700765f5235dd8b2df))
* **readme:** replace jpg ydh logo with svg ([357c52e](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/357c52e0a0a0a3494aaba466f1e88bad19729162))
* remove contraction usage in comments ([af86ff9](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/af86ff91e1170c23bf6ab0173854e41d13f64449))
* **server:** tidy inline comments ([d5cfe1c](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/d5cfe1c361c0e2808715e65ab8350c0b46eae7f2))
* **workflows:** rename ci and perf sections ([6be7b4a](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/6be7b4ad0b8522b1a6217c89dad02265df026eb0))


### Continuous Integration

* **automerge:** move automerge job into new workflow ([c068ef0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/c068ef0bca33ef4abc041b70e090bb2339793554))
* **ci:** ignore dependabot prs for commit message linting ([ff9b9ac](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/ff9b9ac74768880dc7afcd0aeb1a50f92b918f55))
* **stale:** shorten workflow name ([68c393f](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/68c393ffe777d8bfa510d8488b69eb5533152e8c))
* **workflows:** run only on push and pulls to master branch ([8f9eece](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/8f9eecefbcf0e008f926c9bd47835b5c91859ca4))


### Dependencies

* **deps-dev:** bump autocannon from 7.0.4 to 7.0.5 ([2678053](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/2678053c0bd3c7147fa7049de28289a09cbad8a1))
* **deps-dev:** bump eslint from 7.21.0 to 7.23.0 ([5c0a892](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/5c0a892b8f8586c604feed62c8dd5a5570b12a87))
* **deps-dev:** bump eslint-plugin-jest from 24.1.5 to 24.3.2 ([41d59e1](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/41d59e1413d1da219bb001a7d3094c08a71cfe8a))
* **deps-dev:** bump eslint-plugin-jsdoc from 32.2.0 to 32.3.0 ([e13d796](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/e13d79680ca0310c026e0700f6822146ee34f825))
* **deps-dev:** bump faker from 5.4.0 to 5.5.1 ([cb89b27](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/cb89b271a26e43b15c3ade5c7676639f6011ab8d))
* **deps-dev:** bump husky from 4.3.8 to 6.0.0 ([db042d8](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/db042d89b4c04c445d3e1b799ef36c22323ef7eb))
* **deps-dev:** bump pino-pretty from 4.5.0 to 4.7.1 ([4707c30](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/4707c306c20a4067c20515d386afb409ea6c9515))
* **deps:** bump actions/stale from v3.0.17 to v3.0.18 ([e36eb74](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/e36eb740960fb3ef8e7fddb75a7a630fc1173769))
* **deps:** bump env-schema from 2.1.0 to 3.0.1 ([4cb508b](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/4cb508b7eb6fe75e91e80486b8e6d47c683fa879))
* **deps:** bump fastify from 3.12.0 to 3.14.1 ([b22aeba](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b22aebad6c6e29d41e78f8ca97473119d7bb8794))
* **deps:** bump fastify-autoload from 3.5.2 to 3.6.0 ([060395b](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/060395b7c07604e26f112f42df55babec5b69b8e))
* **deps:** bump fastify-disablecache from 1.0.4 to 1.0.5 ([71fd4c8](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/71fd4c87c4ad5acdf03ed9899a4cd49abd9938e4))
* **deps:** bump fastify-disablecache from 1.0.5 to 1.0.6 ([f0b4493](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/f0b44933f3cee9a1ac83aeb6e2eb7982897692af))
* **deps:** bump fastify-helmet from 5.2.0 to 5.3.1 ([b85a03a](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b85a03afe933d869c7a04770cc3b7605f99ad30a))
* **deps:** bump fastify-swagger from 4.3.1 to 4.4.2 ([0ae302f](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/0ae302ffb9b93e4b0a0359b8cb702ce897743f24))
* **deps:** bump GoogleCloudPlatform/release-please-action ([eca8b5e](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/eca8b5e2de99df8c0e30300d0aeea3726dc51a0c))
* **deps:** bump pino from 6.11.1 to 6.11.2 ([98ec081](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/98ec08188d5ce9276e55f3867fb37a260a5b954f))
* **deps:** bump typoci/spellcheck-action from v0.3.0 to v0.4.0 ([ec9048b](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/ec9048b61c7144e16c50f8d963d2f3de852fb398))
* **deps:** bump wagoid/commitlint-github-action from v3.0.1 to v3.0.6 ([0e48dd1](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/0e48dd19d65efb9399723da6940f794cc5786fba))
* **deps:** bump xmldom from 0.4.0 to 0.5.0 ([59bca47](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/59bca4706468a12f8c487b18caf21e87787b32f4))
* **docker:** remove now optional `version` value ([33906d2](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/33906d2e2c7ca2c1d42860781cb02eb3b6c99259))

### [1.3.1](https://www.github.com/Fdawgs/ydh-myydh-crud-api/compare/v1.3.0...v1.3.1) (2021-03-03)


### Documentation

* **readme:** add link to sql ([642aa17](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/642aa17361e3242042a7cde33fe42fabf9cfc131))
* **readme:** fix broken link ([b8a003e](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b8a003ee0bcf8840c524c8dcc07e75df8587035a))
* **readme:** shorten links ([0c425b5](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/0c425b5a175d6476b87754d1a101f8eb310c3dd0))


### Dependencies

* **dependabot:** set commit message prefix; lower pull limit ([3b43a82](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/3b43a82b490fd22312371f1fe3c8369faae018c1))
* **deps:** specify minor and hotfix versions ([a0b17b2](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/a0b17b2630daf0aeda641c217de3e9fcfd28c112))


### Miscellaneous

* add link check workflow ([f78af85](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/f78af85d5e6c7603c0d21e98cb60dd90c81e4c6f))
* automate release and changelog generation ([6e4f646](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/6e4f64669480c0ae7235b1424c13916e82bdd82f))
* **codeql:** remove autobuild action ([b6786d3](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b6786d315bafa896723e49a64a55f3d1de7deddd))
* **dependabot:** ignore husky updates ([a9cb7de](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/a9cb7de2c18922a4b6e2503b9bece78942ead761))
* **deps-dev:** bump @commitlint/cli from 11.0.0 to 12.0.1 ([#88](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/88)) ([0aea501](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/0aea501b0ea73e1c8b003459f9ba225b1a583cf9))
* **deps-dev:** bump @commitlint/config-conventional ([12961ad](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/12961adff582d05a57409eea3b586af4f058a0d9))
* **deps-dev:** bump autocannon from 7.0.3 to 7.0.4 ([#94](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/94)) ([efc7a9d](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/efc7a9d24d40c70b34dcbde0c9ee904afd0e9c13))
* **deps-dev:** bump eslint from 7.19.0 to 7.20.0 ([#81](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/81)) ([193e803](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/193e80398e3d8a4327fb8fec0c146e297d0aa0ff))
* **deps-dev:** bump eslint from 7.20.0 to 7.21.0 ([#91](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/91)) ([197e69b](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/197e69b6970032f759e8076663e7eb1ae059c7d6))
* **deps-dev:** bump eslint-config-prettier from 7.2.0 to 8.1.0 ([f0b2a2b](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/f0b2a2b7a23bf02ff1ec0c54f0bb62d3dd0bcff6))
* **deps-dev:** bump eslint-plugin-jest from 24.1.3 to 24.1.5 ([547efe5](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/547efe5900ac7c2183a213b1167c849839092f75))
* **deps-dev:** bump eslint-plugin-jsdoc from 31.6.1 to 32.0.1 ([#76](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/76)) ([57ffd33](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/57ffd33495f37a48cf5158d6570681a344663878))
* **deps-dev:** bump eslint-plugin-jsdoc from 32.0.1 to 32.2.0 ([#93](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/93)) ([5279ed4](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/5279ed4971b3137dfd12d98f0bdfbcf753859e43))
* **deps:** bump env-schema from 2.0.1 to 2.1.0 ([#78](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/78)) ([d646cf8](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/d646cf892cbb377b8a49a4197e9899bd7e7baff3))
* **deps:** bump fastify from 3.11.0 to 3.12.0 ([#80](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/80)) ([36e29f0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/36e29f08cb1eb6c3b3d8e787c5a8a6e6ba1ae1b4))
* **deps:** bump fastify-autoload from 3.4.2 to 3.5.2 ([#90](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/90)) ([73f8e24](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/73f8e24bc1f1e8199c3ce110a24cd7be27d23d75))
* **deps:** bump fastify-bearer-auth from 5.0.2 to 5.1.0 ([#77](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/77)) ([e916877](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/e916877f70f757be9a550bc553330720d42aea2b))
* **deps:** bump fastify-swagger from 4.3.0 to 4.3.1 ([#79](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/79)) ([3869656](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/38696569893babd5f898aff5b65ebea85ebab465))
* **deps:** bump fluent-json-schema from 2.0.3 to 2.0.4 ([#86](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/86)) ([3e5ad36](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/3e5ad3666126b17e0855906b92f8d7f701c893d4))
* **deps:** bump wagoid/commitlint-github-action from v2.0.3 to v2.2.3 ([#75](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/75)) ([b294c7b](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b294c7bc44ee1952431f48d3148a24233489b2d0))
* **deps:** bump wagoid/commitlint-github-action from v2.2.3 to v3.0.1 ([f9c582f](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/f9c582f154073e06377c6835ddb3b8619e892b2e))
* **linkcheck:** add name ([5c907e0](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/5c907e0c2622a271b586a1f400f865a5596e2217))
* **linkcheck:** extend ignored urls ([e1fdd42](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/e1fdd42c89932b46169092d0fe32afef04d9d925))
* **lint-check:** compress patterns ([46d2d7a](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/46d2d7a1e9e20560717740bc77f08a21f54bdf46))
* **prettier:** create separate files to allow for CI/CD to use prettier config ([#96](https://www.github.com/Fdawgs/ydh-myydh-crud-api/issues/96)) ([d798a2c](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/d798a2c4a56608e2a9c8eb1b939381fab407f02d))
* remove link check action and replace with npx ([537eb46](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/537eb46dc6bf4ebf967b1a37b642d366c692dfc6))
* replace stalebot with github action ([ef024e6](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/ef024e6666609b3e56ce754cc062b2f00117991e))
* require `commit-lint` job to pass before automerge ([d4a943d](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/d4a943d6849a479e792e9d6de2bc20787c62af62))
* update link check workflow ([02627f9](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/02627f9792d800fa99ed4abab33526cd806c9891))
* **vscode:** remove conflicting prettier ext setting ([b5fb4c4](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/b5fb4c49e81257d3e9b1c3f76354001e5348fb58))
* **workflows:** move release steps into `cd` workflow ([03f809f](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/03f809f6f728cd4d09520a434fb6e128e83ae436))
* **workflows:** remove redundant comments ([9e935b4](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/9e935b4bf2e02a032f293225d58fdca6af7b936c))
* **workflows:** rename spellcheck workflow ([317f7de](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/317f7deb732531c16869a275d826c8782d74e20a))
* **workflows:** tidy node-version syntax ([07ae4c3](https://www.github.com/Fdawgs/ydh-myydh-crud-api/commit/07ae4c3c9af7e7d9ee8a0fd2c2d8c49fba5405da))

## 1.3.0 (2021-02-12)

-   fix: missing dependencies ([ff69f63](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/ff69f63))
-   fix(routes/documents/register): set format to uri for uri values ([e530f23](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/e530f23))
-   feat(routes/documents/register): add new columns ([7d3f4c3](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/7d3f4c3))
-   build(deps-dev): pin husky major version ([f25c78e](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/f25c78e))
-   style: shorten husky pre-push script ([b999a60](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/b999a60))
-   style(readme): add linebreaks between badges ([361082d](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/361082d))
-   style(scripts): rename `jest-coverage` to `jest:coverage` ([17f920a](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/17f920a))
-   style(tests): use apa header style for describe name params ([bd02d99](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/bd02d99))
-   ci: add commit-lint job ([67421c4](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/67421c4))
-   ci: replace typo ci app with action ([ec8ea13](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/ec8ea13))
-   chore: add bsd to list of allowed licenses ([29e5dac](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/29e5dac))
-   chore: add commitlint husky `commit-msg` hook ([390f258](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/390f258))
-   chore: add documentation style link to pr template ([1b9a961](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/1b9a961))
-   chore: set allowed list of licenses ([6a99abb](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/6a99abb))
-   chore(deps-dev): bump eslint-plugin-jsdoc from 31.6.0 to 31.6.1 (#69) ([a89faed](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/a89faed)), closes [#69](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/69)
-   chore(deps-dev): bump eslint-plugin-promise from 4.2.1 to 4.3.1 (#70) ([cb40ab1](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/cb40ab1)), closes [#70](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/70)
-   chore(deps-dev): bump faker from 5.2.0 to 5.4.0 (#66) ([222334e](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/222334e)), closes [#66](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/66)
-   chore(deps-dev): bump husky from 4.3.8 to 5.0.9 (#71) ([9428a2a](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/9428a2a)), closes [#71](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/71)
-   chore(deps): bump actions/cache from v2 to v2.1.4 (#65) ([a702776](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/a702776)), closes [#65](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/65)
-   chore(deps): bump fastify-swagger from 4.0.1 to 4.3.0 (#68) ([bc6e058](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/bc6e058)), closes [#68](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/68)
-   chore(deps): bump pino from 6.11.0 to 6.11.1 (#67) ([be58180](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/be58180)), closes [#67](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/67)
-   chore(vscode): add `redhat.vscode-yaml` as recommended extension ([e848ce0](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/e848ce0))
-   chore(vscode): add `updateImportsOnFileMove` setting ([6d6c39c](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/6d6c39c))
-   chore(vscode): add workspace settings and extensions ([b605620](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/b605620))
-   docs(changelog): escape star ([69eac75](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/69eac75))
-   docs(contributing): add documentation style ([f3135bf](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/f3135bf))
-   docs(readme): add ignore scripts arg ([500b1b5](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/500b1b5))

### 1.2.2 (2021-02-02)

-   test(config): delete test files ([2933009](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/2933009))
-   test(config): log stream key ([38a2f40](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/38a2f40))
-   chore(deps-dev): bump pino-pretty from 4.4.0 to 4.5.0 (#62) ([c6a6d22](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/c6a6d22)), closes [#62](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/62)
-   fix(config): stop rotatinglogstream flooding stdout ([8cce824](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/8cce824))
-   refactor(config): update openapi docs from v2.\*.\* to v3.\*.\* ([5928e61](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/5928e61))

### 1.2.1 (2021-02-01)

-   chore: add insomnia example requests ([aeaed49](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/aeaed49))
-   chore: check direct dependency licenses only ([9d7c724](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/9d7c724))
-   chore: stop excess coverage files being generated ([57efb55](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/57efb55))
-   chore(deps-dev): bump eslint from 7.18.0 to 7.19.0 (#55) ([677f7fd](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/677f7fd)), closes [#55](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/55)
-   chore(deps-dev): bump eslint-plugin-jsdoc from 31.4.0 to 31.6.0 (#51) ([e719ceb](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/e719ceb)), closes [#51](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/51)
-   chore(deps-dev): bump pino-pretty from 4.3.0 to 4.4.0 (#53) ([87ccfd0](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/87ccfd0)), closes [#53](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/53)
-   chore(deps): bump fastify-disablecache from 1.0.3 to 1.0.4 (#57) ([a7e7b23](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/a7e7b23)), closes [#57](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/57)
-   chore(deps): bump fastify-helmet from 5.1.0 to 5.2.0 (#54) ([5b4ecf1](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/5b4ecf1)), closes [#54](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/54)
-   chore(deps): bump fastify-swagger from 4.0.0 to 4.0.1 (#52) ([3ae4a57](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/3ae4a57)), closes [#52](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/52)
-   chore(routes): specify further openapi spec values ([52978a4](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/52978a4))
-   chore(sql): update example patient ids ([74a882a](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/74a882a))
-   style: rename `license-checker` to `lint:licenses` ([95d55c2](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/95d55c2))
-   style(readme): capitalise sql server subheading ([08670cf](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/08670cf))
-   refactor(server): use new exposed CSP dir from `fastify-helmet` ([15bcb46](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/15bcb46))
-   fix(docker): use node command over npm ([2ccfd85](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/2ccfd85))
-   docs(readme): remove superfluous text in pm2 install instructions ([b9f0b4d](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/b9f0b4d))
-   build(deps-dev): remove coveralls, replaced by github action ([2f441ce](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/2f441ce))
-   build(deps-dev): remove lodash ([b9f342b](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/b9f342b))

## 1.2.0 (2021-01-28)

-   chore: add pull request template ([774b207](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/774b207))
-   chore(deps-dev): bump eslint-plugin-jsdoc from 31.0.8 to 31.4.0 (#44) ([2d0fe12](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/2d0fe12)), closes [#44](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/44)
-   chore(deps-dev): bump faker from 5.1.0 to 5.2.0 (#46) ([ea77258](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/ea77258)), closes [#46](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/46)
-   chore(deps): bump fastify from 3.10.1 to 3.11.0 (#47) ([573711b](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/573711b)), closes [#47](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/47)
-   chore(deps): bump fastify-autoload from 3.4.0 to 3.4.2 (#45) ([b00264c](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/b00264c)), closes [#45](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/45)
-   chore(deps): bump fastify-cors from 5.1.0 to 5.2.0 (#42) ([c91356c](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/c91356c)), closes [#42](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/42)
-   chore(deps): bump fastify-swagger from 3.5.0 to 4.0.0 (#43) ([46c9aaa](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/46c9aaa)), closes [#43](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/43)
-   feat(config): allow configurable cors headers ([6bdad58](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/6bdad58))
-   style: capitalise headings correctly ([0b1255d](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/0b1255d))
-   style(ci): capitalise jobs and job step names ([f017968](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/f017968))
-   style(readme): capitalise headings correctly ([9ba6ad0](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/9ba6ad0))
-   style(readme): prettier badge shape ([82361a9](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/82361a9))
-   fix(config): add required properties ([6394b40](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/6394b40))
-   ci: cache on `node-version` as well as `os` ([59c03de](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/59c03de))
-   ci(github-actions): set `flag-name` for parallel coverage tests ([85a21ca](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/85a21ca))
-   ci(github-actions): set semver for coverallsapp ([c9e9a25](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/c9e9a25))
-   build(deps-dev): add husky for git hook handling ([81ca50d](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/81ca50d))
-   docs: bump coc from v1.4.0 to v2.0.0 ([1c6a345](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/1c6a345))

### 1.1.9 (2021-01-22)

-   refactor(pm2): use repo name for instances; remove redundant env setting ([1255e92](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/1255e92))
-   refactor(routes/documents): clean regex ([b4ac403](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/b4ac403))
-   refactor(server): use default helmet referrer policy ([1cd2d24](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/1cd2d24))
-   chore(deps-dev): bump autocannon from 7.0.2 to 7.0.3 (#38) ([bc416a7](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/bc416a7)), closes [#38](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/38)
-   chore(pm2): rename pm2 instances ([3a2855b](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/3a2855b))
-   build(docker): speed up install by using `npm ci` over `npm install` ([84156d3](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/84156d3))
-   fix(config): add `node_env` to schema ([80869bf](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/80869bf))
-   fix(server): reject unsupported content-types in `Accept` req header ([1c4e352](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/1c4e352))
-   test(routes/healthcheck): correct description ([d1771b9](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/d1771b9))
-   test(routes/preferences/user): 415 error res on unsupported content ([834024c](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/834024c))

### 1.1.8 (2021-01-21)

-   chore: rename repo to better reflect content ([1667997](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/1667997))
-   chore(deps-dev): bump autocannon from 7.0.1 to 7.0.2 (#36) ([a6238e7](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/a6238e7)), closes [#36](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/36)
-   fix(routes): remove heavy-handed required responses ([ae89b16](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/ae89b16))
-   docs(readme): update name of app supported ([0644883](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/0644883))

### 1.1.7 (2021-01-20)

-   build(docker): add `--ignore-scripts` arg ([1b3ecfb](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/1b3ecfb))
-   chore(deps-dev): bump eslint-plugin-jsdoc from 31.0.7 to 31.0.8 (#34) ([c76a228](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/c76a228)), closes [#34](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/34)
-   fix(routes): set min and max items for arrays; set unique items ([7a0b6d0](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/7a0b6d0))
-   fix(routes/documents/receipt): schema type from number to string ([9d131f1](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/9d131f1))
-   fix(routes/documents/register): set querystring per_page max to 100 ([57bb639](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/57bb639))
-   fix(routes/documents/register): set regex pattern for returned json ([03fc722](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/03fc722))
-   fix(routes/preferences/user): validate body of request ([dc7a58f](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/dc7a58f))
-   fix(routes/preferences/user): validate returned json ([f15fc16](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/f15fc16))

### 1.1.6 (2021-01-19)

-   chore(deps-dev): bump eslint-config-prettier from 7.1.0 to 7.2.0 (#31) ([6235796](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/6235796)), closes [#31](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/31)
-   chore(deps-dev): bump eslint-plugin-jsdoc from 31.0.6 to 31.0.7 (#29) ([a386f5d](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/a386f5d)), closes [#29](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/29)
-   chore(deps): bump fastify-disablecache from 1.0.1 to 1.0.3 (#30) ([81cea00](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/81cea00)), closes [#30](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/30)
-   chore(deps): bump helmet from 4.3.1 to 4.4.1 (#32) ([ca85e6f](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/ca85e6f)), closes [#32](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/32)
-   chore(package): add homepage and bug urls ([5edf454](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/5edf454))
-   chore(routes/documents): update example guid ([a9dac38](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/a9dac38))
-   fix(routes/documents/receipt): limit id param length to max of 36 ([dd3f2fc](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/dd3f2fc))
-   fix(routes/preferences/user): limit id param length to max of 10 ([e5c49ad](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/e5c49ad))
-   ci: lint lockfile ([dc85e75](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/dc85e75))
-   ci(typo-ci): add `ydh` to list of excluded words ([2861af2](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/2861af2))
-   test(routes): fix injection usage ([86d31bb](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/86d31bb))
-   refactor(routes/healthcheck): remove unused `options` param ([5ac0a52](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/5ac0a52))
-   docs(readme): correct script ([8992ccb](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/8992ccb))
-   build: remove `yarn` as package manager, revert to `npm` ([7d872d8](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/7d872d8))
-   style: rename `querystring` to `query` ([60c8c7a](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/60c8c7a))

### 1.1.5 (2021-01-15)

-   chore: convert missed headers to uppercase ([5cd7765](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/5cd7765))
-   chore(deps-dev): bump eslint-plugin-jsdoc from 31.0.3 to 31.0.5 (#26) ([54b6227](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/54b6227)), closes [#26](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/26)
-   chore(deps): bump fastify from 3.9.2 to 3.10.1 (#25) ([bdeea5b](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/bdeea5b)), closes [#25](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/25)
-   chore(plugins): add missing param descriptions ([f68f8e9](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/f68f8e9))
-   fix(routes/preferences/user): set accepted pattern for id param ([40fe971](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/40fe971))

### 1.1.4 (2021-01-14)

-   fix(server): set referrer policy with fallback ([83e0e0a](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/83e0e0a))
-   style(server): rename plugin variable ([a1678dd](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/a1678dd))
-   chore: disable cors in template ([3a2b770](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/3a2b770))

### 1.1.3 (2021-01-13)

-   fix(routes/documents/register): add missing table columns ([81ece65](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/81ece65))
-   docs(readme): clarify on api documentation location ([1831643](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/1831643))
-   ci: remove redundant javascript dictionary ([623ca92](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/623ca92))

### 1.1.2 (2021-01-12)

-   chore: add metadata to api schema ([b7c635f](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/b7c635f))
-   chore: add securitydefinitions and tags ([e841359](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/e841359))
-   chore: update license holder ([804973c](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/804973c))
-   chore(deps-dev): bump eslint-plugin-jsdoc from 31.0.2 to 31.0.3 (#18) ([87022ea](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/87022ea)), closes [#18](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/18)
-   chore(deps): bump fastify-disablecache from 1.0.0 to 1.0.1 (#19) ([d0cdaba](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/d0cdaba)), closes [#19](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/19)
-   chore(sql): add `register.documents` table creation ([3dfbc06](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/3dfbc06))
-   test: set resetmocks option in jest config ([2940577](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/2940577))
-   fix(routes): correct schema to be nullable string ([3d0dfb6](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/3d0dfb6))

### 1.1.1 (2021-01-11)

-   fix(env): set default cors to wildcard as boolean option broken ([ed8754f](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/ed8754f))
-   fix(server): add form-action csp directive ([c7d241c](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/c7d241c))
-   fix(server): disable caching ([4a18b30](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/4a18b30))
-   build(docker): ignore test_resources directory ([3a1c391](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/3a1c391))
-   docs(readme): correct badge links ([34c4ff5](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/34c4ff5))
-   chore: rename repository ([7c76a6c](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/7c76a6c))

## 1.1.0 (2021-01-11)

-   chore: add benchmark script ([5c96a32](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/5c96a32))
-   chore(deps-dev): bump eslint-plugin-jsdoc from 30.7.13 to 31.0.1 (#14) ([bbebc1a](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/bbebc1a)), closes [#14](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/14)
-   chore(deps): bump pino from 6.9.0 to 6.10.0 (#13) ([2b9af96](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/2b9af96)), closes [#13](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/13)
-   refactor(routes/preferences/options): removed unused branch ([c306093](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/c306093))
-   refactor(routes/preferences/user): removed unused branch ([f7e7d32](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/f7e7d32))
-   refactor(server): use helmet default csp directives function ([2a45afa](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/2a45afa))
-   style: rename fastifyplugin variable to fp ([44963d1](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/44963d1))
-   style(routes/preferences): rename variables to be meaningful ([f163946](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/f163946))
-   style(server): rename child server param to be clearer ([4aea194](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/4aea194))
-   fix(routes): export of schemas ([a67da6e](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/a67da6e))
-   fix(routes/documents/register): key casing ([c92cfa2](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/c92cfa2))
-   feat(routes): add healthcheck route ([b640424](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/b640424))
-   build: add typoci config file ([67e7650](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/67e7650))
-   docs(contributing): rename `main` to `master` ([11182f6](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/11182f6))

## 1.0.0 (2021-01-08)

-   chore: commit template ([d1a95fc](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/d1a95fc))
-   chore(deps-dev): bump nodemon from 2.0.6 to 2.0.7 (#4) ([9ab89a1](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/9ab89a1)), closes [#4](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/4)
-   chore(deps): bump fastify-helmet from 5.0.3 to 5.1.0 (#5) ([0869eee](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/0869eee)), closes [#5](https://github.com/Fdawgs/ydh-myydh-crud-api/issues/5)
-   chore(routes): remove unused variables ([585ae91](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/585ae91))
-   chore(routes/preferences): tidy response schema ([57f314e](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/57f314e))
-   chore(scripts): tidy license-checker options ([dfab5a0](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/dfab5a0))
-   docs(readme): add docker and pm2 deploy steps ([6358d4e](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/6358d4e))
-   docs(readme): add sql deployment section ([b3af0c0](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/b3af0c0))
-   docs(readme): clarify on backend api for what ([3717c31](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/3717c31))
-   docs(readme): update yarn link ([4125e90](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/4125e90))
-   test: skip tests that require a db connection ([54e45aa](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/54e45aa))
-   test(config): add bearer token test ([4c664b2](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/4c664b2))
-   test(plugins/mssql): add unit test ([d30f386](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/d30f386))
-   test(plugins/mssql): update sql query ([3c854ef](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/3c854ef))
-   test(routes): remove excess tests ([a016129](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/a016129))
-   test(routes/documents/receipt): add test requests ([3251fac](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/3251fac))
-   test(routes/documents/register): add test requests ([be109bd](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/be109bd))
-   test(routes/preferences/user): add test requests ([70161c4](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/70161c4))
-   test(server): add unit test ([d2ef5d6](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/d2ef5d6))
-   feat: add pm2 config file ([b8ff7e2](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/b8ff7e2))
-   feat(plugins): add mssql decorator plugin ([2816ab9](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/2816ab9))
-   feat(routes/documents): add functionality to `/receipt` routes ([2970d3c](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/2970d3c))
-   feat(routes/documents): add functionality to `/register` route ([aaea116](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/aaea116))
-   feat(routes/documents): add route schemas ([958296b](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/958296b))
-   feat(routes/preferences): add functionality to all routes ([4664590](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/4664590))
-   feat(routes/preferences): add route schemas ([ff3506e](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/ff3506e))
-   feat(server): add bearer token auth ([768b9ff](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/768b9ff))
-   refactor(plugins): rename mssql plugin, alter accepted options object ([559c1af](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/559c1af))
-   refactor(routes): remove redundant header schema ([9fc7217](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/9fc7217))
-   refactor(routes): tidy route structure ([ddeb258](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/ddeb258))
-   refactor(routes): use fluent json schema for other objects ([9c55e94](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/9c55e94))
-   refactor(routes/documents): remove duplicate code ([fee2a9e](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/fee2a9e))
-   refactor(routes/documents): use fluent json schema for header object ([a3c7953](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/a3c7953))
-   refactor(routes/documents/receipt): move queries into own functions ([d43d50f](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/d43d50f))
-   refactor(routes/documents/register): consolidate sql queries ([4fdf27b](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/4fdf27b))
-   refactor(routes/preferences/options): consolidate sql queries ([3d63616](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/3d63616))
-   refactor(routes/preferences/user): consolidate sql queries ([cae6c68](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/cae6c68))
-   refactor(routes/preferences/user): remove redundant branch ([90b23cf](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/90b23cf))
-   style(routes/documents): tidy test names ([79429a5](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/79429a5))
-   style(routes/documents/receipt): fix name of test ([50d2983](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/50d2983))
-   fix(routes): add semicolons to end of sql query strings ([cd68282](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/cd68282))
-   fix(routes/documents): fix expected type of id param ([9f775f3](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/9f775f3))
-   fix(routes/documents/receipt): add catch for missing records ([51014f0](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/51014f0))
-   fix(server): set missing content-security-policy directives ([85d68e6](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/85d68e6))
-   Initial commit ([78d5e0f](https://github.com/Fdawgs/ydh-myydh-crud-api/commit/78d5e0f))
