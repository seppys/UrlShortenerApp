# Stage 1: Build the Angular app
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app in production mode
RUN npm run build -- --configuration=production --project=Client

# Stage 2: Serve the app with http-server
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install http-server globally
RUN npm install -g http-server

# Copy the built Angular app from the build stage
COPY --from=build /app/dist /app

# Expose port 80 for the http-server
EXPOSE 80

# Start http-server
CMD ["http-server", "-p", "80"]
