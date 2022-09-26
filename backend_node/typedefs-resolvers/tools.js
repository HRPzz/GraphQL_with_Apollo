const { gql } = require('apollo-server')

// Interface Type
// 유사한 객체 타입을 만들기 위한 공통 필드 타입
// 추상 타입 - 다른 타입에 implement 되기 위한 타입
const typeDefs = gql`
    interface Tool {
        id: ID!
        used_by: Role!
    }
`
const resolvers = {
    Tool: {
        __resolveType(tool, context, info) {
            if (tool.developed_by) {
                return 'Software'
            }
            if (tool.new_or_used) {
                return 'Equipment'
            }
            return null
        }
    }
}
module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}