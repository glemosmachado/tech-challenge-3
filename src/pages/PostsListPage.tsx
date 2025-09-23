import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { PostsApi } from '../api/posts';
import type { Post } from '../types/post';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { AppButton, AppLinkButton } from '../components/ui/AppButton';
import { auth } from '../lib/auth';

const Grid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, 1fr);

  /* Responsivo: 3 -> 2 -> 1 colunas */
  ${({ theme }) => theme.mq.lg} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${({ theme }) => theme.mq.md} {
    grid-template-columns: 1fr;
  }
`;

const PostCard = styled(Card)`
  min-height: 220px;
`;

const Muted = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.subtext};
`;

export default function PostsListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const role = auth.getRole();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = q ? await PostsApi.search(q) : await PostsApi.list();
      setPosts(Array.isArray(data) ? data : []);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Falha ao carregar posts');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [q]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div
        style={{
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          flexWrap: 'wrap', // responsivo
        }}
      >
        <h1 style={{ margin: 0 }}>Posts</h1>

        {role === 'teacher' && (
          <AppLinkButton to="/posts/new" leftIcon="➕">
            Novo Post
          </AppLinkButton>
        )}

        <div
          style={{
            marginLeft: 'auto',
            display: 'flex',
            gap: 8,
            width: 'min(460px, 100%)',
            flexWrap: 'wrap', // responsivo
          }}
        >
          <Input
            placeholder="Buscar por palavra-chave"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <AppButton onClick={load} variant="outline" leftIcon="🔎">
            Buscar
          </AppButton>
        </div>
      </div>

      {loading && <p>Carregando…</p>}
      {error && <p style={{ color: '#f43f5e' }}>Erro: {error}</p>}
      {!loading && !error && posts.length === 0 && <p>Nenhum post encontrado.</p>}

      {!loading && !error && posts.length > 0 && (
        <Grid>
          {posts.map((p) => (
            <PostCard key={p._id}>
              <CardHeader>
                <CardTitle>{p.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Muted>Autor: {p.author}</Muted>
                <p style={{ marginTop: 2 }}>
                  {p.content.slice(0, 160)}
                  {p.content.length > 160 ? '…' : ''}
                </p>
              </CardContent>
              <CardFooter>
                <AppLinkButton to={`/posts/${p._id}`} variant="outline" leftIcon="📖">
                  Ler post
                </AppLinkButton>
              </CardFooter>
            </PostCard>
          ))}
        </Grid>
      )}
    </div>
  );
}
