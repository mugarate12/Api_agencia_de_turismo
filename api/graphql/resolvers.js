// imports
const { merge } = require('lodash');

// meus resolvers
const userResolver = require('./resources/user/user.resolver');

// junção de todos os resolvers
const resolvers = merge(

  userResolver

);

module.exports = resolvers;