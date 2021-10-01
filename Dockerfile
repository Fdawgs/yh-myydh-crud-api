FROM node:lts-alpine

# Workdir
WORKDIR /usr/app

# Copy and install packages
COPY . .
# Curl needed for healthcheck command
RUN apk add --no-cache curl && \
    npm ci --ignore-scripts && npm cache clean --force

# Node images provide 'node' unprivileged user to run apps and prevent
# privilege escalation attacks
USER node
CMD ["node", "."]