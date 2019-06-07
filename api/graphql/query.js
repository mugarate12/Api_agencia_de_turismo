// import das queries
const { employeeQueries } = require('./resources/employee/employee.schema');

// definição
const Query = `

  type Query {

    ${employeeQueries}

  }

`;

module.exports = Query;