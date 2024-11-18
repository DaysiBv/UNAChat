# Usa la imagen base node:18
FROM node:18

# Establece el directorio de trabajo en /usr/src/app
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .
# Expone el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
