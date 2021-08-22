# React Express Template

> My template for [React](https://reactjs.org/) projects.

## Introduction

This is a template for [React](https://reactjs.org/) projects built with [TypeScript](https://www.typescriptlang.org/).

It includes an [Express](https://expressjs.com/) server for hosting a REST API.

It uses [workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) to manage dependencies, and includes a [Dockerfile](Dockerfile).

## Usage

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

## License

[MIT](LICENSE)
