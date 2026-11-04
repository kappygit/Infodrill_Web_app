import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Code2, Cpu, Award, ArrowUpRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import './LeadershipTeamModal.css';

export function LeadershipTeamModal({ isOpen, onClose }) {
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

  const teamRoles = [
    {
      role: 'Enterprise Systems & ERP Architecture',
      focus: 'Multi-tenant schemas, high-throughput accounting ledgers, and zero-downtime database pipelines.',
      icon: Code2,
      tag: 'ARCHITECTURE'
    },
    {
      role: 'Autonomous AI & LLM Systems',
      focus: 'Agentic workflows, deterministic state machines, and private vector embedding bridges.',
      icon: Cpu,
      tag: 'AI ENGINEERING'
    },
    {
      role: 'Product Strategy & Client Solutions',
      focus: 'Turning complex manufacturing, healthcare, and retail friction into tailored software suites.',
      icon: HeartHandshake,
      tag: 'SOLUTIONS'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="team-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
          <motion.div
            className="team-modal-card"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close Button */}
            <button
              type="button"
              className="team-modal-close-btn"
              onClick={onClose}
              aria-label="Close team dialog"
            >
              <X size={20} />
            </button>

            {/* Header Banner */}
            <div className="team-modal-header">
              <span className="team-modal-pill">
                <Users size={13} className="text-indigo-600" />
                THE MINDS BEHIND INFODRILL
              </span>
              <h2 className="team-modal-title">LEADERSHIP &amp; ENGINEERING</h2>
              <p className="team-modal-subtitle">
                A dedicated cohort of system architects, full-stack engineers, and product minds driven by craft, reliability, and measurable client success.
              </p>
            </div>

            {/* Body Content */}
            <div className="team-modal-body">
              {/* Culture Metric Chips */}
              <div className="team-metric-chips-row">
                <div className="team-metric-chip">
                  <span className="team-chip-num">45+</span>
                  <span className="team-chip-label">Engineers &amp; Technologists</span>
                </div>
                <div className="team-metric-chip">
                  <span className="team-chip-num">100%</span>
                  <span className="team-chip-label">In-House Senior Talent</span>
                </div>
                <div className="team-metric-chip">
                  <span className="team-chip-num">99.8%</span>
                  <span className="team-chip-label">Client Retention</span>
                </div>
              </div>

              {/* Functional Divisions */}
              <div className="team-divisions-grid">
                {teamRoles.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="team-division-card">
                      <div className="team-division-top">
                        <div className="team-div-icon-box">
                          <Icon size={18} />
                        </div>
                        <span className="team-div-tag">{item.tag}</span>
                      </div>
                      <h3 className="team-division-role">{item.role}</h3>
                      <p className="team-division-focus">{item.focus}</p>
                    </div>
                  );
                })}
              </div>

              {/* Philosophy Quote */}
              <div className="team-philosophy-box">
                <p className="team-philosophy-quote">
                  “We do not hire ticket-closers. We hire curious builders who take deep operational ownership of our clients' core engines.”
                </p>
                <span className="team-philosophy-author">— Engineering Leadership, INFODRILL AI SOLUTIONS</span>
              </div>

              {/* Footer CTA */}
              <div className="team-modal-footer">
                <a href="#contact" onClick={onClose} className="ref-pill-btn">
                  <span className="ref-pill-btn__arrow" aria-hidden="true">
                    <ArrowUpRight size={18} strokeWidth={2.6} />
                  </span>
                  <span>COLLABORATE WITH OUR TEAM</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

