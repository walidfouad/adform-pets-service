const { gql } = require('apollo-server-express');

/**
 * Below is the Graph Query Language (gql). Used to better and easily define our schema types, queries and mutations
 */
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
	
	input AddOwnerData {
		name: String!
		address: String!
		phone: String
		email: String!
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
		addPet(input: AddPetData!): String
		updatePet(petId: ID!, input: UpdatePetData!): Pet
		addOwner(input: AddOwnerData!): String
	  }
`;


export default typeDefs;