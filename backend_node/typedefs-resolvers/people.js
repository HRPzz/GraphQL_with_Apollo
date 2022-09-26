const { gql } = require('apollo-server')
const dbWorks = require('../dbWorks.js')

const typeDefs = gql`
    type People {
        id: ID!
        first_name: String!
        last_name: String!
        sex: Sex! # Enum Type
        blood_type: BloodType! # Enum Type
        serve_years: Int!
        role: Role!
        team: ID!
        from: String!
        tools: [Tool] # Interface Type
        givens: [Given] # Union Type
    }
    input PostPersonInput { # Input Type
        first_name: String!
        last_name: String!
        sex: Sex!
        blood_type: BloodType!
        serve_years: Int!
        role: Role!
        team: ID!
        from: String!
    }
`
const resolvers = {
    Query: {
        people: (parent, args) => dbWorks.getPeople(args),
        person: (parent, args) => dbWorks.getPeople(args)[0]
    },
    Mutation: {
        postPerson: (parent, args) => dbWorks.postPerson(args),
        editPerson: (parent, args) => dbWorks.editPerson(args),
        deletePerson: (parent, args) => dbWorks.deleteItem('people', args)
    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}