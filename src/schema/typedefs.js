const { gql } = require('apollo-server-express');

const typeDefs = gql `
	
	# --- INPUTS ---
	input AddPetData {
		type: PetType!
		name: String!
		colour: String!
		age: Int!
		breed: String
		ownerId: ID
	}

	input UpdatePetData {
		name: String
		colour: String
		age: Int
		breed: String
		ownerId: ID
	}
	
	# --- ENUMS ---
	enum PetType {
		CAT
		DOG
	}

	# --- INTERFACES ---
	interface Pet {
		id: ID!
		type: PetType!
		name: String!
		colour: String!
		age: Int!
		breed: String
		ownerId: ID
	}
	
	# --- TYPES ---
	type Cat implements Pet {
		id: ID!
		type: PetType!
		name: String!
		colour: String!
		age: Int!
		breed: String
		ownerId: ID
	}

	type Dog implements Pet {
		id: ID!
		type: PetType!
		name: String!
		colour: String!
		age: Int!
		breed: String
		ownerId: ID
	}

	type Owner {
		id: ID!
		name: String!
		address: String!
		phone: String
		email: String!
	}
	
	# --- QUERY ---
	type Query {
		getOwners: [Owner!],
		getPets: [Pet!],
		getOwnerPets(ownerId: ID!): [Pet!]
		
	}

	# --- MUTATION ---
	type Mutation {
		addPet(input: AddPetData!): Pet!
		updatePet(petId: ID!, input: UpdatePetData!): Pet!
	  }
`;


export default typeDefs;