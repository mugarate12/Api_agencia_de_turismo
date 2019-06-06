// imports
const express = require('express');
const GraphQL_HTTP = require('express-graphql');

// meus imports
const schema = require('./graphql/schema');
const db = require('../models/index');

// criar instancia do server
let app = express();

// cors

// middlewares
app.use('/graphql', 

  // coloco meus middlewares aqui
  (req, res, next) => {

    req['context'] = {};
    req['context'].db = db;

    next();

  },

  // crio o schema propriamente dito, retornando um objeto
  GraphQL_HTTP((req, res, next) => ({

    schema,
    // melhorar isso
    graphiql: parseInt(process.env.NODE_ENV) === 1,
    context: req.context

  }))

);

module.exports = app;