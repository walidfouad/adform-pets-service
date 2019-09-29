const { gql } = require('apollo-server-express');

const typeDefs = gql `
	type Owner {
		id: ID!
		name: String!
		address: String!
		phone: String
		email: String!
		pets: [Pet]
	}

	enum PetType { CAT, DOG }

	interface Pet {
		id: ID!
		type: PetType!
		name: String!
		colour: String!
		age: Int!
		breed: String
	}

	type cat implements Pet {
		id: ID!
		type: PetType!
		name: String!
		colour: String!
		age: Int!
		breed: String
	}

	type dog implements Pet {
		id: ID!
		type: PetType!
		name: String!
		colour: String!
		age: Int!
		breed: String
	}

	type Query {
		getOwners: String,
		getPets: String,
		getOwnerPets(owner_id: ID!): String
		
	}

	type Mutation {
		addPet(name: String!, colour: String!, age: Int!, breed: String): String
		updatePet(pet_id: ID!, name: String!, colour: String!, age: Int!, breed: String): String
	  }
`;


export default typeDefs;