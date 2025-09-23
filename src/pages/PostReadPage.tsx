import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PostsApi } from '../api/posts';
import type { Post } from '../types/post';
import { auth } from '../lib/auth';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { AppButton, AppLinkButton } from '../components/ui/AppButton';

const Muted = styled.div` font-size: 13px; color: ${({theme})=>theme.colors.subtext}; `;

export default function PostReadPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const navigate = useNavigate();
  const role = auth.getRole();

  useEffect(() => {
    if (!id) return;
    setLoading(true); setErr(null);
    PostsApi.get(id)
      .then(setPost)
      .catch((e: unknown) => setErr(e instanceof Error ? e.message : 'Falha ao carregar post'))
      .finally(() => setLoading(false));
  }, [id]);

  const remove = async () => {
    if (!id) return;
    if (!confirm('Excluir este post?')) return;
    await PostsApi.remove(id);
    navigate('/posts');
  };

  if (loading) return <p>Carregando…</p>;
  if (err) return <p>Erro: {err}</p>;
  if (!post) return <p>Post não encontrado.</p>;

  return (
    <div style={{ display:'grid', gap: 16 }}>
      <div style={{ display:'flex', gap: 8, flexWrap:'wrap' }}>
        <AppLinkButton to="/posts" variant="outline" leftIcon="⬅️">Voltar</AppLinkButton>
        {role === 'teacher' && (
          <>
            <AppLinkButton to={`/posts/${post._id}/edit`} variant="outline" leftIcon="✏️">
              Editar
            </AppLinkButton>
            <AppButton variant="danger" onClick={remove} leftIcon="🗑️">Excluir</AppButton>
          </>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Muted>Autor: {post.author}</Muted>
          <p style={{ marginTop: 8, lineHeight: 1.7 }}>{post.content}</p>
        </CardContent>
      </Card>
    </div>
  );
}
