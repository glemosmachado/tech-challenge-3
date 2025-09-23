export const theme = {
  colors: {
    bg: '#0f172a',
    card: '#111827',
    text: '#e5e7eb',
    subtext: '#94a3b8',
    primary: '#60a5fa',
    primaryHover: '#3b82f6',
    border: '#1f2937',
    success: '#22c55e',
    danger: '#ef4444',
  },
  radius: '16px',
  shadow: '0 10px 30px rgba(0,0,0,.35)',
  mq: {
    sm: '@media (max-width: 480px)',
    md: '@media (max-width: 768px)',
    lg: '@media (max-width: 1024px)',
  }
};
export type AppTheme = typeof theme;
