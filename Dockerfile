FROM node:18-alpine

WORKDIR /usr/app

COPY package*.json ./
COPY tsconfig.json ./
COPY ./prisma ./prisma
RUN yarn install 

COPY . .
RUN yarn build

CMD ["yarn","start"]

