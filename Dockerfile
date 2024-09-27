# Step 1: Use node image to build the app
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the app for production
RUN npm run build

# Step 2: Use nginx to serve the app
FROM nginx:alpine

# Copy the built files from the previous step
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx configuration, if needed
# Optional: You can add a custom nginx configuration if necessary
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the default port
EXPOSE 80

# Start nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]


