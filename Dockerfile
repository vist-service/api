FROM node:5

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

RUN npm install rolling -g
RUN npm run build

EXPOSE 3789

CMD ["node", "server.js"]
