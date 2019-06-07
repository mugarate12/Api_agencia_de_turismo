// import das mutations
const { employeeMutations } = require('./resources/employee/employee.schema');

// definição
const Mutation = `

  type Mutation {

    ${employeeMutations}

  }

`;

module.exports = Mutation;