// import das mutations
const { userMutations } = require('./resources/user/user.schema');

// definição
const Mutation = `

  type Mutation {

    ${userMutations}

  }

`;

module.exports = Mutation;