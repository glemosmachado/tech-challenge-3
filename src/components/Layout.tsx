import styled, { DefaultTheme } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../lib/auth';
import React from 'react';

// Helper tipado: recebe o tema corretamente
const color =
  (getter: (t: DefaultTheme) => string, fallback: string) =>
  ({ theme }: { theme: DefaultTheme }) => {
    try {
      const v = getter(theme);
      return v ?? fallback;
    } catch {
      return fallback;
    }
  };

const Shell = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

const Topbar = styled.header`
  position: sticky;
  top: 0;
  backdrop-filter: saturate(180%) blur(8px);
  background: rgba(15, 23, 42, 0.6);
  border-bottom: 1px solid ${color(t => t.colors.border, '#1f2937')};
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 12px 20px;
`;

const Brand = styled(Link)`
  font-weight: 700;
  letter-spacing: 0.3px;
  color: ${color(t => t.colors.text, '#e5e7eb')};
`;

const Spacer = styled.div`
  margin-left: auto;
`;

const Button = styled.button`
  background: ${color(t => t.colors.primary, '#60a5fa')};
  color: white;
  border: 0;
  border-radius: 12px;
  padding: 10px 14px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s transform, 0.2s background;
  &:hover {
    background: ${color(t => t.colors.primaryHover, '#3b82f6')};
    transform: translateY(-1px);
  }
`;

const Main = styled.main`
  width: 100%;
  max-width: 1040px;
  margin: 28px auto;
  padding: 0 20px 40px;
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  const role = auth.getRole();
  const { pathname } = useLocation();

  return (
    <Shell>
      <Topbar>
        <Brand to="/">TechBlog</Brand>
        {role && pathname !== '/login' && <Link to="/posts">Posts</Link>}
        <Spacer />
        {role ? (
          <>
            <span style={{ color: '#94a3b8', fontSize: 14, marginRight: 10 }}>
              Perfil: {role}
            </span>
            <Button
              onClick={() => {
                auth.clear();
                location.href = '/login';
              }}
            >
              Sair
            </Button>
          </>
        ) : (
          <Button as={Link} to="/login">
            Entrar
          </Button>
        )}
      </Topbar>
      <Main>{children}</Main>
    </Shell>
  );
}
