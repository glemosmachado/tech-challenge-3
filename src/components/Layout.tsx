import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../lib/auth';
import { AppButton } from './ui/AppButton';

const Shell = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

const Topbar = styled.header`
  position: sticky;
  top: 0;
  backdrop-filter: saturate(180%) blur(8px);
  background: rgba(11, 15, 25, 0.6);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;

  /* Responsivo */
  flex-wrap: wrap;
  row-gap: 8px;
`;

const Brand = styled(Link)`
  font-weight: 800;
  letter-spacing: 0.3px;
  color: ${({ theme }) => theme.colors.text};
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.subtext};
  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Spacer = styled.div`
  margin-left: auto;
`;

const Welcome = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #9aa3b2;
  font-size: 14px;
`;

const RoleBadge = styled.span`
  font-size: 18px;
`;

const Main = styled.main`
  width: 100%;
  max-width: 1040px;
  margin: 28px auto;
  padding: 0 20px 40px;
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  const role = auth.getRole();
  const name = (localStorage.getItem('tc_name') || '').trim();
  const { pathname } = useLocation();
  const icon = role === 'teacher' ? '🎓' : '👤';

  return (
    <Shell>
      <Topbar>
        <Brand to="/">TechBlog</Brand>

        {role && pathname !== '/login' && (
          <>
            <NavLink to="/posts">Posts</NavLink>
            {role === 'teacher' && <NavLink to="/admin">Admin</NavLink>}
          </>
        )}

        <Spacer />

        {role ? (
          <>
            <Welcome>
              <RoleBadge aria-label={role === 'teacher' ? 'Professor(a)' : 'Estudante'}>
                {icon}
              </RoleBadge>
              <span>Bem-vindo{name ? ',' : ''} {name}</span>
            </Welcome>

            <AppButton
              onClick={() => {
                auth.clear();
                localStorage.removeItem('tc_name');
                location.href = '/login';
              }}
            >
              Sair
            </AppButton>
          </>
        ) : (
          <NavLink to="/login">Entrar</NavLink>
        )}
      </Topbar>

      <Main>{children}</Main>
    </Shell>
  );
}
