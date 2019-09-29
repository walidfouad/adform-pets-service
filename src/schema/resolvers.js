console.log('defining resolvers');

const resolvers = {
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