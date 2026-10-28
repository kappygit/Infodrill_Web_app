import React from 'react';
import './Badge.css';

/**
 * Pill-style status badge or technical taxonomy tag.
 */
export function Badge({
  children,
  variant = 'cyan',
  hasDot = false,
  className = '',
  icon: Icon,
}) {
  return (
    <span className={`badge badge--${variant} ${className}`.trim()}>
      {hasDot && <span className="badge__dot" aria-hidden="true" />}
      {Icon && <Icon className="badge__icon" size={13} aria-hidden="true" />}
      <span>{children}</span>
    </span>
  );
}
