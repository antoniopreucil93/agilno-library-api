# Library API

Test task for Agilno. Application can be started with or withour Docker.

#### API documentation url: http://localhost:3000/api-docs/

## Installation (without docker)

Create .env file and define environment variables. You can open .env.example for reference.

Postgres needs to be installed on pc, if you like to change db engine it can be done in datasource file. Log in into database server and create one database. Inside package.json there are command for running database migrations;

Install node modules

```bash
npm install
```

Compile project

```bash
npm run tsc
```

Run migrations (Initialize database tables)

```bash
npm run db:init
```

Compile and run project

```bash
npm run dev
```

## Installation (with docker composer)

Docker composer must be installed on pc. Create .env file and define environment variables. You can open .env.example for reference. Modify env variables in docker-compose file if they need to be changed . Keep them the same as those in .env file.

build docker image

```bash
docker build -t agilno-api
```

Run docker compose

```bash
docker-compose up
```

Log in into api docker container

```bash
docker exec -it <container-id> bash
```

Run migrations

```bash
npm run db:init
```

## License
[MIT](https://choosealicense.com/licenses/mit/)