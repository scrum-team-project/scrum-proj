FROM node:alpine
WORKDIR /opt/app
COPY ./package.json ./
COPY ./yarn.lock ./
RUN npm install
COPY ./ ./
CMD [ "npm", "start" ]

