// import dos types
const { employeeTypes } = require('./resources/employee/employee.schema');
const { adminTypes } = require('./resources/admin/admin.schema');
const { tokenTypes } = require('./resources/token/token.schema');
const { busTypes } = require('./resources/bus/bus.schema');
const { archairsTypes } = require('./resources/archairs/archaris.schema');

module.exports = [
  // meus types ficam aqui dentro
  employeeTypes,
  adminTypes,
  tokenTypes,
  busTypes,
  archairsTypes
];