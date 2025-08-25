# Base Node.js image
FROM node:20-alpine

ENV NODE_ENV=production

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and lock file first (better for caching)
COPY apps/server/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server source code
COPY apps/server .

# Expose the port
EXPOSE 3005

# Start the app
CMD ["npm", "start"]