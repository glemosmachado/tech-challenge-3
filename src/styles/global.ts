import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *,*::before,*::after{ box-sizing:border-box; }
  html,body,#root{ height:100%; }
  body{
    margin:0;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial;
    background:
      radial-gradient(1200px 600px at 10% -10%, rgba(124,92,255,.18), transparent 60%),
      radial-gradient(900px 500px at 90% 0%, rgba(34,211,238,.14), transparent 55%),
      ${({theme}) => theme.colors.bg};
    color: ${({theme}) => theme.colors.text};
    -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
  }
  a{ color: ${({theme}) => theme.colors.secondary}; text-decoration: none; }
  input, button, textarea{ font-family: inherit; }
`;
