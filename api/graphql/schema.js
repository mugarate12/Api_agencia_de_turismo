// imports
const { makeExecutableSchema } = require('graphql-tools');

// meus imports

// lembrando que o nome de cada uma das constantes abaixo espelham o atributo do objeto
// passando em makeExecutableSchema, a fins de praticidade
// Queries
const Query = require('./query');
// Mutations
const Mutation = require('./mutation');
// Types
const Types = require('./types');
// resolvers
const resolvers = require('./resolvers');


// definição do schema (generica)
const SchemaDefinition = `

  type Schema {

    query: Query,
    mutation: Mutation

  }

`;

module.exports = makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    Query,
    Mutation,
    ...Types
  ],
  // resolvers
});