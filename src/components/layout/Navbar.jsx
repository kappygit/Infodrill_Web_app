import React, { useState, useEffect, useRef } from 'react';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useModal } from '../../context/ModalContext';
import { useRoute } from '../../context/RouteContext';
import { MobileNavigation } from './MobileNavigation';
import { MegaMenu } from './MegaMenu';
import { siteConfig } from '../../config/siteConfig';
import { Logo } from '../ui/Logo';
import { Menu, ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

export function Navbar() {
  const { isScrolled, scrollProgress } = useScrollPosition();
  const { openGetStartedModal } = useModal();
  const { navigate } = useRoute();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [activeSection, setActiveSection] = useState('');
  const [activeMegaCategory, setActiveMegaCategory] = useState(null);
  const megaMenuTimeoutRef = useRef(null);
  const navItemRefs = useRef({});

  const handleOpenMegaMenu = (categoryKey) => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
    }
    setActiveMegaCategory(categoryKey);
  };

  const handleCloseMegaMenu = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setActiveMegaCategory(null);
    }, 150); // 150ms close delay preventing flicker
  };

  // Close mega menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveMegaCategory(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = siteConfig.navigation; // About, Services, Industries, Portfolio, Contact

  // Section highlight observer as the user scrolls through page
  useEffect(() => {
    const handleActiveSection = () => {
      const sectionIds = ['about', 'services', 'industries', 'portfolio', 'contact'];
      const scrollOffset = window.scrollY + 140;

      if (window.scrollY < 300) {
        setActiveSection('');
        return;
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const section = document.getElementById(id);
        if (section) {
          const top = section.offsetTop;
          if (scrollOffset >= top) {
            setActiveSection(id);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleActiveSection, { passive: true });
    handleActiveSection();

    return () => window.removeEventListener('scroll', handleActiveSection);
  }, []);

  return (
    <>
      <header
        className={`site-navbar ${isScrolled ? 'site-navbar--scrolled' : 'site-navbar--top'}`}
        role="banner"
      >
        <div className="navbar-container">
          {/* Left: Brand Logo with Smooth Fluid Scale (Enlarged with Precision Crop) */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setActiveMegaCategory(null);
              navigate('/');
            }}
            className="navbar-logo"
            aria-label="INFODRILL AI SOLUTIONS Home"
          >
            <div className={`navbar-logo-wrap ${isScrolled ? 'navbar-logo-wrap--compact' : ''}`}>
              <Logo size="md" height={isScrolled ? 46 : 58} className="navbar-logo-img" />
            </div>
          </a>

          {/* Center: Dynamic Animated Floating Pill Navigation */}
          <nav className={`navbar-center-pill ${isScrolled ? 'navbar-center-pill--scrolled' : ''}`} aria-label="Main Navigation">
            <ul
              className="navbar-links"
              role="list"
              onMouseLeave={() => setHoveredLink(null)}
            >
              {navLinks.map((item) => {
                const itemKey = item.id || item.label.toLowerCase();
                const isActive = activeSection === item.href.replace('#', '');
                const isHovered = hoveredLink === item.label;
                const isPanelOpen = activeMegaCategory === itemKey;

                return (
                  <li
                    key={item.label}
                    className="navbar-links__item navbar-links__item--static"
                    onMouseEnter={() => {
                      setHoveredLink(item.label);
                      handleOpenMegaMenu(itemKey);
                    }}
                    onMouseLeave={() => {
                      handleCloseMegaMenu();
                    }}
                  >
                    <a
                      ref={(el) => {
                        if (el) navItemRefs.current[itemKey] = el;
                      }}
                      href={item.href}
                      onClick={(e) => {
                        if (item.href?.startsWith('#')) {
                          e.preventDefault();
                          setActiveMegaCategory(null);
                          navigate(item.href);
                        }
                      }}
                      className={`navbar-links__link ${isActive ? 'navbar-links__link--active' : ''} ${isPanelOpen ? 'navbar-links__link--expanded' : ''}`}
                    >
                      {/* Smooth Gliding Hover/Active Pill */}
                      <AnimatePresence>
                        {isHovered && !isPanelOpen && (
                          <motion.span
                            layoutId="navbar-hover-glow"
                            className="navbar-hover-pill-bg"
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.92 }}
                            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                            aria-hidden="true"
                          />
                        )}
                      </AnimatePresence>

                      {/* Active Section Subtle Indicator Dot */}
                      {isActive && !isHovered && !isPanelOpen && (
                        <motion.span
                          layoutId="navbar-active-dot"
                          className="navbar-active-indicator"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                          aria-hidden="true"
                        />
                      )}

                      <span className="navbar-links__label">{item.label}</span>

                      {/* Dropdown Chevron Icon Rotating 180° when open for ALL items */}
                      <ChevronDown
                        size={14}
                        className={`navbar-chevron ${isPanelOpen ? 'navbar-chevron--open' : ''}`}
                        aria-hidden="true"
                      />

                      {/* Purple underline for active nav item when open */}
                      {isPanelOpen && (
                        <motion.span
                          layoutId="navbar-purple-underline"
                          className="navbar-purple-underline"
                          initial={{ opacity: 0, scaleX: 0.6 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          aria-hidden="true"
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right: Black Rounded Pill CTA Button with Interactive Micro-Animations */}
          <div className="navbar-actions">
            <button
              type="button"
              onClick={openGetStartedModal}
              className={`navbar-cta-btn ${isScrolled ? 'navbar-cta-btn--compact' : ''}`}
              aria-label="Open Get Started lead form"
            >
              <span className="navbar-cta-shimmer" aria-hidden="true" />
              <span className="navbar-cta-text">Get    Started</span>
              <ArrowRight size={isScrolled ? 15 : 16} className="navbar-cta-arrow" />
            </button>
          </div>

          {/* Mobile Hamburger Menu Toggle (Image 3) */}
          <button
            type="button"
            className={`navbar-mobile-toggle ${isScrolled ? 'navbar-mobile-toggle--compact' : ''}`}
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu size={isScrolled ? 26 : 28} strokeWidth={2.3} />
          </button>
        </div>

        {/* Reusable Centered <MegaMenu /> Dropdown Panel for All Categories */}
        <MegaMenu
          isOpen={Boolean(activeMegaCategory)}
          activeCategory={activeMegaCategory || 'services'}
          isScrolled={isScrolled}
          activeNavRef={{ current: navItemRefs.current[activeMegaCategory] }}
          onClose={() => setActiveMegaCategory(null)}
          onMouseEnter={() => {
            if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
          }}
          onMouseLeave={handleCloseMegaMenu}
        />

        {/* Ambient Hairline Scroll Progress Bar along bottom edge */}
        <div className="navbar-progress-track" aria-hidden="true">
          <div
            className="navbar-progress-bar"

            style={{
              transform: `scaleX(${scrollProgress / 100})`,
              opacity: isScrolled ? 1 : 0
            }}
          />
        </div>
      </header>

      {/* Accessible Mobile Navigation Drawer */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navigation={navLinks}
      />
    </>
  );
}

export default Navbar;
