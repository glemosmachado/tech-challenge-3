import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import PostsListPage from './pages/PostsListPage';
import ProtectedRoute from './components/ProtectedRoute';
import { auth } from './lib/auth';

function RootRedirect() {
  const role = auth.getRole();
  return role ? <Navigate to="/posts" replace /> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/posts"
            element={
              <ProtectedRoute>
                <PostsListPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
