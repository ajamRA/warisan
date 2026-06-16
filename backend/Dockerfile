FROM node:22-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-slim AS production
RUN apt-get update && apt-get install -y sharp && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/db ./dist/db
EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD node --input-type=module -e "import('http').then(http => http.get('http://localhost:3001/api/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1)))"
CMD ["node", "dist/index.js"]