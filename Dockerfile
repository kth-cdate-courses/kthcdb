FROM oven/bun:1.1.38-alpine AS builder

WORKDIR /app

# Copy root package.json and lockfile
COPY turbo.json ./
COPY package.json ./
COPY bun.lockb ./

# Copy the api package.json
COPY apps/api/package.json ./apps/api/package.json

RUN bun install
RUN bun install --cwd apps/api

# Copy app source
COPY . .


CMD [ "bun", "run", "apps/api/dist/index.js" ]