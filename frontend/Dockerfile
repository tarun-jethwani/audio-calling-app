# frontend/Dockerfile

FROM node:20-alpine

WORKDIR /app

# Copy only dependency info first
COPY package.json package-lock.json ./

# Install dependencies including devDependencies
RUN npm install

# ✅ Ensure TypeScript and Vite are installed globally for CLI use in build
RUN npm install -g typescript vite

# Copy full source
COPY . .

# Build the frontend project
RUN npm run build

# Serve the built frontend with a static server
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]

