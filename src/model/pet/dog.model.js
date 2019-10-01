import Pet from './pet.model';

export default class Dog extends Pet {
    constructor(id, name, colour, age, breed = null, ownerId = null) {
        super('DOG', id, name, colour, age, breed, ownerId);
    }

}