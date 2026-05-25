# --- STAGE 1: BUILD STATE ---
FROM node:18-alpine AS builder
WORKDIR /app

# Cache dependencies
COPY package*.json ./
RUN npm ci

# Copy code and build production files
COPY . .
RUN npm run build

# --- STAGE 2: PRODUCTION RUNTIME ---
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Only copy compiled code and production manifests
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
# If your Express backend code stays outside of dist, copy it here too:
# COPY --from=builder /app/server.js ./server.js 

EXPOSE 5000

# Run production script instead of development server
CMD ["node", "dist/server.js"]