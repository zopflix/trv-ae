# ---- Build Stage ----
FROM node:22-alpine AS builder

WORKDIR /app

# Copy only package.json and lockfile first
COPY package*.json ./

# Install only production dependencies
RUN npm ci

# Copy source files and build the Next.js app
COPY . .
RUN npm run build

# ---- Production Stage ----
FROM gcr.io/distroless/nodejs22-debian12

# Install tini for proper child process reaping
# RUN apk add --no-cache tini

# Create non-root user
# RUN addgroup -S app && adduser -S app -G app
# USER app

WORKDIR /app

# Copy only the standalone build output and required files
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Remove risky binaries after user creation
# USER root
# RUN rm -f /bin/bash /usr/bin/wget /usr/bin/curl
# USER app


# Set production environment
ENV NODE_ENV=production

# Expose port 3000 (Next.js default)
EXPOSE 3000

# Use tini as init to prevent zombie processes
#ENTRYPOINT ["/sbin/tini", "--"]

# Run the app
# CMD ["node", "server.js"]
CMD ["server.js"]
