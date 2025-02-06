FROM oven/bun:latest
WORKDIR /app
RUN apt-get update
RUN bun add -g nodemon
COPY . .
CMD ["bunx", "nodemon", "--legacy-watch", "--exec", "bun", "run", "./dist/index.js"]