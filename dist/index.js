'use strict';

var _server = require('./server/server');

var _server2 = _interopRequireDefault(_server);

var _config = require('./config/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('****** Welcome to Pets Microservice *******');

process.on('uncaughtException', function (err) {
    console.error('Unhandled Exception', err);
});

process.on('uncaughtRejection', function (err, promise) {
    console.error('Unhandled Rejection', err);
});

var startServer = function startServer(port) {

    _server2.default.listen({ port: port }, function () {
        return console.log('\uD83D\uDE80 Server ready at http://localhost:' + port + _server.server.graphqlPath);
    });
};

//console.log(app);

if (!_config.serverSettings.port) {
    console.log('The server must be started with an available port');
    process.exit(1);
}

startServer(_config.serverSettings.port);
//# sourceMappingURL=index.js.map