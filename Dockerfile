FROM node:14

WORKDIR /usr/src/app

ENV NODE_CONFIG_DIR=./src/config \
    DOCKER_CLIENT_TIMEOUT=1200 \ 
    COMPOSE_HTTP_TIMEOUT=1200

# Install app dependencies
COPY package.json ./

RUN yarn install --network-timeout 100000

# Bundle app source
COPY . .
RUN yarn build

EXPOSE 5000

CMD [ "yarn", "start:prod" ]