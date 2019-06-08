// import das mutations
const { employeeMutations } = require('./resources/employee/employee.schema');
const { adminMutations } = require('./resources/admin/admin.schema');
const { busMutations } = require('./resources/bus/bus.schema');

// definição
const Mutation = `

  type Mutation {

    ${employeeMutations}
    ${adminMutations}
    ${busMutations}

  }

`;

module.exports = Mutation;