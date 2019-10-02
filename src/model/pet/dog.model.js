import Pet from './pet.model';

/**
 * Class representing the Dog Model that extends the Interface Pet
 */
export default class Dog extends Pet {
    constructor(
        id,
        name,
        colour,
        age,
        breed = null,
        ownerId = null) {

        super('DOG', id, name, colour, age, breed, ownerId);
    }
}