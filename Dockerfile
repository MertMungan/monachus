# pull the official base image
FROM node:14-alpine
# set working direction
WORKDIR /app

COPY package.json .

COPY . .
RUN npm rebuild node-sass
EXPOSE 4000

CMD ["npm", "start"]