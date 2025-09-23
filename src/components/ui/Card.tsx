import styled from 'styled-components';

export const Card = styled.div`
  background: ${({theme})=>theme.colors.surface};
  border: 1px solid ${({theme})=>theme.colors.border};
  border-radius: ${({theme})=>theme.radius.xl};
  box-shadow: ${({theme})=>theme.shadow};
  padding: 20px;
  display: flex;
  flex-direction: column;         /* permite “colar” o botão embaixo */
  transition: transform .2s, box-shadow .2s, border-color .2s;

  &:hover{
    transform: translateY(-3px);
    border-color: ${({theme})=>theme.colors.secondary};
    box-shadow: 0 18px 40px rgba(34,211,238,.12);
  }
`;

export const CardHeader = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 12px;
`;

export const CardTitle = styled.h3`
  margin: 0; font-size: 22px; line-height: 1.2;
`;

export const CardContent = styled.div`
  color: ${({theme})=>theme.colors.text};
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;                 /* ocupa o espaço para empurrar o footer */
`;

export const CardFooter = styled.div`
  margin-top: 12px;
`;
