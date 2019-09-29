'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
console.log('defining resolvers');

var resolvers = {
    Query: {
        getOwners: function getOwners(root, args, context, info) {
            return 'Hello world!';
        },
        getPets: function getPets(root, args, context, info) {
            return 'Hello world!';
        },
        getOwnerPets: function getOwnerPets(root, _ref, context, info) {
            var owner_id = _ref.owner_id;

            return 'Hello world!';
        }
    },
    Mutation: {
        addPet: function addPet(root, _ref2) {
            var name = _ref2.name,
                colour = _ref2.colour,
                age = _ref2.age,
                breed = _ref2.breed;

            return 'Hello world!';
        },
        updatePet: function updatePet(root, _ref3) {
            var pet_id = _ref3.pet_id,
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