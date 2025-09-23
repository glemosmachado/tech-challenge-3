import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *,*::before,*::after{ box-sizing:border-box; }
  html,body,#root{ height:100%; }
  body{
    margin:0;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial, 'Noto Sans';
    background: ${({theme}) => theme.colors.bg};
    color: ${({theme}) => theme.colors.text};
    -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
  }
  a{ color: ${({theme}) => theme.colors.primary}; text-decoration: none; }
  input, button{ font-family: inherit; }
`;
