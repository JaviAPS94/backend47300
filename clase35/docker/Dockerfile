# Primero vamos a definir la image que vamos a tomar como base
FROM node:16.17.1-alpine3.16

# Definir el directorio de trabajo dentro del contenedor
WORKDIR /app

# Vamos a copiar nuestro package.json dentro del contenedor
COPY package*.json ./

# Instalar las dependencias de mi app dentro del contenedor
RUN npm install

# Copiar el resto de archivos, en esto incluye nuestro código
COPY . .

# De mi contenedor quiero exponer el puerto 8080 para conectarme a mi app desde mi computador local
EXPOSE 8080

# Definimos el comando que se ejecutará al iniciar el contenedor
CMD ["npm", "start"]