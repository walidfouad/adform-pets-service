import Pet from './pet.model';

export default class Cat extends Pet {
    constructor(name, colour, age, breed = null, ownerId = null) {
        super('CAT', name, colour, age, breed, ownerId);
    }
}