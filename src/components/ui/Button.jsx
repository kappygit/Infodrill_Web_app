import React from 'react';
import './Button.css';

/**
 * Premium Button component supporting multiple variants and micro-animations.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  isLoading = false,
  className = '',
  as = 'button',
  href,
  ...props
}) {
  const Component = href ? 'a' : as;
  const classes = `btn btn--${variant} btn--${size} ${isLoading ? 'btn--loading' : ''} ${className}`.trim();

  return (
    <Component
      className={classes}
      href={href}
      aria-busy={isLoading}
      {...props}
    >
      <span className="btn__content">
        {Icon && iconPosition === 'left' && <Icon className="btn__icon" size={size === 'sm' ? 14 : 18} aria-hidden="true" />}
        <span>{children}</span>
        {Icon && iconPosition === 'right' && <Icon className="btn__icon" size={size === 'sm' ? 14 : 18} aria-hidden="true" />}
      </span>
      {variant === 'primary' && <span className="btn__glow" aria-hidden="true" />}
    </Component>
  );
}
