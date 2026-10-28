import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
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
    features: [
      'Up to 5 team members',
      'Real-time automated reconciliation',
      'Standard expense tracking',
      'Unified treasury overview',
      'Email support (24h turnaround)'
    ]
  },
  {
    id: 'professional',
    name: 'PROFESSIONAL PLAN',
    price: '$80',
    period: '/month',
    desc: 'For growing businesses that are ready to scale.',
    bgClass: 'pricing-card--blue',
    btnClass: 'pricing-btn--blue',
    popular: true,
    features: [
      'Up to 25 team members',
      'Multi-currency cash flow forecasting',
      'Automated payroll & vendor payouts',
      'Direct ERP & API webhook sync',
      'Priority 24/7 technical support'
    ]
  },
  {
    id: 'enterprise',
    name: 'ENTERPRISE PLAN',
    price: '$150',
    period: '/month',
    desc: 'For large organisations that need scale and dedicated control.',
    bgClass: 'pricing-card--purple',
    btnClass: 'pricing-btn--purple',
    features: [
      'Unlimited seats & multi-entity management',
      'Custom ERP & banking pipeline bridges',
      'Dedicated Solution Architect & SLA',
      'SOC2 Type II & bank-grade audit logs',
      'Self-hosted or isolated cloud deployment'
    ]
  }
];

export function PricingSection() {
  return (
    <section className="pricing-section" id="pricing">
      <div className="pricing-container">
        {/* Header split layout matching Screenshot 5 */}
        <div className="pricing-header-split">
          <div className="pricing-header-left">
            <motion.span 
              className="ref-section-eyebrow"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              PRICING
            </motion.span>

            <motion.h2 
              className="pricing-headline"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span>SIMPLE,</span>
              <span>TRANSPARENT</span>
              <span>PRICING</span>
            </motion.h2>

            <motion.div 
              className="pricing-cta-wrap"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <a href="#contact" className="ref-pill-btn">
                <span className="ref-pill-btn__arrow" aria-hidden="true">
                  <ArrowUpRight size={18} strokeWidth={2.5} />
                </span>
                <span>CONTACT US</span>
              </a>
            </motion.div>
          </div>

          <motion.div 
            className="pricing-header-right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="pricing-subtext">
              Choose a plan that fits your business needs and budget. 
              No hidden fees, no surprises — just straightforward pricing.
            </p>
          </motion.div>
        </div>

        {/* 3 Pricing Cards matching Screenshot 5 */}
        <div className="pricing-cards-grid">
          {PRICING_PLANS.map((plan, index) => (
            <motion.div 
              key={plan.id}
              className={`pricing-card ${plan.bgClass}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 * (index + 1), ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
            >
              {/* Card Header with Plan Name and Round Arrow Button */}
              <div className="pricing-card__top">
                <span className="pricing-card__name">{plan.name}</span>
                <a 
                  href="#contact" 
                  className={`pricing-arrow-btn ${plan.btnClass}`}
                  aria-label={`Select ${plan.name}`}
                >
                  <ArrowUpRight size={20} strokeWidth={2.5} />
                </a>
              </div>

              {/* Price display */}
              <div className="pricing-card__price-row">
                <span className="price-num">{plan.price}</span>
                <span className="price-period">{plan.period}</span>
              </div>

              {/* Subtext description */}
              <p className="pricing-card__desc">{plan.desc}</p>

              {/* Feature Checklist */}
              <div className="pricing-card__features">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="pricing-feature-line">
                    <span className="feature-check" aria-hidden="true">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
