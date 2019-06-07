// definição dos tipos, e inputs
const employeeTypes = `

  type Employee {

    id: ID!,
    name: String!
    username: String!,
    email: String!,
    phoneNumber: String!, 
    createdAt: String!,
    updatedAt: String!

  }

  input createEmployeeInput {

    name: String!
    username: String!,
    email: String!,
    phoneNumber: String!
    password: String!

  }

  input updateEmployeePasswordInput {

    oldPassword: String!
    newPassword: String!

  }

`;

// definição das queries
const employeeQueries = `

  # informe o token no header Authentication
  currentEmployee(id: Int!): Employee

`;

// definição das mutations
const employeeMutations = `

  createEmployee(input: createEmployeeInput!): Employee
  #informe o token dele
  updateEmployeePassword(input: updateEmployeePasswordInput): Boolean!

`;

// exporto os três
module.exports = {

  employeeTypes,
  employeeQueries,
  employeeMutations
  
};