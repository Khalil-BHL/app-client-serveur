# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Production stage
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app ./

EXPOSE 5000
CMD ["node", "index.js"]