import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Logo } from '../ui/Logo';
import { 
  ArrowUpRight, 
  Globe, 
  ChevronDown, 
  Facebook, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Check, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck 
} from 'lucide-react';
import './Footer.css';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const footerRef = useRef(null);

  // Parallax slow scroll emergence
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 26,
    restDelta: 0.001
  });

  // Slow scroll upward glide for the dark card
  const cardY = useTransform(smoothProgress, [0, 1], [60, 0]);
  const cardScale = useTransform(smoothProgress, [0, 1], [0.97, 1]);
  const headerY = useTransform(smoothProgress, [0, 1], [40, 0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setIsSubscribed(false);
    }, 4000);
  };

  const quickLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Industries', href: '#industries' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' }
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

  return (
    <footer className="footer-sky-wrapper" ref={footerRef} role="contentinfo">
      <div className="footer-sky-inner">
        
        {/* Top CTA Row: Headline (Left) & Work Email Pill Input (Right) */}
        <motion.div 
          className="footer-top-cta-row"
          style={{ y: headerY }}
        >
          {/* Headline (Matching Reference Style) */}
          <h2 className="footer-cta-headline">
            GET IN TOUCH, LET US KNOW HOW WE CAN HELP
          </h2>

          {/* Email Subscription Form */}
          <div className="footer-email-block">
            <span className="footer-email-label">WORK EMAIL</span>
            
            <form className="footer-email-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder={isSubscribed ? "Thank you! We'll be in touch." : "you@company.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubscribed}
                className={`footer-email-input ${isSubscribed ? 'footer-email-input--success' : ''}`}
                required
              />
              <button 
                type="submit" 
                className="footer-email-submit-btn" 
                aria-label="Submit work email"
                disabled={isSubscribed}
              >
                {isSubscribed ? (
                  <Check size={18} strokeWidth={3} className="text-white" />
                ) : (
                  <ArrowUpRight size={18} strokeWidth={2.8} />
                )}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Big Rounded Dark Card with Parallax Slow Scroll */}
        <motion.div 
          className="footer-dark-card"
          style={{ y: cardY, scale: cardScale }}
        >
          {/* Subtle Top Divider */}
          <div className="footer-card-divider" />

          {/* Main Content Grid: Brand | Quick Links | Services | Contact */}
          <div className="footer-card-grid">
            
            {/* Column 1: Brand Info */}
            <div className="footer-brand-column">
              <a href="#hero" className="footer-brand-logo" aria-label="INFODRILL AI SOLUTIONS">
                <Logo size="lg" />
              </a>
              
              <p className="footer-brand-desc">
                Ahmedabad-based IT company building enterprise software that solves real operational problems for businesses across India.
              </p>

              {/* Status Pill */}
              <div className="footer-status-pill">
                <span className="status-dot" aria-hidden="true" />
                <span className="status-label">Engineering Systems: Active &amp; Online</span>
              </div>

              {/* Verified Ratings (Glassdoor, Google, Clutch) */}
              <div className="footer-ratings-card" aria-label="Verified client ratings on Glassdoor, Google, and Clutch">
                {/* Glassdoor Rating */}
                <a 
                  href="https://www.glassdoor.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-rating-item"
                  title="5.0 Star Rating on Glassdoor"
                >
                  <svg className="rating-star-icon" viewBox="0 0 24 24" fill="#F59E0B" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  <span className="rating-score">5.0</span>
                  <span className="rating-brand-glassdoor">glassdoor</span>
                </a>

                <div className="footer-rating-divider" aria-hidden="true" />

                {/* Google Rating */}
                <a 
                  href="https://www.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-rating-item"
                  title="4.7 Star Rating on Google"
                >
                  <svg className="rating-star-icon" viewBox="0 0 24 24" fill="#F59E0B" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  <span className="rating-score">4.7</span>
                  <span className="rating-brand-google">
                    <span style={{ color: '#4285F4' }}>G</span>
                    <span style={{ color: '#EA4335' }}>o</span>
                    <span style={{ color: '#FBBC05' }}>o</span>
                    <span style={{ color: '#4285F4' }}>g</span>
                    <span style={{ color: '#34A853' }}>l</span>
                    <span style={{ color: '#EA4335' }}>e</span>
                  </span>
                </a>

                <div className="footer-rating-divider" aria-hidden="true" />

                {/* Clutch Rating */}
                <a 
                  href="https://clutch.co" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-rating-item"
                  title="5.0 Star Rating on Clutch"
                >
                  <svg className="rating-star-icon" viewBox="0 0 24 24" fill="#F59E0B" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  <span className="rating-score">5.0</span>
                  <span className="rating-brand-clutch">
                    Clut<span className="clutch-c-wrap">c<span className="clutch-dot" aria-hidden="true" /></span>h
                  </span>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="footer-nav-column">
              <h3 className="footer-nav-header">Quick Links</h3>
              <ul className="footer-nav-list" role="list">
                {quickLinks.map((item) => (
                  <li key={item.label} className="footer-nav-item">
                    <a href={item.href} className="footer-nav-link">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services */}
            <div className="footer-nav-column">
              <h3 className="footer-nav-header">Services</h3>
              <ul className="footer-nav-list" role="list">
                {services.map((service) => (
                  <li key={service} className="footer-nav-item">
                    <a href="#services" className="footer-nav-link">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact Details */}
            <div className="footer-nav-column footer-contact-column">
              <h3 className="footer-nav-header">Contact</h3>
              
              <div className="footer-contact-items-wrap">
                {/* Email */}
                <div className="footer-contact-row">
                  <Mail size={16} className="contact-icon" aria-hidden="true" />
                  <a href="mailto:infodrillaisolutions@gmail.com" className="footer-contact-link">
                    infodrillaisolutions@gmail.com
                  </a>
                </div>

                {/* Phone */}
                <div className="footer-contact-row">
                  <Phone size={16} className="contact-icon" aria-hidden="true" />
                  <a href="tel:+919213532517" className="footer-contact-link">
                    +91 92135 32517
                  </a>
                </div>

                {/* Address */}
                <div className="footer-contact-row footer-contact-row--address">
                  <MapPin size={16} className="contact-icon" aria-hidden="true" />
                  <span className="footer-address-text">
                    307, Silver Radiance One, Thaltej, Ahmedabad, Gujarat – 380054
                  </span>
                </div>

                {/* Excellence Badge */}
                <div className="footer-trust-badge">
                  <ShieldCheck size={16} className="trust-icon" aria-hidden="true" />
                  <span>Gujarat &amp; India IT Excellence</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar: Language Selector, Copyright, Legal Links, Social Buttons */}
          <div className="footer-card-bottom-bar">
            
            {/* Language / Region Selector */}
            <div className="footer-lang-dropdown">
              <Globe size={15} className="lang-icon" aria-hidden="true" />
              <span className="lang-text">India (English)</span>
              <ChevronDown size={14} className="lang-arrow" aria-hidden="true" />
            </div>

            {/* Copyright & Legal Links */}
            <div className="footer-copyright-statement">
              <span>© {currentYear} INFODRILL AI SOLUTIONS. All rights reserved.</span>
              <div className="footer-legal-links">
                <a href="#contact" className="footer-legal-link">Privacy Policy</a>
                <span className="footer-legal-sep" aria-hidden="true">·</span>
                <a href="#contact" className="footer-legal-link">Terms of Service</a>
              </div>
            </div>

            {/* Social Icons Cluster */}
            <div className="footer-social-cluster" aria-label="Social media channels">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-pill-btn" aria-label="Facebook">
                <Facebook size={15} fill="currentColor" strokeWidth={0} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-pill-btn" aria-label="LinkedIn">
                <Linkedin size={15} fill="currentColor" strokeWidth={0} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-pill-btn" aria-label="Twitter">
                <Twitter size={15} fill="currentColor" strokeWidth={0} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-pill-btn" aria-label="Instagram">
                <Instagram size={15} strokeWidth={2.2} />
              </a>
            </div>

          </div>

        </motion.div>

      </div>
    </footer>
  );
}

export default Footer;
