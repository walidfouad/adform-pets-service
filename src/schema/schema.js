import { makeExecutableSchema } from "graphql-tools";
import typeDefs from './typedefs';
import resolvers from './resolvers';
// const typeDefs = gql `
//   type Query {
//     hello: String
//   }
// `;

// const resolvers = {
//     Query: {
//         hello: () => 'Hello world!'
//     },
// };

console.log('create schema');

// const schema = {
//     typeDefs,
//     resolvers
// };

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: {
        requireResolversForResolveType: false
    }
});
export default schema;