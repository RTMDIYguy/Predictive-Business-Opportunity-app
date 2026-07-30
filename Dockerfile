# Step 1: Build stage (Installs ALL devDependencies so esbuild & vite can run)
FROM node:20-slim AS builder

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install ALL dependencies (including devDependencies like esbuild/vite)
RUN npm ci

# Copy all source code
COPY . .

# Run your build script: vite build && esbuild ... -> outputs to dist/server.cjs
RUN npm run build

# Step 2: Production runtime stage
FROM node:20-slim

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Copy package files and install ONLY production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy compiled backend & frontend assets from builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 8080

# Start the compiled esbuild output as specified in your "start" script
CMD ["node", "dist/server.cjs"]