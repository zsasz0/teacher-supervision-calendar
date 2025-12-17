FROM node:20-alpine AS builder
WORKDIR /app

# Copy only package files first (best practice for caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the Vite app → outputs to /app/dist
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
