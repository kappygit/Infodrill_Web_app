import React, { useEffect, useRef } from 'react';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { siteConfig } from '../../config/siteConfig';
import './MobileNavigation.css';

export function MobileNavigation({ isOpen, onClose, navigation }) {
  const drawerRef = useRef(null);

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

  if (!isOpen) return null;

  return (
    <div className="mobile-nav-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Mobile Navigation">
      <div className="mobile-nav-drawer" ref={drawerRef} onClick={(e) => e.stopPropagation()}>
        <div className="mobile-nav-header">
          <div className="mobile-nav-brand">
            <span className="mobile-nav-brand__name">{siteConfig.brand.name}</span>
            <span className="mobile-nav-brand__tag">MENU</span>
          </div>
          <button
            type="button"
            className="mobile-nav-close"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="mobile-nav-links">
          <ul role="list">
            {navigation.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="mobile-nav-link"
                  onClick={onClose}
                >
                  <span>{item.label}</span>
                  <ArrowRight size={16} className="mobile-nav-link__icon" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-nav-footer">
          <Button
            as="a"
            href="#contact"
            variant="primary"
            size="md"
            icon={Sparkles}
            onClick={onClose}
            style={{ width: '100%' }}
          >
            Request Enterprise Briefing
          </Button>
          <div className="mobile-nav-contact">
            <p className="mobile-nav-contact__label">Direct Inquiries</p>
            <a href={`mailto:${siteConfig.contact.email}`} className="mobile-nav-contact__email">
              {siteConfig.contact.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

