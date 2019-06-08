// definição dos tipos e inputs
const employeeTypes = `

  type Employee {

    id: ID!,
    name: String!
    username: String!,
    email: String!,
    phoneNumber: String!,
    CPF: String!,
    agency: String!,
    createdAt: String!,
    updatedAt: String!

  }

  input createEmployeeInput {

    name: String!
    username: String!,
    email: String!,
    phoneNumber: String!,
    CPF: String!,
    agency: String!
    password: String!,

  }

  input updateEmployeePasswordInput {

    id: ID
    oldPassword: String!
    newPassword: String!

  }

`;

// definição das queries
const employeeQueries = `

  # informe o token de EMPLOYEE(FUNCIONARIO) no header Authentication
  currentEmployee: Employee

  # informe o token de ADMIN
  # lista de todos os funcionarios, e pode, CASO QUEIRA, filtrar pro agencia
  employees(agency: String): [ Employee! ]!

  # informe o token de ADMIN
  employee(idEmployee: ID): Employee


`;

// definição das mutations
const employeeMutations = `

  # informe o token de ADMIN
  createEmployee(input: createEmployeeInput!): Token
  
  # informe o token de EMPLOYEE(FUNCIONARIO) OU ADMIN
  # se for o Admin, passe o ID nos parametros
  # se for o employee(FUNCIONARIO) não precisa, basta passar o velho e novo password
  updateEmployeePassword(input: updateEmployeePasswordInput): Boolean!

  # informe o token de ADMIN e o id do funcionario que quer deletar
  deleteEmployee(idEmployee: ID!): Boolean!


`;

// exporto os três
module.exports = {

  employeeTypes,
  employeeQueries,
  employeeMutations
  
};