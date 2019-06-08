// definição dos tipos e inputs
const adminTypes = `

  type Admin {

    id: ID!,
    name: String!,
    username: String!,
    email: String!,
    phoneNumber: String!,
    CPF: String!,
    agency: String!,
    createdAt: String!,
    updatedAt: String!

  }

  input createAdminInput {

    name: String!,
    username: String!,
    email: String!,
    phoneNumber: String!,
    CPF: String!,
    agency: String!,
    password: String!

  }

  input updateAdminPasswordInput {

    oldPassword: String!,
    newPassword: String!

  }

  input updateAdminProfileInput {

    name: String,
    email: String,
    phoneNumber: String,
    CPF: String

  }

  input loginAdminInput { 

    email: String!
    password: String!

  }

`;

const adminQueries = `

  # terá que informar o token de ADMIN
  currentAdmin: Admin

  loginAdmin(input: loginAdminInput): Token

`;

const adminMutations = `

  # pensar se isso deve existir, né.
  createAdmin(input: createAdminInput): Token

  # informe o token de ADMIN
  updateAdminPassword(input: updateAdminPasswordInput): Boolean!

  # informe o token de ADMIN 
  updateAdminProfile(input: updateAdminProfileInput): Boolean!

`;

module.exports = {

  adminTypes,
  adminQueries,
  adminMutations

};