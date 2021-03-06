// imports
const jwt = require('jsonwebtoken');

// meus imports
const JWT_SECRET = 'qualquer coisa';

const createToken = (idUserOrAdmin, isAdmin) => {
  
  const payload = isAdmin ?
    {
      
      sub: idUserOrAdmin,
      adm: isAdmin

    } :
    {

      sub: idUserOrAdmin
    
    };

  return {

    token: jwt.sign(payload, JWT_SECRET)

  };

}

module.exports = createToken;
