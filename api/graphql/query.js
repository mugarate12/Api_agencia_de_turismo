// import das queries
const { employeeQueries } = require('./resources/employee/employee.schema');
const { adminQueries } = require('./resources/admin/admin.schema');
const { busQueries } = require('./resources/bus/bus.schema');

// definição
const Query = `

  type Query {

    ${employeeQueries}
    ${adminQueries}
    ${busQueries}

  }

`;

module.exports = Query;