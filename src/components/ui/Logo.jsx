import React from 'react';

/**
 * InfoDrill Official Logo Component
 * Supports both high-res PNG image asset and scalable SVG drill-mark icon
 */
export function Logo({ 
  size = 'md', 
  height: customHeight,
  showText = true, 
  light = false, 
  className = '', 
  style = {} 
}) {
  // Generous, prominent heights for strong brand visibility
  const heightMap = {
    xs: 32,
    sm: 44,
    md: 54,
    lg: 68,
    xl: 86
  };

  const currentHeight = customHeight || heightMap[size] || 54;

  // Standalone vector mark if text is hidden
  if (!showText) {
    return (
      <svg 
        width={currentHeight} 
        height={currentHeight} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`infodrill-logo-mark ${className}`}
        style={style}
      >
        <defs>
          <linearGradient id="drillGradientMark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="35%" stopColor="#6366F1" />
            <stop offset="70%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#3730A3" />
          </linearGradient>
        </defs>

        {/* Top Dome Arch */}
        <path 
          d="M 22 42 C 22 24, 34 14, 50 14 C 66 14, 78 24, 78 42 C 78 33, 66 23, 50 23 C 34 23, 22 33, 22 42 Z" 
          fill="url(#drillGradientMark)" 
        />
        {/* Upper Outer Ring */}
        <path 
          d="M 21 42 C 21 48, 33 53, 50 53 C 67 53, 79 48, 79 42 C 79 36, 67 31, 50 31 C 33 31, 21 36, 21 42 Z" 
          fill="none" 
          stroke="url(#drillGradientMark)" 
          strokeWidth="6" 
        />
        {/* Central Core Ellipse */}
        <ellipse 
          cx="50" 
          cy="42" 
          rx="14" 
          ry="6.5" 
          fill="url(#drillGradientMark)" 
        />
        {/* Middle Tapering Ring */}
        <path 
          d="M 27 58 C 30 65, 39 70, 50 70 C 61 70, 70 65, 73 58 C 68 64, 59 66, 50 66 C 41 66, 32 64, 27 58 Z" 
          fill="url(#drillGradientMark)" 
        />
        {/* Bottom Cone Tip */}
        <path 
          d="M 38 74 C 41 81, 45 87, 50 87 C 55 87, 59 81, 62 74 C 58 78, 54 80, 50 80 C 46 80, 42 78, 38 74 Z" 
          fill="url(#drillGradientMark)" 
        />
        <path 
          d="M 43 83 C 45 88, 47 92, 50 92 C 53 92, 55 88, 57 83 C 55 85, 52 86, 50 86 C 48 86, 45 85, 43 83 Z" 
          fill="url(#drillGradientMark)" 
        />
      </svg>
    );
  }

  // Full Logo with Image and clean text representation
  return (
    <div 
      className={`infodrill-brand-logo ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        textDecoration: 'none',
        flexShrink: 0,
        ...style
      }}
    >
      <img 
        src="/logo.png" 
        alt="InfoDrill AI Solutions" 
        className="infodrill-brand-img"
        style={{
          height: customHeight ? `${customHeight}px` : `${currentHeight}px`,
          width: 'auto',
          maxWidth: `${Math.round(currentHeight * 3.2)}px`,
          objectFit: 'contain',
          display: 'block'
        }}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );
}

export default Logo;
