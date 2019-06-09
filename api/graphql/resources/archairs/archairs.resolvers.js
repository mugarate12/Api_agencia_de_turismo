// imports

// meus imports
const {
  handleError,
  throwError
} = require('./../../../utils/utils');
const {
  isAdmin,
  isEmployee
} = require('./../../../utils/identify_token');
const validateToken = require('./../../../../controllers/validate_token.controller');

const archairsResolvers = {

  Archair: {

    idOfPurchaser: (parent, args, context, info) => {

      let { db } = context;

      return db.employee
        .findByPk(parent.get('idOfPurchaser'))
        .then(employeeInstance => {

          return employeeInstance;

        })
        .catch(error => handleError(error));

    }

  },
  Query: {

    archairByBus: (parent, args, context, info) => {

      validateToken(context);

      let { idBus } = args;
      let id = parseInt(idBus);
      let { db } = context;

      return db.armchairs
        .findAll({

          where: { idBus: id }

        })
        .catch(error => handleError(error));

    },
    archairByNameOfEmployee: (parent, args, context, info) => {

      validateToken(context);
      throwError(isEmployee(context), 'access denied');

      let { employeeName } = args;
      let { db } = context;

      return db.employee
        .findOne({

          where: { name: employeeName }

        })
        .then(employeeInstance => {

          throwError(!employeeInstance, 'employee not found!');

          return db.armchairs
            .findAll({

              where: { idOfPurchaser: employeeInstance.id }

            })
            .catch(error => handleError(error));

        })
        .catch(error => handleError(error));

    }

  },
  Mutation: {

    createArchair: (parent, args, context, info) => {

      validateToken(context);

      let { input } = args;
      let { db } = context;

      input.available = 'vendida';

      return db.sequelize.transaction(Transaction => {

        return db.armchairs
          .create(input, {

            transaction: Transaction
            
          })
          .then(archairInstance => {

            return archairInstance;

          })

      })
      .catch(error => handleError(error));

    },
    deleteArchair: (parent, args, context, info) => {

      validateToken(context);
      throwError(isEmployee(context), 'access denied');

      let { db } = context;
      let { id } = args;
      id = parseInt(id);

      return db.sequelize.transaction(Transaction => {

        return db.armchairs
          .findByPk(id)
          .then(armchairInstance => {

            throwError(!armchairInstance, 'armchair not found!');

            return armchairInstance
              .destroy({

                transaction: Transaction
              
              })
              .then(armchairInstanceRemoved => {

                return !!armchairInstanceRemoved

              });

          });

      })
      .catch(error => handleError(error));

    }

  }

}

module.exports = archairsResolvers;