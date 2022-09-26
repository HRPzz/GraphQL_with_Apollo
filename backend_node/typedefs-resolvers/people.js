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

    # Input Type - 넣어야 할 인자가 많을 경우 사용
    input PostPersonInput {
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
        peopleFiltered: (parent, args) => dbWorks.getPeople(args),
        peoplePaginated: (parent, args) => dbWorks.getPeople(args),
    },
    Mutation: {
        postPerson: (parent, args) => dbWorks.postPerson(args),
    }
}
module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}