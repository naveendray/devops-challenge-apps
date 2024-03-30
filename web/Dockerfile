FROM node:14
ENV PORT=5001
ENV API_HOST=http://localhost:5000
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE $PORT
CMD ["npm", "start"]