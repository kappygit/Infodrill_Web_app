import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowRight, Sparkles, Phone, Mail, MapPin } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { Logo } from '../ui/Logo';
import './MobileNavigation.css';

export function MobileNavigation({ isOpen, onClose, navigation }) {
  const drawerRef = useRef(null);

  // Close on Escape & handle Tab trap
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
        return;
      }

      if (e.key === 'Tab' && isOpen && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      const timer = setTimeout(() => {
        const closeBtn = drawerRef.current?.querySelector('.mobile-nav-close');
        closeBtn?.focus();
      }, 50);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  const handleLinkClick = (e, href) => {
    onClose();
    if (href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const brandName = siteConfig?.name || 'INFODRILL AI SOLUTIONS';
  const phone = siteConfig?.contact?.phone || '+91 92135 32517';
  const email = siteConfig?.contact?.email || 'infodrillaisolutions@gmail.com';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="mobile-nav-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <motion.div
            className="mobile-nav-drawer"
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header: Logo + Close */}
            <div className="mobile-nav-header">
              <div className="mobile-nav-brand">
                <Logo size="sm" />
              </div>

              <button
                type="button"
                className="mobile-nav-close"
                onClick={onClose}
                aria-label="Close navigation"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="mobile-nav-links" aria-label="Mobile Navigation List">
              <ul role="list">
                {navigation.map((item, index) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="mobile-nav-link"
                      onClick={(e) => handleLinkClick(e, item.href)}
                    >
                      <div className="mobile-nav-link__content">
                        <span className="mobile-nav-link__index">0{index + 1}</span>
                        <span className="mobile-nav-link__label">{item.label}</span>
                      </div>
                      <ArrowRight size={18} className="mobile-nav-link__arrow" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer Area with Quick Contact & CTA */}
            <div className="mobile-nav-footer">
              <a
                href="#contact"
                className="mobile-nav-cta-btn"
                onClick={(e) => handleLinkClick(e, '#contact')}
              >
                <Sparkles size={16} />
                <span>Get Started Now</span>
                <ArrowRight size={16} />
              </a>

              <div className="mobile-nav-quick-contacts">
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="mobile-quick-item">
                  <div className="mobile-quick-icon">
                    <Phone size={14} />
                  </div>
                  <div className="mobile-quick-text">
                    <span className="mobile-quick-label">Direct Phone</span>
                    <span className="mobile-quick-val">{phone}</span>
                  </div>
                </a>

                <a href={`mailto:${email}`} className="mobile-quick-item">
                  <div className="mobile-quick-icon">
                    <Mail size={14} />
                  </div>
                  <div className="mobile-quick-text">
                    <span className="mobile-quick-label">Direct Email</span>
                    <span className="mobile-quick-val">{email}</span>
                  </div>
                </a>

                <div className="mobile-quick-item mobile-quick-item--address">
                  <div className="mobile-quick-icon">
                    <MapPin size={14} />
                  </div>
                  <div className="mobile-quick-text">
                    <span className="mobile-quick-label">Headquarters</span>
                    <span className="mobile-quick-val">Thaltej, Ahmedabad, Gujarat</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
