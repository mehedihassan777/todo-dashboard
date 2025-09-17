# ---- deps (install node_modules) ----
FROM node:20-slim AS deps
WORKDIR /app

# If you use corepack/pnpm/yarn, enable it here
# RUN corepack enable

COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm npm ci

# ---- builder (build Next with .env.test) ----
FROM node:20-slim AS builder
WORKDIR /app

# Choose which env file to use for the build (default: .env.test)
ARG ENV_FILE=.env.test

# Bring in source & node_modules
COPY . .
COPY --from=deps /app/node_modules ./node_modules

# Make sure .env.local isn't present in the image and copy test env as production at build time
# Next loads .env.production (and .env.local if present) when NODE_ENV=production.
# We copy .env.test -> .env.production so test values are used during build.
RUN rm -f .env.local && cp "$ENV_FILE" .env.production

# Disable telemetry in CI/containers (optional)
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build the app (standalone output)
RUN npm run build

# ---- runner (small runtime image) ----
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy standalone server + static assets
# - .next/standalone contains server.js and minimal node_modules
# - public and .next/static contain static files
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Non-root for safety
USER node

EXPOSE 3000
# "server.js" is at repo root inside the standalone bundle
CMD ["node", "server.js"]
