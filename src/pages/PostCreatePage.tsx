import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostsApi } from '../api/posts';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { TextArea } from '../components/ui/TextArea';
import { AppButton, AppLinkButton } from '../components/ui/AppButton';

export default function PostCreatePage() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !content.trim()) {
      setErr('Preencha todos os campos.');
      return;
    }
    setSaving(true);
    setErr(null);
    try {
      const created = await PostsApi.create({ title, author, content });
      navigate(`/posts/${created._id}`);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Falha ao criar post';
      setErr(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ display:'grid', gap: 16 }}>
      <div>
        <AppLinkButton to="/posts" variant="outline" leftIcon="⬅️">Voltar</AppLinkButton>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>➕ Novo Post</CardTitle>
        </CardHeader>
        <CardContent>
          {err && <p style={{ color: '#f43f5e' }}>{err}</p>}
          <form onSubmit={submit} style={{ display: 'grid', gap: 12 }}>
            <div>
              <label>Título</label>
              <Input placeholder="Ex.: Meu primeiro post" value={title} onChange={e=>setTitle(e.target.value)} />
            </div>
            <div>
              <label>Autor</label>
              <Input placeholder="Seu nome" value={author} onChange={e=>setAuthor(e.target.value)} />
            </div>
            <div>
              <label>Conteúdo</label>
              <TextArea rows={10} placeholder="Escreva aqui..." value={content} onChange={e=>setContent(e.target.value)} />
            </div>
            <div style={{ display:'flex', gap: 8 }}>
              <AppButton type="submit" disabled={saving} leftIcon="✅">
                {saving ? 'Criando…' : 'Criar'}
              </AppButton>
              <AppLinkButton to="/admin" variant="outline" leftIcon="✖️">Cancelar</AppLinkButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
