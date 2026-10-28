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

  const quickLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Industries', href: '#industries' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  const services = [
    'ERP Development',
    'CRM Solutions',
    'AI Solutions',
    'Web Development',
    'App Development',
    'Custom Software',
    'Cloud & DevOps',
    'Business Automation'
  ];

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
              <a href="#" className="mobile-nav-brand" onClick={(e) => handleLinkClick(e, '#')} aria-label="INFODRILL Home">
                <Logo size="md" />
              </a>

              <button
                type="button"
                className="mobile-nav-close"
                onClick={onClose}
                aria-label="Close navigation"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content Styled Directly After Website Footer Reference (Photo 2) */}
            <div className="mobile-nav-scroll-body">
              
              {/* Column 2: Quick Links */}
              <div className="drawer-nav-column">
                <h3 className="drawer-nav-header">QUICK LINKS</h3>
                <ul className="drawer-nav-list" role="list">
                  {quickLinks.map((item) => (
                    <li key={item.label} className="drawer-nav-item">
                      <a 
                        href={item.href} 
                        className="drawer-nav-link"
                        onClick={(e) => handleLinkClick(e, item.href)}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Services */}
              <div className="drawer-nav-column">
                <h3 className="drawer-nav-header">SERVICES</h3>
                <ul className="drawer-nav-list" role="list">
                  {services.map((service) => (
                    <li key={service} className="drawer-nav-item">
                      <a 
                        href="#services" 
                        className="drawer-nav-link"
                        onClick={(e) => handleLinkClick(e, '#services')}
                      >
                        {service}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 4: Contact Details */}
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

              {/* Primary Action Button */}
              <div className="drawer-cta-section">
                <a
                  href="#contact"
                  className="drawer-primary-btn"
                  onClick={(e) => handleLinkClick(e, '#contact')}
                >
                  <span>GET STARTED</span>
                  <ArrowRight size={16} />
                </a>
              </div>

              {/* Bottom Bar: Language Selector, Legal Links, Social Icons, Copyright */}
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