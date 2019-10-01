'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('../utils/path');

var _dataFormat = require('./data-format');

var _dataFormat2 = _interopRequireDefault(_dataFormat);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dbDirectory = (0, _path.projectPath)('json_data');

var PETSDB = function () {
    function PETSDB() {
        _classCallCheck(this, PETSDB);

        this.data = {};
    }

    _createClass(PETSDB, [{
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
            return new Promise(function (resolve, reject) {
                if (!modelTypes || modelTypes.length === 0) {
                    return reject(new Error('No modelType provided.'));
                }
                var result = [];
                modelTypes.forEach(function (modelType) {

                    var mType = modelType.toLowerCase();

                    var modelFilePath = (0, _path.pathJoin)(dbDirectory, mType) + '.3json';

                    // check if model file already exists
                    // if (!fs.existsSync(modelFilePath)) {
                    //     return reject(new Error(`No data found for Model ${mType}.`));
                    // }

                    // here read model file from json db directory
                    var modelBuffer = _fs2.default.readFileSync(modelFilePath, function (err) {
                        if (err) {
                            reject(new Error('Error reading model' + mType + '.\n\t\t\t\t\t\t\tError details =>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t' + err + '\n\t\t\t\t\t\t\t'));
                        }
                    });

                    var modelData = modelBuffer && modelBuffer.length > 0 ? JSON.parse(modelBuffer) : null;
                    result = result.length === 0 ? result = modelData : result.concat(modelData);
                });

                resolve(result);
            });
        }
    }, {
        key: 'writeModel',
        value: function writeModel(modelData) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var modelType = modelData.type;

                if (!modelType) {
                    reject(new Error('No modelType provided.'));
                }

                var mType = modelType.toLowerCase();

                if (!_this3.data || !_this3.data[mType]) {
                    return reject(new Error('No provided data for model' + mType + '.'));
                }

                var modelFilePath = (0, _path.pathJoin)(dbDirectory, mType) + '.json';

                // check if model file already exists
                if (_fs2.default.existsSync(modelFilePath)) {}

                // here write to model file in json db directory
                var modelData = JSON.stringify(_this3.data[mType]);
                _fs2.default.writeFileSync(modelFilePath, modelData, err = {
                    if: function _if(err) {
                        reject(new Error('Error writing to model' + mType + '.\n\t\t\t\t\t\tError details =>\n\t\t\t\t\t\t\n\t\t\t\t\t\t' + err + '\n\t\t\t\t\t\t'));
                    }
                });

                resolve();
            });
        }
    }]);

    return PETSDB;
}();

exports.default = PETSDB;
//# sourceMappingURL=pets.db.js.map