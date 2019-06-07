// definição dos tipos e inputs
const adminTypes = `

  type Admin {

    id: ID!,
    name: String!,
    username: String!,
    email: String!,
    phoneNumber: Int!,
    CPF: Int!,
    agency: String!,
    createdAt: String!,
    updatedAt: String!

  }

  input createAdminInput {

    name: String!,
    username: String!,
    email: String!,
    phoneNumber: Int!,
    CPF: Int!,
    agency: String!

  }

  input updateAdminPasswordInput {

    oldPassword: String!,
    newPassword: String!

  }

`;

const adminQueries = `

  # terá que informar o token
  currentAdmin: Admin

`;

const adminMutations = `

  # pensar se isso deve existir, né.
  createAdmin(input: createAdminInput): Admin
  updateAdminPassword(input: updateAdminPasswordInput): Boolean!

`;

module.exports = {

  adminTypes,
  adminQueries,
  adminMutations

};