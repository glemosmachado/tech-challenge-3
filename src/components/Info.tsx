import styled from 'styled-components';
import type { ReactNode } from 'react';

const Wrap = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  background: rgba(34, 211, 238, 0.08);
  border: 1px solid rgba(34, 211, 238, 0.25);
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 10px 12px;
  font-size: 13px;
`;

const Dot = styled.div`
  flex: 0 0 auto;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.secondary};
  color: #00131a;
  font-weight: 900;
`;

function Info({ children }: { children: ReactNode }) {
  return (
    <Wrap>
      <Dot>i</Dot>
      <div>{children}</div>
    </Wrap>
  );
}

export default Info;