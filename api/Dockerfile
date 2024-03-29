FROM node:14
ENV PORT=5000
ENV DB=postgresql://postgres:password@wireapps.c3qk0ywowvqc.ap-southeast-1.rds.amazonaws.com:5432/wireapps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE $PORT
CMD ["npm", "start"]