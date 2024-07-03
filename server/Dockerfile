# Stage
FROM node:14 As builder

ENV NODE_ENV=production

WORKDIR /usr/src/server

COPY .babelrc ./
COPY package*.json ./
COPY webpack.server.build.config.js ./

COPY . .

RUN npm install && npm install -g pg pg-hstore sequelize sequelize-cli 

RUN npm run build

COPY pre-start.sh /pre-start.sh
RUN chmod +x pre-start.sh

EXPOSE 4000

ENTRYPOINT ["/pre-start.sh"]