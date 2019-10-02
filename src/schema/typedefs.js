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
		owner: Owner
	}
	
	# --- TYPES ---
	type Cat implements Pet {
		id: ID!
		type: PetType!
		name: String!
		colour: String!
		age: Int!
		breed: String
		owner: Owner
	}

	type Dog implements Pet {
		id: ID!
		type: PetType!
		name: String!
		colour: String!
		age: Int!
		breed: String
		owner: Owner
	}

	type Owner {
		id: ID!
		name: String!
		address: String!
		phone: String
		email: String!
		pets: [Pet!]
	}
	
	# --- QUERY ---
	type Query {
		getOwners: [Owner!],
		getPets: [Pet!],
		getOwnerPets(ownerId: ID!): Owner
		
	}

	# --- MUTATION ---
	type Mutation {
		addPet(input: AddPetData!): Pet!
		updatePet(petId: ID!, input: UpdatePetData!): Pet!
	  }
`;


export default typeDefs;