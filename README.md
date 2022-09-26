# GraphQL_with_Apollo

[![Thumbnail_img][Thumbnail_img]][Thumbnail]

[Thumbnail_img]: https://cdn.inflearn.com/public/courses/326283/cover/ef7611ae-fcad-4c35-9d2e-fadd0765b28e/graphql-apollo-thumb-2%20%EB%B3%B5%EC%82%AC.png
[Thumbnail]: https://github.com/HRPzz/GraphQL_with_Apollo

- 얄팍한 GraphQL과 Apollo 강의
  - [youtube][youtube]
  - [blog][blog]

[youtube]: https://youtu.be/9BIXcXHsj0A
[blog]: https://www.yalco.kr/@graphql-apollo/1-1/
## Apollo Server with node.js

- 작업 폴더
  - 백엔드(Server): yalco-inflearn-graphql-apollo-master/1-2-rest-api 부터 3-4-arg-input-type 까지 작업 시작
  - 프론트엔드(Client): 없음, 서버만 실습

- 모듈 설치

```bash
npm install -g nodemon # js 소스 수정시 자동으로 node.js 서버 재시작
npm i convert-csv-to-json # 프로젝트에 사용할 데이터베이스 (csv 파일) 설치
npm i graphql apollo-server # GraphQL, Apollo Server 설치
npm i lodash # 웹표준에 맞는 효율적인 js 코딩 지원 (주로 frontend 에서 많이 사용)
```

- package.json 수정

```json
{
  ...
  "scripts": {
    ...
    "start": "nodemon index.js"
  },
  ...
}
```

- 실행

```bash
npm start
```

## Apollo Client with react.js

- 작업 폴더
  - 백엔드(Server): yalco-inflearn-graphql-apollo-master/1-3-graphql-exp
  - 프론트엔드(Client): yalco-inflearn-graphql-apollo-master/4-1-react-before-apollo

- 모듈 설치

```bash
npm install -g react-scripts # React 모듈 설치
npm install @apollo/client graphql # Apollo Client 모듈 설치
```

- 실행

```bash
npm start
```

## GraphQL

- 개념
  - `소프트웨어간 정보를 주고받는 방식`
  - 명세/형식일 뿐 => `GraphQL 구현할 솔루션 필요`
    - 백엔드에서 정보 제공 및 처리 e.g. GraphQL.js, GraphQL Yoga
    - 프론트엔드에서 요청 전송 e.g. AWS Amplify, Relay
  - **REST API 한계 극복**
    - Overfetching: 원하지 않는 정보까지 모두 받아와야 함
    - Underfetching: 원하는 정보를 받지 못하고 요청을 또 보내야 함
- 강점
  - 필요한 정보만 선택해서 받아올 수 있음
    - Overfetching 문제 해결 => 데이터 전송량 감소
  - 여러 계층의 정보를 한번에 받아올 수 있음
    - Underfetching 문제 해결 => 요청 횟수 감소
  - 하나의 endpoint 에서 모든 요청 처리
- 쿼리(resolvers)
  - query => Request GET
  - mutation => Request POST, PUT, DELETE
  - 주의: `해당 resolver function 과 맞는 DB SQL 작성 필요`
- 타입(typeDefs)
  - Scalar - GraphQL 내장 자료형
    - ID - 기본적으로는 String, 고유 식별자 역할을 나타냄
    - String - UTF-8 문자열
    - Int - 부호가 있는 32비트 정수
    - Float - 부호가 있는 부동소수점 값
    - Boolean - 참/거짓
  - Enum
    - 미리 지정된 값들 중에서 반환
  - List
    - 특정 타입의 배열 반환
  - Union
    - 타입 여럿을 한 배열에 반환하고자 할 때 사용
  - Interface
    - 유사한 객체 타입을 만들기 위한 공통 필드 타입
    - 추상 타입 - 다른 타입에 implement 되기 위한 타입
  - Input
    - 넣어야 할 인자가 많을 경우 사용
  - Fragment
    - 여러 쿼리에 사용될 수 있는, 재사용 가능한 필드셋
    - 중복을 줄임으로써 전체 코드 간소화
- **중복된 요소를 재사용하기 위해 사용되는 타입**
  - Server
    - Union, Interface
  - Client
    - Fragment

## Apollo

- 백엔드(Server)와 프론트엔드(Client) 모두 제공
- 간편하고 쉬운 설정
- 풍성한 기능 제공

## GraphQL 정상 동작 확인

- 크롬 개발자 도구 - Network - localhost 클릭해서 Preview 에서 반환된 데이터 확인
- 크롬 개발자 도구 - Network - localhost 클릭해서 Request Payload 에서 Query 확인
