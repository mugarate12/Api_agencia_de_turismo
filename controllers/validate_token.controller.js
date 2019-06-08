// imports
const jwt = require('jsonwebtoken');

// meus imports
const { throwError } = require('./../api/utils/utils');
const JWT_SECRET = 'qualquer coisa';

const auth = (context) => {
  
  throwError(!context.authorization, 'token not provided');

  return true;

}

const verifyToken = (context) => {

  if (context.authUser) return true;

  if(context.authorization) {

    let token = context.authorization.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (error, decoded) => {

      if(decoded) return true;

      throwError(error, 'token invalid');
      
    });

  }

}

const validateToken = (context) => {
  
  auth(context);
  verifyToken(context);

}

module.exports = validateToken;