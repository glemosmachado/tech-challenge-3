import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PostsApi } from '../api/posts';
import type { Post } from '../types/post';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { TextArea } from '../components/ui/TextArea';
import { AppButton, AppLinkButton } from '../components/ui/AppButton';

export default function PostEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<Pick<Post, 'title' | 'author' | 'content'>>({
    title: '', author: '', content: ''
  });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    setErr(null);
    setLoading(true);
    PostsApi.get(id)
      .then((p) => setForm({ title: p.title, author: p.author, content: p.content }))
      .catch((e: unknown) => {
        const message = e instanceof Error ? e.message : 'Falha ao carregar post';
        setErr(message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    if (!form.title.trim() || !form.author.trim() || !form.content.trim()) {
      setErr('Preencha todos os campos.');
      return;
    }
    setSaving(true);
    setErr(null);
    try {
      await PostsApi.update(id, form);
      navigate(`/posts/${id}`);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Falha ao salvar alterações';
      setErr(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Carregando…</p>;
  if (err) return <p style={{ color: '#f43f5e' }}>{err}</p>;

  return (
    <div style={{ display:'grid', gap: 16 }}>
      <div>
        <AppLinkButton to={`/posts/${id}`} variant="outline" leftIcon="⬅️">Voltar</AppLinkButton>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>✏️ Editar Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} style={{ display: 'grid', gap: 12 }}>
            <div>
              <label>Título</label>
              <Input value={form.title} onChange={e=>setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <label>Autor</label>
              <Input value={form.author} onChange={e=>setForm({ ...form, author: e.target.value })} />
            </div>
            <div>
              <label>Conteúdo</label>
              <TextArea rows={10} value={form.content} onChange={e=>setForm({ ...form, content: e.target.value })} />
            </div>
            <div style={{ display:'flex', gap: 8 }}>
              <AppButton type="submit" disabled={saving} leftIcon="💾">
                {saving ? 'Salvando…' : 'Salvar'}
              </AppButton>
              <AppLinkButton to={`/posts/${id}`} variant="outline" leftIcon="✖️">Cancelar</AppLinkButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
