# frontend/Dockerfile
FROM node:20

WORKDIR /app

COPY ./frontend/package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
