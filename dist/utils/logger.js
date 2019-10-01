'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.accessLogStream = undefined;

var _appRootPath = require('app-root-path');

var _appRootPath2 = _interopRequireDefault(_appRootPath);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = _winston2.default.createLogger({
    level: 'info',
    format: _winston2.default.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [new _winston2.default.transports.File({ filename: _path2.default.join('log', 'error.log'), level: 'error' }), new _winston2.default.transports.File({ filename: _path2.default.join('log', 'combined.log') })]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new _winston2.default.transports.Console({
        format: _winston2.default.format.simple()
    }));
}

var logDirectory = _path2.default.join(_appRootPath2.default.path, 'log');

var mkdir = function mkdir(path) {
    return _fs2.default.existsSync(path) || _fs2.default.mkdirSync(path);
};

mkdir(logDirectory);

var accessLogStream = _fs2.default.createWriteStream(_path2.default.join(logDirectory, 'access.log'), { flags: 'a' });

exports.accessLogStream = accessLogStream;
exports.default = logger;
//# sourceMappingURL=logger.js.map