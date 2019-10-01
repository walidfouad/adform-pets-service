export default class Pet {
    constructor(type, name, colour, age, breed, ownerId) {
        this.type = type;
        this.name = name;
        this.colour = colour;
        this.age = age;
        this.breed = breed;
        this.ownerId = ownerId;
    }

    get Type() {
        return this.type;
    }

    toJSON() {
        return {
            type: this.type,
            name: this.name,
            colour: this.colour,
            age: this.age,
            breed: this.breed,
            ownerId: this.ownerId
        };
    }

}