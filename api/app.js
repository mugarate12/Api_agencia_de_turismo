// imports
const express = require('express');
const GraphQL_HTTP = require('express-graphql');

// meus imports
const schema = require('./graphql/schema');

// criar instancia do server
let app = express();

// cors

// middlewares
app.use('/graphql', 

  // coloco meus middlewares aqui
  (req, res, next) => {

    next();

  },

  // crio o schema propriamente dito, retornando um objeto
  GraphQL_HTTP((req, res, next) => ({

    schema,
    // melhorar isso
    graphiql: true,
    // context

  }))

);

module.exports = app;