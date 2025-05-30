FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /orii-front
COPY package*.json ./
RUN npm install --frozen-lockfile


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /orii-front
COPY --from=deps /orii-front/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /orii-front

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

#archivos necesarios de config

COPY --from=builder /orii-front/next.config.ts ./
COPY --from=builder /orii-front/public ./public
COPY --from=builder /orii-front/package.json ./package.json
COPY --from=builder /orii-front/.env ./

#archivos del build de Next

COPY --from=builder --chown=nextjs:nodejs /orii-front/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /orii-front/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["node", "server.js"]
