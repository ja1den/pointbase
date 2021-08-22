# Build

FROM node:alpine

WORKDIR /app

COPY package*.json ./

COPY packages/api/package.json ./packages/api/package.json

COPY packages/client/package.json ./packages/client/package.json

COPY patches ./patches

RUN npm install

COPY . .

RUN npx lerna run build

# Production

FROM node:alpine

WORKDIR /app

COPY packages/api/package.json ./package.json

RUN npm install

COPY --from=0 /app/packages/api/build ./

COPY --from=0 /app/packages/client/build ./client

COPY packages/api/tsconfig.json ./api/tsconfig.json

# Configure

WORKDIR /app/api/src

EXPOSE 3000

ENTRYPOINT [ "node", "-r", "tsconfig-paths/register", "index.js"]
