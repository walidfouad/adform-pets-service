import Pet from './pet.model';

export default class Dog extends Pet {
    constructor(name, colour, age, breed = null, ownerId = null) {
        super('DOG', name, colour, age, breed, ownerId);
    }

}