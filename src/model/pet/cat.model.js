import Pet from './pet.model';

export default class Cat extends Pet {
    constructor(id, name, colour, age, breed = null, ownerId = null) {
        super('CAT', id, name, colour, age, breed, ownerId);
    }
}