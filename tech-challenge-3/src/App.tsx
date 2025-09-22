import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import PostsListPage from './pages/PostsListPage';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<PostsListPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
