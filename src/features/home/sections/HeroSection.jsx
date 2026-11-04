import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Star, Box, ShieldCheck, BarChart3, FileText, RefreshCw, TrendingUp, Truck } from 'lucide-react';
import PhoneScreenAnimation from '../components/PhoneScreenAnimation';
import './HeroSection.css';

export function HeroSection() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // 3D Flip state for each satellite card (interactive on click/tap & hover)
  const [flippedCards, setFlippedCards] = useState({
    inventory: false,
    secure: false,
    sales: false,
    orders: false
  });

  const toggleCardFlip = (key) => {
    setFlippedCards(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Typewriter effect phrases highlighting Infodrill's core value propositions
  const typewriterPhrases = [
    'handle the repetitive work',
    'automate routine workflows',
    'scale your operations',
    'run 24/7 customer support'
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState(typewriterPhrases[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = typewriterPhrases[phraseIndex];
    let timer;

    if (!isDeleting) {
      // Typing phase: type next character
      if (displayText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 75); // Natural typing speed
      } else {
        // Full phrase displayed: pause for reading (3.2s for easy reading)
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 3200);
      }
    } else {
      // Deleting phase: backspace character by character
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length - 1));
        }, 35); // Fast backspace
      } else {
        // Finished deleting: move to next phrase
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % typewriterPhrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex]);

  // Scroll progress for the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Smooth physics spring for buttery scroll transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 22,
    restDelta: 0.001
  });

  // Parallax & scale transforms driven by scroll progress across the entire hero scroll track
  // Phone mockup rises smoothly and tilts forward as you scroll
  const phoneY = useTransform(smoothProgress, [0, 0.85], [90, -40]);
  const phoneScale = useTransform(smoothProgress, [0, 0.85], [0.94, 1.05]);
  const phoneRotateX = useTransform(smoothProgress, [0, 0.85], [8, -2]);

  // Concentric decorative background arches scale and expand
  const ringsScale = useTransform(smoothProgress, [0, 0.85], [0.88, 1.25]);
  const ringsOpacity = useTransform(smoothProgress, [0, 0.45], [0.55, 1]);

  // Dynamic multi-axis scroll parallax for all 4 satellite cards
  // Card 1: Live Inventory (Top Left) - rises, glides outward-left, dynamic tilt & scale
  const inventoryCardY = useTransform(smoothProgress, [0, 0.85], [75, -65]);
  const inventoryCardX = useTransform(smoothProgress, [0, 0.85], [18, -26]);
  const inventoryCardRotate = useTransform(smoothProgress, [0, 0.85], [-6, 2]);
  const inventoryCardScale = useTransform(smoothProgress, [0, 0.85], [0.94, 1.04]);

  // Card 2: Sales Analytics (Top Right) - higher speed rising layer, outward-right glide & tilt
  const salesCardY = useTransform(smoothProgress, [0, 0.85], [90, -85]);
  const salesCardX = useTransform(smoothProgress, [0, 0.85], [-18, 28]);
  const salesCardRotate = useTransform(smoothProgress, [0, 0.85], [6, -3]);
  const salesCardScale = useTransform(smoothProgress, [0, 0.85], [0.93, 1.05]);

  // Card 3: Order Management (Bottom Right) - glides outward-right & upward
  const orderCardY = useTransform(smoothProgress, [0, 0.85], [65, -60]);
  const orderCardX = useTransform(smoothProgress, [0, 0.85], [-12, 22]);
  const orderCardRotate = useTransform(smoothProgress, [0, 0.85], [4, -3]);
  const orderCardScale = useTransform(smoothProgress, [0, 0.85], [0.95, 1.03]);

  // Card 4: Secure & Reliable (Bottom Left) - smooth floating elevation
  const secureCardY = useTransform(smoothProgress, [0, 0.85], [60, -50]);
  const secureCardX = useTransform(smoothProgress, [0, 0.85], [14, -22]);
  const secureCardRotate = useTransform(smoothProgress, [0, 0.85], [-3, 2]);
  const secureCardScale = useTransform(smoothProgress, [0, 0.85], [0.95, 1.03]);

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
              <span className="hero-title-line">WE AUTOMATE</span>
              <span className="hero-title-line">YOU GROW FASTER</span>
            </motion.h1>

            {/* 3. Subtitle with Dynamic Typewriter Animation & Reference Typography Accent */}
            <motion.p
              className="hero-display-sub"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              We build digital teammates that{' '}
              <span className="hero-typewriter-container">
                <span className="hero-editorial-accent">
                  {displayText}
                  <span className="hero-typewriter-cursor" aria-hidden="true" />
                </span>
              </span>{' '}
              so your team can focus on growth while AI runs customer support, and routine tasks 24/7.
            </motion.p>
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
              style={{
                scale: isMobile ? 1 : ringsScale,
                opacity: isMobile ? 0.75 : ringsOpacity
              }}
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
                y: isMobile ? 0 : phoneY,
                scale: isMobile ? 1 : phoneScale,
                rotateX: isMobile ? 0 : phoneRotateX,
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
                    <span className="bar-signal"><i /><i /><i /><i /></span>
                    <span className="wifi-glyph">
                      <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                        <path d="M1 3.5C4.5 0.5 9.5 0.5 13 3.5M3 6C5.5 3.8 8.5 3.8 11 6M5.5 8.5C6.5 7.6 7.5 7.6 8.5 8.5M7 10.5H7.01" stroke="#0F172A" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span className="battery-glyph">
                      <span className="battery-level" />
                    </span>
                  </div>
                </div>

                {/* Clean White Phone Screen Canvas */}
                <div className="phone-screen-canvas">
                  <PhoneScreenAnimation />
                </div>
              </div>
            </motion.div>

            {/* ================================================================
                Overlapping Floating Satellite Cards with 3D Flip & Parallax
                - Desktop: Orbiting satellites with 3D hover flip
                - Mobile: Clean, non-overlapping 2x2 deck below the phone with tap-to-flip
                ================================================================ */}
            <div className="hero-satellite-deck">

              {/* ==============================================================
                  Card 1: Live Inventory (3D Interactive Flip Card)
                  ============================================================== */}
              <motion.div
                className={`hero-satellite-card-wrapper hero-satellite-card-wrapper--inventory ${flippedCards.inventory ? 'is-flipped' : ''}`}
                style={{
                  y: isMobile ? 0 : inventoryCardY,
                  x: isMobile ? 0 : inventoryCardX,
                  rotate: isMobile ? 0 : inventoryCardRotate,
                  scale: isMobile ? 1 : inventoryCardScale
                }}
                whileHover={isMobile ? {} : { scale: 1.05, transition: { duration: 0.2 } }}
                onClick={() => toggleCardFlip('inventory')}
                title="Click or hover to 3D flip card"
              >
                <div className="hero-card-carrier hero-card-carrier--1">
                  <div className="hero-satellite-card-inner">
                    {/* Front Face */}
                    <div className="hero-satellite-card-face hero-satellite-card-front">
                      <div className="satellite-card-header">
                        <div className="satellite-header-left">
                          <div className="satellite-card-icon-badge satellite-card-icon-badge--blue">
                            <Box size={13} color="#FFFFFF" strokeWidth={2.4} />
                          </div>
                          <span className="satellite-card-title">Live Inventory</span>
                        </div>
                      </div>

                      <div className="satellite-metric-row">
                        <div className="satellite-metric-left">
                          <span className="satellite-large-number">1,280</span>
                          <span className="satellite-metric-sub">Total Items</span>
                        </div>
                        <span className="satellite-badge-pill satellite-badge-pill--green">↑ 5%</span>
                      </div>

                      <div className="satellite-progress-track">
                        <div className="satellite-progress-bar" style={{ width: '74%' }} />
                      </div>

                      <div className="satellite-breakdown-list">
                        <div className="satellite-breakdown-item">
                          <div className="satellite-breakdown-left">
                            <span className="satellite-dot dot--blue" />
                            <span className="satellite-breakdown-label">In Stock</span>
                          </div>
                          <span className="satellite-breakdown-val">1,024</span>
                        </div>
                        <div className="satellite-breakdown-item">
                          <div className="satellite-breakdown-left">
                            <span className="satellite-dot dot--yellow" />
                            <span className="satellite-breakdown-label">Low Stock</span>
                          </div>
                          <span className="satellite-breakdown-val">186</span>
                        </div>
                        <div className="satellite-breakdown-item">
                          <div className="satellite-breakdown-left">
                            <span className="satellite-dot dot--red" />
                            <span className="satellite-breakdown-label">Out of Stock</span>
                          </div>
                          <span className="satellite-breakdown-val">70</span>
                        </div>
                      </div>
                    </div>

                    {/* Back Face (3D Flip Side) */}
                    <div className="hero-satellite-card-face hero-satellite-card-back">
                      <div className="satellite-card-header">
                        <div className="satellite-header-left">
                          <div className="satellite-card-icon-badge satellite-card-icon-badge--cyan">
                            <RefreshCw size={12} color="#FFFFFF" strokeWidth={2.4} />
                          </div>
                          <span className="satellite-card-title">Warehouse Sync</span>
                        </div>
                      </div>

                      <div className="satellite-back-kpi-block">
                        <span className="satellite-back-kpi-val">99.4%</span>
                        <span className="satellite-back-kpi-sub">Fulfillment Accuracy</span>
                      </div>

                      <div className="satellite-breakdown-list satellite-breakdown-list--tight">
                        <div className="satellite-breakdown-item">
                          <div className="satellite-breakdown-left">
                            <span className="satellite-dot dot--green" />
                            <span className="satellite-breakdown-label">Central Hub A</span>
                          </div>
                          <span className="satellite-breakdown-val">840 SKUs</span>
                        </div>
                        <div className="satellite-breakdown-item">
                          <div className="satellite-breakdown-left">
                            <span className="satellite-dot dot--blue" />
                            <span className="satellite-breakdown-label">Regional Hub B</span>
                          </div>
                          <span className="satellite-breakdown-val">440 SKUs</span>
                        </div>
                      </div>

                      <div className="satellite-back-footer">
                        <span className="satellite-live-chip">● Restock in 2h</span>
                        <span className="satellite-time-tag">24ms</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ==============================================================
                  Card 2: Sales Analytics (3D Interactive Flip Card)
                  ============================================================== */}
              <motion.div
                className={`hero-satellite-card-wrapper hero-satellite-card-wrapper--sales ${flippedCards.sales ? 'is-flipped' : ''}`}
                style={{
                  y: isMobile ? 0 : salesCardY,
                  x: isMobile ? 0 : salesCardX,
                  rotate: isMobile ? 0 : salesCardRotate,
                  scale: isMobile ? 1 : salesCardScale
                }}
                whileHover={isMobile ? {} : { scale: 1.05, transition: { duration: 0.2 } }}
                onClick={() => toggleCardFlip('sales')}
                title="Click or hover to 3D flip card"
              >
                <div className="hero-card-carrier hero-card-carrier--2">
                  <div className="hero-satellite-card-inner">
                    {/* Front Face */}
                    <div className="hero-satellite-card-face hero-satellite-card-front">
                      <div className="satellite-card-header">
                        <div className="satellite-header-left">
                          <div className="satellite-card-icon-badge satellite-card-icon-badge--blue">
                            <BarChart3 size={13} color="#FFFFFF" strokeWidth={2.4} />
                          </div>
                          <span className="satellite-card-title">Sales Analytics</span>
                        </div>
                      </div>

                      <div className="satellite-metric-row">
                        <div className="satellite-metric-left">
                          <span className="satellite-large-number">₹2,48,000</span>
                          <span className="satellite-metric-sub">Total Revenue</span>
                        </div>
                        <span className="satellite-badge-pill satellite-badge-pill--green">↑ 12%</span>
                      </div>

                      {/* 7 Vertical Gradient Rising Bars */}
                      <div className="sales-bars-row" aria-label="Revenue growth chart">
                        {[22, 34, 48, 62, 76, 88, 100].map((h, i) => (
                          <span
                            key={i}
                            className="sales-gradient-bar"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Back Face */}
                    <div className="hero-satellite-card-face hero-satellite-card-back">
                      <div className="satellite-card-header">
                        <div className="satellite-header-left">
                          <div className="satellite-card-icon-badge satellite-card-icon-badge--indigo">
                            <TrendingUp size={12} color="#FFFFFF" strokeWidth={2.4} />
                          </div>
                          <span className="satellite-card-title">Revenue Insights</span>
                        </div>
                      </div>

                      <div className="satellite-back-kpi-block">
                        <span className="satellite-back-kpi-val">34.2%</span>
                        <span className="satellite-back-kpi-sub">Net Operating Margin</span>
                      </div>

                      <div className="satellite-breakdown-list satellite-breakdown-list--tight">
                        <div className="satellite-breakdown-item">
                          <div className="satellite-breakdown-left">
                            <span className="satellite-dot dot--green" />
                            <span className="satellite-breakdown-label">Enterprise ARR</span>
                          </div>
                          <span className="satellite-breakdown-val">68%</span>
                        </div>
                        <div className="satellite-breakdown-item">
                          <div className="satellite-breakdown-left">
                            <span className="satellite-dot dot--blue" />
                            <span className="satellite-breakdown-label">Wholesale Retail</span>
                          </div>
                          <span className="satellite-breakdown-val">32%</span>
                        </div>
                      </div>

                      <div className="satellite-back-footer">
                        <span className="satellite-live-chip">● Q3 Target: Met</span>
                        <span className="satellite-time-tag">+18.4%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ==============================================================
                  Card 3: Order Management (3D Interactive Flip Card)
                  ============================================================== */}
              <motion.div
                className={`hero-satellite-card-wrapper hero-satellite-card-wrapper--orders ${flippedCards.orders ? 'is-flipped' : ''}`}
                style={{
                  y: isMobile ? 0 : orderCardY,
                  x: isMobile ? 0 : orderCardX,
                  rotate: isMobile ? 0 : orderCardRotate,
                  scale: isMobile ? 1 : orderCardScale
                }}
                whileHover={isMobile ? {} : { scale: 1.05, transition: { duration: 0.2 } }}
                onClick={() => toggleCardFlip('orders')}
                title="Click or hover to 3D flip card"
              >
                <div className="hero-card-carrier hero-card-carrier--3">
                  <div className="hero-satellite-card-inner">
                    {/* Front Face */}
                    <div className="hero-satellite-card-face hero-satellite-card-front">
                      <div className="satellite-card-header">
                        <div className="satellite-header-left">
                          <div className="satellite-card-icon-badge satellite-card-icon-badge--blue">
                            <FileText size={13} color="#FFFFFF" strokeWidth={2.4} />
                          </div>
                          <span className="satellite-card-title">Order Management</span>
                        </div>
                      </div>

                      <div className="satellite-breakdown-list satellite-breakdown-list--orders">
                        <div className="satellite-breakdown-item">
                          <div className="satellite-breakdown-left">
                            <span className="satellite-dot dot--orange" />
                            <span className="satellite-breakdown-label">Processing</span>
                          </div>
                          <span className="satellite-breakdown-val">4</span>
                        </div>
                        <div className="satellite-breakdown-item">
                          <div className="satellite-breakdown-left">
                            <span className="satellite-dot dot--blue" />
                            <span className="satellite-breakdown-label">Shipped</span>
                          </div>
                          <span className="satellite-breakdown-val">12</span>
                        </div>
                        <div className="satellite-breakdown-item">
                          <div className="satellite-breakdown-left">
                            <span className="satellite-dot dot--green" />
                            <span className="satellite-breakdown-label">Delivered</span>
                          </div>
                          <span className="satellite-breakdown-val">96</span>
                        </div>
                        <div className="satellite-breakdown-item">
                          <div className="satellite-breakdown-left">
                            <span className="satellite-dot dot--red" />
                            <span className="satellite-breakdown-label">Cancelled</span>
                          </div>
                          <span className="satellite-breakdown-val">2</span>
                        </div>
                      </div>
                    </div>

                    {/* Back Face */}
                    <div className="hero-satellite-card-face hero-satellite-card-back">
                      <div className="satellite-card-header">
                        <div className="satellite-header-left">
                          <div className="satellite-card-icon-badge satellite-card-icon-badge--orange">
                            <Truck size={12} color="#FFFFFF" strokeWidth={2.4} />
                          </div>
                          <span className="satellite-card-title">Dispatch Logistics</span>
                        </div>
                      </div>

                      <div className="satellite-back-kpi-block">
                        <span className="satellite-back-kpi-val">&lt; 18 min</span>
                        <span className="satellite-back-kpi-sub">Avg Dispatch Speed</span>
                      </div>

                      <div className="satellite-breakdown-list satellite-breakdown-list--tight">
                        <div className="satellite-breakdown-item">
                          <div className="satellite-breakdown-left">
                            <span className="satellite-dot dot--green" />
                            <span className="satellite-breakdown-label">On-Time SLA</span>
                          </div>
                          <span className="satellite-breakdown-val">99.8%</span>
                        </div>
                        <div className="satellite-breakdown-item">
                          <div className="satellite-breakdown-left">
                            <span className="satellite-dot dot--cyan" />
                            <span className="satellite-breakdown-label">Return Rate</span>
                          </div>
                          <span className="satellite-breakdown-val">&lt; 0.4%</span>
                        </div>
                      </div>

                      <div className="satellite-back-footer">
                        <span className="satellite-live-chip">● Express Fleet</span>
                        <span className="satellite-time-tag">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ==============================================================
                  Card 4: Secure & Reliable (3D Interactive Flip Card)
                  ============================================================== */}
              <motion.div
                className={`hero-satellite-card-wrapper hero-satellite-card-wrapper--secure ${flippedCards.secure ? 'is-flipped' : ''}`}
                style={{
                  y: isMobile ? 0 : secureCardY,
                  x: isMobile ? 0 : secureCardX,
                  rotate: isMobile ? 0 : secureCardRotate,
                  scale: isMobile ? 1 : secureCardScale
                }}
                whileHover={isMobile ? {} : { scale: 1.05, transition: { duration: 0.2 } }}
                onClick={() => toggleCardFlip('secure')}
                title="Click or hover to 3D flip card"
              >
                <div className="hero-card-carrier hero-card-carrier--4">
                  <div className="hero-satellite-card-inner">
                    {/* Front Face */}
                    <div className="hero-satellite-card-face hero-satellite-card-front hero-satellite-card-face--secure">
                      {/* Desktop Compact Pill (Exact match to reference mockup) */}
                      <div className="secure-desktop-compact">
                        <div className="secure-icon-wrap">
                          <ShieldCheck size={20} color="#FFFFFF" strokeWidth={2.4} />
                        </div>
                        <div className="secure-text-block">
                          <span className="secure-title">Secure &amp; Reliable</span>
                          <span className="secure-sub">Your data, our priority</span>
                        </div>
                      </div>

                      {/* Mobile Full Card (Balanced 2x2 grid match) */}
                      <div className="secure-mobile-full">
                        <div className="satellite-card-header">
                          <div className="satellite-header-left">
                            <div className="satellite-card-icon-badge satellite-card-icon-badge--blue">
                              <ShieldCheck size={13} color="#FFFFFF" strokeWidth={2.4} />
                            </div>
                            <span className="satellite-card-title">Secure &amp; Reliable</span>
                          </div>
                        </div>

                        <div className="satellite-metric-row">
                          <div className="satellite-metric-left">
                            <span className="satellite-large-number">99.9%</span>
                            <span className="satellite-metric-sub">Uptime SLA</span>
                          </div>
                          <span className="satellite-badge-pill satellite-badge-pill--green">Verified</span>
                        </div>

                        <div className="satellite-progress-track">
                          <div className="satellite-progress-bar" style={{ width: '100%', background: 'linear-gradient(90deg, #10B981 0%, #3B82F6 100%)' }} />
                        </div>

                        <div className="satellite-breakdown-list">
                          <div className="satellite-breakdown-item">
                            <div className="satellite-breakdown-left">
                              <span className="satellite-dot dot--green" />
                              <span className="satellite-breakdown-label">256-Bit AES</span>
                            </div>
                            <span className="satellite-breakdown-val">Active</span>
                          </div>
                          <div className="satellite-breakdown-item">
                            <div className="satellite-breakdown-left">
                              <span className="satellite-dot dot--blue" />
                              <span className="satellite-breakdown-label">Cloud Backup</span>
                            </div>
                            <span className="satellite-breakdown-val">Hourly</span>
                          </div>
                          <div className="satellite-breakdown-item">
                            <div className="satellite-breakdown-left">
                              <span className="satellite-dot dot--cyan" />
                              <span className="satellite-breakdown-label">SOC-2 &amp; ISO</span>
                            </div>
                            <span className="satellite-breakdown-val">Passed</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Back Face */}
                    <div className="hero-satellite-card-face hero-satellite-card-back hero-satellite-card-face--secure">
                      {/* Desktop Compact Back */}
                      <div className="secure-desktop-compact">
                        <div className="secure-icon-wrap" style={{ background: '#4F46E5' }}>
                          <ShieldCheck size={20} color="#FFFFFF" strokeWidth={2.4} />
                        </div>
                        <div className="secure-text-block">
                          <span className="secure-title">Enterprise Shield</span>
                          <span className="secure-sub">256-Bit AES • SOC-2 • ISO 27001</span>
                        </div>
                      </div>

                      {/* Mobile Full Back */}
                      <div className="secure-mobile-full">
                        <div className="satellite-card-header">
                          <div className="satellite-header-left">
                            <div className="satellite-card-icon-badge satellite-card-icon-badge--indigo">
                              <ShieldCheck size={13} color="#FFFFFF" strokeWidth={2.4} />
                            </div>
                            <span className="satellite-card-title">Enterprise Shield</span>
                          </div>
                        </div>

                        <div className="satellite-back-kpi-block">
                          <span className="satellite-back-kpi-val">Tier-4</span>
                          <span className="satellite-back-kpi-sub">Data Center Redundancy</span>
                        </div>

                        <div className="satellite-breakdown-list satellite-breakdown-list--tight">
                          <div className="satellite-breakdown-item">
                            <div className="satellite-breakdown-left">
                              <span className="satellite-dot dot--green" />
                              <span className="satellite-breakdown-label">AES 256 GCM</span>
                            </div>
                            <span className="satellite-breakdown-val">At Rest</span>
                          </div>
                          <div className="satellite-breakdown-item">
                            <div className="satellite-breakdown-left">
                              <span className="satellite-dot dot--blue" />
                              <span className="satellite-breakdown-label">TLS 1.3 Strict</span>
                            </div>
                            <span className="satellite-breakdown-val">In Transit</span>
                          </div>
                        </div>

                        <div className="satellite-back-footer">
                          <span className="satellite-live-chip">● Audit Verified</span>
                          <span className="satellite-time-tag">SOC-2</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;
