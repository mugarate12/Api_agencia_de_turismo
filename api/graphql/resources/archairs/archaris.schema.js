// definição de tipos e inputs
const archairsTypes = `

  type Archair {

    id: ID!,
    number: Int!,
    available: String!,
    idBus: ID!,
    # vai retornar qualquer informação que precise do vendedor
    idOfPurchaser: Employee!,

  }

  input createArchairInput {

    number: Int!,
    idBus: ID!,
    # id do vendedor
    idOfPurchaser: Int!

  }

`;

const archairsQueries = `

  # informe o token do ADMIN ou EMPLOYEE(FUNCIONARIO)
  archairByBus(idBus: ID!): [ Archair! ]!,

  # informe o token do ADMIN
  archairByNameOfEmployee(employeeName: String!): [ Archair! ]!

`;

const archairsMutations = `

  # informe o token do ADMIN ou EMPLOYEE(FUNCIONARIO)
  createArchair(input: createArchairInput! ): Archair,

  # informe o token do ADMIN
  deleteArchair(id: ID!): Boolean!

`;

module.exports = {

  archairsTypes,
  archairsQueries,
  archairsMutations

}