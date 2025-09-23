export const theme = {
  colors: {
    // base
    bg: '#0b0f19',          
    surface: '#0f1526',     
    border: '#1b2238',
    text: '#e6e9f2',
    subtext: '#9aa3b2',

    // acentos (neon-ish)
    primary: '#7c5cff',
    primaryHover: '#6b4df3',
    secondary: '#22d3ee',
    danger: '#f43f5e',
    success: '#22c55e',
  },
  radius: {
    md: '12px',
    lg: '16px',
    xl: '20px',
    pill: '999px',
  },
  shadow: '0 10px 30px rgba(0,0,0,.35)',
  mq: {
    sm: '@media (max-width: 480px)',
    md: '@media (max-width: 768px)',
    lg: '@media (max-width: 1024px)',
  }
};
export type AppTheme = typeof theme;
