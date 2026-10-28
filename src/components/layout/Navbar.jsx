import React, { useState } from 'react';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { MobileNavigation } from './MobileNavigation';
import { siteConfig } from '../../config/siteConfig';
import { Menu, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './Navbar.css';

export function Navbar() {
  const { isScrolled } = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = siteConfig.navigation; // About, Services, Industries, Portfolio, Contact

  return (
    <>
      <header className={`top-notch-header ${isScrolled ? 'top-notch-header--scrolled' : ''}`}>
        <motion.div 
          className="top-notch-bar"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Concave fillet left (reference inverted corner) */}
          <div className="notch-fillet notch-fillet--left" aria-hidden="true" />

          <div className="notch-content">
            {/* Logo Mark */}
            <a href="#" className="notch-logo" aria-label="INFODRILL AI SOLUTIONS Home">
              <svg width="28" height="22" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 2L10 22H15L9 2H4Z" fill="#FFDE00" />
                <path d="M12 2L18 22H23L17 2H12Z" fill="#FFDE00" />
                <path d="M20 2L26 22H31L25 2H20Z" fill="#FFDE00" opacity="0.9" />
              </svg>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="notch-nav" aria-label="Main Navigation">
              <ul className="notch-links" role="list">
                {navLinks.map((item) => (
                  <li key={item.label} className="notch-links__item">
                    <a href={item.href} className="notch-links__link">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Header Button: Get Started */}
            <a href="#contact" className="notch-cta-btn">
              <span>Get Started</span>
              <ArrowRight size={14} />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="notch-mobile-toggle"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={18} />
            </button>
          </div>

          {/* Concave fillet right (reference inverted corner) */}
          <div className="notch-fillet notch-fillet--right" aria-hidden="true" />
        </motion.div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navigation={navLinks}
      />
    </>
  );
}

export default Navbar;
