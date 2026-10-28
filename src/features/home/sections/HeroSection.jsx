import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, Star } from 'lucide-react';
import './HeroSection.css';

export function HeroSection() {
  const containerRef = useRef(null);

  // Scroll progress for the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Smooth physics spring for buttery scroll transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001
  });

  // Parallax & scale transforms driven by scroll progress
  // Phone mockup rises smoothly from lower position (peeking) to full center view
  const phoneY = useTransform(smoothProgress, [0, 0.45], [260, -30]);
  const phoneScale = useTransform(smoothProgress, [0, 0.45], [0.92, 1.04]);
  const phoneRotateX = useTransform(smoothProgress, [0, 0.45], [10, 0]);

  // Concentric decorative background arches scale and expand
  const ringsScale = useTransform(smoothProgress, [0, 0.5], [0.85, 1.25]);
  const ringsOpacity = useTransform(smoothProgress, [0, 0.35], [0.45, 1]);

  // Floating overlapping cards float at different parallax rates
  const artcCardY = useTransform(smoothProgress, [0, 0.45], [180, -35]);
  const artcCardRotate = useTransform(smoothProgress, [0, 0.45], [-12, -4]);

  const expensesCardY = useTransform(smoothProgress, [0, 0.45], [220, -15]);
  const expensesCardRotate = useTransform(smoothProgress, [0, 0.45], [10, 4]);

  const piggyY = useTransform(smoothProgress, [0, 0.45], [170, -30]);
  const piggyScale = useTransform(smoothProgress, [0, 0.45], [0.75, 1.06]);

  // Number of ticks for speedometer gauge
  const gaugeTicks = 16;

  return (
    <section className="hero-scroll-wrapper" ref={containerRef} id="hero">
      <div className="hero-sticky-stage">
        <div className="hero-container-card">
          
          {/* Header Content */}
          <div className="hero-header-content">
            {/* 1. Rating Pill: 4.9/5.0 TRUSTED BY WORLDWIDE */}
            <motion.div 
              className="hero-rating-pill"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="hero-stars-row" aria-label="5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <span className="hero-rating-text">4.9/5.0 TRUSTED BY WORLDWIDE</span>
            </motion.div>

            {/* 2. Bold Display Headline */}
            <motion.h1 
              className="hero-display-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="hero-title-line">BUILD &amp; GROWTH</span>
              <span className="hero-title-line">WITH SCALABLE TOOLS</span>
            </motion.h1>

            {/* 3. Subtitle */}
            <motion.p 
              className="hero-display-sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Easily adapt to changes and scale your operations with our flexible
              infrastructure, designed to support your business growth.
            </motion.p>

            {/* 4. Action Button: GET STARTED ↗ */}
            <motion.div 
              className="hero-actions-row"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a href="#contact" className="hero-pill-cta">
                <span className="hero-pill-cta__icon" aria-hidden="true">
                  <ArrowUpRight size={18} strokeWidth={2.8} />
                </span>
                <span>GET STARTED</span>
              </a>
            </motion.div>
          </div>

          {/* ====================================================================
              Interactive Scroll-Driven Visual Stage
              - Concentric Arcs expanding on scroll
              - Phone Mockup rising up with 80% Responses gauge
              - Floating Cards with multi-plane parallax and subtle ambient float
              ==================================================================== */}
          <div className="hero-visual-stage">
            
            {/* Concentric Decorative Circular Rings in Background */}
            <motion.div 
              className="hero-concentric-rings"
              style={{ scale: ringsScale, opacity: ringsOpacity }}
              aria-hidden="true"
            >
              <div className="ring-band ring-band--outer" />
              <div className="ring-band ring-band--middle" />
              <div className="ring-band ring-band--inner" />
            </motion.div>

            {/* Rising Smartphone Mockup with 3D Tilt & Scroll Elevation */}
            <motion.div 
              className="hero-phone-container"
              style={{
                y: phoneY,
                scale: phoneScale,
                rotateX: phoneRotateX,
                transformPerspective: 1000
              }}
            >
              {/* Phone Outer Case / Bezel */}
              <div className="hero-phone-body">
                {/* Status Bar / Dynamic Island */}
                <div className="phone-top-bar">
                  <span className="phone-clock-text">9:41</span>
                  <div className="phone-island-pill" />
                  <div className="phone-signal-icons">
                    <span className="bar-signal"><i/><i/><i/><i/></span>
                    <span className="wifi-glyph">
                      <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                        <path d="M1 3.5C4.5 0.5 9.5 0.5 13 3.5M3 6C5.5 3.8 8.5 3.8 11 6M5.5 8.5C6.5 7.6 7.5 7.6 8.5 8.5M7 10.5H7.01" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round"/>
                      </svg>
                    </span>
                    <span className="battery-glyph">
                      <span className="battery-level" />
                    </span>
                  </div>
                </div>

                {/* Sky Blue Phone Screen */}
                <div className="phone-screen-canvas">
                  {/* Semicircular Radial Gauge (Yellow Segments) */}
                  <div className="phone-gauge-container">
                    <div className="gauge-ticks-arc">
                      {[...Array(gaugeTicks)].map((_, i) => {
                        const angle = -180 + (i / (gaugeTicks - 1)) * 180;
                        const isActive = i < gaugeTicks * 0.8;
                        return (
                          <span 
                            key={i} 
                            className={`gauge-tick ${isActive ? 'gauge-tick--active' : 'gauge-tick--inactive'}`}
                            style={{
                              transform: `rotate(${angle}deg) translate(0, -56px)`
                            }}
                          />
                        );
                      })}
                    </div>

                    {/* Gauge Center Percentage & Label */}
                    <div className="gauge-center-content">
                      <span className="gauge-percentage-number">80%</span>
                      <span className="gauge-percentage-sub">Responses this month</span>
                    </div>
                  </div>

                  {/* Soft Background Wave behind lower cards */}
                  <div className="phone-inner-backdrop" />
                </div>
              </div>

              {/* ================================================================
                  Overlapping Floating Cards with Parallax & Ambient Idle Float
                  ================================================================ */}
              
              {/* Floating Card 1: Artc F... (Left) */}
              <motion.div 
                className="hero-float-card hero-float-card--artc animate-float"
                style={{ y: artcCardY, rotate: artcCardRotate }}
                whileHover={{ y: -8, scale: 1.05, transition: { duration: 0.2 } }}
              >
                <div className="artc-blue-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="9" fill="#0284C7" />
                    {[...Array(8)].map((_, i) => (
                      <line 
                        key={i} 
                        x1="10" 
                        y1="4" 
                        x2="10" 
                        y2="6.5" 
                        stroke="#FFFFFF" 
                        strokeWidth="1.8" 
                        strokeLinecap="round"
                        transform={`rotate(${i * 45} 10 10)`}
                      />
                    ))}
                    <circle cx="10" cy="10" r="2.2" fill="#FFFFFF" />
                  </svg>
                </div>
                <div className="artc-text-block">
                  <span className="artc-title">Artc F...</span>
                  <span className="artc-date">6/22/2...</span>
                </div>
              </motion.div>

              {/* Floating Card 2: Expenses 85% + Bar Chart (Center / Right) */}
              <motion.div 
                className="hero-float-card hero-float-card--expenses animate-float-reverse"
                style={{ y: expensesCardY, rotate: expensesCardRotate }}
                whileHover={{ y: -8, scale: 1.05, transition: { duration: 0.2 } }}
              >
                <div className="expenses-text-block">
                  <span className="expenses-tag">Expenses</span>
                  <span className="expenses-val">85%</span>
                </div>
                <div className="expenses-mini-bars">
                  <span className="mini-bar" style={{ height: '35%' }} />
                  <span className="mini-bar" style={{ height: '55%' }} />
                  <span className="mini-bar mini-bar--highlight" style={{ height: '85%' }} />
                  <span className="mini-bar" style={{ height: '60%' }} />
                  <span className="mini-bar mini-bar--highlight" style={{ height: '95%' }} />
                  <span className="mini-bar" style={{ height: '70%' }} />
                </div>
              </motion.div>

              {/* Floating Badge 3: Yellow Piggy Bank on Blue Circle (Right) */}
              <motion.div 
                className="hero-piggy-badge animate-float"
                style={{ y: piggyY, scale: piggyScale }}
                whileHover={{ scale: 1.15, rotate: 10, transition: { duration: 0.2 } }}
                aria-label="Savings badge"
              >
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                  <ellipse cx="16" cy="17" rx="11" ry="8.5" fill="#FFDE00" />
                  <rect x="25" y="14" width="3.5" height="5" rx="1.5" fill="#FACC15" />
                  <circle cx="27" cy="15.8" r="0.7" fill="#854D0E" />
                  <circle cx="27" cy="17.2" r="0.7" fill="#854D0E" />
                  <path d="M19 9.5L21.5 5.5C21.8 5 22.8 5.2 22.8 5.8L22.5 9.5" fill="#FACC15" />
                  <circle cx="21" cy="13.5" r="1.3" fill="#1E293B" />
                  <circle cx="21.4" cy="13.1" r="0.4" fill="#FFFFFF" />
                  <rect x="13.5" y="8.5" width="5" height="1.8" rx="0.9" fill="#CA8A04" />
                  <path d="M5.5 16C4 16 3.5 14.5 4.5 13.5C5.5 12.5 5.5 14 6 15" stroke="#EAB308" strokeWidth="1.5" strokeLinecap="round" />
                  <rect x="9" y="24" width="3.2" height="3" rx="1" fill="#CA8A04" />
                  <rect x="19" y="24" width="3.2" height="3" rx="1" fill="#CA8A04" />
                </svg>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;
