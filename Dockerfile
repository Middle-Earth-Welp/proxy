FROM node:10

WORKDIR /
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

EXPOSE 3000

CMD [ "node", "./mongo/server/index.js" ]