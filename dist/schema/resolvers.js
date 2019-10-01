'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _dbmanager = require('../data/dbmanager');

var _dbmanager2 = _interopRequireDefault(_dbmanager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = new _dbmanager2.default();

var resolvers = {
    Pet: {
        // this is added to resolve interface issue (decide which child type to resolve)
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

            return new Promise(function (resolve, reject) {
                if (input.ownerId) {
                    var owners = db.getOwners();
                    var owner = _lodash2.default.find(owners, { id: input.ownerId });
                    if (!owner) {
                        return reject(new Error('Owner Id does not exist'));
                    }
                }

                db.createNewModel(input).then(function (model) {
                    resolve(model);
                }).catch(function (err) {
                    reject(err);
                });
            });
        },
        updatePet: function updatePet(root, _ref3) {
            var petId = _ref3.petId,
                input = _ref3.input;

            return new Promise(function (resolve, reject) {
                if (input.ownerId) {
                    var owners = db.getOwners();
                    var owner = _lodash2.default.find(owners, { id: input.ownerId });
                    if (!owner) {
                        return reject(new Error('Owner Id does not exist'));
                    }
                }

                var dogs = db.getDogs();
                var dog = _lodash2.default.find(dogs, { id: petId });

                var cats = db.getCats();
                var cat = _lodash2.default.find(cats, { id: petId });

                if (!dog && !cat) {
                    return reject(new Error('Pet Id does not exist'));
                }

                input.type = dog ? 'DOG' : 'CAT';

                db.updateModel(petId, input).then(function (model) {
                    resolve(model);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }
    }

};
console.log('-- end of defining resolvers --');
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map