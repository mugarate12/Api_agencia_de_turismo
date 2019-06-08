// meus imports
const {
  handleError,
  throwError
} = require('../../../utils/utils');

const employeeResolvers = {
  Employee: {},
  Query: {

    currentEmployee: (parent, args, context, info) => {

      let { id } = args;
      id = parseInt(id);
      let { db } = context;

      return db.employee
        .findByPk(id)
        .then((employeeInstance) => {

          throwError(!employeeInstance, `employee not found!`);

          return employeeInstance;

        })
        .catch((error) => handleError(error));

    }

  },
  Mutation: {

    createEmployee: (parent, args, context, info) => {

      let { input } = args;
      let { db } = context;

      // tem que vir o token do Admin

      return db.sequelize.transaction((Transaction) => {

        return db.employee
          .create(input, {

            transaction: Transaction

          })
          .then((employeeInstance) => {

            return employeeInstance;

          })
          .catch((employeeInstance) => {

            throwError(employeeInstance, 'employee already exists');

          })

      })
        .catch((error) => handleError(error));

    },
    updateEmployeePassword: (parent, args, context, info) => {

      let { input } = args;
      let { db } = context;

      // vindo do token
      let authEmployee = 1;

      return db.sequelize.transaction((Transaction) => {

        return db.employee
          .findByPk(authEmployee)
          .then((employeeInstance) => {

            throwError(!employeeInstance, 'employee not found');

            let message = 'password not valid';
            throwError(!employeeInstance.isPassword(input.oldPassword, employeeInstance.get('password')), message);

            input.password = input.newPassword;
            // console.log(input);

            return employeeInstance
              .update(input, {

                transaction: Transaction

              })
              .then((employeeInstanceUpdated) => {

                return !!employeeInstanceUpdated

              })

          })

      })
        .catch((error) => handleError(error));

    }

  }
};

module.exports = employeeResolvers;