'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Owner = function () {
    function Owner(id, name, address, email) {
        var phone = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
        var pets = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

        _classCallCheck(this, Owner);

        this.type = 'OWNER';
        this.id = id;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.pets = pets;
    }

    _createClass(Owner, [{
        key: 'toJSON',
        value: function toJSON() {
            return {
                type: this.type,
                id: this.id,
                name: this.name,
                address: this.address,
                phone: this.phone,
                email: this.email,
                pets: this.pets
            };
        }
    }, {
        key: 'Type',
        get: function get() {
            return this.type;
        }
    }]);

    return Owner;
}();

exports.default = Owner;
//# sourceMappingURL=owner.model.js.map