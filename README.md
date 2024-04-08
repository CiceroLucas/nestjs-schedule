
## Description

Esse projeto foi feito para aplicar meus conhecimentos em agendamento de email usando o Schedule do NestJS

O projeto tem como objetivo enviar um email para todos os usuários cadastrados no sistema. Com o schedule fiz 
com que um email de lembrete para um evento seja enviado de segunda a sexta às 7AM.

## Technologies
* NestJS
* PostgreSQL
* TypeORM

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## .env

```
MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASS=
DEFAULT_MAIL_FROM=
NAME=

TYPEORM_CONNECTION=
TYPEORM_HOST=
TYPEORM_PORT=
TYPEORM_USERNAME=
TYPEORM_PASSWORD=
TYPEORM_DATABASE=
```
