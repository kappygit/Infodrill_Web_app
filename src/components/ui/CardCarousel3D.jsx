import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import './CardCarousel3D.css';

export const DEFAULT_HEALTHCARE_CARDS = [
  {
    id: 'hospitals',
    label: 'HOSPITALS & CLINICS',
    title: 'HMS & EHR',
    desc: 'Patient records, appointments, billing, digital EHR/EMR, and staff management in one secure platform.',
    bg: '#FDE6D6',
    btnBg: '#F97316',
    arcColor: '#FB923C'
  },
  {
    id: 'telemed',
    label: 'TELEMEDICINE & AI',
    title: 'VIRTUAL CARE',
    desc: 'Encrypted video consultations, AI-powered diagnostic insights, smart reports, and patient mobile apps.',
    bg: '#DBE8FD',
    btnBg: '#2563EB',
    arcColor: '#60A5FA'
  },
  {
    id: 'security',
    label: 'SECURITY & LAB SYNC',
    title: 'HIPAA & LABS',
    desc: 'Pathology analyzer connectivity, HL7/FHIR device bridges, and zero-compromise patient data privacy.',
    bg: '#F1E6FD',
    btnBg: '#9333EA',
    arcColor: '#C084FC'
  }
];

/**
 * CardCarousel3D Component
 * Pure CSS 3D transforms + Framer Motion spring physics.
 * Features:
 * - Auto-swap with animation immediately when user scrolls into view ("when user comes to this page")
 * - Continuous auto-swap with animated timer progress dot
 * - Subtle live breathing float on active card so it never looks static
 * - 3D depth, perspective, and tilt on mouse move
 * - Touch swipe & mouse drag with velocity threshold
 */
export function CardCarousel3D({
  cards = DEFAULT_HEALTHCARE_CARDS,
  onCardAction = () => {},
  autoPlayInterval = 3200
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlayKey, setAutoPlayKey] = useState(0);
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);
  const hasAutoSwappedOnView = useRef(false);
  const reducedMotion = useReducedMotion();

  // In-view observer: triggers when the section enters the viewport
  const isInView = useInView(containerRef, {
    amount: 0.3,
    once: false
  });

  // Reset arrival swap when leaving view so returning to section triggers it again
  useEffect(() => {
    if (!isInView) {
      hasAutoSwappedOnView.current = false;
    }
  }, [isInView]);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // When user scrolls to this page/section, automatically swap cards with animation!
  useEffect(() => {
    if (!isInView || isHoveringCard || isDragging || reducedMotion) return;

    // Automatic arrival swap: within 1s of entering view, perform the first swap to demonstrate dynamic 3D motion
    let arrivalSwapTimer;
    if (!hasAutoSwappedOnView.current) {
      arrivalSwapTimer = setTimeout(() => {
        hasAutoSwappedOnView.current = true;
        setActiveIndex((prev) => (prev + 1) % cards.length);
        setAutoPlayKey((k) => k + 1);
      }, 1000);
    }

    // Continuous auto-play cycle every interval
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length);
      setAutoPlayKey((k) => k + 1);
    }, autoPlayInterval);

    return () => {
      if (arrivalSwapTimer) clearTimeout(arrivalSwapTimer);
      clearInterval(interval);
    };
  }, [isInView, isHoveringCard, isDragging, reducedMotion, cards.length, autoPlayInterval]);

  // Navigate next / prev with key increment for progress bar reset
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
    setAutoPlayKey((k) => k + 1);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
    setAutoPlayKey((k) => k + 1);
  };

  const handleSelect = (idx) => {
    setActiveIndex(idx);
    setAutoPlayKey((k) => k + 1);
  };

  // Mouse move 3D tilt on active card (max 8deg)
  const handleActiveCardMouseMove = (e) => {
    if (reducedMotion || isMobile || isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const normX = (x - centerX) / centerX;
    const normY = (y - centerY) / centerY;

    setTilt({
      x: -normY * 8, // max 8 deg tilt on X
      y: normX * 8   // max 8 deg tilt on Y
    });
  };

  const handleActiveCardMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHoveringCard(false);
  };

  // Drag / Swipe handling with velocity check
  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (e, info) => {
    setIsDragging(false);
    const threshold = 40;
    const velocityThreshold = 350;

    if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      handleNext();
    } else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      handlePrev();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="carousel-3d-root"
      aria-roledescription="carousel"
      aria-label="Smart, Secure Healthcare 3D Carousel"
    >
      {/* 3D Perspective Stage: perspective 1200px and preserve-3d */}
      <div className="carousel-3d-stage">
        {cards.map((card, index) => {
          // Compute relative cyclic offset (-1, 0, 1)
          let offset = (index - activeIndex) % cards.length;
          if (offset < -1) offset += cards.length;
          if (offset > 1) offset -= cards.length;

          const isActive = offset === 0;
          const isLeft = offset === -1;
          const isRight = offset === 1;

          // Desktop vs Mobile spacing
          const translateX = isMobile
            ? offset * 170
            : offset * 250;

          // 3D parameters:
          // Active: scale 1, rotateY tilt.y, translateZ 0, opacity 1, zIndex 30
          // Side: scale 0.84, rotateY +/-36deg, translateZ -175px, opacity 0.55, blur(1.5px)
          const rotateYVal = reducedMotion
            ? 0
            : isActive
              ? tilt.y
              : isRight
                ? -36
                : 36;

          const rotateXVal = reducedMotion
            ? 0
            : isActive
              ? tilt.x
              : 0;

          const translateZVal = reducedMotion
            ? 0
            : isActive
              ? 0
              : -175;

          const scaleVal = isActive ? 1 : 0.84;
          const opacityVal = isActive ? 1 : (isMobile ? 0.35 : 0.55);
          const filterVal = reducedMotion || isActive ? 'blur(0px)' : 'blur(1.5px)';
          const zIndexVal = isActive ? 30 : 10;

          // Dynamic shadow on active card
          const dynamicShadow = isActive
            ? `${-tilt.y * 2.2}px ${tilt.x * 2.2 + 22}px 50px -10px rgba(15, 23, 42, 0.16)`
            : '0 10px 30px -10px rgba(0, 0, 0, 0.05)';

          // Subtle resting float keyframe on active card so it's visibly alive
          const floatY = (isActive && !tilt.x && !tilt.y && !isDragging)
            ? [0, -6, 0]
            : 0;

          return (
            <motion.div
              key={card.id}
              className={`carousel-3d-card-wrapper ${isActive ? 'carousel-card--active' : 'carousel-card--side'}`}
              style={{
                zIndex: zIndexVal,
                backgroundColor: card.bg,
                boxShadow: dynamicShadow,
                filter: filterVal
              }}
              initial={{ scale: 0.75, opacity: 0, x: 0 }}
              animate={{
                x: translateX,
                scale: scaleVal,
                opacity: opacityVal,
                rotateY: rotateYVal,
                rotateX: rotateXVal,
                z: translateZVal,
                y: floatY
              }}
              transition={{
                x: { type: 'spring', stiffness: 100, damping: 16, mass: 0.85 },
                scale: { type: 'spring', stiffness: 100, damping: 16 },
                rotateY: { type: 'spring', stiffness: 100, damping: 16 },
                rotateX: { type: 'spring', stiffness: 100, damping: 16 },
                z: { type: 'spring', stiffness: 100, damping: 16 },
                opacity: { duration: 0.3 },
                filter: { duration: 0.3 },
                y: (isActive && !tilt.x && !tilt.y && !isDragging)
                  ? { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
                  : { duration: 0.25 }
              }}
              onClick={() => {
                if (!isActive) {
                  handleSelect(index);
                } else {
                  onCardAction(card);
                }
              }}
              onMouseEnter={isActive ? () => setIsHoveringCard(true) : undefined}
              onMouseMove={isActive ? handleActiveCardMouseMove : undefined}
              onMouseLeave={isActive ? handleActiveCardMouseLeave : undefined}
              drag={isActive ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragStart={isActive ? handleDragStart : undefined}
              onDragEnd={isActive ? handleDragEnd : undefined}
              tabIndex={0}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${cards.length}: ${card.title}`}
              aria-hidden={!isActive}
            >
              {/* Decorative Concentric Arcs in Top-Left */}
              <svg
                className="carousel-card-arc"
                viewBox="0 0 320 320"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="-10" cy="-10" r="145" stroke={card.arcColor} strokeWidth="38" strokeOpacity="0.45" />
                <circle cx="-10" cy="-10" r="225" stroke={card.arcColor} strokeWidth="38" strokeOpacity="0.32" />
              </svg>

              {/* Card Header: Small Uppercase Label + Circular Arrow Button */}
              <div className="carousel-card-header">
                <span className="carousel-card-label">{card.label}</span>
                <button
                  type="button"
                  style={{ backgroundColor: card.btnBg }}
                  className="carousel-card-arrow-btn group"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCardAction(card);
                  }}
                  aria-label={`Learn more about ${card.title}`}
                >
                  <ArrowUpRight 
                    size={20} 
                    strokeWidth={2.4} 
                    className="carousel-arrow-icon"
                  />
                </button>
              </div>

              {/* Card Footer: Condensed Bold Title + Description */}
              <div className="carousel-card-footer">
                <h3 className="carousel-card-title">{card.title}</h3>
                <p className="carousel-card-desc">{card.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Controls: Chevrons & Animated Progress Dots */}
      <div className="carousel-controls-bar">
        <button
          type="button"
          onClick={handlePrev}
          className="carousel-nav-btn carousel-nav-btn--prev"
          aria-label="Previous card"
        >
          <ChevronLeft size={18} strokeWidth={2.4} />
        </button>

        {/* Dot Indicators with animated auto-swap progress fill */}
        <div className="carousel-dots-list" role="tablist" aria-label="Slide indicators">
          {cards.map((card, idx) => {
            const isDotActive = idx === activeIndex;
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => handleSelect(idx)}
                className={`carousel-dot ${isDotActive ? 'carousel-dot--active' : ''}`}
                aria-label={`Go to slide ${idx + 1}: ${card.title}`}
                aria-selected={isDotActive}
                role="tab"
              >
                {isDotActive && !isHoveringCard && !isDragging && isInView && !reducedMotion && (
                  <motion.span
                    key={`dot-fill-${idx}-${autoPlayKey}`}
                    className="carousel-dot-fill"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: autoPlayInterval / 1000,
                      ease: 'linear'
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="carousel-nav-btn carousel-nav-btn--next"
          aria-label="Next card"
        >
          <ChevronRight size={18} strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
}

export default CardCarousel3D;
