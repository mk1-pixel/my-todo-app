# frontend/Dockerfile
FROM node:20

WORKDIR /app

COPY ./frontend/package*.json ./

COPY ./frontend .

RUN npm install
EXPOSE 3000

CMD ["npm", "run", "dev"]
