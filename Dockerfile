# 1. Official base image aligned with your package.json (v1.60.0)
FROM mcr.microsoft.com/playwright:v1.60.0-jammy

# 2. Working directory
WORKDIR /app

# 3. Enable Corepack for pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# 4. Cache strategy: Copy dependencies first
COPY package.json pnpm-lock.yaml ./

# 5. Strict installation
RUN pnpm install --frozen-lockfile

# 6. Copy the rest of the code
COPY . .

# 7. Verify Playwright browsers
RUN pnpm exec playwright install --with-deps

# 8. Default execution command
CMD ["pnpm", "run", "e2e:secure"]