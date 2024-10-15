const validator = require('validator'); // Asegúrate de instalar validator

// Módulo de ejemplo.
module.exports = {
    // Lógica que valida si un teléfono está correcto.
    is_valid_phone: function (phone) {
        // Inicialización lazy
        var isValid = false;
        // Expresión regular para validar teléfonos
        var re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i;

        // Validación con Regex
        try {
            isValid = re.test(phone);
        } catch (e) {
            console.log(e);
        } finally {
            return isValid;
        }
    },

    // Función para manejar cómo se procesa un número de teléfono
    getEmbeddedCode: function(phone) {
        // Aquí puedes agregar lógica específica para tratar un número de teléfono.
        // Ejemplo: tal vez formatear el número o generar un enlace de llamada
        return `<a href="tel:${phone}">${phone}</a>`;
    },

    // Función para eliminar posibles scripts maliciosos
  sanitizeInput: function(input) {
  // Eliminar etiquetas HTML y cualquier posible contenido JavaScript
  return input.replace(/<script[^>]*>.*?<\/script>/gmi, '').replace(/<[^>]*>?/gm, ''); 
  },

    // Validar si es una URL de imagen válida
    is_valid_image_url: function(url) {
        return validator.isURL(url) && /\.(jpg|jpeg|png|gif)$/i.test(url);
    },

    // Validar si es una URL de video válida
    is_valid_video_url: function(url) {
        return validator.isURL(url) && /\.(mp4|webm|ogg)$/i.test(url);
    },

    // Función para validar el mensaje recibido y actuar en consecuencia
    validateMessage: function(msg) {
        var obj = JSON.parse(msg);

        // Sanitizar el mensaje para evitar scripts
        obj.mensaje = this.sanitizeInput(obj.mensaje);

        // Si el mensaje es un número de teléfono, lo formateamos
        if (this.is_valid_phone(obj.mensaje)) {
            console.log("Es un teléfono!");
            obj.mensaje = this.getEmbeddedCode(obj.mensaje);
        } 
        // Verificar si el mensaje es una URL válida de imagen o video
        else if (this.is_valid_image_url(obj.mensaje)) {
            console.log("Es una imagen!");
            obj.mensaje = `<img src="${obj.mensaje}" alt="Imagen">`;
        } else if (this.is_valid_video_url(obj.mensaje)) {
            console.log("Es un video!");
            obj.mensaje = `<video controls><source src="${obj.mensaje}" type="video/mp4">Tu navegador no soporta la reproducción de videos.</video>`;
        } else {
            console.log("Es un texto!");
        }
        
        // Devolver el mensaje validado como JSON
        return JSON.stringify(obj);
    }

    // Fin del módulo
};
