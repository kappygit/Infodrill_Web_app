import React from 'react';

/**
 * Standardized section header with title and description (Taste Skill Anti-Slop).
 */
export function SectionHeading({
  title,
  highlight,
  description,
  align = 'left',
  className = '',
}) {
  const isCentered = align === 'center';

  return (
    <div className={`section-header ${isCentered ? 'text-center' : ''} ${className}`.trim()}>
      <h2 className="title">
        {title}{' '}
        {highlight && <span className="highlight-marker">{highlight}</span>}
      </h2>
      {description && <p className="description">{description}</p>}
    </div>
  );
}

export default SectionHeading;
