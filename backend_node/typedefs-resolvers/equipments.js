const { gql } = require('apollo-server')
const dbWorks = require('../dbWorks')

const typeDefs = gql`
    type Equipment implements Tool {
        id: ID!
        used_by: Role! # 열거 타입
        count: Int
        new_or_used: NewOrUsed! # 열거 타입
    }
`
const resolvers = {
    Query: {
        equipments: (parent, args) => dbWorks.getEquipments(args),
        equipment: (parent, args) => dbWorks.getEquipments(args)[0]
    },
    Mutation: {
        increaseEquipment: (parent, args) => dbWorks.increaseEquipment(args),
    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}
