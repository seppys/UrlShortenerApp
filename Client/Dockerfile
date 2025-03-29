# Stage 1: Build the Angular app
FROM node:18 AS build
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app with production configuration
RUN npm run build --configuration=production

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
# Copy the built Angular app to the Nginx HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]