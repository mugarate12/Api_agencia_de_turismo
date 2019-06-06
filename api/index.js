// imports
const http =  require('http');

// meus imports
const app = require('./app');

// utils
const {
  normalizePort,
  onListening,
  onError
} = require('./utils/utils');

// criando server e utilizando normalizePort
let server = http.createServer(app);
const port = normalizePort(process.env.PORT || 3000);

// depois aqui terá que sincronizar com o banco
server.listen(port);
server.on('error', onError(server));
server.on('listening', onListening(server));