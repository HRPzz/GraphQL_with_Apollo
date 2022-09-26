const { gql } = require('apollo-server')
const dbWorks = require('../dbWorks.js')
const typeDefs = gql`
    type People {
        id: ID!
        first_name: String!
        last_name: String!
        sex: Sex! # enum
        blood_type: BloodType! # enum
        serve_years: Int!
        role: Role!
        team: ID!
        from: String!
        tools: [Tool] # interface
        givens: [Given] # union
    }
`
const resolvers = {
    Query: {
        people: (parent, args) => dbWorks.getPeople(args),
    }
}
module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}