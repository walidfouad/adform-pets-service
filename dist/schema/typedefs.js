'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _templateObject = _taggedTemplateLiteral(['\n\ttype Owner {\n\t\tid: ID!\n\t\tname: String!\n\t\taddress: String!\n\t\tphone: String\n\t\temail: String!\n\t\tpets: [Pet]\n\t}\n\n\tinterface Pet {\n\t\tid: ID!\n\t\tname: String!\n\t\tcolour: String!\n\t\tage: Int!\n\t\tbreed: String\n\t}\n\n\ttype cat implements Pet {\n\t\tid: ID!\n\t\tname: String!\n\t\tcolour: String!\n\t\tage: Int!\n\t\tbreed: String\n\t}\n\n\ttype dog implements Pet {\n\t\tid: ID!\n\t\tname: String!\n\t\tcolour: String!\n\t\tage: Int!\n\t\tbreed: String\n\t}\n\n\ttype Query {\n\t\tgetOwners: [Owner],\n\t\tgetPets: [Pet],\n\t\tgetOwnerPets(owner_id: ID!): [Pet]\n\t\t\n\t}\n\n\ttype Mutation {\n\t\taddPet(name: String!, colour: String!, age: Int!, breed: String): Pet\n\t\tupdatePet(pet_id: ID!, name: String!, colour: String!, age: Int!, breed: String): Pet\n\t  }\n'], ['\n\ttype Owner {\n\t\tid: ID!\n\t\tname: String!\n\t\taddress: String!\n\t\tphone: String\n\t\temail: String!\n\t\tpets: [Pet]\n\t}\n\n\tinterface Pet {\n\t\tid: ID!\n\t\tname: String!\n\t\tcolour: String!\n\t\tage: Int!\n\t\tbreed: String\n\t}\n\n\ttype cat implements Pet {\n\t\tid: ID!\n\t\tname: String!\n\t\tcolour: String!\n\t\tage: Int!\n\t\tbreed: String\n\t}\n\n\ttype dog implements Pet {\n\t\tid: ID!\n\t\tname: String!\n\t\tcolour: String!\n\t\tage: Int!\n\t\tbreed: String\n\t}\n\n\ttype Query {\n\t\tgetOwners: [Owner],\n\t\tgetPets: [Pet],\n\t\tgetOwnerPets(owner_id: ID!): [Pet]\n\t\t\n\t}\n\n\ttype Mutation {\n\t\taddPet(name: String!, colour: String!, age: Int!, breed: String): Pet\n\t\tupdatePet(pet_id: ID!, name: String!, colour: String!, age: Int!, breed: String): Pet\n\t  }\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _require = require('apollo-server-express'),
    gql = _require.gql;

var typeDefs = gql(_templateObject);

exports.default = typeDefs;
//# sourceMappingURL=typedefs.js.map