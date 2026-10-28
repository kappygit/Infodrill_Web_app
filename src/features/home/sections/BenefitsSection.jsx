import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import './BenefitsSection.css';

export function BenefitsSection() {
  const [activeCard, setActiveCard] = useState(0); // Default spotlight on Finance
  const sectionRef = useRef(null);

  // Scroll-driven parallax for the fanned cards
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.001
  });

  // Dynamic fanning rotation & vertical slide-in driven by scroll
  const card1Rotate = useTransform(smoothProgress, [0, 1], [14, -6]);
  const card1Y = useTransform(smoothProgress, [0, 1], [160, 0]);
  const card1Opacity = useTransform(smoothProgress, [0, 0.4], [0.3, 1]);

  const card2Rotate = useTransform(smoothProgress, [0, 1], [20, -1]);
  const card2Y = useTransform(smoothProgress, [0, 1], [220, 0]);
  const card2Opacity = useTransform(smoothProgress, [0, 0.6], [0.2, 1]);

  const card3Rotate = useTransform(smoothProgress, [0, 1], [26, 5]);
  const card3Y = useTransform(smoothProgress, [0, 1], [280, 0]);
  const card3Opacity = useTransform(smoothProgress, [0, 0.8], [0.1, 1]);

  return (
    <section className="benefits-section" id="benefits" ref={sectionRef}>
      <div className="benefits-container">
        
        {/* Left Column: Eyebrow, Display Headline, Copy, Checklist, CTA */}
        <div className="benefits-content">
          <motion.span 
            className="ref-section-eyebrow"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            BENEFITS
          </motion.span>

          <motion.h2 
            className="benefits-headline"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>MAKE PAYMENT</span>
            <span>EASY, SIMPLIFY</span>
            <span className="benefits-headline--blue">YOUR FINANCE</span>
          </motion.h2>

          <motion.p 
            className="benefits-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Consolidate banking, expense automation, and high-velocity workflows 
            into a unified digital layer. Built to give modern businesses unmatched clarity, 
            instant settlements, and automated financial governance.
          </motion.p>

          <motion.div 
            className="benefits-bullets"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="benefit-bullet-item">
              <CheckCircle2 size={18} className="bullet-check" />
              <span>Real-time multi-account treasury reconciliation</span>
            </div>
            <div className="benefit-bullet-item">
              <CheckCircle2 size={18} className="bullet-check" />
              <span>Direct ERP &amp; API integration without custom middleware</span>
            </div>
            <div className="benefit-bullet-item">
              <CheckCircle2 size={18} className="bullet-check" />
              <span>Instant cross-border payment routing with sub-second finality</span>
            </div>
          </motion.div>

          <motion.div 
            className="benefits-cta-wrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a href="#pricing" className="benefits-pill-cta">
              <span className="benefits-pill-cta__icon" aria-hidden="true">
                <ArrowUpRight size={18} strokeWidth={2.8} />
              </span>
              <span>EXPLORE PLANS</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Fanned Cards with Scroll-Driven Parallax Tilt */}
        <div className="benefits-fanned-stage">
          
          {/* Card 1: FINANCE (Peach #FEEAE0) */}
          <motion.div 
            className={`fanned-card fanned-card--finance ${activeCard === 0 ? 'fanned-card--active' : ''}`}
            style={{
              y: card1Y,
              rotate: card1Rotate,
              opacity: card1Opacity
            }}
            whileHover={{ y: -14, rotate: -8, zIndex: 12, scale: 1.02 }}
            onClick={() => setActiveCard(0)}
          >
            <div className="fanned-card__inner">
              <div className="fanned-card__text-content">
                <h3 className="fanned-card__title">FINANCE</h3>
                <p className="fanned-card__subtitle">
                  Budgeting and expense tracking, all in one place.
                </p>
              </div>

              {/* Hand-Drawn Character with Shopping Cart & Phone */}
              <div className="fanned-card__illustration fanned-card__illustration--finance" aria-hidden="true">
                <svg width="220" height="190" viewBox="0 0 220 190" fill="none">
                  <path 
                    d="M 30 190 C 40 100 130 50 220 70 L 220 190 Z" 
                    fill="#FED7AA" 
                    fillOpacity="0.45" 
                  />
                  <circle cx="178" cy="54" r="18" fill="#FFFFFF" stroke="#EA580C" strokeWidth="2.5" />
                  <path d="M170 54L175 59L187 47" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                  <g className="cart-group">
                    <path 
                      d="M 125 105 L 185 105 L 175 145 L 132 145 Z" 
                      fill="#FFEDD5" 
                      stroke="#EA580C" 
                      strokeWidth="2.5" 
                    />
                    <path d="M 140 105 L 143 145" stroke="#EA580C" strokeWidth="1.8" />
                    <path d="M 155 105 L 155 145" stroke="#EA580C" strokeWidth="1.8" />
                    <path d="M 170 105 L 167 145" stroke="#EA580C" strokeWidth="1.8" />
                    <path d="M 129 125 L 180 125" stroke="#EA580C" strokeWidth="1.8" />
                    
                    <rect x="135" y="92" width="22" height="16" rx="2" fill="#F97316" stroke="#1E293B" strokeWidth="1.8" />
                    <rect x="154" y="85" width="20" height="23" rx="2" fill="#FB923C" stroke="#1E293B" strokeWidth="1.8" />

                    <path d="M 125 105 L 118 95" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 132 145 L 128 162 M 175 145 L 178 162" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="128" cy="164" r="5" fill="#1E293B" />
                    <circle cx="178" cy="164" r="5" fill="#1E293B" />
                  </g>

                  <g className="person-group">
                    <ellipse cx="106" cy="58" rx="23" ry="24" fill="#1E293B" />
                    <circle cx="90" cy="52" r="10" fill="#1E293B" />
                    <circle cx="94" cy="40" r="11" fill="#1E293B" />
                    <circle cx="108" cy="34" r="12" fill="#1E293B" />
                    <circle cx="122" cy="40" r="11" fill="#1E293B" />
                    <circle cx="125" cy="52" r="10" fill="#1E293B" />

                    <ellipse cx="107" cy="62" rx="14" ry="16" fill="#FED7AA" stroke="#1E293B" strokeWidth="2" />
                    <path d="M 94 56 C 98 52 116 52 120 56" stroke="#EA580C" strokeWidth="6" strokeLinecap="round" />
                    <circle cx="102" cy="60" r="1.5" fill="#1E293B" />
                    <circle cx="112" cy="60" r="1.5" fill="#1E293B" />
                    <path d="M 103 67 C 105 70 110 70 112 67" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />

                    <path d="M 103 77 L 103 84 M 111 77 L 111 84" stroke="#1E293B" strokeWidth="2" />
                    <path 
                      d="M 88 120 L 98 84 L 120 84 L 132 120 Z" 
                      fill="#FFFFFF" 
                      stroke="#1E293B" 
                      strokeWidth="2.2" 
                    />

                    <path d="M 120 88 L 136 102 L 122 108" stroke="#FED7AA" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 120 88 L 136 102 L 122 108" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                    <path d="M 98 88 L 84 105 L 80 88" stroke="#FED7AA" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 98 88 L 84 105 L 80 88" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                    <rect x="69" y="72" width="16" height="26" rx="3.5" fill="#1E293B" />
                    <rect x="71" y="74" width="12" height="20" rx="2" fill="#FFFFFF" />
                    <circle cx="77" cy="84" r="3.5" fill="#EA580C" />
                    <path d="M 75 84 L 76.5 85.5 L 79 82.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
                  </g>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Card 2: INVESTMENT (Sky Blue #E0F2FE) */}
          <motion.div 
            className={`fanned-card fanned-card--investment ${activeCard === 1 ? 'fanned-card--active' : ''}`}
            style={{
              y: card2Y,
              rotate: card2Rotate,
              opacity: card2Opacity
            }}
            whileHover={{ y: -14, rotate: -3, zIndex: 12, scale: 1.02 }}
            onClick={() => setActiveCard(1)}
          >
            <div className="fanned-card__inner">
              <div className="fanned-card__text-content">
                <h3 className="fanned-card__title">INVESTMENT</h3>
                <p className="fanned-card__subtitle">
                  Stocks, bonds and funds. Automated liquidity balancing and yield forecasting.
                </p>
              </div>

              <div className="fanned-card__illustration fanned-card__illustration--investment" aria-hidden="true">
                <svg width="150" height="120" viewBox="0 0 150 120" fill="none">
                  <rect x="25" y="20" width="85" height="48" rx="8" fill="#38BDF8" fillOpacity="0.45" stroke="#0284C7" strokeWidth="2" transform="rotate(-8 65 45)"/>
                  <circle cx="65" cy="45" r="9" fill="#0284C7" fillOpacity="0.3" transform="rotate(-8 65 45)"/>
                  
                  <rect x="40" y="42" width="90" height="52" rx="8" fill="#0284C7" stroke="#0369A1" strokeWidth="2.5" transform="rotate(6 85 68)"/>
                  <circle cx="85" cy="68" r="11" fill="#E0F2FE" transform="rotate(6 85 68)"/>
                  <path d="M80 68H90M85 63V73" stroke="#0369A1" strokeWidth="2.5" strokeLinecap="round" transform="rotate(6 85 68)"/>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Card 3: DIGITAL TRANSFORMATION (Lavender #F3E8FF) */}
          <motion.div 
            className={`fanned-card fanned-card--transformation ${activeCard === 2 ? 'fanned-card--active' : ''}`}
            style={{
              y: card3Y,
              rotate: card3Rotate,
              opacity: card3Opacity
            }}
            whileHover={{ y: -14, rotate: 2, zIndex: 12, scale: 1.02 }}
            onClick={() => setActiveCard(2)}
          >
            <div className="fanned-card__inner">
              <div className="fanned-card__text-content">
                <h3 className="fanned-card__title">DIGITAL TRANSFORMATION</h3>
                <p className="fanned-card__subtitle">
                  Move the whole operation onto one platform and change how it runs.
                </p>
              </div>

              <div className="fanned-card__illustration fanned-card__illustration--transformation" aria-hidden="true">
                <svg width="220" height="150" viewBox="0 0 220 150" fill="none">
                  <rect x="95" y="15" width="90" height="135" rx="14" fill="#FFFFFF" stroke="#18181B" strokeWidth="3" />
                  <circle cx="140" cy="24" r="2.5" fill="#18181B" />
                  <rect x="130" y="29" width="20" height="2" rx="1" fill="#E4E4E7" />

                  <path d="M125 75C125 66.7157 131.716 60 140 60C148.284 60 155 66.7157 155 75V90H125V75Z" fill="#A855F7" />
                  <circle cx="140" cy="52" r="10" fill="#FED7AA" stroke="#18181B" strokeWidth="2" />
                  
                  <path d="M30 115C30 98 42 85 58 85C74 85 86 98 86 115V150H30V115Z" fill="#A855F7" />
                  <circle cx="58" cy="62" r="12" fill="#FED7AA" stroke="#18181B" strokeWidth="2" />
                  
                  <path d="M78 95L102 106C108 108 116 106 122 100L135 90" stroke="#18181B" strokeWidth="3" strokeLinecap="round" />
                  <path d="M96 98L112 108" stroke="#FED7AA" strokeWidth="6" strokeLinecap="round" />
                  <path d="M96 98L112 108" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" />

                  <circle cx="118" cy="135" r="5" fill="#A855F7" />
                  <circle cx="140" cy="135" r="5" fill="#A855F7" />
                  <circle cx="162" cy="135" r="5" fill="#EF4444" />
                </svg>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;
