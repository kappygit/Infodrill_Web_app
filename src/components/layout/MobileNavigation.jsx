import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowUpRight, Phone, Mail, MapPin } from 'lucide-react';
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
                <Logo size="md" />
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

            {/* Navigation Links — Clean Brand Typography without artificial index numbers */}
            <nav className="mobile-nav-links" aria-label="Main Navigation">
              <ul role="list">
                {navigation.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="mobile-nav-link"
                      onClick={(e) => handleLinkClick(e, item.href)}
                    >
                      <span className="mobile-nav-link__label">{item.label}</span>
                      <span className="mobile-nav-link__arrow" aria-hidden="true">
                        <ArrowUpRight size={17} strokeWidth={2.4} />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer Area with Signature Brand CTA & Direct Channels */}
            <div className="mobile-nav-footer">
              <a
                href="#contact"
                className="mobile-nav-cta-btn"
                onClick={(e) => handleLinkClick(e, '#contact')}
              >
                <span>GET STARTED</span>
                <span className="mobile-nav-cta-btn__icon" aria-hidden="true">
                  <ArrowUpRight size={16} strokeWidth={2.8} />
                </span>
              </a>

              {/* Direct Channels matching Home Section */}
              <div className="mobile-nav-channels">
                <span className="mobile-nav-channels__title">DIRECT CHANNELS</span>

                <div className="mobile-channels-list">
                  <a href={`tel:${phone.replace(/\s+/g, '')}`} className="mobile-channel-link">
                    <div className="mobile-channel-icon" aria-hidden="true">
                      <Phone size={13} />
                    </div>
                    <div className="mobile-channel-info">
                      <span className="mobile-channel-tag">PHONE</span>
                      <span className="mobile-channel-text">{phone}</span>
                    </div>
                  </a>

                  <a href={`mailto:${email}`} className="mobile-channel-link">
                    <div className="mobile-channel-icon" aria-hidden="true">
                      <Mail size={13} />
                    </div>
                    <div className="mobile-channel-info">
                      <span className="mobile-channel-tag">EMAIL</span>
                      <span className="mobile-channel-text">{email}</span>
                    </div>
                  </a>

                  <div className="mobile-channel-link">
                    <div className="mobile-channel-icon" aria-hidden="true">
                      <MapPin size={13} />
                    </div>
                    <div className="mobile-channel-info">
                      <span className="mobile-channel-tag">OFFICE</span>
                      <span className="mobile-channel-text">Thaltej, Ahmedabad, Gujarat</span>
                    </div>
                  </div>
                </div>

                <div className="mobile-nav-status">
                  <span className="mobile-status-dot" aria-hidden="true" />
                  <span>Guaranteed response within 24 hours</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
