FROM oven/bun:1

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

# Zeabur runs the app as a long-lived Bun service, so use Nitro's Node server
# preset instead of the Cloudflare module preset used by Lovable publishing.
ENV NITRO_PRESET=node-server
ENV NITRO_HOST=0.0.0.0
RUN bun run build

ENV NODE_ENV=production
EXPOSE 3000

CMD ["bun", "run", "start:bun"]
