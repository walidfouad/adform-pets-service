'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _pets = require('../data/pets.db');

var _pets2 = _interopRequireDefault(_pets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = new _pets2.default();

var resolvers = {
    Pet: {
        __resolveType: function __resolveType(pet, context, info) {
            if (pet.type === 'CAT') {
                return 'Cat';
            }

            if (pet.type === 'DOG') {
                return 'Dog';
            }

            return null;
        }
    },
    Query: {
        getOwners: function getOwners(root, args, context, info) {
            return new Promise(function (resolve, reject) {
                db.readModels(['OWNER']).then(function (owners) {
                    resolve(owners);
                }).catch(function (err) {
                    reject(err);
                });
            });
        },
        getPets: function getPets(root, args, context, info) {
            return new Promise(function (resolve, reject) {
                db.readModels(['DOG', 'CAT']).then(function (pets) {
                    resolve(pets);
                }).catch(function (err) {
                    reject(err);
                });
            });
        },
        getOwnerPets: function getOwnerPets(root, _ref, context, info) {
            var ownerId = _ref.ownerId;

            return new Promise(function (resolve, reject) {
                db.readModels(['DOG', 'CAT']).then(function (pets) {
                    var filteredPets = _lodash2.default.filter(pets, { ownerId: ownerId });
                    resolve(filteredPets);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }
    },
    Mutation: {
        addPet: function addPet(root, _ref2, context, info) {
            var input = _ref2.input;

            //TODO: add pet to database
            return new Promise(function (resolve, reject) {
                db.writeModel(input).then(function (pets) {
                    var filteredPets = _lodash2.default.filter(pets, { ownerId: ownerId });
                    resolve(filteredPets);
                }).catch(function (err) {
                    reject(err);
                });
            });
        },
        updatePet: function updatePet(root, _ref3) {
            var petId = _ref3.petId,
                input = _ref3.input;

            return 'Hello world!';
        }
    }

};
console.log('-- end of defining resolvers --');
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map