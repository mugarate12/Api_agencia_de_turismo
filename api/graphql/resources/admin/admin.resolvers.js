// imports

// meus imports
const {
  handleError,
  throwError
} = require('./../../../utils/utils');
const createToken = require('../../../utils/create_token');
const validateToken = require('./../../../../controllers/validate_token.controller');
const {
  isAdmin,
  isEmployee
} = require('./../../../utils/identify_token');

const adminResolvers = {

  Admin: {},
  Query: {

    currentAdmin: (parent, args, context, info) => {

      // console.log(context.authUser);
      validateToken(context);
      throwError(isEmployee(context), 'access denied');

      let { db } = context;

      let id = context.authUser.id;

      return db.admin
        .findByPk(id)
        .then((adminInstance) => {

          throwError(!adminInstance, 'admin not found');

          return adminInstance;

        })
        .catch((error) => handleError(error));

    },
    loginAdmin: (parent, args, context, info) => {

      let { input } = args;
      let { db } = context;

      return db.admin
        .findOne({

          where: { email: input.email }

        })
        .then((adminInstance) => {

          throwError(!adminInstance, 'admin invalid');

          throwError(!adminInstance.isPassword(input.password, adminInstance.password), 'email or password incorrect');

          return createToken(adminInstance.id, true);

        })
        .catch((error) => handleError(error));

    }

  },
  Mutation: {

    createAdmin: (parent, args, context, info) => {

      let { input } = args;
      let { db } = context;

      return db.sequelize.transaction((Transaction) => {

        return db.admin
          .create(input, {

            transaction: Transaction

          })
          .then((adminInstance) => {

            throwError(!adminInstance, 'admin already exists');

            return createToken(adminInstance.id, true);

          })
          .catch((error) => {

            // throwError(adminInstance, 'admin already exists');
            handleError(error);

          });

      })
        .catch(error => handleError(error));

    },
    updateAdminPassword: (parent, args, context, info) => {

      validateToken(context);
      throwError(isEmployee(context), 'access denied');

      let { input } = args;
      let { db } = context;

      let id = context.authUser.id;

      return db.sequelize.transaction((Transaction) => {
        2
        return db.admin
          .findByPk(id)
          .then((adminInstance) => {

            throwError(!adminInstance, 'admin not found');

            let message = 'password not valid';
            throwError(!adminInstance.isPassword(input.oldPassword, adminInstance.password), message);

            input.password = input.newPassword;

            return adminInstance
              .update(input, {

                transaction: Transaction

              })
              .then((adminInstanceUpdated) => {

                return !!adminInstanceUpdated

              });

          });

      });


    },
    updateAdminProfile: (parent, args, context, info) => {

      validateToken(context);
      throwError(isEmployee(context), 'access denied');

      let { input } = args;
      let { db } = context;
      let id = context.authUser.id;

      return db.sequelize.transaction((Transaction) => {

        return db.admin
          .findByPk(id)
          .then(adminInstance => {

            throwError(!adminInstance, 'admin not found');

            return adminInstance
              .update(input, {

                transaction: Transaction

              })
              .then(adminInstanceUpdated => {

                return !!adminInstanceUpdated

              });

          });

      });

    }

  }

};

module.exports = adminResolvers;