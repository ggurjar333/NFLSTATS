# Stage 1: Build the application
FROM node:16-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Set up the Express server to serve the build directory
FROM node:16-alpine
WORKDIR /app
# Copying from /app/dist of the build stage to /app/build of the final image
COPY --from=build /app/dist ./build
COPY server.js ./
RUN npm install express
EXPOSE 3000
CMD ["npm", "start"]
