import './App.css';
import React, { useState } from 'react';

// ApooloClient 모듈 임포트
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client'

// 컴포넌트 임포트
import Roles from './components/roles'
import Teams from './components/teams'
import People from './components/people'


// ApolloClient 객체 생성 - GraphQL 서버 (ApolloServer) 와 데이터 주고받음
// c.f. axios 처럼 ajax 라이브러리 역할 수행
const client = new ApolloClient({
  uri: 'http://localhost:4000', // GraphQL 서버 주소
  cache: new InMemoryCache() // InMemoryCache 를 통한 캐시 관리 // InMemoryCache 참고(https://www.apollographql.com/docs/react/caching/cache-configuration/)
});

function App() {

  const [menu, setMenu] = useState('Roles')

  // App-header 아래 메인 화면에 나타날 컴포넌트 매핑
  let mainComp = {
    Roles: (<Roles />),
    Teams: (<Teams />),
    People: (<People />),
  }

  // menu 값에 따라 상단 App-header 의 버튼을 표시하는 함수
  function NavMenus() {
    // 문자열 배열로부터 각각 li 요소 생성
    return [
      'Roles', 'Teams', 'People'
    ].map((_menu, key) => {
      return (
        <li key={key} className={menu === _menu ? 'on' : ''}
          onClick={() => { setMenu(_menu); }}>{_menu}</li>
      );
    });
  }

  return (
    <div className="App">
      <ApolloProvider client={client}>
        <header className="App-header">
          <h1>Company Management</h1>
          <nav>
            <ul>
              {NavMenus()}
            </ul>
          </nav>
        </header>
        <main>
          {mainComp[menu]}
        </main>
      </ApolloProvider>
    </div>
  );
}

export default App;
