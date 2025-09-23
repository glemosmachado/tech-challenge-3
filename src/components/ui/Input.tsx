import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  background: #0b1020;
  color: ${({theme})=>theme.colors.text};
  border: 1px solid ${({theme})=>theme.colors.border};
  border-radius: ${({theme})=>theme.radius.md};
  padding: 12px 14px; outline: none;
  transition: .15s border-color;
  &:focus{ border-color: ${({theme})=>theme.colors.secondary}; }
`;
