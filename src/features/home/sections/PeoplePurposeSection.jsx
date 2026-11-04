import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  CheckCircle2,
  BookOpen,
  Users
} from 'lucide-react';
import { useModal } from '../../../context/ModalContext';
import './PeoplePurposeSection.css';

export function PeoplePurposeSection() {
  const { openGetStartedModal } = useModal();

  return (
    <section className="people-purpose-section" id="people-purpose" aria-labelledby="people-purpose-heading">
      {/* Invisible Anchors for Navbar Deep-Linking */}
      <span id="story-mission" className="people-purpose-anchor" aria-hidden="true" />
      <span id="leadership-team" className="people-purpose-anchor" aria-hidden="true" />

      <div className="people-purpose-container">
        {/* Top Header — Matching About & Why Us Signature Hierarchy */}
        <div className="people-purpose-header">
          <motion.span
            className="ref-section-eyebrow"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            People &amp; Purpose
          </motion.span>

          <motion.h2
            id="people-purpose-heading"
            className="people-purpose-headline"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>The People &amp; Purpose</span>
            <span className="text-blue">Behind Our Innovation</span>
          </motion.h2>

          <motion.p
            className="people-purpose-subtext"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Every great innovation begins with a vision and grows through the people who believe in it. 
            Discover the journey, values, and passionate minds behind InfoDrill — the driving force 
            behind our mission to transform businesses through intelligent technology and meaningful digital solutions.
          </motion.p>
        </div>

        {/* 2 Interactive Cards Grid — Matching Website's Card & UI Style */}
        <div className="people-purpose-grid">

          {/* Card 1: OUR STORY & MISSION */}
          <motion.div
            className="purpose-card purpose-card--story group"
            onClick={openGetStartedModal}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openGetStartedModal();
              }
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            {/* Concentric Decorative Watermark Arcs (Signature Brand Element) */}
            <div className="purpose-card__arcs" aria-hidden="true">
              <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
                <circle cx="220" cy="0" r="210" stroke="rgba(79, 70, 229, 0.08)" strokeWidth="1.5" />
                <circle cx="220" cy="0" r="150" stroke="rgba(79, 70, 229, 0.1)" strokeWidth="1.5" />
                <circle cx="220" cy="0" r="90" stroke="rgba(79, 70, 229, 0.14)" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Top Row: Small Uppercase Label (Left) & Circular Arrow Button (Right) */}
            <div className="purpose-card__top">
              <span className="purpose-card__label">
                <BookOpen size={14} className="text-blue" />
                OUR STORY &amp; MISSION
              </span>
              <button
                type="button"
                className="purpose-card__top-arrow"
                aria-label="Open Get Started form"
                onClick={(e) => {
                  e.stopPropagation();
                  openGetStartedModal();
                }}
              >
                <ArrowUpRight size={18} strokeWidth={2.4} />
              </button>
            </div>

            {/* Card Title (Oswald / Condensed Bold Heading) */}
            <h3 className="purpose-card__title">OUR STORY &amp; MISSION</h3>

            {/* User Provided Description */}
            <p className="purpose-card__desc">
              Our journey is driven by a clear purpose — to simplify complexity, empower businesses, 
              and create meaningful impact through technology. Discover our story, the values that 
              guide us, and the vision shaping our future.
            </p>

            {/* Checklist Items — Consistent with About & Benefits Sections */}
            <div className="purpose-card__checklist">
              <div className="purpose-check-item">
                <CheckCircle2 size={18} className="check-icon" />
                <span>Simplifying enterprise operations through tailored engineering</span>
              </div>
              <div className="purpose-check-item">
                <CheckCircle2 size={18} className="check-icon" />
                <span>100% Data sovereignty, zero license lock-in, and full control</span>
              </div>
              <div className="purpose-check-item">
                <CheckCircle2 size={18} className="check-icon" />
                <span>Continuous innovation focused on real, measurable ROI</span>
              </div>
            </div>

            {/* Bottom Row: Signature Website Pill Button */}
            <div className="purpose-card__cta-wrap">
              <button
                type="button"
                className="ref-pill-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  openGetStartedModal();
                }}
                aria-label="Get Started with InfoDrill"
              >
                <span className="ref-pill-btn__arrow" aria-hidden="true">
                  <ArrowUpRight size={18} strokeWidth={2.6} />
                </span>
                <span>EXPLORE OUR STORY</span>
              </button>
            </div>
          </motion.div>

          {/* Card 2: LEADERSHIP & TEAM */}
          <motion.div
            className="purpose-card purpose-card--team group"
            onClick={openGetStartedModal}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openGetStartedModal();
              }
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            {/* Concentric Decorative Watermark Arcs */}
            <div className="purpose-card__arcs" aria-hidden="true">
              <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
                <circle cx="220" cy="0" r="210" stroke="rgba(99, 102, 241, 0.08)" strokeWidth="1.5" />
                <circle cx="220" cy="0" r="150" stroke="rgba(99, 102, 241, 0.1)" strokeWidth="1.5" />
                <circle cx="220" cy="0" r="90" stroke="rgba(99, 102, 241, 0.14)" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Top Row: Small Uppercase Label (Left) & Circular Arrow Button (Right) */}
            <div className="purpose-card__top">
              <span className="purpose-card__label">
                <Users size={14} className="text-blue" />
                LEADERSHIP &amp; TEAM
              </span>
              <button
                type="button"
                className="purpose-card__top-arrow"
                aria-label="Open Get Started form"
                onClick={(e) => {
                  e.stopPropagation();
                  openGetStartedModal();
                }}
              >
                <ArrowUpRight size={18} strokeWidth={2.4} />
              </button>
            </div>

            {/* Card Title (Oswald / Condensed Bold Heading) */}
            <h3 className="purpose-card__title">LEADERSHIP &amp; TEAM</h3>

            {/* User Provided Description */}
            <p className="purpose-card__desc">
              Behind every successful solution is a team of passionate thinkers, experienced leaders, 
              and creative problem-solvers. Meet the people who bring ideas to life, challenge 
              possibilities, and drive InfoDrill toward a smarter digital future.
            </p>

            {/* Checklist Items — Consistent with About & Benefits Sections */}
            <div className="purpose-card__checklist">
              <div className="purpose-check-item">
                <CheckCircle2 size={18} className="check-icon" />
                <span>45+ Senior software architects, AI researchers, and engineers</span>
              </div>
              <div className="purpose-check-item">
                <CheckCircle2 size={18} className="check-icon" />
                <span>100% In-house talent with zero outsourcing compromises</span>
              </div>
              <div className="purpose-check-item">
                <CheckCircle2 size={18} className="check-icon" />
                <span>Long-term strategic partnership and 24/7 post-launch support</span>
              </div>
            </div>

            {/* Bottom Row: Signature Website Pill Button */}
            <div className="purpose-card__cta-wrap">
              <button
                type="button"
                className="ref-pill-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  openGetStartedModal();
                }}
                aria-label="Get Started with InfoDrill"
              >
                <span className="ref-pill-btn__arrow" aria-hidden="true">
                  <ArrowUpRight size={18} strokeWidth={2.6} />
                </span>
                <span>MEET OUR TEAM</span>
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
