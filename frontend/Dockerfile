# Base image with Node.js
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your frontend code
COPY . .

# Expose the default React port
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]
