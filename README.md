# PointBase

> Point tracking system for Sports Day.

## Introduction

This app is designed to manage and record points for school sports days.

It reads from a [MySQL](https://www.mysql.com/) database, and is built with [React](https://reactjs.org/) and [Express](https://expressjs.com/).

## Usage

### Environment

Create an `.env` file containing the following:

```sh
DB_HOST="127.0.0.1"
DB_PORT=3306

DB_USER="username"
DB_PASS="password"
```

### Scripts

Start [Create React App](https://create-react-app.dev/) in development mode.

```sh
npm start -w client
```

Start [Express](https://expressjs.com/) in development mode.

```sh
npm start -w api
```

Build the [Docker](https://www.docker.com/) image.

```sh
npm run build -- ja1den/react-express-template
```

Lint the project.

```sh
npm run lint
```

Kill the process on a port (Default: `4000`).

```sh
npm run kill -- 3000
```

Hash a password with [Bcrypt](https://en.wikipedia.org/wiki/Bcrypt).

```sh
npm run bcrypt -- p4ssw0rd
```

Remove all `node_modules` directories.

```sh
npm run clean
```
