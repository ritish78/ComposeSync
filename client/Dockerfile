# Base image
FROM node:18-alpine

# Change working directory to /app/client
WORKDIR /app/client

# Copy package.json and package-lock.json to /app/client
COPY package*.json .

# Install npm packages in the client directory
RUN npm install

# Copy rest of the application files to /app
COPY . .