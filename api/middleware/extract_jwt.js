// imports
const jwt = require('jsonwebtoken');

// meus imports
const JWT_SCRET = "qualquer coisa";
const db = require('../../models/index');

const extraxt_JWT_Middleware = () => {

  return (req, res, next) => {

    let authorization = req.get('authorization');
    let token = authorization ? authorization.split(' ')[1] : undefined;

    req['context'] = {};
    req['context']['authorization'] = authorization;

    if (!token) return next();

    jwt.verify(token, JWT_SCRET, (error, decoded) => {

      if (error) return next();

      // identificar se é admin ou employee
      // e colocar no authuser
      if (decoded.adm) {

        db.admin
          .findByPk(decoded.sub)
          .then((adminInstance) => {

            if (!!adminInstance) {

              req['context']['authUser'] = {

                id: adminInstance.id,
                isAdmin: true

              }

            }

            next();

          });

      } else {

        db.employee
          .findByPk(decoded.sub)
          .then((employeeInstance) => {

            if (!!employeeInstance) {

              req['context']['authUser'] = {

                id: employeeInstance.id,
                isAdmin: false

              }

            }

            next();

          })

      }


    });

  }

}

module.exports = extraxt_JWT_Middleware;