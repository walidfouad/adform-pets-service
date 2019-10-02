import _ from 'lodash';
import DBManager from '../data/dbmanager';

const db = new DBManager();

/**
 * Set of Resolvers with implementations for Schema queries and mutations
 */
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
        }
    },
    Query: {
        /**
         * Get all owners and fill pets data fields for each
         */
        getOwners: (root, args, context, info) => {
            return new Promise((resolve, reject) => {
                db.readModels(['OWNER'])
                    .then((owners) => {

                        let ownerWithPets = [];
                        owners.forEach(owner => {
                            // filling Owner pets 
                            owner.pets = db.ownerPets(owner.id);
                            ownerWithPets.push(owner);
                        });

                        resolve(ownerWithPets);
                    }).catch((err) => {
                        reject(err);
                    });
            });
        },
        /**
         * Gets Pets data fields along with the corresponding owner to each Pet
         */
        getPets: (root, args, context, info) => {
            return new Promise((resolve, reject) => {
                // as pets divided into two types/classes, and send array of model types to get all pets
                db.readModels(['DOG', 'CAT'])
                    .then((pets) => {
                        let petsWithOwners = [];
                        pets.forEach(pet => {
                            // fill owner data for each pet
                            pet.owner = db.getOwner(pet.ownerId);
                            petsWithOwners.push(pet);
                        });

                        resolve(petsWithOwners);
                    }).catch((err) => {
                        reject(err);
                    });
            });
        },
        /**
         * Get Owner data fields along with Pets assigned to him
         */
        getOwnerPets: (root, { ownerId }, context, info) => {
            return new Promise((resolve, reject) => {
                // get owner and then update its pets
                db.readSpecificModel(ownerId, 'OWNER')
                    .then((owner) => {
                        if (!owner) {
                            return reject('Owner specified does not exist.');
                        }
                        // update owner pets. Please note owner.pets already empty, as it is not stored in db.
                        owner.pets = db.ownerPets(ownerId);
                        resolve(owner);

                    }).catch((err) => {
                        reject(err);
                    });
            });
        }
    },
    Mutation: {
        /**
         * Adding new Pet
         */
        addPet: (root, { input }, context, info) => {
            return new Promise((resolve, reject) => {
                // checking if owner id provided, we should verify its existance in Owners collection/table
                if (input.ownerId) {
                    const owners = db.getOwners();
                    const owner = _.find(owners, { id: input.ownerId });
                    if (!owner) {
                        return reject(new Error('Owner Id does not exist'));
                    }
                }

                const pet = db.getPet(input);
                if (pet) {
                    return reject('Pet data fields you entered already exists.');
                }

                // create new pet
                db.createNewModel(input)
                    .then((model) => {
                        // return a success message of type String [according to return type defined in typeDefs]
                        resolve('New Pet has been created successfully');
                    }).catch((err) => {
                        reject(err);
                    });
            });
        },
        /**
         * Updating Pet (by specifiying pet id)
         */
        updatePet: (root, {
            petId,
            input
        }) => {
            return new Promise((resolve, reject) => {
                // if owner id provided, we should verify its existance in owner collection/table
                if (input.ownerId) {
                    const owners = db.getOwners();
                    const owner = _.find(owners, { id: input.ownerId });
                    if (!owner) {
                        return reject(new Error('Owner Id does not exist'));
                    }
                }

                // we need to verify that provided petId exists in pets tables (dogs and cats)
                const dogs = db.getDogs();
                const dog = _.find(dogs, { id: petId });

                const cats = db.getCats();
                const cat = _.find(cats, { id: petId });

                if (!dog && !cat) {
                    return reject(new Error('Pet Id does not exist'));
                }

                input.type = dog ? 'DOG' : 'CAT';

                // go update the model (i.e. either dog or cat model) depending on type detected
                db.updateModel(petId, input)
                    .then((model) => {
                        // return a pet model
                        resolve(model);
                    }).catch((err) => {
                        reject(err);
                    });
            });
        },
        /**
         * Adding new Owner
         */
        addOwner: (root, { input }, context, info) => {
            return new Promise((resolve, reject) => {
                input.type = 'OWNER';
                const owner = db.getOwnerByEmail(input.email);
                // i am considering here email should be unique
                // TODO: find a way through graphql schema [it would be better]
                if (owner) {
                    return reject('Owner email already exists. Please choose different email address');
                }

                db.createNewModel(input)
                    .then((model) => {
                        // return a success message of type String [according to return type defined in typeDefs]
                        resolve('New Owner has been created successfully');
                    }).catch((err) => {
                        reject(err);
                    });
            });
        },
    }
};

export default resolvers;