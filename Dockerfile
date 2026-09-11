# Start from a small Linux image that already has Node.js 20 installed
FROM node:20-alpine

# Set /app as the working directory inside the container's filesystem
WORKDIR /app

# Copy just package.json (and package-lock.json) in first
COPY package*.json ./

# Install dependencies here, inside the container — creates node_modules
RUN npm install --omit=dev

# Now copy the rest of your source code in (node_modules and .env are skipped, via .dockerignore)
COPY . .

# Documents that the app listens on port 3000 (doesn't actually publish it — that's done in docker-compose.yml)
EXPOSE 3000

# The command that runs when the container starts, same as "node src/index.js"
CMD ["node", "src/index.js"]