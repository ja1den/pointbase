# PointBase

> Point tracking system for Sports Day.

## Introduction

[PointBase](https://github.com/ja1den/pointbase) is an app for managing and recording points for school sports days.

It reads from a [MySQL](https://www.mysql.com/) database, and is built [Express](https://expressjs.com/), using [Pug](https://pugjs.org/).

## Usage

### Configuration

The server requires the following environment variables to be set:

```sh
DB_HOST="127.0.0.1"
DB_PORT=3306

DB_NAME="pointbase"

DB_USER="username"
DB_PASS="password"
```

In development, a `.env` file can be placed in the root of the project.

### Scripts

Start [Express](https://expressjs.com/) using [nodemon](https://nodemon.io/).

```sh
npm start
```

Build the [Docker](https://www.docker.com/) image.

```sh
npm run build -- ja1den/pointbase
```

Lint the project.

```sh
npm run lint
```

Kill the process on a port (Default: `3000`).

```sh
npm run script -- kill 4000
```

Hash a password with [Bcrypt](https://en.wikipedia.org/wiki/Bcrypt).

```sh
npm run script -- hash p4ssw0rd
```

Populate the database with pseudorandom data.

```sh
npm run script -- populate
```

Note: This clears all existing data.
