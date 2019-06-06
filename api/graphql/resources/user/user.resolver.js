// meus imports

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

          if (!userInstance) throw new Error(`user not found!`);

          return userInstance;

        })
        .catch((error) => {

          throw new Error(`${error.name} : ${error.message}`);

        })

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

            if(userInstance) throw new Error(`user already exists`);

          })

      })

    }

  }
};

module.exports = userResolvers;