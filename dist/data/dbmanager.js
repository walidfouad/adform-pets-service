'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('../utils/path');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _owner = require('../model/owner/owner.model');

var _owner2 = _interopRequireDefault(_owner);

var _dog = require('../model/pet/dog.model');

var _dog2 = _interopRequireDefault(_dog);

var _cat = require('../model/pet/cat.model');

var _cat2 = _interopRequireDefault(_cat);

var _dataformat = require('./dataformat');

var _dataformat2 = _interopRequireDefault(_dataformat);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _protobufjs = require('protobufjs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dbDirectory = (0, _path.projectPath)('json_data');

var DbManager = function () {
    function DbManager() {
        _classCallCheck(this, DbManager);

        this.data = {};
    }

    _createClass(DbManager, [{
        key: 'readData',
        value: function readData() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                // read all json db files
                // here should update data from json files 


                resolve(_this.data);
            });
        }
    }, {
        key: 'writeData',
        value: function writeData() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                // ensure db directory exists
                (0, _path.mdir)(dbDirectory);
                // steps to save

                resolve(_this2.data);
            });
        }
    }, {
        key: 'readModels',
        value: function readModels(modelTypes) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                if (!modelTypes || modelTypes.length === 0) {
                    return reject(new Error('No modelType provided.'));
                }
                var result = [];
                modelTypes.forEach(function (modelType) {
                    if (modelType && modelType !== '') {
                        var modelData = _this3.loadModelFile(modelType.toLowerCase());
                        result = result.length === 0 ? result = modelData : result.concat(modelData);
                    }
                });

                resolve(result);
            });
        }
    }, {
        key: 'saveModel',
        value: function saveModel(inputData) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                var modelType = inputData.type.toLowerCase();
                var id = (0, _v2.default)();
                inputData.id = id;
                var newModel = (0, _dataformat.formatDataRow)(inputData);

                var modelData = _this4.loadModelFile(modelType);

                // Now insert the new record into modelData array
                modelData.push(newModel);

                // here write to model file in json db directory
                _this4.writeModelFile(modelType, modelData);

                resolve(newModel);
            });
        }
    }, {
        key: 'getOwners',
        value: function getOwners() {
            return loadModel('OWNER');
        }
    }, {
        key: 'getDogs',
        value: function getDogs() {
            return loadModel('DOG');
        }
    }, {
        key: 'getCats',
        value: function getCats() {
            return loadModel('CAT');
        }
    }, {
        key: 'loadModelFile',
        value: function loadModelFile(modelType) {

            var modelFilePath = (0, _path.pathJoin)(dbDirectory, modelType) + '.json';
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
            var modelFilePath = (0, _path.pathJoin)(dbDirectory, modelType) + '.json';
            _fs2.default.writeFileSync(modelFilePath, JSON.stringify(modelData));
        }
    }]);

    return DbManager;
}();

exports.default = DbManager;
//# sourceMappingURL=dbmanager.js.map