import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../../../config/siteConfig';
import { Award, Users, CheckCircle2, Star } from 'lucide-react';
import './StatsSection.css';

export function StatsSection() {
  const icons = [Award, Users, CheckCircle2, Star];
  const bgClasses = ['stat-card--peach', 'stat-card--blue', 'stat-card--purple', 'stat-card--yellow'];

  return (
    <section className="stats-section" id="stats">
      <div className="stats-container">
        <div className="stats-grid">
          {siteConfig.stats.map((stat, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div 
                key={stat.label} 
                className={`stat-card ${bgClasses[i % bgClasses.length]}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="stat-card__icon-wrap">
                  <Icon size={22} strokeWidth={2.5} />
                </div>
                <div className="stat-card__text">
                  <span className="stat-number">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
