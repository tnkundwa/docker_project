# === STAGE 3: FRONTEND ===
FROM node:24-slim AS frontend

WORKDIR /app

COPY client/package*.json ./

RUN npm install

COPY client/ ./

CMD ["npm", "run", "dev"]

# === NEW: FRONTEND PRODUCTION COMPILER ===
FROM frontend AS frontend-builder
RUN npm run build

# === STAGE 1: DEVELOPMENT ===
FROM node:24 AS development

WORKDIR /app

COPY backend/package*.json .npmrc ./

RUN npm install --ignore-scripts=false

COPY backend/src ./src

EXPOSE 3000

CMD ["npm", "run", "dev"]

# === STAGE 4: TEST_RUNNER ===
#FROM development AS test_runner 
FROM node:24-slim AS test_runner

WORKDIR /app

COPY --from=development /app/src ./src
COPY --from=development /app/package*json /app/.npmrc ./
COPY --from=development /app/node_modules ./node_modules
COPY backend/spec ./spec

RUN npm test

# === STAGE 2: PRODUCTION ===
FROM node:24-slim AS production

WORKDIR /app

COPY --from=test_runner /app/package*json /app/.npmrc ./
COPY --from=test_runner /app/node_modules ./node_modules

RUN npm prune --omit=dev

RUN rm -f .npmrc

COPY --from=development /app/src ./src
COPY --from=frontend-builder /app/dist ./src/static

EXPOSE 3000

CMD ["node", "src/index.js"]
