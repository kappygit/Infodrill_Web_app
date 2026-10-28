import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  X, 
  ArrowUpRight, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Sparkles, 
  Cpu, 
  Layers, 
  Smartphone, 
  Cloud, 
  Database,
  Building2,
  CheckCircle2,
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

  const phone = siteConfig?.contact?.phone || '+91 92135 32517';
  const email = siteConfig?.contact?.email || 'infodrillaisolutions@gmail.com';
  const address = siteConfig?.contact?.address || '307, Silver Radiance One, Thaltej, Ahmedabad, Gujarat – 380054';
  const hours = siteConfig?.contact?.hours || 'Mon - Sat, 9:30 AM - 7:00 PM IST';

  // Subtitles for core nav links
  const navSubtitles = {
    About: 'Senior engineers & bespoke enterprise solutions',
    Services: 'Custom ERP, CRM, AI & cloud systems',
    Industries: 'Manufacturing, retail, healthcare & more',
    Portfolio: '50+ verified production client case studies',
    Contact: 'Get in touch & receive a 24h custom proposal'
  };

  // Featured services icons mapping
  const featuredServices = [
    { title: 'AI Solutions', badge: 'AI', icon: Cpu, desc: 'Machine learning, predictive models & automated workflows' },
    { title: 'ERP Development', badge: 'Core', icon: Layers, desc: 'End-to-end manufacturing, inventory & supply chain ERP' },
    { title: 'CRM Solutions', badge: 'Growth', icon: Database, desc: 'Lead tracking, customer automation & sales pipelines' },
    { title: 'Mobile App Dev', badge: 'Mobile', icon: Smartphone, desc: 'High-performance native iOS & Android applications' },
    { title: 'Cloud & DevOps', badge: 'Cloud', icon: Cloud, desc: 'AWS/Azure migration, containerization & 24/7 uptime' },
    { title: 'Custom Software', badge: 'Custom', icon: Sparkles, desc: 'Bespoke architecture tailored to unique enterprise workflows' },
  ];

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
            {/* 1. Header: Logo + Close (Sticky) */}
            <div className="mobile-nav-header">
              <a href="#" className="mobile-nav-brand" onClick={(e) => handleLinkClick(e, '#')} aria-label="InfoDrill Home">
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

            {/* Scrollable Body Content */}
            <div className="mobile-nav-scroll-body">
              
              {/* 2. Main Navigation Links with Subtext */}
              <section className="mobile-nav-section">
                <span className="mobile-section-tag">MAIN NAVIGATION</span>
                <nav className="mobile-nav-links" aria-label="Main Navigation">
                  <ul role="list">
                    {navigation.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          className="mobile-nav-link"
                          onClick={(e) => handleLinkClick(e, item.href)}
                        >
                          <div className="mobile-nav-link__text">
                            <span className="mobile-nav-link__label">{item.label}</span>
                            <span className="mobile-nav-link__sub">{navSubtitles[item.label] || 'Explore section'}</span>
                          </div>
                          <span className="mobile-nav-link__arrow" aria-hidden="true">
                            <ArrowUpRight size={17} strokeWidth={2.4} />
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </section>

              {/* 3. Core Capabilities & Featured Solutions */}
              <section className="mobile-nav-section">
                <div className="mobile-section-head-row">
                  <span className="mobile-section-tag">CORE CAPABILITIES</span>
                  <a href="#services" className="mobile-section-see-all" onClick={(e) => handleLinkClick(e, '#services')}>
                    View All 12 →
                  </a>
                </div>
                <div className="mobile-services-grid">
                  {featuredServices.map((srv) => {
                    const IconComponent = srv.icon;
                    return (
                      <a 
                        key={srv.title} 
                        href="#services" 
                        className="mobile-service-pill"
                        onClick={(e) => handleLinkClick(e, '#services')}
                      >
                        <div className="mobile-service-pill__icon">
                          <IconComponent size={15} />
                        </div>
                        <div className="mobile-service-pill__info">
                          <div className="mobile-service-pill__top">
                            <strong className="mobile-service-pill__title">{srv.title}</strong>
                            <span className="mobile-service-pill__badge">{srv.badge}</span>
                          </div>
                          <p className="mobile-service-pill__desc">{srv.desc}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </section>

              {/* 4. Industries Empowered (Interactive Chip Cloud) */}
              <section className="mobile-nav-section">
                <span className="mobile-section-tag">INDUSTRIES EMPOWERED</span>
                <div className="mobile-chips-cloud">
                  {siteConfig.industries.map((ind) => (
                    <a
                      key={ind.name}
                      href="#industries"
                      className="mobile-chip-tag"
                      onClick={(e) => handleLinkClick(e, '#industries')}
                    >
                      <Building2 size={11} className="mobile-chip-icon" />
                      <span>{ind.name}</span>
                    </a>
                  ))}
                </div>
              </section>

              {/* 5. Company Track Record / Stats Strip */}
              <section className="mobile-nav-section">
                <span className="mobile-section-tag">ENTERPRISE TRACK RECORD</span>
                <div className="mobile-stats-row">
                  {siteConfig.stats.map((st) => (
                    <div key={st.label} className="mobile-stat-box">
                      <strong className="mobile-stat-val">{st.value}</strong>
                      <span className="mobile-stat-label">{st.label}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* 6. Primary Action CTA Button */}
              <div className="mobile-nav-cta-wrapper">
                <a
                  href="#contact"
                  className="mobile-nav-cta-btn"
                  onClick={(e) => handleLinkClick(e, '#contact')}
                >
                  <div className="mobile-nav-cta-btn__text">
                    <span>GET STARTED WITH INFODRILL</span>
                    <small>Get a custom plan within 24 hours</small>
                  </div>
                  <span className="mobile-nav-cta-btn__icon" aria-hidden="true">
                    <ArrowUpRight size={18} strokeWidth={2.8} />
                  </span>
                </a>
              </div>

              {/* 7. Direct Channels & Business Hours */}
              <section className="mobile-nav-section mobile-nav-section--contact">
                <div className="mobile-channels-card">
                  <span className="mobile-channels-title">DIRECT CHANNELS &amp; CONTACT</span>

                  <div className="mobile-channels-items">
                    <a href={`tel:${phone.replace(/\s+/g, '')}`} className="mobile-channel-row">
                      <div className="mobile-channel-row__icon">
                        <Phone size={14} />
                      </div>
                      <div className="mobile-channel-row__text">
                        <span className="mobile-channel-row__tag">PHONE</span>
                        <strong className="mobile-channel-row__val">{phone}</strong>
                      </div>
                    </a>

                    <a href={`mailto:${email}`} className="mobile-channel-row">
                      <div className="mobile-channel-row__icon">
                        <Mail size={14} />
                      </div>
                      <div className="mobile-channel-row__text">
                        <span className="mobile-channel-row__tag">EMAIL</span>
                        <strong className="mobile-channel-row__val">{email}</strong>
                      </div>
                    </a>

                    <div className="mobile-channel-row">
                      <div className="mobile-channel-row__icon">
                        <MapPin size={14} />
                      </div>
                      <div className="mobile-channel-row__text">
                        <span className="mobile-channel-row__tag">HEADQUARTERS</span>
                        <span className="mobile-channel-row__val mobile-channel-row__val--address">
                          {address}
                        </span>
                      </div>
                    </div>

                    <div className="mobile-channel-row">
                      <div className="mobile-channel-row__icon">
                        <Clock size={14} />
                      </div>
                      <div className="mobile-channel-row__text">
                        <span className="mobile-channel-row__tag">WORKING HOURS</span>
                        <span className="mobile-channel-row__val">{hours}</span>
                      </div>
                    </div>
                  </div>

                  {/* Guaranteed Response Pill */}
                  <div className="mobile-response-guarantee">
                    <span className="mobile-pulse-dot" aria-hidden="true" />
                    <span>Guaranteed response within 24 hours with a clear roadmap</span>
                  </div>
                </div>
              </section>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MobileNavigation;