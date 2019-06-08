// imports

// meus imports
const {
  handleError,
  throwError
} = require('./../../../utils/utils');
const validateToken = require('./../../../../controllers/validate_token.controller');
const {
  isAdmin,
  isEmployee
} = require('./../../../utils/identify_token');

const busResolvers = {

  Bus: {},
  Query: {

    allBus: (parent, args, context, info) => {

      validateToken(context);

      let { db } = context;

      return db.bus
        .findAll()
        .catch(error => handleError(error));

    },
    oneBus: (parent, args, context, info) => {

      validateToken(context);

      let { db } = context;
      let { id } = args;
      id = parseInt(id);

      return db.bus
        .findByPk(id)
        .then(busInstance => {

          throwError(!busInstance, 'bus not found');

          return busInstance;

        })
        .catch(error => handleError(error));

    }

  },
  Mutation: {

    createBus: (parent, args, context, info) => {

      validateToken(context);
      throwError(isEmployee(context), 'access denied');

      let { input } = args;
      let { db } = context;

      return db.sequelize.transaction(Transaction => {

        return db.bus
          .create(input, {

            transaction: Transaction

          })
          .then(BusInstance => {

            throwError(!BusInstance, 'bus already exists');

            return BusInstance

          })
          .catch(error => handleError(error));

      })
        .catch(error => handleError(error));

    },
    updateBus: (parent, args, context, info) => {

      validateToken(context);
      throwError(isEmployee(context), 'access denied');

      let { db } = context;
      let { input } = args;
      let { id } = args;
      id = parseInt(id);

      return db.sequelize.transaction(Transaction => {

        return db.bus
          .findByPk(id)
          .then(busInstance => {

            throwError(!busInstance, 'bus not found');

            console.log('d');

            return busInstance
              .update(input, {

                transaction: Transaction

              })
              .then(busInstanceUpdated => {

                return !!busInstanceUpdated

              });

          })

      })
        .catch(error => handleError(error));

    },
    deleteBus: (parent, args, context, info) => {

      validateToken(context);
      throwError(isEmployee(context), 'access denied');

      let { id } = args;
      id = parseInt(id);
      let { db } = context;

      return db.sequelize.transaction(Transaction => {

        return db.bus
          .findByPk(id)
          .then(busInstance => {

            throwError(!busInstance, 'bus not found');

            return busInstance
              .destroy({

                transaction: Transaction

              })
              .then(busInstanceRemoved => {

                return !!busInstanceRemoved

              });

          });

      })
        .catch(error => handleError(error));

    }

  }

};

module.exports = busResolvers;