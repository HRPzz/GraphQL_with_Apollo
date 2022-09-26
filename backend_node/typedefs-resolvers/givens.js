const { gql } = require('apollo-server')
const dbWorks = require('../dbWorks.js')

// Union Type - 타입 여럿을 한 배열에 반환하고자 할 때 사용
const typeDefs = gql`
    union Given = Equipment | Supply
`
const resolvers = {
    Query: {
        givens: (parent, args) => {
            return [
                ...dbWorks.getEquipments(args),
                ...dbWorks.getSupplies(args)
            ]
        }
    },
    Given: {
        __resolveType(given, context, info) {
            if (given.used_by) {
                return 'Equipment'
            }
            if (given.team) {
                return 'Supply'
            }
            return null
        }
    }
}
module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}