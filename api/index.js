// imports
const http = require('http');

// meus imports
const app = require('./app');
const db = require('../models/index');

// utils
const {
  normalizePort,
  onListening,
  onError
} = require('./utils/utils');

// criando server e utilizando normalizePort
let server = http.createServer(app);
const port = normalizePort(process.env.PORT || 3000);

// sincronização com o banco
db.sequelize.sync({force: true})
  .then(() => {

    // subindo o servidor
    server.listen(port);
    server.on('error', onError(server));
    server.on('listening', onListening(server));


  })
  .catch((error) => {

    console.log(`erro de conexão com o banco: ${error.message}`);

  });