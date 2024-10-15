// npm install para descargar los paquetes...

// Librerías
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var messageValidator = require('./unalib/index');  // Requiere el archivo de validación de mensajes
  // Requiere el archivo de validación de mensajes

// Root: presentar el HTML
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Escuchar una conexión por socket
io.on('connection', function(socket) {
  console.log('Un usuario se ha conectado.');

  // Si se escucha "Evento-Mensaje-Server"
  socket.on('Evento-Mensaje-Server', function(msg) {
    // Validar el mensaje antes de emitirlo
    var validatedMessage = messageValidator.validateMessage(msg);

    // Emitir el mensaje validado a todos los clientes
    io.emit('Evento-Mensaje-Server', validatedMessage);
  });

  // Detectar cuando un usuario se desconecta
  socket.on('disconnect', function() {
    console.log('Un usuario se ha desconectado.');
  });
});

// Iniciar el servidor
http.listen(port, function() {
  console.log('Escuchando en *:' + port);
});
