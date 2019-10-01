'use strict';

var _logger = require('./utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _server = require('./server/server');

var _server2 = _interopRequireDefault(_server);

var _config = require('./config/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.logger = _logger2.default;

process.on('uncaughtException', function (err) {
    _logger2.default.error('Unhandled Exception', err);
});

process.on('uncaughtRejection', function (err, promise) {
    _logger2.default.error('uncaughtRejection', err);
});

var startServer = function startServer(port) {

    _server2.default.listen({ port: port }, function () {
        _logger2.default.info('Server ready at http://localhost:' + port + _server.server.graphqlPath);
    });
};

if (!_config.serverSettings.port) {
    _logger2.default.error("The server must be started with an available port");
    process.exit(9);
}

startServer(_config.serverSettings.port);
//# sourceMappingURL=index.js.map