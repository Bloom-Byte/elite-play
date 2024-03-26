FROM node:lts-alpine3.19
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD [ "npm","run","dev","--","--host","0.0.0.0" ]
