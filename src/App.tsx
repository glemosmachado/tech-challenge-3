import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import LoginPage from './pages/LoginPage';
import PostsListPage from './pages/PostsListPage';
import PostsTablePage from './pages/PostsTablePage';
import PostReadPage from './pages/PostReadPage';
import PostCreatePage from './pages/PostCreatePage';
import PostEditPage from './pages/PostEditPage';
import AdminPage from './pages/AdminPage';

import { auth } from './lib/auth';

function RootRedirect() {
  const role = auth.getRole();
  return role ? <Navigate to="/posts" replace /> : <Navigate to="/login" replace />;
}

function TeacherOnly({ children }: { children: React.ReactNode }) {
  const role = auth.getRole();
  if (role !== 'teacher') return <Navigate to="/posts" replace />;
  return <>{children}</>;
}


function TitleWatcher() {
  const location = useLocation();
  useEffect(() => {
    const map: Record<string, string> = {
      '/login': 'Login — TechBlog',
      '/posts': 'Posts (Cards) — TechBlog',
      '/posts-table': 'Posts (Tabela) — TechBlog',
      '/admin': 'Admin — TechBlog',
    };
    if (location.pathname.startsWith('/posts/') && location.pathname.endsWith('/edit')) {
      document.title = 'Editar Post — TechBlog';
    } else if (location.pathname.startsWith('/posts/')) {
      document.title = 'Ler Post — TechBlog';
    } else {
      document.title = map[location.pathname] ?? 'TechBlog';
    }
  }, [location.pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <TitleWatcher />
      <Layout>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/posts" element={<ProtectedRoute><PostsListPage /></ProtectedRoute>} />
          <Route path="/posts-table" element={<ProtectedRoute><PostsTablePage /></ProtectedRoute>} />
          <Route path="/posts/:id" element={<ProtectedRoute><PostReadPage /></ProtectedRoute>} />
          <Route
            path="/posts/new"
            element={
              <ProtectedRoute>
                <TeacherOnly>
                  <PostCreatePage />
                </TeacherOnly>
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts/:id/edit"
            element={
              <ProtectedRoute>
                <TeacherOnly>
                  <PostEditPage />
                </TeacherOnly>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <TeacherOnly>
                  <AdminPage />
                </TeacherOnly>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
