// definição dos tipos, e inputs
const userTypes = `

  type User {

    id: ID!,
    username: String!,
    email: String!,
    createdAt: String!,
    updatedAt: String!

  }

  input createUserInput {

    username: String!,
    email: String!,
    password: String!

  }

`;

// definição das queries
const userQueries = `

  currentUser(id: Int!): User

`;

// definição das mutations
const userMutations = `

  createUser(input: createUserInput!): User

`;

// exporto os três
module.exports = {

  userTypes,
  userQueries,
  userMutations
  
};