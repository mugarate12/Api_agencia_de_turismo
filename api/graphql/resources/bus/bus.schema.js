// definição dos tipos e inputs
const busTypes = `

  type Bus {

    id: ID!,
    origin: String!,
    destination: String!,
    ticketValue: String!,
    numberOfArchairs: Int!,
    date: String!

  }

  input createBusInput {

    origin: String!,
    destination: String!,
    ticketValue: String!,
    numberOfArchairs: Int!,
    date: String!

  }

  input updateBusInput {

    origin: String!,
    destination: String!,
    ticketValue: String!,
    numberOfArchairs: Int!,
    date: String!
    
  }


`;

const busQueries = `

  # informe o token de admin ou funcionario
  allBus: [ Bus! ]!

  #informe o token de admin ou funcionario
  oneBus(id: ID!): Bus

`;

const busMutations = `

  # informe o token de admin
  createBus(input: createBusInput!): Bus

  # informe o token de Admin
  updateBus(input: updateBusInput!): Boolean!

  # informe o token de Admin e o id do onibus que quer excluir
  deleteBus(id: ID!): Boolean!

`;

module.exports = {

  busTypes,
  busQueries,
  busMutations

};