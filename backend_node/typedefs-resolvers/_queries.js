const { gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        people: [People]
        peopleFiltered( # 여러 인자를 가짐
            team: Int
            sex: Sex
            blood_type: BloodType
            from: String
        ): [People]
        peoplePaginated( # 여러 인자를 가짐
            page: Int!,
            per_page: Int!
        ): [People]
        equipments: [Equipment]
        equipmentAdvs: [EquipmentAdv]
        softwares: [Software]
        software: Software
        supplies: [Supply]
        givens: [Given]
    }
`

module.exports = typeDefs