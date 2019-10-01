'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.formatDataRow = undefined;

var _owner = require('../model/owner/owner.model');

var _owner2 = _interopRequireDefault(_owner);

var _dog = require('../model/pet/dog.model');

var _dog2 = _interopRequireDefault(_dog);

var _cat = require('../model/pet/cat.model');

var _cat2 = _interopRequireDefault(_cat);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatDataRow = function formatDataRow(dataRow) {
    var formatedData = {};

    if (!dataRow.type) {
        console.log('MISSING FILED. Data row does not include a type.');

        return formatedData;
    }

    switch (dataRow.type.toLowerCase()) {
        case 'owner':
            formatedData = new _owner2.default(dataRow.id, dataRow.name, dataRow.address, dataRow.phone, dataRow.email);
            break;
        case 'dog':
            formatedData = new _dog2.default(dataRow.id, dataRow.name, dataRow.colour, dataRow.age, dataRow.breed, dataRow.ownerId);
            break;
        case 'cat':
            formatedData = new _cat2.default(dataRow.id, dataRow.name, dataRow.colour, dataRow.age, dataRow.breed, dataRow.ownerId);
            break;
        default:
            return {};

    }

    return formatedData.toJSON();
};

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
//# sourceMappingURL=data-format.js.map