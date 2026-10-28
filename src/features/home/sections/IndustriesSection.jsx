import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../../../config/siteConfig';
import { 
  Factory, Store, Stethoscope, GraduationCap, 
  Landmark, Truck, Building2, Sun, Shirt, 
  ArrowRight 
} from 'lucide-react';
import './IndustriesSection.css';

const industryIcons = [
  Factory,        // Manufacturing
  Store,          // Retail
  Stethoscope,    // Healthcare
  GraduationCap,  // Education
  Landmark,       // Finance
  Truck,          // Logistics
  Building2,      // Real Estate
  Sun,            // Solar Industry
  Shirt,          // Textile Industry
];

// Reference Pastel Colors matching design system
const cardThemes = [
  'ind-card--peach',
  'ind-card--blue',
  'ind-card--purple',
  'ind-card--yellow',
  'ind-card--emerald',
  'ind-card--sky',
  'ind-card--peach',
  'ind-card--yellow',
  'ind-card--purple'
];

export function IndustriesSection() {
  return (
    <section className="industries-section" id="industries">
      <div className="industries-container">
        {/* Header */}
        <div className="industries-header">
          <motion.span 
            className="ref-section-eyebrow"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Industries We Serve
          </motion.span>

          <motion.h2 
            className="industries-headline"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Deep Expertise Across Key Sectors
          </motion.h2>

          <motion.p 
            className="industries-subtext"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We understand the unique challenges of each industry and build accordingly: not generic software, but domain-specific solutions.
          </motion.p>
        </div>

        {/* 9 Industries Grid */}
        <div className="industries-grid">
          {siteConfig.industries.map((ind, index) => {
            const Icon = industryIcons[index % industryIcons.length];
            const themeClass = cardThemes[index % cardThemes.length];
            return (
              <motion.div 
                key={ind.name}
                className={`industry-card ${themeClass}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className="industry-card__header">
                  <div className="industry-icon-pill">
                    <Icon size={24} strokeWidth={2.2} />
                  </div>
                  <span className="industry-num">0{index + 1}</span>
                </div>

                <h3 className="industry-title">{ind.name}</h3>
                <p className="industry-desc">{ind.desc}</p>

                <div className="industry-footer">
                  <a href="#contact" className="industry-cta">
                    <span>Explore Solutions</span>
                    <ArrowRight size={14} />
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

export default IndustriesSection;
