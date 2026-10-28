import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../../../config/siteConfig';
import { ArrowUpRight, FolderGit2, Layers, CheckCircle2 } from 'lucide-react';
import './PortfolioSection.css';

const projectBadges = [
  'bg--peach',
  'bg--blue',
  'bg--purple',
  'bg--yellow',
  'bg--emerald',
  'bg--sky'
];

export function PortfolioSection() {
  return (
    <section className="portfolio-section" id="portfolio">
      <div className="portfolio-container">
        {/* Header */}
        <div className="portfolio-header">
          <motion.span 
            className="ref-section-eyebrow"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Work
          </motion.span>

          <motion.h2 
            className="portfolio-headline"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Projects That Made a Difference
          </motion.h2>

          <motion.p 
            className="portfolio-subtext"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A selection of enterprise solutions we’ve delivered across industries.
          </motion.p>
        </div>

        {/* 6 Projects Grid */}
        <div className="portfolio-grid">
          {siteConfig.portfolio.map((project, index) => {
            const badgeClass = projectBadges[index % projectBadges.length];
            return (
              <motion.div 
                key={project.title}
                className="portfolio-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                {/* Project Top Bar */}
                <div className="portfolio-card__top">
                  <span className={`project-category-pill ${badgeClass}`}>
                    {project.category}
                  </span>
                  <span className="project-index">0{index + 1}</span>
                </div>

                <h3 className="project-title">{project.title}</h3>

                {/* Tech Stack Chips */}
                <div className="project-tech-stack">
                  <span className="tech-stack-label">Tech Stack:</span>
                  <div className="tech-tags">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="portfolio-card__footer">
                  <a href="#contact" className="project-cta-link">
                    <span>View Case Study</span>
                    <ArrowUpRight size={15} />
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

export default PortfolioSection;
