import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, Compass, Sparkles, CheckCircle2, ArrowUpRight, ShieldCheck } from 'lucide-react';
import './StoryMissionModal.css';

export function StoryMissionModal({ isOpen, onClose }) {
  // Lock body scroll and handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="story-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
          <motion.div
            className="story-modal-card"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close Button */}
            <button
              type="button"
              className="story-modal-close-btn"
              onClick={onClose}
              aria-label="Close story dialog"
            >
              <X size={20} />
            </button>

            {/* Header Banner */}
            <div className="story-modal-header">
              <span className="story-modal-pill">
                <Compass size={13} className="text-indigo-600" />
                OUR ORIGIN &amp; PURPOSE
              </span>
              <h2 className="story-modal-title">THE INFODRILL STORY</h2>
              <p className="story-modal-subtitle">
                How an engineering-first vision in Ahmedabad grew into a Pan-India mission to eliminate enterprise software complexity.
              </p>
            </div>

            {/* Body Content */}
            <div className="story-modal-body">
              {/* Mission Grid */}
              <div className="story-pillars-grid">
                <div className="story-pillar-item">
                  <div className="story-pillar-icon-box">
                    <Target size={20} />
                  </div>
                  <h3 className="story-pillar-title">Radical Simplification</h3>
                  <p className="story-pillar-text">
                    Legacy enterprise systems are cluttered with seat taxes and rigid workflows. We architect lightweight, bespoke digital teammates that fit your operation seamlessly.
                  </p>
                </div>

                <div className="story-pillar-item">
                  <div className="story-pillar-icon-box">
                    <ShieldCheck size={20} />
                  </div>
                  <h3 className="story-pillar-title">100% Data Sovereignty</h3>
                  <p className="story-pillar-text">
                    Your company data belongs to you. We build with strict open standards, on-premise or sovereign cloud hosting, and zero lock-in dependencies.
                  </p>
                </div>

                <div className="story-pillar-item">
                  <div className="story-pillar-icon-box">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="story-pillar-title">Intelligent Automation</h3>
                  <p className="story-pillar-text">
                    We bridge proven ERP logic with custom multi-agent AI systems, saving 20+ manual hours each week while maintaining zero-hallucination accuracy.
                  </p>
                </div>
              </div>

              {/* Journey Timeline */}
              <div className="story-timeline-section">
                <h4 className="story-timeline-heading">Key Milestones Along The Way</h4>
                <div className="story-timeline-list">
                  <div className="story-timeline-step">
                    <span className="timeline-year">2019</span>
                    <div className="timeline-content">
                      <strong>Founded in Ahmedabad</strong>
                      <p>Started with a mission to free regional manufacturers and clinics from brittle legacy software.</p>
                    </div>
                  </div>
                  <div className="story-timeline-step">
                    <span className="timeline-year">2022</span>
                    <div className="timeline-content">
                      <strong>AI &amp; ERP Integration Core</strong>
                      <p>Pioneered zero-license open ERP deployments coupled with automated financial and inventory agents.</p>
                    </div>
                  </div>
                  <div className="story-timeline-step">
                    <span className="timeline-year">2026</span>
                    <div className="timeline-content">
                      <strong>44+ Enterprises &amp; Pan-Asia Growth</strong>
                      <p>Powering mission-critical workflows across healthcare, textiles, supply chain, and commerce.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="story-modal-footer">
                <a href="#contact" onClick={onClose} className="ref-pill-btn">
                  <span className="ref-pill-btn__arrow" aria-hidden="true">
                    <ArrowUpRight size={18} strokeWidth={2.6} />
                  </span>
                  <span>START A CONVERSATION</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

