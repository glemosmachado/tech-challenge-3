import { AppLinkButton } from '../components/ui/AppButton';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);

  ${({ theme }) => theme.mq.lg} {
    grid-template-columns: 1fr;
  }
`;

const ActionCard = styled(Card)`
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Lead = styled.p`
  margin: 8px 0 0 0;
  color: ${({ theme }) => theme.colors.subtext};
`;

export default function AdminPage() {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <h1 style={{ margin: 0 }}>Administração</h1>

      <Grid>
        <ActionCard>
          <CardHeader>
            <CardTitle>📚 Abrir lista de posts (cards)</CardTitle>
          </CardHeader>
          <CardContent>
            <Lead>
              Listagem visual em cards, com busca por palavra-chave.
            </Lead>
            <div style={{ marginTop: 12 }}>
              <AppLinkButton
                to="/posts"
                variant="outline"
                leftIcon="🗂️"
              >
                Abrir cards
              </AppLinkButton>
            </div>
          </CardContent>
        </ActionCard>

        <ActionCard>
          <CardHeader>
            <CardTitle>🧾 Abrir lista de posts (tabela)</CardTitle>
          </CardHeader>
          <CardContent>
            <Lead>
              Visual compacto em tabela (listview) com ações por linha.
            </Lead>
            <div style={{ marginTop: 12 }}>
              <AppLinkButton
                to="/posts-table"
                variant="outline"
                leftIcon="🧾"
              >
                Abrir tabela
              </AppLinkButton>
            </div>
          </CardContent>
        </ActionCard>

        <ActionCard>
          <CardHeader>
            <CardTitle>🔎 Buscar posts</CardTitle>
          </CardHeader>
          <CardContent>
            <Lead>
              Ir para a página de cards e usar o campo de busca.
            </Lead>
            <div style={{ marginTop: 12 }}>
              <AppLinkButton
                to="/posts"
                variant="outline"
                leftIcon="🔎"
              >
                Ir para busca
              </AppLinkButton>
            </div>
          </CardContent>
        </ActionCard>

        <ActionCard>
          <CardHeader>
            <CardTitle>➕ Novo Post</CardTitle>
          </CardHeader>
          <CardContent>
            <Lead>Crie uma nova postagem.</Lead>
            <div style={{ marginTop: 12 }}>
              <AppLinkButton
                to="/posts/new"
                leftIcon="➕"
              >
                Criar novo
              </AppLinkButton>
            </div>
          </CardContent>
        </ActionCard>
      </Grid>
    </div>
  );
}
