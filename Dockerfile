# Production

FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Configure

EXPOSE 3000

ENTRYPOINT [ "node", "src/index.js"]
