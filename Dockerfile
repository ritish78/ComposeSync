# Base image
FROM node:18-alpine

# Set working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json .

# Install npm packages in the root directory
RUN npm install

# Install nodemon
RUN npm install -g nodemon

# Copy rest of the files
COPY . .