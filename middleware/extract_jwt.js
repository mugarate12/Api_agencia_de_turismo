// imports
const jwt = require('jsonwebtoken');

// meus imports
const JWT_SCRET = "qualquer coisa";
const db = require('../models/index');

const extraxt_JWT_Middleware = (req, res, next) => {
  
  let authorization = req.get('authorization');
  let token = authorization ? authorization.split(' ')[1] : undefined;

  req['context'] = {};
  req['context']['authorization'] = authorization;

  if(!token){ return next(); }

  jwt.verify(token, JWT_SCRET, (error, decoded) => {

    if(error) return next();

    // um ou outro?
    // e colocar no authuser

  });

}
