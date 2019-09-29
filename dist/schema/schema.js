'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(['\n  type Query {\n    hello: String\n  }\n'], ['\n  type Query {\n    hello: String\n  }\n']);

var _apolloServerExpress = require('apollo-server-express');

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// import typeDefs from './typedefs';
// import resolvers from './resolvers';
var typeDefs = (0, _apolloServerExpress.gql)(_templateObject);

var resolvers = {
    Query: {
        hello: function hello() {
            return 'Hello world!';
        }
    }
};

console.log('create schema');
var schema = {
    typeDefs: typeDefs,
    resolvers: resolvers
};

exports.default = schema;
//# sourceMappingURL=schema.js.map