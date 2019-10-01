'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pathJoin = exports.projectPath = exports.mdir = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appRoot = require('app-root-path');

var mdir = function mdir(path) {
    return _fs2.default.existsSync(path) || _fs2.default.mkdirSync(path);
};

var projectPath = function projectPath(dir) {
    return _path2.default.join(appRoot.path, dir);
};

var pathJoin = function pathJoin(path, dir) {
    return _path2.default.join(path, dir);
};

exports.mdir = mdir;
exports.projectPath = projectPath;
exports.pathJoin = pathJoin;
//# sourceMappingURL=path.js.map