import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../../../config/siteConfig';
import { 
  Users2, Cpu, Zap, BadgePercent, LifeBuoy, TrendingUp, 
  ArrowUpRight, HeartHandshake, CheckCircle2 
} from 'lucide-react';
import './WhyChooseUsSection.css';

const diffIcons = [
  Users2,         // Expert Team
  Cpu,            // Customized Solutions
  Zap,            // Fast Delivery
  BadgePercent,   // Affordable Pricing
  LifeBuoy,       // Ongoing Support
  TrendingUp,     // Scalable Architecture
];

export function WhyChooseUsSection() {
  return (
    <section className="why-us-section" id="why-choose">
      <div className="why-us-container">
        {/* Top Header */}
        <div className="why-us-header">
          <motion.span 
            className="ref-section-eyebrow"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Choose Us
          </motion.span>

          <motion.h2 
            className="why-us-headline"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            The Partner That Delivers, Not Just Promises
          </motion.h2>

          <motion.p 
            className="why-us-subtext"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Most software agencies disappear after launch. We build long-term partnerships, staying with you through growth, pivots, and scaling challenges with dedicated support.
          </motion.p>
        </div>

        {/* 6 Features Grid */}
        <div className="why-us-grid">
          {siteConfig.whyChooseUs.map((item, index) => {
            const Icon = diffIcons[index % diffIcons.length];
            return (
              <motion.div 
                key={item.title}
                className="why-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className="why-card__icon-box">
                  <Icon size={24} strokeWidth={2.2} />
                </div>
                <h3 className="why-card__title">{item.title}</h3>
                <p className="why-card__desc">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner with Button and "30+ Happy Clients" Badge */}
        <motion.div 
          className="why-us-bottom-banner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="why-us-banner-left">
            <div className="happy-clients-badge">
              <div className="happy-badge-icon">
                <HeartHandshake size={22} />
              </div>
              <div className="happy-badge-text">
                <span className="happy-num">30+ HAPPY CLIENTS</span>
                <span className="happy-sub">Across Gujarat & India</span>
              </div>
            </div>
            <p className="why-banner-quote">
              Ready to architect custom software that solves your operational bottlenecks?
            </p>
          </div>

          <div className="why-us-banner-right">
            <a href="#contact" className="ref-pill-btn">
              <span className="ref-pill-btn__arrow" aria-hidden="true">
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </span>
              <span>START A CONVERSATION</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default WhyChooseUsSection;
