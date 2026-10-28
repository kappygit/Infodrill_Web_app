import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Smartphone, Check, Lock, Fingerprint, ArrowUpRight } from 'lucide-react';
import './FeaturesBentoSection.css';

export function FeaturesBentoSection() {
  return (
    <section className="bento-section" id="features">
      <div className="bento-container">
        {/* Section Headline matching Reference Screenshot 4 */}
        <div className="bento-header">
          <motion.h2 
            className="bento-headline"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>EMPOWERING AND</span>
            <span><span className="text-orange">STRENGTHENING</span> YOUR</span>
            <span>FINANCIAL <span className="text-purple">SUCCESS</span></span>
          </motion.h2>
        </div>

        {/* Bento Grid layout with 4 distinctive cards */}
        <div className="bento-grid">
          {/* Card 1: INTUITIVE USER INTERFACE (Tall Peach Card on Left) */}
          <motion.div 
            className="bento-card bento-card--peach bento-card--tall"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <div className="bento-card__text-wrap">
              <h3 className="bento-card__title">INTUITIVE USER INTERFACE</h3>
              <p className="bento-card__desc">
                A clean, familiar layout that puts every action where you expect to find it.
              </p>
            </div>

            {/* Embedded Smartphone UI Mockup */}
            <div className="bento-phone-preview" aria-hidden="true">
              <div className="bento-orange-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>

              <div className="bento-phone-frame">
                <div className="bento-phone-screen">
                  <div className="mini-island" />
                  <div className="mini-gauge">
                    <svg viewBox="0 0 120 70" width="100" height="58">
                      <path
                        d="M 15 60 A 45 45 0 0 1 105 60"
                        stroke="#FFDE00"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray="4 6"
                        fill="none"
                      />
                    </svg>
                    <span className="mini-gauge-val">80%</span>
                    <span className="mini-gauge-sub">Responses this month</span>
                  </div>

                  <div className="mini-bank-card">
                    <div className="mini-bank-badge">✦</div>
                    <div className="mini-bank-meta">
                      <strong>Artc Bank</strong>
                      <span>6/22/26</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column Grid (3 cards: 1 wide on top, 2 side-by-side on bottom) */}
          <div className="bento-right-column">
            {/* Card 2: SECURITY FEATURES (Wide Lavender Card) */}
            <motion.div 
              className="bento-card bento-card--lavender bento-card--security"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="bento-card__text-wrap">
                <h3 className="bento-card__title">SECURITY FEATURES</h3>
                <p className="bento-card__desc">
                  Bank-grade encryption and monitoring around the clock.
                </p>
              </div>

              {/* Biometric Phone Graphic with Fingerprint Scan from Screenshot 4 */}
              <div className="bento-security-art" aria-hidden="true">
                <svg width="220" height="150" viewBox="0 0 220 150" fill="none">
                  {/* Lavender Handheld Phone */}
                  <rect x="80" y="10" width="85" height="135" rx="16" fill="#C084FC" fillOpacity="0.4" stroke="#A855F7" strokeWidth="2.5" />
                  <rect x="86" y="20" width="73" height="115" rx="10" fill="#FFFFFF" />

                  {/* Fingerprint Scanner Target Box */}
                  <rect x="100" y="44" width="46" height="46" rx="8" fill="#FAF5FF" stroke="#C084FC" strokeWidth="1.5" strokeDasharray="3 3" />
                  
                  {/* Fingerprint Glyph */}
                  <g stroke="#9333EA" strokeWidth="2" strokeLinecap="round">
                    <path d="M123 54C118.5 54 115 57.5 115 62C115 68 118 73 123 76" />
                    <path d="M123 58C120.5 58 118.5 60 118.5 63C118.5 66 120 70 123 72" />
                    <path d="M123 62C122 62 121 62.8 121 64C121 65 122 67 123 68" />
                    <path d="M127 55C130 57 131 60 131 64C131 68 129 72 127 75" />
                    <path d="M125 60C127 61.5 127.5 63 127.5 65" />
                  </g>

                  {/* Stylized Touch Hand / Shield */}
                  <path 
                    d="M60 140C60 140 70 100 95 90C105 86 112 95 106 108L90 140" 
                    fill="#18181B" 
                    stroke="#18181B" 
                    strokeWidth="2"
                  />
                  {/* Shield badge */}
                  <path d="M175 90L195 98V115C195 128 175 140 175 140C175 140 155 128 155 115V98L175 90Z" fill="#18181B" />
                  <circle cx="175" cy="115" r="4" fill="#FFFFFF" />
                </svg>
              </div>
            </motion.div>

            {/* Bottom Row of Right Column: Sky Blue & Lemon Yellow */}
            <div className="bento-bottom-row">
              {/* Card 3: AUTOMATED PROCESSES (Sky Blue) */}
              <motion.div 
                className="bento-card bento-card--blue"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className="bento-card__text-wrap">
                  <h3 className="bento-card__title">AUTOMATED PROCESSES</h3>
                  <p className="bento-card__desc">
                    Recurring work runs itself, so your team focuses on scale.
                  </p>
                </div>

                {/* Floating Micro Card with Gauge from Screenshot 4 */}
                <div className="bento-auto-art" aria-hidden="true">
                  <div className="micro-user-card">
                    <span className="micro-user-card__label">Card user</span>
                    <svg viewBox="0 0 100 55" width="80" height="44">
                      <path
                        d="M 12 50 A 38 38 0 0 1 88 50"
                        stroke="#2563EB"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="3 5"
                        fill="none"
                      />
                    </svg>
                    <span className="micro-gauge-num">80%</span>
                  </div>
                  {/* Curved loop decorative ribbon */}
                  <svg className="blue-loop-svg" width="90" height="90" viewBox="0 0 90 90" fill="none">
                    <path d="M10 80C20 40 50 10 75 30C95 45 75 75 45 80C30 82 20 70 20 50" stroke="#2563EB" strokeWidth="8" strokeLinecap="round"/>
                  </svg>
                </div>
              </motion.div>

              {/* Card 4: SECURE TRANSACTIONS (Lemon Yellow) */}
              <motion.div 
                className="bento-card bento-card--yellow"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className="bento-card__text-wrap">
                  <h3 className="bento-card__title">SECURE TRANSACTIONS</h3>
                  <p className="bento-card__desc">
                    Every payment is encrypted end to end with instant telemetry.
                  </p>
                </div>

                {/* Concentric Golden Arcs and Transactions Badge from Screenshot 4 */}
                <div className="bento-trans-art" aria-hidden="true">
                  <svg className="golden-arcs-svg" width="160" height="160" viewBox="0 0 160 160" fill="none">
                    <circle cx="130" cy="130" r="40" stroke="#FACC15" strokeWidth="18" fill="none" opacity="0.8" />
                    <circle cx="130" cy="130" r="75" stroke="#FDE047" strokeWidth="22" fill="none" opacity="0.6" />
                    <circle cx="130" cy="130" r="110" stroke="#FEF08A" strokeWidth="24" fill="none" opacity="0.4" />
                  </svg>

                  <div className="trans-badge-card">
                    <span className="trans-badge-title">Transactions</span>
                    <div className="trans-badge-row">
                      <strong>85%</strong>
                      <span className="trans-badge-growth">↑ 12%</span>
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

export default FeaturesBentoSection;
