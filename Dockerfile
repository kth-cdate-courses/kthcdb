FROM oven/bun:canary AS builder

WORKDIR /app

# Copy root package.json and lockfile
COPY turbo.json ./
COPY package.json ./
COPY bun.lockb ./
COPY apps/api/tsconfig.json ./apps/api/tsconfig.json
COPY apps/api/prisma ./apps/api/prisma

# Copy the api package.json
COPY apps/api/package.json ./apps/api/package.json

COPY . .

RUN bun install
RUN bun install --cwd apps/api
RUN bunx prisma generate --schema apps/api/prisma/schema.prisma


RUN bun run build --filter=api

# Copy app source

CMD [ "bun", "run", "prod" ]