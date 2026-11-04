import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { megaMenuConfig } from './megaMenuConfig';
import { useModal } from '../../context/ModalContext';
import { useRoute } from '../../context/RouteContext';
import { Logo } from '../ui/Logo';
import './MegaMenu.css';

/**
 * Mascot Graphic for AI Agents
 */
function MascotBotGraphic() {
  return (
    <div className="megamenu-mascot-wrap" aria-hidden="true">
      <svg width="156" height="78" viewBox="0 0 160 80" fill="none" className="megamenu-mascot-svg">
        <defs>
          <linearGradient id="mascotGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <linearGradient id="chipDark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>

        {/* Floating Accent Bar */}
        <rect x="22" y="10" width="22" height="6" rx="3" fill="#C4B5FD" opacity="0.85" />

        {/* Floating Chip 1 */}
        <g className="mascot-chip-float">
          <rect x="42" y="16" width="26" height="24" rx="7" fill="url(#chipDark)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <rect x="47" y="21" width="8" height="5" rx="1.5" fill="#A78BFA" />
          <rect x="57" y="21" width="6" height="3" rx="1.5" fill="#E2E8F0" opacity="0.6" />
          <rect x="47" y="29" width="16" height="3" rx="1.5" fill="#94A3B8" opacity="0.7" />
        </g>

        {/* Bot Body & Rounded Head */}
        <g className="mascot-head">
          <line x1="110" y1="8" x2="110" y2="16" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="110" cy="7" r="3.5" fill="#F43F5E" />
          <rect x="86" y="16" width="48" height="42" rx="18" fill="#FFFFFF" stroke="#EDE9FE" strokeWidth="2" />
          <rect x="90" y="20" width="40" height="34" rx="15" fill="url(#mascotGrad)" />
          
          <circle cx="101" cy="36" r="4.5" fill="#FFFFFF" />
          <circle cx="102" cy="35" r="1.5" fill="#3B0764" />
          <circle cx="119" cy="36" r="4.5" fill="#FFFFFF" />
          <circle cx="120" cy="35" r="1.5" fill="#3B0764" />

          <path d="M106 43 Q 110 46, 114 43" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="96" cy="41" r="2.2" fill="#FB7185" opacity="0.8" />
          <circle cx="124" cy="41" r="2.2" fill="#FB7185" opacity="0.8" />
        </g>

        <circle cx="68" cy="56" r="7.5" fill="#F3E8FF" stroke="#DDD6FE" strokeWidth="1.5" />
        <circle cx="68" cy="56" r="3.5" fill="#7C3AED" />
      </svg>
    </div>
  );
}

/**
 * Universal Card Renderer for all 5 Menu Categories
 */
function MegaMenuCardRenderer({ card, onClose }) {
  const { openGetStartedModal } = useModal();
  const { navigate } = useRoute();
  const HeaderIcon = card.headerIcon;

  // Type 1: Links Card
  if (card.type === 'links') {
    return (
      <div className="megamenu-card flex flex-col justify-between">
        <div>
          {/* White rounded icon box at the top (purple icon) */}
          <div className="megamenu-icon-box megamenu-icon-box--white">
            <HeaderIcon size={20} className="text-purple-600" strokeWidth={2.2} />
          </div>

          {/* Bold heading with a small purple underline bar (Poppins font) */}
          <div className="megamenu-heading-wrap">
            <h3 className="megamenu-card-heading">{card.title}</h3>
            <div className="megamenu-heading-bar" aria-hidden="true" />
          </div>

          {/* Short gray description (2-3 lines) */}
          <p className="megamenu-card-desc">{card.description}</p>

          {/* List of links */}
          <div className="megamenu-links-list">
            {card.items.map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <a
                  key={idx}
                  href={item.href}
                  className="megamenu-link-row group"
                  onClick={onClose}
                >
                  <div className="megamenu-row-left">
                    <span className="megamenu-row-icon-box">
                      <ItemIcon size={14} strokeWidth={2} />
                    </span>
                    <span className="megamenu-row-text">{item.label}</span>
                  </div>
                  <ArrowRight size={14} className="megamenu-row-arrow" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Mascot Bot OR Pill Button OR "View More →" Link */}
        {card.hasMascot ? (
          <div className="megamenu-mascot-container">
            <MascotBotGraphic />
          </div>
        ) : card.buttonStyle === 'pill' ? (
          <div className="megamenu-view-more-pill-wrap">
            <a
              href={card.viewMoreHref}
              className="megamenu-view-more-pill-btn"
              onClick={onClose}
            >
              <span>{card.viewMoreText}</span>
              <ArrowRight size={14} className="megamenu-view-more-arrow" />
            </a>
          </div>
        ) : (
          <a
            href={card.viewMoreHref}
            className="megamenu-view-more text-purple-600"
            onClick={onClose}
          >
            <span>{card.viewMoreText}</span>
            <ArrowRight size={14} className="megamenu-view-more-arrow" />
          </a>
        )}
      </div>
    );
  }

  // Type 2: Preview Card (Image / Interactive Digital Preview)
  if (card.type === 'preview') {
    return (
      <div className="megamenu-card flex flex-col justify-between">
        <div>
          <div className="megamenu-icon-box megamenu-icon-box--white">
            <HeaderIcon size={20} className="text-purple-600" strokeWidth={2.2} />
          </div>

          <div className="megamenu-heading-wrap">
            <h3 className="megamenu-card-heading">{card.title}</h3>
            <div className="megamenu-heading-bar" aria-hidden="true" />
          </div>

          <p className="megamenu-card-desc">{card.description}</p>

          {/* Interactive Preview Block */}
          <a
            href={card.previewHref}
            className="megamenu-preview-box"
            onClick={onClose}
          >
            <div className="megamenu-preview-visual">
              <div className="preview-decor-pill">
                <span className="preview-dot dot--red" />
                <span className="preview-dot dot--yellow" />
                <span className="preview-dot dot--green" />
              </div>
              <div className="preview-visual-content">
                <span className="preview-badge-chip">{card.previewBadge}</span>
                <h4 className="preview-visual-title">{card.previewTitle}</h4>
              </div>
            </div>

            <div className="megamenu-preview-footer">
              <div className="preview-footer-left">
                <span className="preview-footer-title">{card.previewTitle}</span>
                <span className="preview-footer-sub">{card.previewSubtitle}</span>
              </div>
              <span className="preview-footer-circle-btn">
                <ArrowRight size={15} />
              </span>
            </div>
          </a>

          {/* Carousel Pagination Dots matching Reference Photo */}
          <div className="megamenu-preview-carousel-dots" aria-hidden="true">
            <span className="preview-carousel-dot preview-carousel-dot--active" />
            <span className="preview-carousel-dot" />
            <span className="preview-carousel-dot" />
          </div>
        </div>
      </div>
    );
  }

  // Type: Our Projects List (Portfolio Column 2)
  if (card.type === 'our-projects') {
    return (
      <div className="megamenu-card flex flex-col justify-between">
        <div>
          <div className="megamenu-icon-box megamenu-icon-box--white">
            <HeaderIcon size={20} className="text-purple-600" strokeWidth={2.2} />
          </div>

          <div className="megamenu-heading-wrap">
            <h3 className="megamenu-card-heading">{card.title}</h3>
            <div className="megamenu-heading-bar" aria-hidden="true" />
          </div>

          <p className="megamenu-card-desc">{card.description}</p>

          <div className="megamenu-projects-list">
            {card.projects.map((proj, idx) => {
              const ProjIcon = proj.icon;
              return (
                <a
                  key={idx}
                  href={proj.href}
                  className="megamenu-project-row group"
                  onClick={(e) => {
                    e.preventDefault();
                    onClose?.();
                    navigate(proj.href);
                  }}
                >
                  <div className="megamenu-project-row-left">
                    <span className="megamenu-project-icon-box">
                      <ProjIcon size={16} strokeWidth={2.2} />
                    </span>
                    <div className="megamenu-project-text">
                      <span className="megamenu-project-title">{proj.title}</span>
                      <p className="megamenu-project-summary">{proj.summary}</p>
                    </div>
                  </div>
                  <ArrowRight size={14} className="megamenu-project-arrow" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Type 3: Featured Project Card (Portfolio)
  if (card.type === 'featured-project') {
    return (
      <div className="megamenu-card flex flex-col justify-between">
        <div>
          <div className="megamenu-icon-box megamenu-icon-box--white">
            <HeaderIcon size={20} className="text-purple-600" strokeWidth={2.2} />
          </div>

          <div className="megamenu-heading-wrap">
            <h3 className="megamenu-card-heading">{card.title}</h3>
            <div className="megamenu-heading-bar" aria-hidden="true" />
          </div>

          <p className="megamenu-card-desc">{card.description}</p>

          <a
            href={card.projectHref}
            className="megamenu-project-card"
            onClick={onClose}
          >
            <div className="project-card-header">
              <span className="project-kpi-chip">Case Study</span>
              <h4 className="project-card-title">{card.projectTitle}</h4>
              <p className="project-card-desc">{card.projectDesc}</p>
            </div>

            <div className="project-card-tech-chips">
              {card.projectTech.map((tech, i) => (
                <span key={i} className="tech-badge">{tech}</span>
              ))}
            </div>

            <div className="project-card-action">
              <span>Explore Deployment</span>
              <span className="preview-footer-circle-btn">
                <ArrowRight size={15} />
              </span>
            </div>
          </a>
        </div>
      </div>
    );
  }

  // Type 4: Contact Details Card (Contact)
  if (card.type === 'contact-details') {
    return (
      <div className="megamenu-card flex flex-col justify-between">
        <div>
          <div className="megamenu-icon-box megamenu-icon-box--white">
            <HeaderIcon size={20} className="text-purple-600" strokeWidth={2.2} />
          </div>

          <div className="megamenu-heading-wrap">
            <h3 className="megamenu-card-heading">{card.title}</h3>
            <div className="megamenu-heading-bar" aria-hidden="true" />
          </div>

          <p className="megamenu-card-desc">{card.description}</p>

          <div className="megamenu-contact-items-list">
            <a href={`mailto:${card.email}`} className="contact-item-row" onClick={onClose}>
              <span className="contact-item-icon-box">
                <Mail size={15} />
              </span>
              <div className="contact-item-text-block">
                <span className="contact-item-label">Email Us</span>
                <span className="contact-item-val">{card.email}</span>
              </div>
            </a>

            <a href={`tel:${card.phone.replace(/\s+/g, '')}`} className="contact-item-row" onClick={onClose}>
              <span className="contact-item-icon-box">
                <Phone size={15} />
              </span>
              <div className="contact-item-text-block">
                <span className="contact-item-label">Direct Phone</span>
                <span className="contact-item-val">{card.phone}</span>
              </div>
            </a>

            <div className="contact-item-row">
              <span className="contact-item-icon-box">
                <MapPin size={15} />
              </span>
              <div className="contact-item-text-block">
                <span className="contact-item-label">Headquarters</span>
                <span className="contact-item-val">{card.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-card-footer">
          <span className="contact-pulse-dot" />
          <span className="contact-footer-text">Responding within 2 hours</span>
        </div>
      </div>
    );
  }

  // Type 5: Purple Gradient Box + White Quote Box (Matching Reference Photo 2)
  if (card.type === 'purple-quote') {
    return (
      <div className="megamenu-card-split flex flex-col justify-between">
        {/* Upper Purple Gradient Box */}
        <div className="megamenu-purple-gradient-box">
          <div className="purple-box-inner">
            <h4 className="purple-box-tagline">{card.purpleTagline}</h4>
            <p className="purple-box-subtext">{card.purpleSubtext}</p>
            {card.purpleButtonText === 'Get Started' ? (
              <button
                type="button"
                className="purple-box-cta-btn"
                onClick={(e) => {
                  e.preventDefault();
                  onClose?.();
                  openGetStartedModal();
                }}
                aria-label="Open Get Started lead form"
              >
                <span>{card.purpleButtonText}</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <a
                href={card.purpleButtonHref}
                className="purple-box-cta-btn"
                onClick={onClose}
              >
                <span>{card.purpleButtonText}</span>
                <ArrowRight size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Lower White Box with Quote and InfoDrill Logo */}
        <div className="megamenu-white-quote-box">
          <p className="white-box-quote">{card.quote}</p>
          <div className="white-box-footer">
            <div className="quote-brand-logo">
              <Logo size="sm" height={26} />
            </div>
            {card.quoteAuthor && (
              <span className="quote-author-tag">{card.quoteAuthor}</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

/**
 * Universal Reusable Centered <MegaMenu /> Component
 * Serves All 5 Categories: About, Services, Industries, Portfolio, Contact
 */
export function MegaMenu({
  isOpen = false,
  activeCategory = 'services',
  isScrolled = false,
  activeNavRef = null,
  onClose,
  onMouseEnter,
  onMouseLeave,
  isMobile = false
}) {
  const panelRef = useRef(null);
  const [notchLeft, setNotchLeft] = useState(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState('services');

  // Active Category Data from centralized config
  const currentCategoryData = megaMenuConfig[activeCategory] || megaMenuConfig.services;

  // Dynamic Notch calculation
  useEffect(() => {
    if (isOpen && activeNavRef?.current && panelRef.current) {
      const updateNotch = () => {
        if (!activeNavRef.current || !panelRef.current) return;
        const navRect = activeNavRef.current.getBoundingClientRect();
        const panelRect = panelRef.current.getBoundingClientRect();
        const navCenter = navRect.left + navRect.width / 2;
        const calculatedNotchLeft = navCenter - panelRect.left;
        setNotchLeft(calculatedNotchLeft);
      };

      updateNotch();
      const raf = requestAnimationFrame(updateNotch);
      window.addEventListener('resize', updateNotch);
      window.addEventListener('scroll', updateNotch, { passive: true });

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', updateNotch);
        window.removeEventListener('scroll', updateNotch);
      };
    }
  }, [isOpen, activeNavRef, isScrolled, activeCategory]);

  /* Mobile Accordion Mode */
  if (isMobile) {
    const categoriesList = Object.values(megaMenuConfig);

    return (
      <div className="megamenu-mobile-accordion">
        {categoriesList.map((cat) => {
          const isExpanded = mobileExpandedSection === cat.id;

          return (
            <div key={cat.id} className="megamenu-mobile-card">
              <button
                type="button"
                className="megamenu-mobile-card-trigger"
                onClick={() => setMobileExpandedSection(prev => prev === cat.id ? null : cat.id)}
                aria-expanded={isExpanded}
              >
                <span className="megamenu-mobile-title">{cat.label}</span>
                <ChevronDown
                  size={16}
                  className={`megamenu-mobile-chevron ${isExpanded ? 'megamenu-mobile-chevron--open' : ''}`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    className="megamenu-mobile-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="megamenu-mobile-cards-stack">
                      {cat.cards.map((card, idx) => (
                        <div key={idx} className="megamenu-mobile-single-card">
                          <MegaMenuCardRenderer card={card} onClose={onClose} />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    );
  }

  // Navbar bottom offset: 88px top, 72px scrolled
  const navbarBottomOffset = isScrolled ? 72 : 88;

  /* Desktop Fixed Centered Panel */
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-x-0 z-50 flex justify-center pointer-events-none megamenu-fixed-wrapper"
          style={{ top: `${navbarBottomOffset}px` }}
        >
          {/* Hitbox bridge: 12px padding connects directly to navbar with zero gap */}
          <div
            className="pointer-events-auto megamenu-hitbox-bridge"
            style={{ width: 'min(1200px, calc(100vw - 48px))', paddingTop: '12px' }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <motion.div
              ref={panelRef}
              className="megamenu-panel bg-white rounded-2xl shadow-xl relative"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              role="region"
              aria-label={`${currentCategoryData.label} Navigation Panel`}
            >
              {/* Dynamic Animated Pointing Notch */}
              {notchLeft !== null && (
                <motion.div
                  className="megamenu-notch"
                  animate={{ left: `${notchLeft}px` }}
                  transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                  aria-hidden="true"
                />
              )}

              {/* 3 Equal-Width Cards in Grid with smooth crossfade between categories */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  className="megamenu-grid grid grid-cols-3 gap-5"
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  {currentCategoryData.cards.map((card, idx) => (
                    <MegaMenuCardRenderer
                      key={`${activeCategory}-card-${idx}`}
                      card={card}
                      onClose={onClose}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default MegaMenu;
