import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useModal } from '../../../context/ModalContext';
import './PricingSection.css';

const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'STARTER PLAN',
    price: '$50',
    period: '/month',
    desc: 'For small teams and startups finding their feet.',
    bgClass: 'pricing-card--peach',
    btnClass: 'pricing-btn--orange',
    arcColor: '#FB923C'
  },
  {
    id: 'professional',
    name: 'PROFESSIONAL PLAN',
    price: '$80',
    period: '/month',
    desc: 'For growing businesses that are ready to scale.',
    bgClass: 'pricing-card--blue',
    btnClass: 'pricing-btn--blue',
    arcColor: '#60A5FA'
  },
  {
    id: 'enterprise',
    name: 'ENTERPRISE PLAN',
    price: '$150',
    period: '/month',
    desc: 'For large organisations that need scale and control.',
    bgClass: 'pricing-card--purple',
    btnClass: 'pricing-btn--purple',
    arcColor: '#C084FC'
  }
];

export function PricingSection() {
  const { openGetStartedModal } = useModal();

  return (
    <section className="pricing-section" id="pricing">
      <div className="pricing-container">
        <div className="pricing-master-grid">
          {/* Left Column: Eyebrow, Condensed Headline, Pill Button */}
          <div className="pricing-col-left">
            <div className="pricing-col-left__top">
              <span className="pricing-eyebrow">PRICING</span>
              <h2 className="pricing-headline">
                <span>SIMPLE, TRANSPARENT</span>
                <span>PRICING</span>
              </h2>
            </div>

            <div className="pricing-col-left__bottom">
              <button 
                type="button" 
                onClick={openGetStartedModal} 
                className="pricing-pill-cta"
                aria-label="Contact Us for Pricing"
              >
                <span className="pricing-pill-cta__icon" aria-hidden="true">
                  <ArrowUpRight size={18} strokeWidth={2.6} />
                </span>
                <span className="pricing-pill-cta__text">CONTACT US</span>
              </button>
            </div>
          </div>

          {/* Right Column: Description at top, 3 Pastel Cards below */}
          <div className="pricing-col-right">
            <p className="pricing-subtext">
              Choose a plan that fits your business needs and budget. No hidden fees, no surprises — just straightforward pricing.
            </p>

            <div className="pricing-cards-grid">
              {PRICING_PLANS.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  className={`pricing-card ${plan.bgClass}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  whileHover={{ y: -6, transition: { duration: 0.22 } }}
                >
                  {/* Concentric Decorative Curved Arcs matching screenshot */}
                  <svg
                    className="pricing-card__arc"
                    viewBox="0 0 320 320"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <circle cx="-10" cy="-10" r="145" stroke={plan.arcColor} strokeWidth="38" strokeOpacity="0.4" />
                    <circle cx="-10" cy="-10" r="225" stroke={plan.arcColor} strokeWidth="38" strokeOpacity="0.3" />
                  </svg>

                  {/* Card Header: Plan Name + Round Arrow Button */}
                  <div className="pricing-card__top">
                    <span className="pricing-card__name">{plan.name}</span>
                    <button
                      type="button"
                      onClick={openGetStartedModal}
                      className={`pricing-arrow-btn ${plan.btnClass}`}
                      aria-label={`Select ${plan.name}`}
                    >
                      <ArrowUpRight size={20} strokeWidth={2.4} />
                    </button>
                  </div>

                  {/* Card Bottom: Price + Description */}
                  <div className="pricing-card__bottom">
                    <div className="pricing-card__price-row">
                      <span className="price-num">{plan.price}</span>
                      <span className="price-period">{plan.period}</span>
                    </div>
                    <p className="pricing-card__desc">{plan.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
