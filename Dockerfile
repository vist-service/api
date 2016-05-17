FROM node:argon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD package.json /usr/src/app/
RUN npm install
RUN npm install rolling -g
RUN npm run build

COPY . /usr/src/app

EXPOSE 3789

CMD ["node", "server.js"]
