import { makeExecutableSchema } from "graphql-tools";
import typeDefs from './typedefs';
import resolvers from './resolvers';

console.log('create schema');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});
export default schema;