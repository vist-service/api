FROM nodesource/node:5.0

ADD package.json package.json  
RUN npm install
RUN npm install rolling -g
RUN npm run build:server
ADD . .

EXPOSE 3789

CMD ["node", "server.js"]
