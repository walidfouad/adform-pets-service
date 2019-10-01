'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.appRoot = exports.pathJoin = exports.projectPath = exports.mkdir = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appRoot = require('app-root-path');

var mkdir = function mkdir(path) {
    return _fs2.default.existsSync(path) || _fs2.default.mkdirSync(path);
};

var joinAndMakeDirectory = function joinAndMakeDirectory(rootPath, dirName) {
    var path = _path2.default.join(rootPath, dirName);
    return _fs2.default.existsSync(path) || _fs2.default.mkdirSync(path);
};

var projectPath = function projectPath(dir) {
    return _path2.default.join(appRoot.path, dir);
};

var pathJoin = function pathJoin(path, dir) {
    return _path2.default.join(path, dir);
};

exports.mkdir = mkdir;
exports.projectPath = projectPath;
exports.pathJoin = pathJoin;
exports.appRoot = appRoot;
//# sourceMappingURL=path.js.map