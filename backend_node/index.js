const database = require('./database')
const { ApolloServer, gql } = require('apollo-server')
const { argsToArgsConfig } = require('graphql/type/definition')

// GraphQL 명세에서 사용될 데이터, 요청의 타입 지정
// gql (template literal tag) 로 생성됨
const typeDefs = gql`
  type Query {
    teams: [Team] # teams 쿼리를 날리면 Team 데이터 리스트가 반환됨
    team(id: Int): Team
    equipments: [Equipment]
    supplies: [Supply]
  }
  type Team {
    id: Int
    manager: String
    office: String
    extension_number: String
    mascot: String
    cleaning_duty: String
    project: String
    supplies: [Supply]
  }
  type Equipment {
    id: String
    used_by: String
    count: Int
    new_or_used: String
  }
  type Supply {
    id: String
    team: Int
  }
`

// 서비스 액션을 함수로 지정
// 요청에 따라 데이터를 반환/입력/수정/삭제
const resolvers = {
  Query: {
    // teams 반환 시 해당되는 supplies 받아오기
    teams: () => database.teams // db 데이터 반환
      .map((team) => {
          team.supplies = database.supplies
          .filter((supply) => {
              return supply.team === team.id
          })
          return team
      }),

    // 특정 팀만 받아오기
    team: (parent, args, context, info) => database.teams
      .filter((team) => {
        return team.id === args.id
      })[0],
    
    equipments: () => database.equipments,
    supplies: () => database.supplies
  }
}

// Apollo 서버 생성
const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
console.log(`🚀  Server ready at ${url}`)
})