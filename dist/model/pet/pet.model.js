"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pet = function () {
    function Pet(type, id, name, colour, age, breed, ownerId) {
        _classCallCheck(this, Pet);

        this.type = type;
        this.id = id;
        this.name = name;
        this.colour = colour;
        this.age = age;
        this.breed = breed;
        this.ownerId = ownerId;
    }

    _createClass(Pet, [{
        key: "toJSON",
        value: function toJSON() {
            return {
                type: this.type,
                id: this.id,
                name: this.name,
                colour: this.colour,
                age: this.age,
                breed: this.breed,
                ownerId: this.ownerId
            };
        }
    }, {
        key: "Type",
        get: function get() {
            return this.type;
        }
    }]);

    return Pet;
}();

exports.default = Pet;
//# sourceMappingURL=pet.model.js.map