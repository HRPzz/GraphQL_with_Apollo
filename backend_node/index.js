const database = require('./database')
const { ApolloServer, gql } = require('apollo-server')

// GraphQL 명세에서 사용될 데이터, 요청의 타입 지정
// gql (template literal tag) 로 생성됨
const typeDefs = gql`
  type Query {
    teams: [Team]
  }
  type Team {
    id: Int
    manager: String
    office: String
    extension_number: String
    mascot: String
    cleaning_duty: String
    project: String
  }
`

// 서비스 액션을 함수로 지정
// 요청에 따라 데이터를 반환/입력/수정/삭제
const resolvers = {
  Query: {
    teams: () => database.teams
  }
}

// Apollo 서버 생성
const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
console.log(`🚀  Server ready at ${url}`)
})