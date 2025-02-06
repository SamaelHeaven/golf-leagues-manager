FROM oven/bun:latest
WORKDIR /app
RUN apt-get update && apt-get install -y openssl
RUN mkdir -p /etc/ssl/certs /etc/ssl/private && \
    openssl req -newkey rsa:2048 -nodes -keyout /etc/ssl/private/private.key -out /etc/ssl/certs/certificate.csr -subj "/CN=localhost" && \
    openssl x509 -req -days 36500 -in /etc/ssl/certs/certificate.csr -signkey /etc/ssl/private/private.key -out /etc/ssl/certs/certificate.crt && \
    rm -f /etc/ssl/certs/certificate.csr
RUN bun add -g nodemon
COPY . .
CMD ["bunx", "nodemon", "--legacy-watch", "--exec", "bun", "run", "./dist/index.js"]