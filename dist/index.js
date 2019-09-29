'use strict';

var _app = require('./server/app');

var _app2 = _interopRequireDefault(_app);

var _config = require('./config/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('****** Welcome to Pets Microservice *******');

process.on('uncaughtException', function (err) {
    console.error('Unhandled Exception', err);
});

process.on('uncaughtRejection', function (err, promise) {
    console.error('Unhandled Rejection', err);
});

// const startServer = (port) => {

//     // console.log(JSON.stringify(app));
//     //server.listen();


//     // const server = app.listen(port, () => {
//     //     console.log(`Server is running on port ${port}`);
//     // });

// };

//console.log(app);

if (!_config.serverSettings.port) {
    console.log('The server must be started with an available port');
    process.exit(1);
}

startServer(_config.serverSettings.port);
//# sourceMappingURL=index.js.map