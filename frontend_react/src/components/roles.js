import './components.css';

// 필요한 모듈 임포트
import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

// 쿼리 작성
const GET_ROLES = gql`
  query GetRoles {
    roles {
      id
    }
  }
`;

const GET_ROLE = gql`
  query GetRole($id: ID!) {
    role(id: $id) {
      id
      requirement
      members {
        id
        last_name
        serve_years
      }
      equipments {
        id
      }
      softwares {
        id
      }
    }
  }
`;

function Roles() {

    // 렌더링될 컨텐츠 id 를 저장할 state 지정
    const [contentId, setContentId] = useState('');

    // 메인 화면 왼쪽의 사이드 섹션 - 리스트가 나타날 곳
    function AsideItems () {
        const roleIcons = {
            developer: '💻',
            designer: '🎨',
            planner: '📝'
        }

        const { loading, error, data } = useQuery(GET_ROLES);

        if (loading) return <p className="loading">Loading...</p>
        if (error) return <p className="error">Error :(</p>
        // 크롬 개발자 도구 - Network - localhost - Preview 에서 graphql 서버로부터 받은 데이터 확인 가능
        return (
        <ul>
            {data.roles.map(({id}) => {
            return (
                <li key={id} className={'roleItem ' +  (contentId === 'id' ? 'on' : '')}
                onClick={() => {setContentId(id)}}>
                <span>{contentId === id ? '🔲' : '⬛'}</span>
                {roleIcons[id]} {id}
                </li>
            )
            })}
        </ul>
        );
    }

    // 메인 화면 - 리스트 각 항목의 내용부가 표시될 곳
    function MainContents () {
        const { loading, error, data } = useQuery(GET_ROLE, {
            variables: {id: contentId} // contentId 를 요청에 실어 보냄
        })
    
        if (loading) return <p className="loading">Loading...</p>
        if (error) return <p className="error">Error :(</p>
        if (contentId === '') return (<div className="roleWrapper">Select Role</div>)
    
        return (
          <div className="roleWrapper">
            <h2>{data.role.id}</h2>
            <div className="requirement"><span>{data.role.requirement}</span> required</div>
            <h3>Members</h3>
            <ul>
              {data.role.members.map((member) => {
                return (<li>{member.last_name}</li>)
              })}
            </ul>
            <h3>Equipments</h3>
            <ul>
              {data.role.equipments.map((equipment) => {
                return (<li>{equipment.id}</li>)
              })}
            </ul>
            <h3>Softwares</h3>
              {data.role.softwares.map((software) => {
                return (<li>{software.id}</li>)
              })}
            <ul>
            </ul>
          </div>
        );
    }

    return (
        <div id="roles" className="component">
            <aside>
                {AsideItems()}
            </aside>
            <section className="contents">
                {MainContents()}
            </section>
        </div>
    )
}

export default Roles;