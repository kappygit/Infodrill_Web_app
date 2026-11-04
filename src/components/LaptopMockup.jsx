import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import './LaptopMockup.css';

/**
 * Reusable Front-Facing Laptop Mockup Component
 *
 * Smooth Opening Architecture:
 * - Pure GPU compositor-driven 3D rotation (rotateX: -90deg -> 0deg)
 * - Single useInView trigger at 25-30% viewport entry
 * - Screen backlight shade perfectly synced with opening
 * - Floating chips fade in smoothly once the lid is open
 * - Scale(1.06) zoom on hover only after lid is fully open
 * - 16:9 aspect ratio, object-contain, zero cropping
 */
export function LaptopMockup({
  src,
  alt = 'Product preview screen',
  floatingChip,
  onZoom,
  isReversed = false,
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });
  const [hasOpened, setHasOpened] = useState(false);
  const [isFullyOpen, setIsFullyOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    if (mq.matches) {
      setHasOpened(true);
      setIsFullyOpen(true);
    }

    const handler = (e) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) {
        setHasOpened(true);
        setIsFullyOpen(true);
      }
    };

    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isInView && !hasOpened) {
      setHasOpened(true);
      const timer = setTimeout(() => {
        setIsFullyOpen(true);
      }, 1350);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasOpened]);

  const ChipIcon = floatingChip?.icon;
  const chipVariant = floatingChip?.variant || 'blue';

  return (
    <div
      ref={containerRef}
      className={`laptop-mockup-wrapper ${isReversed ? 'laptop--reversed' : ''} ${
        hasOpened ? 'laptop-mockup-wrapper--opened' : ''
      } ${isFullyOpen ? 'laptop-mockup-wrapper--ready' : ''}`}
    >
      {/* Soft Ambient Purple/Indigo Glow */}
      <div className="laptop-ambient-glow" aria-hidden="true" />

      {/* Floating Chip (Desktop Only, fades in after opening completes) */}
      {floatingChip && (
        <div
          className={`laptop-floating-chip chip--${chipVariant} ${
            isReversed ? 'chip--float-left' : 'chip--float-right'
          } ${isFullyOpen ? 'animate-float' : ''}`}
          aria-hidden="true"
        >
          {ChipIcon && <ChipIcon size={14} className="chip-icon" />}
          <span>{floatingChip.label}</span>
        </div>
      )}

      {/* Flat Front-Facing Chassis (Smooth scale 1.06 hover zoom once fully open) */}
      <div className="laptop-flat-chassis">
        {/* Laptop Screen Lid — Opens ONCE smoothly around bottom hinge */}
        <div className="laptop-lid">
          {/* Top Bezel Bar with Center Camera Dot */}
          <div className="laptop-bezel-top">
            <span className="laptop-camera-lens" />
          </div>

          {/* Screen Display Frame: Exactly 16:9, object-contain, white background, no crop */}
          <div
            className="laptop-screen"
            onClick={onZoom}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onZoom?.();
              }
            }}
            title="Click to view full screen"
            aria-label={`Enlarge ${alt} screenshot`}
          >
            <img
              src={src}
              alt={alt}
              loading="lazy"
              className="laptop-screen-image"
            />

            {/* Dark Backlight Shade: Fades out as the lid opens, simulating turning on */}
            <div className="laptop-screen-shade" aria-hidden="true" />

            {/* Small Zoom Icon in Top-Right Corner (Visible on Hover Only) */}
            <div className="laptop-zoom-corner-btn" aria-hidden="true" title="Click to Zoom">
              <Maximize2 size={13} />
            </div>
          </div>
        </div>

        {/* Laptop Base (MacBook-style aluminum edge with center opening notch) */}
        <div className="laptop-base-top">
          <div className="laptop-thumb-notch" />
        </div>
        <div className="laptop-base-lip" />
      </div>
    </div>
  );
}

export default LaptopMockup;
