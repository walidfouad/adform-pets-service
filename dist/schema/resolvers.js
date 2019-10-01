'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
console.log('defining resolvers');

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
            return 'Hello world!';
        },
        getPets: function getPets(root, args, context, info) {
            return 'Hello world!';
        },
        getOwnerPets: function getOwnerPets(root, _ref, context, info) {
            var ownerId = _ref.ownerId;

            return 'Hello world!';
        }
    },
    Mutation: {
        addPet: function addPet(root, _ref2) {
            var input = _ref2.input;

            //TODO: add pet to database
            return input;
        },
        updatePet: function updatePet(root, _ref3) {
            var petId = _ref3.petId,
                name = _ref3.name,
                colour = _ref3.colour,
                age = _ref3.age,
                breed = _ref3.breed;

            return 'Hello world!';
        }
    }

};
console.log('-- end of defining resolvers --');
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map