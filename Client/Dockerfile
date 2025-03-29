FROM node:18

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build --prod

RUN npm install -g http-server

EXPOSE 8080

CMD ["http-server", "dist/browser", "-p", "8080"]
