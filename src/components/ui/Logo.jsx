import React from 'react';

/**
 * InfoDrill Official Logo Component
 * - light=false (Default, Navbar, light backgrounds): Renders the official original logo (`/logo.png`) with black typography.
 * - light=true (Dark backgrounds, Footer, Dark cards): Renders the official original logo with white typography (`/logo-white.png`).
 *
 * Uses precision viewBox camera (258 84 504 204) to tightly crop out outer whitespace of the original asset so 100% of height is authentic brand logo.
 */
export function Logo({
  size = 'md',
  height: customHeight,
  showText = true,
  light = false,
  className = '',
  style = {}
}) {
  const heightMap = {
    xs: 32,
    sm: 44,
    md: 54,
    lg: 60,
    xl: 86
  };

  const currentHeight = customHeight || heightMap[size] || 54;
  const logoHeight = currentHeight;
  const viewBox = showText ? "258 84 504 204" : "258 84 144 204";
  const aspectRatio = showText ? (504 / 204) : (144 / 204);
  const logoWidth = Math.round(logoHeight * aspectRatio);
  const logoSrc = light ? '/logo-white.png' : '/logo.png';

  return (
    <div
      className={`infodrill-brand-logo ${light ? 'infodrill-brand-logo--light' : ''} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        textDecoration: 'none',
        flexShrink: 0,
        ...style
      }}
    >
      <svg
        width={logoWidth}
        height={logoHeight}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="infodrill-brand-img"
        style={{
          display: 'block',
          width: `${logoWidth}px`,
          height: `${logoHeight}px`,
          maxWidth: 'none',
          overflow: 'hidden'
        }}
        aria-label="InfoDrill AI Solutions"
        role="img"
      >
        <image
          href={logoSrc}
          x="0"
          y="0"
          width="1024"
          height="370"
          preserveAspectRatio="none"
        />
      </svg>
    </div>
  );
}

export default Logo;
