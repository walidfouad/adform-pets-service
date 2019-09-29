console.log('defining resolvers');

const resolvers = {
    Pet: {
        __resolveType(pet, context, info) {
            if (pet.meowingVolume) {
                return 'Cat';
            }

            if (pet.barkingVolume) {
                return 'Dog';
            }

            return null;
        },
    },
    Query: {
        getOwners: (root, args, context, info) => {
            return 'Hello world!';
        },
        getPets: (root, args, context, info) => {
            return 'Hello world!';
        },
        getOwnerPets: (root, { owner_id }, context, info) => {
            return 'Hello world!';
        }
    },
    Mutation: {
        addPet: (root, {
            name,
            colour,
            age,
            breed
        }) => {
            return 'Hello world!';
        },
        updatePet: (root, {
            pet_id,
            name,
            colour,
            age,
            breed
        }) => {
            return 'Hello world!';
        }
    }


};
console.log('-- end of defining resolvers --');
export default resolvers;