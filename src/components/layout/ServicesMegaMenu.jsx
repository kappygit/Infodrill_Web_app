import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Boxes, Users, PackageCheck, UserCheck, Receipt,
  Brain, Sparkles, Bot, LineChart, FileSearch, Cpu,
  Code2, Globe, Smartphone, Cloud, ShoppingCart,
  ArrowRight
} from 'lucide-react';
import './ServicesMegaMenu.css';

export function ServicesMegaMenu({ isOpen, onClose, onMouseEnter, onMouseLeave }) {
  const column1Items = [
    { label: 'Custom ERP Architecture', icon: Boxes, href: '#services' },
    { label: 'CRM & Lead Automation', icon: Users, href: '#services' },
    { label: 'Inventory & Warehouse Systems', icon: PackageCheck, href: '#services' },
    { label: 'HRMS & Automated Payroll', icon: UserCheck, href: '#services' },
    { label: 'GST Billing & Financial Accounting', icon: Receipt, href: '#services' },
  ];

  const column2Items = [
    { label: 'Custom AI Architecture & LLMs', icon: Sparkles, href: '#services' },
    { label: 'Autonomous Business Process Bots', icon: Bot, href: '#services' },
    { label: 'Predictive Operations Analytics', icon: LineChart, href: '#services' },
    { label: 'Intelligent Document & Data Extraction', icon: FileSearch, href: '#services' },
    { label: '24/7 AI Customer Support Engines', icon: Cpu, href: '#services' },
  ];

  const column3Items = [
    { label: 'Custom Software Engineering', icon: Code2, href: '#services' },
    { label: 'High-Performance Web Platforms', icon: Globe, href: '#services' },
    { label: 'Native iOS & Android Mobile Apps', icon: Smartphone, href: '#services' },
    { label: 'Enterprise Cloud & DevOps (AWS/Azure)', icon: Cloud, href: '#services' },
    { label: 'E-Commerce & Payment Ecosystems', icon: ShoppingCart, href: '#services' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="services-megamenu-wrapper"
          initial={{ opacity: 0, y: -12, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.985 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          role="region"
          aria-label="Services Mega Menu"
        >
          <div className="services-megamenu-card">
            {/* Ambient subtle top pointer */}
            <div className="megamenu-pointer" aria-hidden="true" />

            <div className="services-megamenu-grid">
              
              {/* Column 1: ERP & Operations */}
              <div className="megamenu-column">
                <div className="megamenu-column-header">
                  <div className="megamenu-badge megamenu-badge--indigo">
                    <Boxes size={20} strokeWidth={2.2} />
                  </div>
                  <h3 className="megamenu-col-title">ERP &amp; Operations</h3>
                  <p className="megamenu-col-desc">
                    End-to-end enterprise software architected to unify finance, supply chain, inventory, and operations.
                  </p>
                </div>

                <div className="megamenu-links-list">
                  {column1Items.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <a
                        key={idx}
                        href={item.href}
                        className="megamenu-item-row"
                        onClick={onClose}
                      >
                        <div className="megamenu-item-left">
                          <span className="megamenu-item-icon-box">
                            <IconComponent size={15} strokeWidth={2} />
                          </span>
                          <span className="megamenu-item-text">{item.label}</span>
                        </div>
                        <ArrowRight size={14} className="megamenu-item-arrow" />
                      </a>
                    );
                  })}
                </div>

                <a href="#services" className="megamenu-footer-cta" onClick={onClose}>
                  <span>Explore ERP Solutions</span>
                  <ArrowRight size={13} />
                </a>
              </div>

              {/* Column 2: AI & Automation (Centerpiece with Mascot) */}
              <div className="megamenu-column megamenu-column--highlight">
                <div className="megamenu-column-header">
                  <div className="megamenu-badge megamenu-badge--purple">
                    <Brain size={20} strokeWidth={2.2} />
                  </div>
                  <h3 className="megamenu-col-title">AI &amp; Automation</h3>
                  <p className="megamenu-col-desc">
                    Autonomous agents, LLM pipelines, and predictive algorithms that eliminate repetitive tasks 24/7.
                  </p>
                </div>

                <div className="megamenu-links-list">
                  {column2Items.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <a
                        key={idx}
                        href={item.href}
                        className="megamenu-item-row"
                        onClick={onClose}
                      >
                        <div className="megamenu-item-left">
                          <span className="megamenu-item-icon-box megamenu-item-icon-box--purple">
                            <IconComponent size={15} strokeWidth={2} />
                          </span>
                          <span className="megamenu-item-text">{item.label}</span>
                        </div>
                        <ArrowRight size={14} className="megamenu-item-arrow" />
                      </a>
                    );
                  })}
                </div>

                {/* Branded Infodrill AI Bot Mascot Graphic */}
                <div className="megamenu-bot-mascot" aria-hidden="true">
                  <svg width="150" height="74" viewBox="0 0 160 80" fill="none" className="bot-svg">
                    <defs>
                      <linearGradient id="botGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#818CF8" />
                        <stop offset="100%" stopColor="#4F46E5" />
                      </linearGradient>
                      <linearGradient id="cardGrad1" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#1E293B" />
                        <stop offset="100%" stopColor="#0F172A" />
                      </linearGradient>
                      <linearGradient id="cardGrad2" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#6366F1" />
                        <stop offset="100%" stopColor="#4338CA" />
                      </linearGradient>
                    </defs>

                    {/* Floating Pill Accent Top Left */}
                    <rect x="24" y="10" width="22" height="6" rx="3" fill="#C7D2FE" opacity="0.8" />

                    {/* Floating Tech Chips */}
                    <g className="floating-chip-1">
                      <rect x="42" y="18" width="28" height="26" rx="7" fill="url(#cardGrad1)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                      <rect x="48" y="24" width="8" height="6" rx="2" fill="#818CF8" />
                      <rect x="58" y="24" width="6" height="3" rx="1.5" fill="#E2E8F0" opacity="0.6" />
                      <rect x="48" y="34" width="16" height="3" rx="1.5" fill="#94A3B8" opacity="0.7" />
                    </g>

                    {/* Bot Body & Rounded Head */}
                    <g className="bot-head">
                      {/* Antenna */}
                      <line x1="108" y1="8" x2="108" y2="16" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" />
                      <circle cx="108" cy="7" r="3.5" fill="#F43F5E" />
                      
                      {/* Head Base */}
                      <rect x="84" y="16" width="48" height="42" rx="18" fill="#FFFFFF" stroke="#E0E7FF" strokeWidth="2" />
                      <rect x="88" y="20" width="40" height="34" rx="15" fill="url(#botGrad)" />
                      
                      {/* Friendly Glowing Eyes */}
                      <circle cx="99" cy="36" r="4.5" fill="#FFFFFF" />
                      <circle cx="100" cy="35" r="1.5" fill="#312E81" />
                      <circle cx="117" cy="36" r="4.5" fill="#FFFFFF" />
                      <circle cx="118" cy="35" r="1.5" fill="#312E81" />

                      {/* Happy Smile */}
                      <path d="M104 44 Q 108 47, 112 44" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
                      
                      {/* Subtle Cheeks */}
                      <circle cx="94" cy="42" r="2.5" fill="#FB7185" opacity="0.8" />
                      <circle cx="122" cy="42" r="2.5" fill="#FB7185" opacity="0.8" />
                    </g>

                    {/* Floating Sensor Orbit */}
                    <circle cx="68" cy="58" r="8" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="1.5" />
                    <circle cx="68" cy="58" r="3.5" fill="#6366F1" />
                  </svg>
                </div>
              </div>

              {/* Column 3: Software & Cloud */}
              <div className="megamenu-column">
                <div className="megamenu-column-header">
                  <div className="megamenu-badge megamenu-badge--blue">
                    <Code2 size={20} strokeWidth={2.2} />
                  </div>
                  <h3 className="megamenu-col-title">Software &amp; Cloud</h3>
                  <p className="megamenu-col-desc">
                    High-performance digital products engineered for scalability, ironclad security, and peak speed.
                  </p>
                </div>

                <div className="megamenu-links-list">
                  {column3Items.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <a
                        key={idx}
                        href={item.href}
                        className="megamenu-item-row"
                        onClick={onClose}
                      >
                        <div className="megamenu-item-left">
                          <span className="megamenu-item-icon-box megamenu-item-icon-box--blue">
                            <IconComponent size={15} strokeWidth={2} />
                          </span>
                          <span className="megamenu-item-text">{item.label}</span>
                        </div>
                        <ArrowRight size={14} className="megamenu-item-arrow" />
                      </a>
                    );
                  })}
                </div>

                <a href="#services" className="megamenu-footer-cta" onClick={onClose}>
                  <span>View All Software Services</span>
                  <ArrowRight size={13} />
                </a>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ServicesMegaMenu;

