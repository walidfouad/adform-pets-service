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

/**
 * Set of Resolvers with implementations for Schema queries and mutations
 */
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
        /**
         * Get all owners and fill pets data fields for each
         */
        getOwners: function getOwners(root, args, context, info) {
            return new Promise(function (resolve, reject) {
                db.readModels(['OWNER']).then(function (owners) {

                    var ownerWithPets = [];
                    owners.forEach(function (owner) {
                        // filling Owner pets 
                        owner.pets = db.ownerPets(owner.id);
                        ownerWithPets.push(owner);
                    });

                    resolve(ownerWithPets);
                }).catch(function (err) {
                    reject(err);
                });
            });
        },
        /**
         * Gets Pets data fields along with the corresponding owner to each Pet
         */
        getPets: function getPets(root, args, context, info) {
            return new Promise(function (resolve, reject) {
                // as pets divided into two types/classes, and send array of model types to get all pets
                db.readModels(['DOG', 'CAT']).then(function (pets) {
                    var petsWithOwners = [];
                    pets.forEach(function (pet) {
                        // fill owner data for each pet
                        pet.owner = db.getOwner(pet.ownerId);
                        petsWithOwners.push(pet);
                    });

                    resolve(petsWithOwners);
                }).catch(function (err) {
                    reject(err);
                });
            });
        },
        /**
         * Get Owner data fields along with Pets assigned to him
         */
        getOwnerPets: function getOwnerPets(root, _ref, context, info) {
            var ownerId = _ref.ownerId;

            return new Promise(function (resolve, reject) {
                // get owner and then update its pets
                db.readSpecificModel(ownerId, 'OWNER').then(function (owner) {
                    // update owner pets. Please note owner.pets already empty, as it is not stored in db.
                    owner.pets = db.ownerPets(ownerId);
                    resolve(owner);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }
    },
    Mutation: {
        /**
         * Adding new Pet
         */
        addPet: function addPet(root, _ref2, context, info) {
            var input = _ref2.input;

            return new Promise(function (resolve, reject) {
                // checking if owner id provided, we should verify its existance in Owners collection/table
                if (input.ownerId) {
                    var owners = db.getOwners();
                    var owner = _lodash2.default.find(owners, { id: input.ownerId });
                    if (!owner) {
                        return reject(new Error('Owner Id does not exist'));
                    }
                }

                var pet = db.getPet(input);
                if (pet) {
                    return reject('Pet data fields you entered already exists.');
                }

                // create new pet
                db.createNewModel(input).then(function (model) {
                    // return a success message of type String [according to return type defined in typeDefs]
                    resolve('New Pet has been created successfully');
                }).catch(function (err) {
                    reject(err);
                });
            });
        },
        /**
         * Updating Pet (by specifiying pet id)
         */
        updatePet: function updatePet(root, _ref3) {
            var petId = _ref3.petId,
                input = _ref3.input;

            return new Promise(function (resolve, reject) {
                // if owner id provided, we should verify its existance in owner collection/table
                if (input.ownerId) {
                    var owners = db.getOwners();
                    var owner = _lodash2.default.find(owners, { id: input.ownerId });
                    if (!owner) {
                        return reject(new Error('Owner Id does not exist'));
                    }
                }

                // we need to verify that provided petId exists in pets tables (dogs and cats)
                var dogs = db.getDogs();
                var dog = _lodash2.default.find(dogs, { id: petId });

                var cats = db.getCats();
                var cat = _lodash2.default.find(cats, { id: petId });

                if (!dog && !cat) {
                    return reject(new Error('Pet Id does not exist'));
                }

                input.type = dog ? 'DOG' : 'CAT';

                // go update the model (i.e. either dog or cat model) depending on type detected
                db.updateModel(petId, input).then(function (model) {
                    // return a pet model
                    resolve(model);
                }).catch(function (err) {
                    reject(err);
                });
            });
        },
        /**
         * Adding new Owner
         */
        addOwner: function addOwner(root, _ref4, context, info) {
            var input = _ref4.input;

            return new Promise(function (resolve, reject) {
                input.type = 'OWNER';
                var owner = db.getOwnerByEmail(input.email);
                // i am considering here email should be unique
                // TODO: find a way through graphql schema [it would be better]
                if (owner) {
                    return reject('Owner email already exists. Please choose different email address');
                }

                db.createNewModel(input).then(function (model) {
                    // return a success message of type String [according to return type defined in typeDefs]
                    resolve('New Owner has been created successfully');
                }).catch(function (err) {
                    reject(err);
                });
            });
        }
    }
};

exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map