# Deps
FROM node:22.12.0-alpine AS base
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

# Dev run
FROM base AS dev
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Prod build
FROM base AS build
ARG VITE_SITE_URL
#ARG VITE_API_BASE
ARG VITE_SERVER_ADDRESS
#ARG VITE_CRYPTO_KEY
ENV VITE_SITE_URL=$VITE_SITE_URL
#ENV VITE_API_BASE=$VITE_API_BASE
ENV VITE_SERVER_ADDRESS=$VITE_SERVER_ADDRESS
#ENV VITE_CRYPTO_KEY=$VITE_CRYPTO_KEY
RUN npm run build

# Prod run (node)
FROM node:22.12.0-alpine AS prod
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY --from=build /app/dist ./dist
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/server-build/server.js"]
