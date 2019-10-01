console.log('defining resolvers');

const resolvers = {
    Pet: {
        __resolveType(pet, context, info) {
            if (pet.type === 'CAT') {
                return 'Cat';
            }

            if (pet.type === 'DOG') {
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
        getOwnerPets: (root, { ownerId }, context, info) => {
            return 'Hello world!';
        }
    },
    Mutation: {
        addPet: (root, {
            input
        }) => {
            //TODO: add pet to database
            return input;
        },
        updatePet: (root, {
            petId,
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