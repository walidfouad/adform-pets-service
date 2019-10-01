'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.server = undefined;

var _apolloServerExpress = require('apollo-server-express');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _logger = require('../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _schema = require('../schema/schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _morgan2.default)('common', {
    stream: _logger.accessLogStream
}));

app.use((0, _cors2.default)());
app.use((0, _helmet2.default)());

app.use(function (err, req, res, next) {
    _logger2.default.error("REQUEST ERROR", err);
    res.status(500).send("REQUEST ERROR");
});

var server = new _apolloServerExpress.ApolloServer({ schema: _schema2.default });
server.applyMiddleware({ app: app });

exports.server = server;
exports.default = app;
//# sourceMappingURL=server.js.map