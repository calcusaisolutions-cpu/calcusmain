FROM node:24-alpine AS frontend
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY index.html vite.config.js ./
COPY src ./src
COPY public ./public
RUN npm run build
FROM golang:1.24-alpine AS backend
WORKDIR /app
COPY go.mod ./
COPY server ./server
RUN CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o /studio ./server
FROM alpine:3.22
RUN addgroup -S studio && adduser -S studio -G studio && mkdir /data && chown studio:studio /data
WORKDIR /app
COPY --from=backend /studio /app/studio
COPY --from=frontend /app/dist /app/dist
USER studio
ENV DATA_DIR=/data PORT=8080
EXPOSE 8080
CMD ["/app/studio"]
