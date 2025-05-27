FROM node:22.15.0

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.10.0 --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

# For prod:
# RUN pnpm build

# For dev (hot-reload):
CMD ["pnpm", "start:dev"]