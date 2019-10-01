import async from 'async';
import _ from 'lodash';

import PETSDB from '../data/dbmanager';

const db = new PETSDB();

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
            return new Promise((resolve, reject) => {
                db.readModels(['OWNER'])
                    .then((owners) => {
                        resolve(owners);
                    }).catch((err) => {
                        reject(err);
                    });
            });
        },
        getPets: (root, args, context, info) => {
            return new Promise((resolve, reject) => {
                db.readModels(['DOG', 'CAT'])
                    .then((pets) => {
                        resolve(pets);
                    }).catch((err) => {
                        reject(err);
                    });
            });
        },
        getOwnerPets: (root, { ownerId }, context, info) => {
            return new Promise((resolve, reject) => {
                db.readModels(['DOG', 'CAT'])
                    .then((pets) => {
                        const filteredPets = _.filter(pets, { ownerId: ownerId });
                        resolve(filteredPets);
                    }).catch((err) => {
                        reject(err);
                    });
            });
        }
    },
    Mutation: {
        addPet: (root, { input }, context, info) => {
            return new Promise((resolve, reject) => {
                db.writeModel(input)
                    .then((model) => {
                        resolve(model);
                    }).catch((err) => {
                        reject(err);
                    });
            });
        },
        updatePet: (root, {
            petId,
            input
        }) => {
            return 'Hello world!';
        }
    }


};
console.log('-- end of defining resolvers --');
export default resolvers;