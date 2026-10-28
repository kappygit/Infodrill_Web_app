import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowUpRight, Award, Shield, Sparkles } from 'lucide-react';
import './AboutSection.css';

export function AboutSection() {
  const checklist = [
    'Custom ERP & CRM systems built for your exact workflow',
    'AI-powered automation that saves 20+ hours per week',
    'Dedicated team of senior engineers, not freelancers',
    'End-to-end delivery, from planning to post-launch support',
    'Proven track record across 9 industries',
    'Transparent pricing with no hidden charges',
  ];

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        {/* Left Column: Copy, Checklist, CTA */}
        <div className="about-content">
          <motion.span 
            className="ref-section-eyebrow"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            About INFODRILL
          </motion.span>

          <motion.h2 
            className="about-headline"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>WE BUILD SOFTWARE</span>
            <span className="text-blue">THAT SOLVES REAL PROBLEMS</span>
          </motion.h2>

          <motion.p 
            className="about-paragraph"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            INFODRILL AI SOLUTIONS is an Ahmedabad-based IT company dedicated to building enterprise-grade software for businesses that need more than off-the-shelf products. We architect systems around your workflows, not the other way around.
          </motion.p>

          <motion.p 
            className="about-paragraph about-paragraph--sub"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            From manufacturing ERPs to AI-driven business automation, we’ve helped companies across Gujarat and India reduce costs, improve efficiency, and scale confidently.
          </motion.p>

          {/* Checklist Grid */}
          <motion.div 
            className="about-checklist"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {checklist.map((item, idx) => (
              <div key={idx} className="about-check-item">
                <CheckCircle2 size={18} className="check-icon" />
                <span>{item}</span>
              </div>
            ))}
          </motion.div>

          <motion.div 
            className="about-cta-wrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a href="#services" className="ref-pill-btn">
              <span className="ref-pill-btn__arrow" aria-hidden="true">
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </span>
              <span>LEARN MORE ABOUT US</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Visual Stage with "5+ Years of Excellence" Badge */}
        <div className="about-visual-stage">
          <motion.div 
            className="about-card-hero"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {/* Embedded Architecture Illustration */}
            <div className="about-arch-preview">
              <div className="arch-top-bar">
                <div className="arch-dots">
                  <span className="dot dot--red" />
                  <span className="dot dot--yellow" />
                  <span className="dot dot--green" />
                </div>
                <span className="arch-label">Ahmedabad · Gujarat · India</span>
              </div>

              <div className="arch-workflow-box">
                <div className="workflow-chip">
                  <Sparkles size={16} className="text-orange" />
                  <span>Custom ERP & AI Architecture</span>
                </div>
                <div className="workflow-metrics">
                  <div className="wf-metric">
                    <span className="wf-lbl">Avg Weekly Savings</span>
                    <span className="wf-val">20+ Hours</span>
                  </div>
                  <div className="wf-metric">
                    <span className="wf-lbl">Industries Mastered</span>
                    <span className="wf-val">9 Sectors</span>
                  </div>
                </div>
              </div>

              <div className="arch-quote-box">
                <p>“Dedicated team of senior engineers, not freelancers. End-to-end delivery from planning to post-launch support.”</p>
              </div>
            </div>

            {/* Badge on image: 5+ Years of Excellence */}
            <div className="about-floating-badge">
              <div className="badge-star-circle">
                <Award size={22} />
              </div>
              <div className="badge-info">
                <span className="badge-highlight">5+ YEARS</span>
                <span className="badge-caption">Of IT Excellence</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
