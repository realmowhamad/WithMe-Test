FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Copy and make startup script executable
COPY start.sh /app/
RUN chmod +x /app/start.sh

# Expose ports
EXPOSE 3000 5173

# Start the application
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
