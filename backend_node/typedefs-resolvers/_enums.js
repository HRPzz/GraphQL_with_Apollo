const { gql } = require('apollo-server')

// 열거 타입(enum) - 미리 지정된 값들 중에서만 반환
const typeDefs = gql`
    enum Role {
        developer
        designer
        planner
    }
    enum NewOrUsed {
        new
        used
    }
`
module.exports = typeDefs