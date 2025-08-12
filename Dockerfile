# Multi-stage build for production
FROM node:22.16.0-alpine AS dependencies

RUN apk add --no-cache dumb-init

WORKDIR /usr/src/app

# Copy package files
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

# Development dependencies stage (for building)
FROM node:22.16.0-alpine AS build

WORKDIR /usr/src/app

# Copy package files
COPY package.json package-lock.json ./

# Install all dependencies (including dev)
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production stage
FROM node:22.16.0-alpine AS production

RUN apk add --no-cache dumb-init

RUN mkdir -p /usr/src/app \
    && chown -R node:node /usr/src/app

USER node
WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV PORT=3000

# Copy production dependencies
COPY --from=dependencies --chown=node:node /usr/src/app/node_modules ./node_modules

# Copy built application
COPY --from=build --chown=node:node /usr/src/app/dist ./dist
COPY --from=build --chown=node:node /usr/src/app/prisma ./prisma
COPY --from=build --chown=node:node /usr/src/app/package.json ./

# Generate Prisma client for production
RUN npx prisma generate

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "run", "start:prod"]
