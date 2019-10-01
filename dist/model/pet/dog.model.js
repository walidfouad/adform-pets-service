'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pet = require('./pet.model');

var _pet2 = _interopRequireDefault(_pet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dog = function (_Pet) {
    _inherits(Dog, _Pet);

    function Dog(id, name, colour, age) {
        var breed = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
        var ownerId = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

        _classCallCheck(this, Dog);

        return _possibleConstructorReturn(this, (Dog.__proto__ || Object.getPrototypeOf(Dog)).call(this, 'DOG', id, name, colour, age, breed, ownerId));
    }

    return Dog;
}(_pet2.default);

exports.default = Dog;
//# sourceMappingURL=dog.model.js.map