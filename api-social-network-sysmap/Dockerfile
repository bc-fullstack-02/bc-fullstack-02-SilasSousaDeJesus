FROM node:16.18.0

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8000

CMD [ "npm", "start" ]
