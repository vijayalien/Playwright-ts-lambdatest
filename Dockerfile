FROM mcr.microsoft.com/playwright:v1.39.0-jammy

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

#Install chrome on Docker container
RUN npx playwright install

COPY . .


CMD xvfb-run npx playwright test