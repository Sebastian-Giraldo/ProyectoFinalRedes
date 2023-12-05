# Utilizar la imagen base de Node.js
FROM node

# Crear el directorio /proyecto
RUN mkdir /proyecto

# Copiar los archivos necesarios al directorio /proyecto
COPY /recetario /proyecto

# Cambiar propietario y permisos
RUN chown -R node:node /proyecto
RUN chmod -R 755 /proyecto

# Establecer el directorio de trabajo como /proyecto
WORKDIR /proyecto
RUN npm install /proyecto

# Expone el puerto en el que tu aplicación está escuchando
EXPOSE 8080

# Comando para ejecutar tu aplicación
CMD ["npm","start"]