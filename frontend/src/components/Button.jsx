import { useTheme } from '../context/ThemeContext';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  ...props 
}) {
  const { theme } = useTheme();

  const baseStyles = 'font-semibold rounded-lg transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variants = {
    primary: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.background,
    },
    secondary: {
      backgroundColor: theme.colors.secondary,
      color: theme.colors.text,
    },
    danger: {
      backgroundColor: '#ef4444',
      color: '#ffffff',
    },
    outline: {
      backgroundColor: 'transparent',
      color: theme.colors.primary,
      border: `2px solid ${theme.colors.primary}`,
    },
    cancel: {
      backgroundColor: theme.colors.navborder,
      color: theme.colors.opposite,
    },
  };

  const variantStyle = variants[variant] || variants.primary;
  const sizeStyle = sizes[size] || sizes.md;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={variantStyle}
      className={`${baseStyles} ${sizeStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
