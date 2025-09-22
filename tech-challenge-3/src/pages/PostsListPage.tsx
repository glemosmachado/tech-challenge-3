import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { PostsApi } from '../api/posts';
import type { Post } from '../types/post';

export default function PostsListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const data = q ? await PostsApi.search(q) : await PostsApi.list();
    setPosts(data);
    setLoading(false);
  }, [q]);

  useEffect(() => {
    load();
  }, [load]);

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await load();
  };

  if (loading) return <p>Carregando…</p>;

  return (
    <>
      <h1>Posts</h1>
      <form onSubmit={onSearch} style={{ marginBottom: 16 }}>
        <input
          placeholder="Buscar por palavra-chave"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button type="submit" style={{ marginLeft: 8 }}>
          Buscar
        </button>
      </form>
      {posts.length === 0 ? (
        <p>Nenhum post encontrado.</p>
      ) : (
        <ul>
          {posts.map((p) => (
            <li key={p._id} style={{ marginBottom: 12 }}>
              <Link to={`/posts/${p._id}`} style={{ fontWeight: 600 }}>
                {p.title}
              </Link>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Autor: {p.author}</div>
              <div style={{ fontSize: 14 }}>
                {p.content.slice(0, 120)}
                {p.content.length > 120 ? '…' : ''}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
