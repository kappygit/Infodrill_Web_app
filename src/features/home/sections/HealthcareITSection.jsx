import React from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useModal } from '../../../context/ModalContext';
import { CardCarousel3D, DEFAULT_HEALTHCARE_CARDS } from '../../../components/ui/CardCarousel3D';
import './HealthcareITSection.css';

const OFFERING_PILLS = [
  'Hospital & Clinic Management',
  'Electronic Health Records (EHR/EMR)',
  'Telemedicine Platforms',
  'AI-Powered Healthcare Tools',
  'Patient Portals & Mobile Apps',
  'Healthcare Data Security',
  'System & Lab Integration'
];

export function HealthcareITSection() {
  const { openGetStartedModal } = useModal();

  return (
    <section className="healthcare-section" id="healthcare">
      <div className="healthcare-container">
        <div className="healthcare-master-grid">
          {/* Left Column: Eyebrow, Giant Condensed Headline, 4-Word Big Callout, Pill Button */}
          <div className="healthcare-col-left">
            <div className="healthcare-col-left__top">
              <span className="healthcare-eyebrow">HEALTHCARE IT</span>
              <h2 className="healthcare-headline">
                <span>SMART, SECURE</span>
                <span>HEALTHCARE</span>
              </h2>

              <div className="healthcare-callout-block">
                <p className="healthcare-callout-words">
                  <span className="callout-line-1">BUILT FOR</span>
                  <span className="callout-line-2">MODERN MEDICINE</span>
                </p>
              </div>
            </div>

            <div className="healthcare-col-left__bottom">
              <button
                type="button"
                onClick={openGetStartedModal}
                className="healthcare-pill-cta"
                aria-label="Talk to Our Healthcare Experts"
              >
                <span className="healthcare-pill-cta__icon" aria-hidden="true">
                  <ArrowUpRight size={18} strokeWidth={2.6} />
                </span>
                <span className="healthcare-pill-cta__text">TALK TO OUR EXPERTS</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero summary paragraph + 3D Card Carousel */}
          <div className="healthcare-col-right">
            <p className="healthcare-subtext">
              At <strong>INFODRILL AI SOLUTIONS</strong>, we build secure, AI-powered software for hospitals, clinics, diagnostic labs, and health-tech startups. We help healthcare teams save time, reduce errors, and give patients a better experience.
            </p>

            {/* Reusable 3D Perspective Card Carousel */}
            <CardCarousel3D 
              cards={DEFAULT_HEALTHCARE_CARDS}
              onCardAction={openGetStartedModal}
              autoPlayInterval={3200}
            />

            {/* Complete Offerings & Trust Badges Strip */}
            <div className="healthcare-offerings-strip">
              <div className="healthcare-pills-list">
                {OFFERING_PILLS.map((pill) => (
                  <button
                    key={pill}
                    type="button"
                    onClick={openGetStartedModal}
                    className="healthcare-offering-chip"
                  >
                    <span className="chip-dot" />
                    <span>{pill}</span>
                  </button>
                ))}
              </div>

              <div className="healthcare-trust-row">
                <span className="trust-item"><CheckCircle2 size={13} className="trust-icon" /> Secure & Privacy-First</span>
                <span className="trust-item"><CheckCircle2 size={13} className="trust-icon" /> Custom Workflow Architecture</span>
                <span className="trust-item"><CheckCircle2 size={13} className="trust-icon" /> AI & Automation Experts</span>
                <span className="trust-item"><CheckCircle2 size={13} className="trust-icon" /> Reliable Support After Launch</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HealthcareITSection;
