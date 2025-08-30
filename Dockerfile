FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

COPY apps/server/package*.json ./apps/server/
COPY apps/client/package*.json ./apps/client/
COPY packages/shared/package*.json ./packages/shared/

RUN npm install --include=dev --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./
COPY apps/server/package*.json ./apps/server/
COPY packages/shared/package*.json ./packages/shared/

RUN npm install --omit=dev --legacy-peer-deps

COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/apps/server/dist ./apps/server/dist
COPY --from=builder /app/apps/client/dist ./apps/client/dist

USER node

EXPOSE 3005

CMD ["node", "apps/server/dist/index.js"]