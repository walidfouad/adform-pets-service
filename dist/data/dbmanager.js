'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _appRootPath = require('app-root-path');

var _appRootPath2 = _interopRequireDefault(_appRootPath);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _dataformat = require('./dataformat');

var _dataformat2 = _interopRequireDefault(_dataformat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dbDirectory = _path2.default.join(_appRootPath2.default.path, 'json_data');

var DBManager = function () {
    function DBManager() {
        _classCallCheck(this, DBManager);
    }

    _createClass(DBManager, [{
        key: 'readModels',
        value: function readModels(modelTypes) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                if (!modelTypes || modelTypes.length === 0) {
                    return reject(new Error('No modelType provided.'));
                }
                var result = [];
                modelTypes.forEach(function (modelType) {
                    if (modelType && modelType !== '') {
                        var modelData = _this.loadModelFile(modelType.toLowerCase());
                        result = result.length === 0 ? result = modelData : result.concat(modelData);
                    }
                });

                resolve(result);
            });
        }
    }, {
        key: 'createNewModel',
        value: function createNewModel(inputData) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var modelType = inputData.type.toLowerCase();
                var id = (0, _v2.default)();
                inputData.id = id;

                var newModel = (0, _dataformat.formatDataRow)(inputData);

                var modelData = _this2.loadModelFile(modelType);

                // Now insert the new record into modelData array
                modelData.push(newModel);

                // here write to model file in json db directory
                _this2.writeModelFile(modelType, modelData);

                resolve(newModel);
            });
        }
    }, {
        key: 'updateModel',
        value: function updateModel(modelId, inputData) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var modelType = inputData.type.toLowerCase();

                inputData.id = modelId;

                var newModel = (0, _dataformat.formatDataRow)(inputData);

                var modelData = _this3.loadModelFile(modelType);

                var oldModelIndex = _lodash2.default.findIndex(modelData, { id: modelId });
                // Now insert the new record into modelData array
                modelData[oldModelIndex] = newModel;

                // here write to model file in json db directory
                _this3.writeModelFile(modelType, modelData);

                resolve(newModel);
            });
        }
    }, {
        key: 'getOwners',
        value: function getOwners() {
            return this.loadModelFile('OWNER');
        }
    }, {
        key: 'getDogs',
        value: function getDogs() {
            return this.loadModelFile('DOG');
        }
    }, {
        key: 'getCats',
        value: function getCats() {
            return this.loadModelFile('CAT');
        }
    }, {
        key: 'getPets',
        value: function getPets() {
            var dogs = this.getDogs();
            var cats = this.getCats();
            var pets = [];
            pets = dogs.concat(cats);

            return pets;
        }
    }, {
        key: 'loadModelFile',
        value: function loadModelFile(modelType) {

            var modelFilePath = _path2.default.join(dbDirectory, modelType) + '.json';
            if (!_fs2.default.existsSync(modelFilePath)) {
                return [];
            }

            var modelBuffer = _fs2.default.readFileSync(modelFilePath);

            var modelData = modelBuffer && modelBuffer.length > 0 ? JSON.parse(modelBuffer) : [];

            return modelData;
        }
    }, {
        key: 'writeModelFile',
        value: function writeModelFile(modelType, modelData) {
            var modelFilePath = _path2.default.join(dbDirectory, modelType) + '.json';
            _fs2.default.writeFileSync(modelFilePath, JSON.stringify(modelData));
        }
    }]);

    return DBManager;
}();

exports.default = DBManager;
//# sourceMappingURL=dbmanager.js.map