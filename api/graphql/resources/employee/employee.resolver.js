// meus imports
const {
  handleError,
  throwError
} = require('../../../utils/utils');
const validateToken = require('./../../../../controllers/validate_token.controller');
const createToken = require('./../../../utils/create_token');

const employeeResolvers = {
  Employee: {},
  Query: {

    currentEmployee: (parent, args, context, info) => {

      validateToken(context);
      throwError(context.authUser != undefined && context.authUser.isAdmin, 'employee invalid');

      let { db } = context;
      let id = context.authUser.id;

      return db.employee
        .findByPk(id)
        .then(employeeInstance => {

          throwError(!employeeInstance, 'employee not found');

          return employeeInstance

        })
        .catch(error => handleError(error));

    },
    employees: (parent, args, context, info) => {

      validateToken(context);
      throwError(context.authUser != undefined && !context.authUser.isAdmin, 'access denied');

      let { agency } = args;
      let { db } = context;

      if (agency != undefined) {

        return db.employee
          .findAll({

            where: { agency: agency }

          })
          .catch(error => handleError(error));

      } else {

        return db.employee
          .findAll()
          .catch(error => handleError(error));

      }

    },
    employee: (parent, args, context, info) => {

      validateToken(context);
      throwError(context.authUser != undefined && !context.authUser.isAdmin, 'access denied');

      let { idEmployee }= args;
      let id = parseInt(idEmployee);
      let { db } = context;

      return db.employee
        .findByPk(id)
        .then(employeeInstance => {

          throwError(!employeeInstance, 'employee not found');

          return employeeInstance

        })
        .catch(error => handleError(error));

    }

  },
  Mutation: {

    createEmployee: (parent, args, context, info) => {

      validateToken(context);
      throwError((context.authUser != undefined && !context.authUser.isAdmin), 'access denied');

      let { input } = args;
      let { db } = context;

      return db.sequelize.transaction((Transaction) => {

        return db.employee
          .create(input, {

            transaction: Transaction

          })
          .then(employeeInstance => {

            throwError(!employeeInstance, 'employee already exists');

            return createToken(employeeInstance.id, false);

          })
          .catch(error => handleError(error));

      })
        .catch(error => handleError(error));

    },
    updateEmployeePassword: (parent, args, context, info) => {

      validateToken(context);

      let { input } = args;
      let { db } = context;

      console.log(input.id);

      let id = (context.authUser != undefined && !context.authUser.isAdmin) ?
        context.authUser.id :
        input.id;

      console.log(id);

      return db.sequelize.transaction(Transaction => {

        return db.employee
          .findByPk(id)
          .then(employeeInstance => {

            throwError(!employeeInstance, 'employee not found');

            let message = 'password not valid';
            throwError(!employeeInstance.isPassword(input.oldPassword, employeeInstance.password), message);

            input.password = input.newPassword;

            return employeeInstance
              .update(input, {

                transaction: Transaction

              })
              .then(employeeInstanceUpdated => {

                return !!employeeInstanceUpdated

              });

          });

      })
        .catch(error => handleError(error));

    },
    deleteEmployee: (parent, args, context, info) => {

      validateToken(context);
      throwError(context.authUser != undefined && !context.authUser.isAdmin, 'access denied');

      let { db } = context;
      let { idEmployee } = args;
      id = parseInt(idEmployee);

      return db.sequelize.transaction(Transaction => {

        return db.employee
          .findByPk(id)
          .then(employeeInstance => {

            throwError(!employeeInstance, 'employee not found');

            return employeeInstance.destroy({

              transaction: Transaction

            })
              .then(employeeRemoved => {

                return !!employeeRemoved

              })
            // .catch(error => handleError(error));

          });

      })
        .catch(error => handleError(error));

    }

  }

};

module.exports = employeeResolvers;