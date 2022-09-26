const { gql } = require('apollo-server')
const dbWorks = require('../dbWorks')

// 스칼라 타입(ID, String, Int, Float, Boolean) - GraphQL 내장 자료형
const typeDefs = gql`
    type Equipment implements Tool {
        id: ID!
        used_by: Role! # 열거 타입
        count: Int
        new_or_used: NewOrUsed! # 열거 타입
    }
    type EquipmentAdv {
        id: ID! # 스칼라 타입 - 기본적으로는 String, 고유 식별자 역할
        used_by: Role! # 열거 타입
        count: Int! # 스칼라 타입 - 부호가 있는 32비트 정수
        use_rate: Float # 스칼라 타입 - 부호가 있는 부동소수점 값, Null 허용
        is_new: Boolean! # 스칼라 타입 - 참/거짓
        users: [String!] # 리스트 타입
    }
`
const resolvers = {
    Query: {
        equipments: (parent, args) => dbWorks.getEquipments(args),
        equipmentAdvs: (parent, args) => dbWorks.getEquipments(args)
            .map((equipment) => {
                if (equipment.used_by === 'developer') {
                    equipment.use_rate = Math.random().toFixed(2)
                }
                equipment.is_new = equipment.new_or_used === 'new'
                if (Math.random() > 0.5) {
                    equipment.users = []
                    dbWorks.getPeople(args).forEach((person) => {
                        if (person.role === equipment.used_by && Math.random() < 0.2) {
                            equipment.users.push(person.last_name)
                        }
                    })
                }
                return equipment
            }),

    },
    Mutation: {
        deleteEquipment: (parent, args) => dbWorks.deleteItem('equipments', args),
    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}