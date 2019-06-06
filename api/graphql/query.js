// import das queries
const { userQueries } = require('./resources/user/user.schema');

// definição
const Query = `

  type Query {

    ${userQueries}

  }

`;

module.exports = Query;