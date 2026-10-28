import React from 'react';

export function Container({ children, narrow = false, className = '', as = 'div', ...props }) {
  const Component = as;
  const classes = `${narrow ? 'container-narrow' : 'container'} ${className}`.trim();

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
