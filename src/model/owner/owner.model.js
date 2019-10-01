export default class Owner {
    constructor(name, address, phone, email) {
        this.type = 'OWNER';
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.email = email;
    }

    get Type() {
        return this.type;
    }

    toJSON() {
        return {
            type: this.type,
            name: this.name,
            address: this.address,
            phone: this.phone,
            email: this.email
        };
    }

}