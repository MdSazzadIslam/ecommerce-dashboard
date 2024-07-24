# Stage 1: Build the React application
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) and install dependencies
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the React application with environment variables
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN npm run build

# Stage 2: Serve the React application using Nginx
FROM nginx:alpine

# Copy the build output from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy the custom Nginx configuration file into the container
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 3000
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
