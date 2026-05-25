# --- STAGE 1: BUILD THE VITE SITE ---
FROM node:18-alpine AS builder
WORKDIR /app

# Cache dependencies
COPY package*.json ./
RUN npm ci

# Copy code and build production static files
COPY . .
RUN npm run build

# --- STAGE 2: PRODUCTION RUNTIME (NGINX) ---
FROM nginx:alpine AS runner

# Copy the static production files from Vite's dist folder into Nginx's HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Fix for Vite routing: Redirects all fallback routes back to index.html to prevent 404 errors on refresh
RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

# Expose port 80 (Standard web port used by Nginx)
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]