// import das mutations
const { employeeMutations } = require('./resources/employee/employee.schema');
const { adminMutations } = require('./resources/admin/admin.schema');

// definição
const Mutation = `

  type Mutation {

    ${employeeMutations}
    ${adminMutations}

  }

`;

module.exports = Mutation;