// imports
const { merge } = require('lodash');

// meus resolvers
const employeeResolvers = require('./resources/employee/employee.resolver');
const adminResolvers = require('./resources/admin/admin.resolvers');
const busResolvers = require('./resources/bus/bus.resolvers');
const archairResolvers = require('./resources/archairs/archairs.resolvers');

// junção de todos os resolvers
const resolvers = merge(

  employeeResolvers,
  adminResolvers,
  busResolvers,
  archairResolvers

);

module.exports = resolvers;