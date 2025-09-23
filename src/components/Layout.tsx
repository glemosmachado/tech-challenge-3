import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../lib/auth';

const Bar = styled.header`
  display: flex; gap: 16px; align-items: center;
  padding: 12px 16px; border-bottom: 1px solid #e5e5e5;
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  const role = auth.getRole();
  return (
    <>
      <Bar>
        <Link to="/">Posts</Link>
        {role === 'teacher' && <Link to="/posts/new">Novo Post</Link>}
        <div style={{ marginLeft: 'auto' }}>
          {role ? (
            <>
              <span style={{ marginRight: 8 }}>Perfil: {role}</span>
              <button onClick={() => { auth.clear(); location.href = '/login'; }}>Sair</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </Bar>
      <main style={{ maxWidth: 960, margin: '24px auto', padding: '0 16px' }}>
        {children}
      </main>
    </>
  );
}