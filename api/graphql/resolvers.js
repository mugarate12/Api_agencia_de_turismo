// imports
const { merge } = require('lodash');

// meus resolvers
const employeeResolvers = require('./resources/employee/employee.resolver');

// junção de todos os resolvers
const resolvers = merge(

  employeeResolvers

);

module.exports = resolvers;