'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.formatDataRow = undefined;

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _owner = require('../model/owner/owner.model');

var _owner2 = _interopRequireDefault(_owner);

var _dog = require('../model/pet/dog.model');

var _dog2 = _interopRequireDefault(_dog);

var _cat = require('../model/pet/cat.model');

var _cat2 = _interopRequireDefault(_cat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * formats model data and creates instance according to its type
 * @param {object} dataRow - carries model field data
 */
var formatDataRow = function formatDataRow(dataRow) {
    var fDataRow = {};

    if (!dataRow.type) {
        logger.error('MISSING FIELD', 'Some records in database missing model type');
        return fDataRow;
    }

    switch (dataRow.type.toLowerCase()) {
        case 'owner':
            fDataRow = new _owner2.default(dataRow.id, dataRow.name, dataRow.address, dataRow.email, dataRow.phone);
            break;
        case 'dog':
            fDataRow = new _dog2.default(dataRow.id, dataRow.name, dataRow.colour, dataRow.age, dataRow.breed, dataRow.ownerId);
            break;
        case 'cat':
            fDataRow = new _cat2.default(dataRow.id, dataRow.name, dataRow.colour, dataRow.age, dataRow.breed, dataRow.ownerId);
            break;
        default:
            return {};

    }

    // verify it is finally converted to json format
    return fDataRow.toJSON();
};

/**
 * formats models data and creates instances according to its type
 * this could be extended to allow for sorting and different kinds of formatting
 * @param {array} modelDataArray - an array of models
 */
var formatData = function formatData(modelDataArray) {

    var formatedDataArray = [];
    _async2.default.forEach(modelDataArray, function (modelDataRow) {
        formatedDataArray.push(formatDataRow(modelDataRow));
    });

    // sort by id
    // formatedDataArray.sort((a, b) => (a.id > b.id) ? 1 : -1);

    // sort by id and then by type
    formatedDataArray.sort(function (a, b) {
        return a.id > b.id ? 1 : a.type === b.type ? 1 : -1;
    });

    return formatedDataArray;
};

exports.formatDataRow = formatDataRow;
exports.default = formatData;
//# sourceMappingURL=dataformat.js.map