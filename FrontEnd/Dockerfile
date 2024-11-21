# Usa una imagen oficial de Node.js
FROM node:20

# Crea el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./
COPY . .

# Instala las dependencias
RUN npm i --legacy-peer-deps

# Expone el puerto 4200
EXPOSE 4200

# Comando para iniciar la aplicación
CMD ["npm", "start"]
