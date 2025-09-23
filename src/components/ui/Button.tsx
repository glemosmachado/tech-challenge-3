import styled from 'styled-components';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const paddings: Record<Size, string> = {
  sm: '8px 12px',
  md: '12px 18px',
  lg: '14px 22px',
};

const Base = styled.button<{ $variant: Variant; $size: Size }>`
  border: 1px solid transparent;
  border-radius: ${({theme})=>theme.radius.pill};
  padding: ${({$size}) => paddings[$size]};
  font-weight: 700;
  cursor: pointer;
  transition: .2s transform, .2s background, .2s border-color, .2s color, .2s box-shadow;
  display: inline-flex; align-items: center; gap: 10px;
  box-shadow: 0 0 0 rgba(0,0,0,0);

  ${({$variant, theme}) => {
    switch($variant){
      case 'outline': return `
        background: transparent;
        border-color: ${theme.colors.border};
        color: ${theme.colors.text};
        &:hover{ border-color: ${theme.colors.secondary}; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(34,211,238,.12); }
      `;
      case 'ghost': return `
        background: transparent;
        color: ${theme.colors.subtext};
        &:hover{ color: ${theme.colors.text}; transform: translateY(-1px); }
      `;
      case 'danger': return `
        background: ${theme.colors.danger};
        color: white;
        &:hover{ filter: brightness(.95); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(244,63,94,.25); }
      `;
      default: return `
        background: ${theme.colors.primary};
        color: white;
        &:hover{ background: ${theme.colors.primaryHover}; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(124,92,255,.25); }
      `;
    }
  }}
`;

export function Button(
  { variant='primary', size='md', ...rest }:
  React.ComponentProps<'button'> & { variant?: Variant; size?: Size }
) {
  return <Base $variant={variant} $size={size} {...rest} />;
}

export function LinkButton(
  { variant='primary', size='md', ...rest }:
  { to: string } & React.ComponentProps<typeof Link> & { variant?: Variant; size?: Size }
) {
  return <Base as={Link} $variant={variant} $size={size} {...rest} />;
}
