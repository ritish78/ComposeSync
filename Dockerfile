# Base image
FROM node:19

# Set working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package.json package-lock.json ./

# Install npm packages in the root directory
RUN npm ci

# Change working directory to /app/client
WORKDIR /app/client

# Copy package.json and package-lock.json to /app/client
COPY client/package.json client/package-lock.json ./

# Install npm packages in the client directory
RUN npm ci

# Change working directory back to /app
WORKDIR /app

# Copy the rest of the application files to /app
COPY . .

EXPOSE 3000
EXPOSE 5000

# Start the server
CMD ["npm", "run", "dev"]
