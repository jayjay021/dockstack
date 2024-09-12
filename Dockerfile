# Step 1: Build the Next.js application
FROM node:20-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json, pnpm-lock.yaml (or package-lock.json if you're still using npm for some reason) to the working directory
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN pnpm run build

# Step 2: Serve the application using a Node.js server
FROM node:20-alpine AS runner

# Set the working directory in the container
WORKDIR /app

# Install pnpm in the runtime container
RUN npm install -g pnpm

# Copy the built application from the builder stage
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port the app runs on
EXPOSE 3000

# Set the command to start the Next.js application
CMD ["pnpm", "start"]