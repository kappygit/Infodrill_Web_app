import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Globe,
  ChevronDown,
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  ShieldCheck
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { useModal } from '../../context/ModalContext';
import { Logo } from '../ui/Logo';
import { MegaMenu } from './MegaMenu';
import './MobileNavigation.css';

export function MobileNavigation({ isOpen, onClose }) {
  const { openGetStartedModal } = useModal();
  const drawerRef = useRef(null);
  // Default open accordion section is strictly 'portfolio' (Services is closed)
  const [openSection, setOpenSection] = useState('portfolio');

  // Ensure 'portfolio' is always open whenever the drawer opens
  useEffect(() => {
    if (isOpen) {
      setOpenSection('portfolio');
    }
  }, [isOpen]);

  const handleToggleSection = (sectionId) => {
    setOpenSection((prev) => (prev === sectionId ? null : sectionId));
  };

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

  const phone = siteConfig?.contact?.phone || '+91 92135 32517';
  const email = siteConfig?.contact?.email || 'infodrillaisolutions@gmail.com';
  const address = siteConfig?.contact?.address || '307, Silver Radiance One, Thaltej, Ahmedabad, Gujarat – 380054';
  const currentYear = new Date().getFullYear();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="mobile-nav-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
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
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header: Logo + Close */}
            <div className="mobile-nav-header">
              <a
                href="#"
                className="mobile-nav-brand"
                onClick={(e) => handleLinkClick(e, '#')}
                aria-label="INFODRILL Home"
              >
                <Logo size="md" light={false} height={42} />
              </a>

              <button
                type="button"
                className="mobile-nav-close"
                onClick={onClose}
                aria-label="Close navigation"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="mobile-nav-scroll-body">

              {/* Section 1: EXPLORE INFODRILL (Interactive Mega Menu Accordion - Portfolio Open by Default) */}
              <div className="drawer-nav-column">
                <h3 className="drawer-nav-header">EXPLORE INFODRILL</h3>
                <MegaMenu
                  isMobile={true}
                  isOpen={isOpen}
                  openSection={openSection}
                  onToggleSection={handleToggleSection}
                  onClose={onClose}
                />
              </div>

              {/* Section 4: CONTACT DETAILS */}
              <div className="drawer-nav-column drawer-contact-column">
                <h3 className="drawer-nav-header">CONTACT</h3>

                <div className="drawer-contact-items-wrap">
                  {/* Email */}
                  <div className="drawer-contact-row">
                    <Mail size={16} className="drawer-contact-icon" aria-hidden="true" />
                    <a href={`mailto:${email}`} className="drawer-contact-link">
                      {email}
                    </a>
                  </div>

                  {/* Phone */}
                  <div className="drawer-contact-row">
                    <Phone size={16} className="drawer-contact-icon" aria-hidden="true" />
                    <a href={`tel:${phone.replace(/\s+/g, '')}`} className="drawer-contact-link">
                      {phone}
                    </a>
                  </div>

                  {/* Address */}
                  <div className="drawer-contact-row drawer-contact-row--address">
                    <MapPin size={16} className="drawer-contact-icon" aria-hidden="true" />
                    <span className="drawer-address-text">
                      {address}
                    </span>
                  </div>

                  {/* Trust Badge */}
                  <div className="drawer-trust-badge">
                    <ShieldCheck size={16} className="drawer-trust-icon" aria-hidden="true" />
                    <span>Gujarat &amp; India IT Excellence</span>
                  </div>
                </div>
              </div>

              {/* Section 5: Primary Action Button */}
              <div className="drawer-cta-section">
                <button
                  type="button"
                  className="drawer-primary-btn"
                  onClick={() => {
                    onClose();
                    openGetStartedModal();
                  }}
                  aria-label="Open Get Started lead form"
                >
                  <span>GET STARTED</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Section 6: Bottom Bar (Language, Social Icons, Copyright) */}
              <div className="drawer-bottom-bar">

                {/* Language / Region */}
                <div className="drawer-lang-tag">
                  <Globe size={14} className="drawer-lang-icon" aria-hidden="true" />
                  <span>India (English)</span>
                  <ChevronDown size={13} aria-hidden="true" />
                </div>

                {/* Social Icons Cluster */}
                <div className="drawer-social-cluster" aria-label="Social media channels">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="drawer-social-btn" aria-label="Facebook">
                    <Facebook size={14} fill="currentColor" strokeWidth={0} />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="drawer-social-btn" aria-label="LinkedIn">
                    <Linkedin size={14} fill="currentColor" strokeWidth={0} />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="drawer-social-btn" aria-label="Twitter">
                    <Twitter size={14} fill="currentColor" strokeWidth={0} />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="drawer-social-btn" aria-label="Instagram">
                    <Instagram size={14} strokeWidth={2.2} />
                  </a>
                </div>

                {/* Copyright */}
                <div className="drawer-copyright-text">
                  <span>© {currentYear} INFODRILL AI SOLUTIONS. All rights reserved.</span>
                </div>

              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MobileNavigation;
