import _ from 'lodash';
import DBManager from '../data/dbmanager';

const db = new DBManager();

const resolvers = {
    Pet: {
        // this is added to resolve interface issue (decide which child type to resolve)
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
                if (input.ownerId) {
                    const owners = db.getOwners();
                    const owner = _.find(owners, { id: input.ownerId });
                    if (!owner) {
                        return reject(new Error('Owner Id does not exist'));
                    }
                }

                db.createNewModel(input)
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
            return new Promise((resolve, reject) => {
                if (input.ownerId) {
                    const owners = db.getOwners();
                    const owner = _.find(owners, { id: input.ownerId });
                    if (!owner) {
                        return reject(new Error('Owner Id does not exist'));
                    }
                }

                const dogs = db.getDogs();
                const dog = _.find(dogs, { id: petId });

                const cats = db.getCats();
                const cat = _.find(cats, { id: petId });

                if (!dog && !cat) {
                    return reject(new Error('Pet Id does not exist'));
                }

                input.type = dog ? 'DOG' : 'CAT';

                db.updateModel(petId, input)
                    .then((model) => {
                        resolve(model);
                    }).catch((err) => {
                        reject(err);
                    });
            });
        }
    }


};
console.log('-- end of defining resolvers --');
export default resolvers;