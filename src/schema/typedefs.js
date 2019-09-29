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

	interface Pet {
		id: ID!
		name: String!
		colour: String!
		age: Int!
		breed: String
	}

	type Cat implements Pet {
		id: ID!
		name: String!
		colour: String!
		age: Int!
		breed: String
		meowingVolume: Int
	}

	type Dog implements Pet {
		id: ID!
		name: String!
		colour: String!
		age: Int!
		breed: String
		barkingVolume: Int
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