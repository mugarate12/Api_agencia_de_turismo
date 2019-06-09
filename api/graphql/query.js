// import das queries
const { employeeQueries } = require('./resources/employee/employee.schema');
const { adminQueries } = require('./resources/admin/admin.schema');
const { busQueries } = require('./resources/bus/bus.schema');
const { archairsQueries } = require('./resources/archairs/archaris.schema');

// definição
const Query = `

  type Query {

    ${employeeQueries}
    ${adminQueries}
    ${busQueries}
    ${archairsQueries}

  }

`;

module.exports = Query;