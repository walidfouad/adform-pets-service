'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _apolloServerExpress = require('apollo-server-express');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _schema = require('../schema/schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _morgan2.default)('dev'));
app.use((0, _cors2.default)());
app.use((0, _helmet2.default)());

app.use(function (err, req, res, next) {
    console.log("REQUEST ERROR");
    res.status(500).send('Something went wrong!');
});

console.log("Before applying middleware");
console.log("Applying middleware");
var server = new _apolloServerExpress.ApolloServer(_schema2.default);
server.applyMiddleware({ app: app });

app.listen({ port: 4000 }, function () {
    return console.log('\uD83D\uDE80 Server ready at http://localhost:4000' + server.graphqlPath);
});

//
// console.log("After applying middleware");


exports.default = app;
//# sourceMappingURL=app.js.map