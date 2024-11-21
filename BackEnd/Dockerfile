FROM node:18

RUN apt-get update && apt-get install -y build-essential python3

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps && npm rebuild bcrypt --build-from-source

COPY . .

ENV MONGODB_URI=mongodb+srv://jorgelamanrique:admin@opticuidabd.hv7wj21.mongodb.net/
ENV CLIENTID=AcuzDfHpvEFJON7VyDMhYyOeldTXqFgxDij-lkfC-8sv7cuJJAOBuSdsk8Yq8DHnPfEwbm-wPa4LJD7u

EXPOSE 9000

CMD ["npm", "run", "start"]
