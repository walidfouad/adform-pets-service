'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _templateObject = _taggedTemplateLiteral(['\n\t\n\t# --- INPUTS ---\n\tinput AddPetData {\n\t\ttype: PetType!\n\t\tname: String!\n\t\tcolour: String!\n\t\tage: Int!\n\t\tbreed: String\n\t\townerId: ID\n\t}\n\n\tinput UpdatePetData {\n\t\tname: String\n\t\tcolour: String\n\t\tage: Int\n\t\tbreed: String\n\t\townerId: ID\n\t}\n\t\n\tinput AddOwnerData {\n\t\tname: String!\n\t\taddress: String!\n\t\tphone: String\n\t\temail: String!\n\t}\n\n\t# --- ENUMS ---\n\tenum PetType {\n\t\tCAT\n\t\tDOG\n\t}\n\n\t# --- INTERFACES ---\n\tinterface Pet {\n\t\tid: ID!\n\t\ttype: PetType!\n\t\tname: String!\n\t\tcolour: String!\n\t\tage: Int!\n\t\tbreed: String\n\t\towner: Owner\n\t}\n\t\n\t# --- TYPES ---\n\ttype Cat implements Pet {\n\t\tid: ID!\n\t\ttype: PetType!\n\t\tname: String!\n\t\tcolour: String!\n\t\tage: Int!\n\t\tbreed: String\n\t\towner: Owner\n\t}\n\n\ttype Dog implements Pet {\n\t\tid: ID!\n\t\ttype: PetType!\n\t\tname: String!\n\t\tcolour: String!\n\t\tage: Int!\n\t\tbreed: String\n\t\towner: Owner\n\t}\n\n\ttype Owner {\n\t\tid: ID!\n\t\tname: String!\n\t\taddress: String!\n\t\tphone: String\n\t\temail: String!\n\t\tpets: [Pet!]\n\t}\n\t\n\t# --- QUERY ---\n\ttype Query {\n\t\tgetOwners: [Owner!],\n\t\tgetPets: [Pet!],\n\t\tgetOwnerPets(ownerId: ID!): Owner\n\t\t\n\t}\n\n\t# --- MUTATION ---\n\ttype Mutation {\n\t\taddPet(input: AddPetData!): String\n\t\tupdatePet(petId: ID!, input: UpdatePetData!): Pet\n\t\taddOwner(input: AddOwnerData!): String\n\t  }\n'], ['\n\t\n\t# --- INPUTS ---\n\tinput AddPetData {\n\t\ttype: PetType!\n\t\tname: String!\n\t\tcolour: String!\n\t\tage: Int!\n\t\tbreed: String\n\t\townerId: ID\n\t}\n\n\tinput UpdatePetData {\n\t\tname: String\n\t\tcolour: String\n\t\tage: Int\n\t\tbreed: String\n\t\townerId: ID\n\t}\n\t\n\tinput AddOwnerData {\n\t\tname: String!\n\t\taddress: String!\n\t\tphone: String\n\t\temail: String!\n\t}\n\n\t# --- ENUMS ---\n\tenum PetType {\n\t\tCAT\n\t\tDOG\n\t}\n\n\t# --- INTERFACES ---\n\tinterface Pet {\n\t\tid: ID!\n\t\ttype: PetType!\n\t\tname: String!\n\t\tcolour: String!\n\t\tage: Int!\n\t\tbreed: String\n\t\towner: Owner\n\t}\n\t\n\t# --- TYPES ---\n\ttype Cat implements Pet {\n\t\tid: ID!\n\t\ttype: PetType!\n\t\tname: String!\n\t\tcolour: String!\n\t\tage: Int!\n\t\tbreed: String\n\t\towner: Owner\n\t}\n\n\ttype Dog implements Pet {\n\t\tid: ID!\n\t\ttype: PetType!\n\t\tname: String!\n\t\tcolour: String!\n\t\tage: Int!\n\t\tbreed: String\n\t\towner: Owner\n\t}\n\n\ttype Owner {\n\t\tid: ID!\n\t\tname: String!\n\t\taddress: String!\n\t\tphone: String\n\t\temail: String!\n\t\tpets: [Pet!]\n\t}\n\t\n\t# --- QUERY ---\n\ttype Query {\n\t\tgetOwners: [Owner!],\n\t\tgetPets: [Pet!],\n\t\tgetOwnerPets(ownerId: ID!): Owner\n\t\t\n\t}\n\n\t# --- MUTATION ---\n\ttype Mutation {\n\t\taddPet(input: AddPetData!): String\n\t\tupdatePet(petId: ID!, input: UpdatePetData!): Pet\n\t\taddOwner(input: AddOwnerData!): String\n\t  }\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _require = require('apollo-server-express'),
    gql = _require.gql;

/**
 * Below is the Graph Query Language (gql). Used to better and easily define our schema types, queries and mutations
 */


var typeDefs = gql(_templateObject);

exports.default = typeDefs;
//# sourceMappingURL=typedefs.js.map