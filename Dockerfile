# Multi-stage build for optimal image size
FROM node:20-alpine AS builder

WORKDIR /app

# Copy ALL necessary configuration files first
COPY package*.json ./
COPY tsconfig*.json ./
COPY apps/server/package*.json ./apps/server/
COPY apps/server/tsconfig*.json ./apps/server/
COPY packages/shared/package*.json ./packages/shared/
COPY packages/shared/tsconfig*.json ./packages/shared/

# Install all dependencies (including dev dependencies for building)
RUN npm install --include=dev

# Copy source code
COPY packages/shared/ ./packages/shared/
COPY apps/server/ ./apps/server/

# Build the application
RUN npm run build:shared && npm run build:server

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/server/package*.json ./apps/server/
COPY packages/shared/package*.json ./packages/shared/

# Install only production dependencies
RUN npm install --omit=dev

# Copy built artifacts from builder stage
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/apps/server/dist ./apps/server/dist

# Use the existing node user
USER node

EXPOSE 3005

# Start the server
CMD ["node", "apps/server/dist/index.js"]
