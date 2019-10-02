/**
 * Interface representing a base Model for Pets
 */
export default class Pet {
    constructor(type, id, name, colour, age, breed, ownerId) {
        this.type = type;
        this.id = id;
        this.name = name;
        this.colour = colour;
        this.age = age;
        this.breed = breed;
        this.ownerId = ownerId;
    }

    get Type() {
        return this.type;
    }

    /**
     * Converting Object to JSON
     */
    toJSON() {
        return {
            type: this.type,
            id: this.id,
            name: this.name,
            colour: this.colour,
            age: this.age,
            breed: this.breed,
            ownerId: this.ownerId
        };
    }
}