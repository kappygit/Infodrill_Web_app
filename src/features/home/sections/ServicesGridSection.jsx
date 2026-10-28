import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../../../config/siteConfig';
import { 
  Boxes, Users, Brain, Globe, Smartphone, Code, 
  Cloud, Cpu, PackageCheck, UserCheck, Receipt, ShoppingCart, 
  ArrowUpRight 
} from 'lucide-react';
import './ServicesGridSection.css';

const serviceIcons = {
  1: Boxes,         // ERP Development
  2: Users,         // CRM Solutions
  3: Brain,         // AI Solutions
  4: Globe,         // Website Development
  5: Smartphone,    // Mobile App Development
  6: Code,          // Custom Software
  7: Cloud,         // Cloud Solutions
  8: Cpu,           // Business Automation
  9: PackageCheck,  // Inventory Management
  10: UserCheck,    // HRMS Software
  11: Receipt,      // Billing & Accounting
  12: ShoppingCart, // E-Commerce Solutions
};

export function ServicesGridSection() {
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All 12 Services' },
    { id: 'enterprise', label: 'ERP & Operations' },
    { id: 'ai', label: 'AI & Cloud' },
    { id: 'apps', label: 'Web & Mobile' },
  ];

  const filteredServices = siteConfig.services.filter((s) => {
    if (filter === 'enterprise') return [1, 2, 9, 10, 11].includes(s.id);
    if (filter === 'ai') return [3, 7, 8].includes(s.id);
    if (filter === 'apps') return [4, 5, 6, 12].includes(s.id);
    return true;
  });

  return (
    <section className="services-section" id="services">
      <div className="services-container">
        {/* Section Header */}
        <div className="services-header">
          <motion.span 
            className="ref-section-eyebrow"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What We Offer
          </motion.span>

          <motion.h2 
            className="services-headline"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Complete IT Services for Your Business
          </motion.h2>

          <motion.p 
            className="services-subtext"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            From custom software to cloud infrastructure, everything your business needs to operate at its best.
          </motion.p>

          {/* Filter Pills */}
          <div className="services-filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`service-filter-btn ${filter === cat.id ? 'service-filter-btn--active' : ''}`}
                onClick={() => setFilter(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 12 Services Grid */}
        <div className="services-cards-grid">
          {filteredServices.map((service, index) => {
            const Icon = serviceIcons[service.id] || Code;
            return (
              <motion.div 
                key={service.id}
                className="service-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className="service-card__top">
                  <div className="service-card__icon-box">
                    <Icon size={22} strokeWidth={2.2} />
                  </div>
                  <span className="service-num-badge">#{service.id}</span>
                </div>

                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__desc">{service.desc}</p>

                <div className="service-card__footer">
                  <a href="#contact" className="service-link">
                    <span>Discuss Requirements</span>
                    <ArrowUpRight size={14} className="service-link__arrow" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServicesGridSection;
