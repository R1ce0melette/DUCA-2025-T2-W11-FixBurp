# Multi-stage build: build with node, serve with nginx for high performance
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source and build
COPY . .
RUN npm run build

# Production image: nginx serves static files
FROM nginx:1.25-alpine

# Copy custom nginx config
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 8088

# Use nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
