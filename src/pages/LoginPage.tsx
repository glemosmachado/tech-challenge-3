import styled from 'styled-components';
import { auth } from '../lib/auth';
import { useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import Info from '../components/Info';


const Wrap = styled.div` display: grid; place-items: center; min-height: calc(100vh - 82px); padding: 24px; `;

const Grid = styled.div`
  display: grid; gap: 16px; grid-template-columns: repeat(2, 1fr);
  ${({theme})=>theme.mq.md}{ grid-template-columns: 1fr; }
`;

const RoleCard = styled(Card)<{ $active?: boolean }>`
  cursor: pointer;
  border-color: ${({$active, theme}) => $active ? theme.colors.secondary : theme.colors.border};
  box-shadow: ${({$active, theme}) => $active ? '0 18px 40px rgba(34,211,238,.14)' : theme.shadow};
`;

const RoleBadge = styled.div`
  width: 48px; height: 48px; border-radius: 999px;
  display: grid; place-items: center;
  background: rgba(124,92,255,.12);
  border: 1px solid rgba(124,92,255,.3);
  font-size: 24px;
`;

const Row = styled.div` display: grid; gap: 10px; `;
const Error = styled.div` color: ${({theme})=>theme.colors.danger}; font-weight: 700; font-size: 14px; `;

export default function LoginPage() {
  const [role, setRole] = useState<'student'|'teacher' | null>(null);
  const [name, setName] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const navigate = useNavigate();

  const infoText = useMemo(() => {
    if (role === 'teacher')
      return <>Como <b>Professor(a)</b>, o front enviará <code>x-user-type: teacher</code> ao back-end e as páginas de criação/edição/remoção serão liberadas.</>;
    if (role === 'student')
      return <>Como <b>Estudante</b>, você terá acesso somente à leitura (listar e ler posts).</>;
    return <>Escolha um tipo de usuário para ver as permissões.</>;
  }, [role]);

  function submit(e: React.FormEvent){
    e.preventDefault();
    if (!role) { setErr('Escolha um tipo de usuário.'); return; }
    if (!name.trim()) { setErr('Informe seu nome.'); return; }

    auth.setRole(role);
    localStorage.setItem('tc_name', name.trim());
    navigate('/posts', { replace: true });
  }

  return (
    <Wrap>
      <Card style={{ width:'100%', maxWidth: 760 }}>
        <CardHeader>
          <CardTitle>Como você quer entrar?</CardTitle>
        </CardHeader>
        <CardContent>
          <Grid>
            <RoleCard $active={role==='student'} onClick={()=>setRole('student')} aria-label="Entrar como Estudante">
              <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                <RoleBadge>👤</RoleBadge>
                <div>
                  <strong>Estudante</strong>
                  <p style={{ margin: 6, color:'#9aa3b2' }}>Visualiza posts e lê conteúdos.</p>
                </div>
              </div>
            </RoleCard>

            <RoleCard $active={role==='teacher'} onClick={()=>setRole('teacher')} aria-label="Entrar como Professor(a)">
              <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                <RoleBadge>🎓</RoleBadge>
                <div>
                  <strong>Professor(a)</strong>
                  <p style={{ margin: 6, color:'#9aa3b2' }}>Pode criar, editar e excluir posts.</p>
                </div>
              </div>
            </RoleCard>
          </Grid>

          <div style={{ marginTop: 18 }}>
            <Info>{infoText}</Info>
          </div>

          <form onSubmit={submit} style={{ display:'grid', gap: 14, marginTop: 20 }}>
            <Row>
              <label>Seu nome <span style={{ color: '#f43f5e' }}>*</span></label>
              <Input placeholder="Ex.: Gabriel Machado" value={name} onChange={e=>setName(e.target.value)} />
            </Row>

            {err && <Error>{err}</Error>}

            <div style={{ display:'flex', gap: 12, marginTop: 4 }}>
              <Button type="submit" size="lg">Continuar</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Wrap>
  );
}
