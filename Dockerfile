FROM node:20-alpine

# Workdir
WORKDIR /usr/app

# Install OS dependencies
# Curl needed for healthcheck command
RUN apk add --no-cache curl

# Copy and install node dependencies
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts --omit=dev && \
    npm pkg delete commitlint devDependencies jest nodemonConfig scripts && \
    npm cache clean --force

# Copy source
COPY . .

# Node images provide 'node' unprivileged user to run apps and prevent
# privilege escalation attacks
USER node
CMD ["node", "."]