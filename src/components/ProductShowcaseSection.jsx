import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { LaptopMockup } from './LaptopMockup';
import './ProductShowcaseSection.css';

/**
 * Reusable Alternating Zig-Zag Product Showcase Section
 *
 * Props:
 * - eyebrow: Section eyebrow tag string
 * - title: Section heading string
 * - subtitle: Section subheadline string
 * - items: Array of {
 *     id: string,
 *     badge: string,
 *     badgeVariant?: string,
 *     title: string,
 *     description: string,
 *     points: string[],
 *     image: string,
 *     floatingChip?: { label: string, icon: LucideIcon, variant: string }
 *   }
 */
export function ProductShowcaseSection({
  eyebrow = 'PRODUCT PREVIEW',
  title = 'See Call Info in Action',
  subtitle = 'Experience the live telecalling dashboard, lead management pipelines, and employee performance analytics.',
  items = [],
}) {
  const [activeLightboxItem, setActiveLightboxItem] = useState(null);

  // Esc key listener to close lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveLightboxItem(null);
      }
    };

    if (activeLightboxItem) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeLightboxItem]);

  if (!items || items.length === 0) return null;

  return (
    <section className="product-showcase-section" id="product-preview">
      <div className="product-showcase-container">
        {/* Section Header */}
        <div className="product-showcase-header">
          {eyebrow && <span className="ref-section-eyebrow">{eyebrow}</span>}
          <h2 className="product-showcase-title">{title}</h2>
          {subtitle && <p className="product-showcase-subtext">{subtitle}</p>}
        </div>

        {/* 5 Alternating Zig-Zag Blocks */}
        <div className="product-showcase-blocks">
          {items.map((item, index) => {
            // Even index (0, 2, 4) -> Text on Left, Laptop on Right
            // Odd index (1, 3)     -> Laptop on Left, Text on Right
            const isReversed = index % 2 === 1;

            return (
              <div
                key={item.id || index}
                className={`showcase-block ${isReversed ? 'showcase-block--reversed' : ''}`}
              >
                {/* Text Content Column */}
                <motion.div
                  className="showcase-content-col"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Badge */}
                  {item.badge && (
                    <span
                      className={`showcase-badge badge--${item.badgeVariant || 'blue'}`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Heading */}
                  <h3 className="showcase-block-title">{item.title}</h3>

                  {/* Description */}
                  <p className="showcase-block-desc">{item.description}</p>

                  {/* 3 Checkmark Points */}
                  {item.points && item.points.length > 0 && (
                    <ul className="showcase-points-list">
                      {item.points.map((pt, i) => (
                        <li key={i} className="showcase-point-item">
                          <CheckCircle2 size={18} className="showcase-point-icon" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>

                {/* Laptop Mockup Column */}
                <div className="showcase-laptop-col">
                  <LaptopMockup
                    src={item.image}
                    alt={item.title}
                    floatingChip={item.floatingChip}
                    isReversed={isReversed}
                    onZoom={() => setActiveLightboxItem(item)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxItem && (
          <motion.div
            className="showcase-lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveLightboxItem(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeLightboxItem.title} Full View`}
          >
            <div
              className="showcase-lightbox-panel"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="showcase-lightbox-header">
                <div className="lightbox-title-wrap">
                  <span className="lightbox-badge">{activeLightboxItem.badge}</span>
                  <span className="lightbox-title">{activeLightboxItem.title}</span>
                </div>
                <button
                  type="button"
                  className="showcase-lightbox-close"
                  onClick={() => setActiveLightboxItem(null)}
                  aria-label="Close Lightbox"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Image Frame */}
              <div className="showcase-lightbox-image-wrap">
                <motion.img
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.title}
                  className="showcase-lightbox-image"
                  initial={{ scale: 0.94, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.94, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              {/* Footer */}
              <div className="showcase-lightbox-footer">
                <span className="lightbox-desc">{activeLightboxItem.description}</span>
                <span className="lightbox-esc-hint">Press ESC or click outside to close</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ProductShowcaseSection;

