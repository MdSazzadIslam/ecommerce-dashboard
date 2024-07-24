## Stage 1: Build Step
FROM node:16-alpine AS node-typescript-starter-builder
WORKDIR /usr/app

# Copy package.json and package-lock.json if they exist
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

## Stage 2: Application Runtime
FROM node:16-alpine
WORKDIR /app

# Set environment variables
ENV NODE_ENV production

# Copy package.json and install production dependencies
COPY package.json ./
RUN npm install --only=production

# Copy built TypeScript output from the first stage
COPY --from=node-typescript-starter-builder /usr/app/dist /app/dist

# Expose port 8000
EXPOSE 8000

# Use a shell command to run multiple commands
CMD ["sh", "-c", "npm run seed:prod && npm start"]
