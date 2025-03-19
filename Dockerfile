# ---- Build Stage ----
FROM node:20-alpine AS builder

WORKDIR /app

# Copy only package.json and lockfile first
COPY package*.json ./

# Install only production dependencies
RUN npm i --force

# Copy source files and build the Next.js app
COPY . .
RUN npm run build

# ---- Production Stage ----
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only the standalone build output and required files
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Expose port 3000 (Next.js default)
EXPOSE 3000

# Set production environment
ENV NODE_ENV=production

# Run the app
CMD ["node", "server.js"]
