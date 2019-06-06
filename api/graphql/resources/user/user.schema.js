// definição dos tipos, e inputs
const userTypes = `

  type User {

    id: ID!,
    username: String!

  }

`;

// definição das queries
const userQueries = `

  currentUser: User

`;

// definição das mutations
const userMutations = `

  createUser(username: String!): User!

`;

// exporto os três
module.exports = {

  userTypes,
  userQueries,
  userMutations
  
};