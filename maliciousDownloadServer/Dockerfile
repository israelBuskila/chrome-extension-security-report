# Use an official Node.js runtime as the base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of your application code into the container
COPY . .

# Expose the port that your Node.js server will run on
EXPOSE 3000

# Define the command to start your Node.js server
CMD ["npm", "start"]