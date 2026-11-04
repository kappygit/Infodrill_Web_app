import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Maximize2,
  X,
  Zap,
  BarChart3,
  CheckCircle2,
  LayoutDashboard,
  Users,
  FileSpreadsheet,
  PhoneCall,
  Settings as SettingsIcon,
} from 'lucide-react';
import './LaptopShowcase.css';

/**
 * Reusable Laptop Mockup Showcase Component
 *
 * Props:
 * - eyebrow: Eyebrow label string
 * - title: Section headline
 * - subtitle: Section subhead
 * - items: Array of { id, label, image, caption, icon? }
 * - floatingChips: Array of { label, icon, variant }
 * - autoPlayInterval: Interval in ms (default 4000)
 */
export function LaptopShowcase({
  eyebrow = 'PRODUCT PREVIEW',
  title = 'See Call Info in Action',
  subtitle = 'Experience the high-speed telecalling workspace built for modern sales and operations teams.',
  items = [],
  floatingChips = [
    { label: 'Live Sync', icon: Zap, variant: 'blue' },
    { label: 'Real-time Reports', icon: BarChart3, variant: 'indigo' },
    { label: 'Lead Tracking', icon: CheckCircle2, variant: 'emerald' },
  ],
  autoPlayInterval = 4000,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Auto-play timer (stops permanently once user manually clicks a tab)
  useEffect(() => {
    if (!isAutoPlaying || isHovered || items.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isAutoPlaying, isHovered, items.length, autoPlayInterval]);

  // Handle manual tab selection
  const handleTabClick = (index) => {
    setActiveIndex(index);
    setIsAutoPlaying(false); // User took control; disable auto-play
  };

  // Keyboard navigation for Lightbox (Esc to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    };

    if (isLightboxOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen]);

  if (!items || items.length === 0) return null;

  const activeItem = items[activeIndex] || items[0];

  return (
    <motion.section
      className="laptop-showcase-section"
      id="product-preview"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="laptop-showcase-container">
        {/* Section Header */}
        <div className="laptop-showcase-header">
          {eyebrow && <span className="ref-section-eyebrow">{eyebrow}</span>}
          <h2 className="laptop-showcase-title">{title}</h2>
          {subtitle && <p className="laptop-showcase-subtext">{subtitle}</p>}
        </div>

        {/* Tab Pills */}
        <div className="laptop-tabs-container">
          <div className="laptop-tabs-wrapper" role="tablist" aria-label="Product Showcase Tabs">
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${item.id}`}
                  id={`tab-${item.id}`}
                  className={`laptop-tab-pill ${isActive ? 'laptop-tab-pill--active' : ''}`}
                  onClick={() => handleTabClick(index)}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Laptop Stage Wrapper with Ambient Glow and Floating Chips */}
        <div
          className="laptop-stage-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Ambient Purple/Indigo Glow behind laptop */}
          <div className="laptop-ambient-glow" aria-hidden="true" />

          {/* Desktop Floating Chips */}
          {floatingChips && floatingChips.length > 0 && (
            <div className="laptop-floating-chips-layer" aria-hidden="true">
              {floatingChips.map((chip, idx) => {
                const IconComponent = chip.icon;
                const posClass =
                  idx === 0
                    ? 'chip--top-left animate-float'
                    : idx === 1
                    ? 'chip--top-right animate-float-reverse'
                    : 'chip--bottom-left animate-float';
                return (
                  <div key={idx} className={`laptop-floating-chip ${posClass}`}>
                    {IconComponent && <IconComponent size={14} className="chip-icon" />}
                    <span>{chip.label}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* CSS Laptop Mockup */}
          <div className="laptop-mockup-frame">
            {/* Laptop Screen Lid */}
            <div className="laptop-screen-lid">
              {/* Top bezel with camera dot */}
              <div className="laptop-camera-bar">
                <span className="laptop-camera-dot" />
              </div>

              {/* Screen Display Area (Click to Zoom) */}
              <div
                className="laptop-screen-display"
                onClick={() => setIsLightboxOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsLightboxOpen(true);
                  }
                }}
                aria-label={`Enlarge ${activeItem.label} screenshot`}
                title="Click to view full screen"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeItem.id}
                    src={activeItem.image}
                    alt={activeItem.label}
                    className="laptop-screenshot-img"
                    initial={{ opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.015 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    loading="lazy"
                  />
                </AnimatePresence>

                {/* Hover overlay hint */}
                <div className="laptop-screen-overlay" aria-hidden="true">
                  <div className="laptop-zoom-pill">
                    <Maximize2 size={13} />
                    <span>Click to Zoom</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Laptop Aluminum Base & Notch */}
            <div className="laptop-base-top">
              <div className="laptop-notch" />
            </div>
            <div className="laptop-base-bottom" />
          </div>
        </div>

        {/* Caption Bar under Laptop */}
        <div className="laptop-caption-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              className="laptop-caption-card"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <span className="laptop-caption-indicator" />
              <span className="laptop-caption-tag">{activeItem.label}:</span>
              <span className="laptop-caption-desc">{activeItem.caption}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            className="laptop-lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsLightboxOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeItem.label} Full Screen View`}
          >
            <div className="laptop-lightbox-panel" onClick={(e) => e.stopPropagation()}>
              {/* Lightbox Header Bar */}
              <div className="laptop-lightbox-header">
                <div className="lightbox-title-wrap">
                  <span className="lightbox-title">{activeItem.label}</span>
                  <span className="lightbox-subtitle">— {activeItem.caption}</span>
                </div>
                <button
                  type="button"
                  className="laptop-lightbox-close"
                  onClick={() => setIsLightboxOpen(false)}
                  aria-label="Close Full Screen Preview"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Lightbox Image Container */}
              <div className="laptop-lightbox-image-wrap">
                <motion.img
                  src={activeItem.image}
                  alt={activeItem.label}
                  className="laptop-lightbox-image"
                  initial={{ scale: 0.94, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.94, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              {/* Lightbox Footer Bar */}
              <div className="laptop-lightbox-footer">
                <span className="lightbox-footer-caption">{activeItem.caption}</span>
                <span className="lightbox-esc-hint">Press ESC or click anywhere outside to close</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

export default LaptopShowcase;
