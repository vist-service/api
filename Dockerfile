FROM nodesource/node:5.0

ADD package.json package.json  
RUN npm install
RUN npm run build:server
ADD . .

CMD ["node", "server.js"]
