// import das queries
const { employeeQueries } = require('./resources/employee/employee.schema');
const { adminQueries } = require('./resources/admin/admin.schema');

// definição
const Query = `

  type Query {

    ${employeeQueries}
    ${adminQueries}

  }

`;

module.exports = Query;