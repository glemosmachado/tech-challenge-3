import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { PostsApi } from '../api/posts';
import type { Post } from '../types/post';
import { Input } from '../components/ui/Input';
import { AppButton, AppLinkButton } from '../components/ui/AppButton';
import { auth } from '../lib/auth';

const TableWrap = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid ${({theme})=>theme.colors.border};
  border-radius: ${({theme})=>theme.radius.lg};
`;

const TableEl = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 720px;

  th, td {
    padding: 14px;
    border-bottom: 1px solid ${({theme})=>theme.colors.border};
  }
  th {
    text-align: left;
    color: ${({theme})=>theme.colors.subtext};
    font-weight: 700;
    letter-spacing: .2px;
  }
  tbody tr:hover {
    background: rgba(124,92,255,.06);
  }

  /* telas médias/pequenas: reduzir padding */
  ${({theme})=>theme.mq.md}{
    th, td { padding: 10px; }
  }

  /* esconder a coluna Conteúdo no mobile pra caber melhor */
  ${({theme})=>theme.mq.md}{
    td:nth-child(3), th:nth-child(3) { display: none; }
  }
`;

export default function PostsTablePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const role = auth.getRole();

  const load = useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const data = q ? await PostsApi.search(q) : await PostsApi.list();
      setPosts(Array.isArray(data) ? data : []);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Falha ao carregar posts');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [q]);

  useEffect(() => { load(); }, [load]);

  const remove = async (id: string) => {
    if (!confirm('Excluir este post?')) return;
    await PostsApi.remove(id);
    await load();
  };

  return (
    <div style={{ display:'grid', gap: 16 }}>
      <div style={{ display:'flex', gap: 12, alignItems:'center', flexWrap:'wrap' }}>
        <h1 style={{ margin: 0 }}>Posts (Listview)</h1>
        {role === 'teacher' && (
          <AppLinkButton to="/posts/new" leftIcon="➕">Novo Post</AppLinkButton>
        )}
        <div style={{ marginLeft: 'auto', display:'flex', gap: 8, width: 'min(460px, 100%)', flexWrap:'wrap' }}>
          <Input placeholder="Buscar por palavra-chave" value={q} onChange={e=>setQ(e.target.value)} />
          <AppButton onClick={load} variant="outline" leftIcon="🔎">Buscar</AppButton>
        </div>
      </div>

      {loading && <p>Carregando…</p>}
      {err && <p style={{ color:'#f43f5e' }}>Erro: {err}</p>}
      {!loading && !err && posts.length === 0 && <p>Nenhum post encontrado.</p>}

      {!loading && !err && posts.length > 0 && (
        <TableWrap>
          <TableEl>
            <thead>
              <tr>
                <th style={{width:'40%'}}>Título</th>
                <th style={{width:'28%'}}>Autor</th>
                <th>Conteúdo (início)</th>
                <th style={{width:'260px'}}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(p => (
                <tr key={p._id}>
                  <td>{p.title}</td>
                  <td>{p.author}</td>
                  <td>{p.content.slice(0, 60)}{p.content.length>60?'…':''}</td>
                  <td>
                    <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                      <AppLinkButton to={`/posts/${p._id}`} variant="outline" leftIcon="👁️">Ver</AppLinkButton>
                      {role === 'teacher' && (
                        <>
                          <AppLinkButton to={`/posts/${p._id}/edit`} variant="outline" leftIcon="✏️">Editar</AppLinkButton>
                          <AppButton variant="danger" onClick={()=>remove(p._id)} leftIcon="🗑️">Excluir</AppButton>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableEl>
        </TableWrap>
      )}
    </div>
  );
}
