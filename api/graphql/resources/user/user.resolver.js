// meus imports
const {
  handleError,
  throwError
} = require('../../../utils/utils');

const userResolvers = {
  User: {},
  Query: {

    currentUser: (parent, args, context, info) => {

      let { id } = args;
      id = parseInt(id);
      let { db } = context;

      return db.user
        .findByPk(id)
        .then((userInstance) => {

          throwError(!userInstance, `user not found!`);

          return userInstance;

        })
        .catch((error) => handleError(error));

    }

  },
  Mutation: {

    createUser: (parent, args, context, info) => {

      let { input } = args;
      let { db } = context;

      return db.sequelize.transaction((Transaction) => {

        return db.user
          .create(input, {

            transaction: Transaction

          })
          .then((userInstance) => {

            return userInstance;

          })
          .catch((userInstance) => {

            throwError(userInstance, 'user already exists');

          })

      })
      .catch((error) => handleError(error));

    }

  }
};

module.exports = userResolvers;