import React from 'react';
import { Container } from '../../../components/ui/Container';
import { Button } from '../../../components/ui/Button';
import { ArrowRight, Cpu, Server, ShieldCheck, DollarSign, Activity, CheckCircle2 } from 'lucide-react';
import './CompanyDifferentiatorsSection.css';

export function CompanyDifferentiatorsSection() {
  const cards = [
    {
      badge: 'DEEP AGENTIC ARCHITECTURE',
      title: 'Specialized Multi-Agent AI & Custom Frappe Framework Engineering',
      description: 'We do not build flimsy wrapper bots. We engineer deterministic state machines with Pydantic type validation, vector embedding retrieval, and ACID transactional writebacks to ERPNext.',
      icon: Cpu,
      stats: [
        { label: 'Agent Verification', value: '100% Deterministic' },
        { label: 'Framework Engine', value: 'Frappe + LangGraph' },
      ],
      highlightColor: 'cyan',
    },
    {
      badge: 'MISSION-CRITICAL RELIABILITY',
      title: 'Proven Track Record in High-Volume ERPNext Enterprise Deployments',
      description: 'From multi-plant discrete manufacturing to multi-currency global trading firms, our tailored ERPNext implementations run live operations with 99.99% uptime and zero-downtime upgrades.',
      icon: Server,
      stats: [
        { label: 'Transactions Run', value: '14.2M+ Annually' },
        { label: 'Core Uptime SLA', value: '99.99% Guaranteed' },
      ],
      highlightColor: 'emerald',
    },
    {
      badge: 'DATA SOVEREIGNTY',
      title: '100% Private Cloud & On-Premise Infrastructure Sovereignty',
      description: 'Your proprietary financial ledgers, clinical charts, and supplier cost databases never leave your private VPC. We deploy private open LLMs and sovereign databases with end-to-end encryption.',
      icon: ShieldCheck,
      stats: [
        { label: 'Deployment Mode', value: 'Private VPC / On-Prem' },
        { label: 'Data Leakage Risk', value: 'Absolute Zero' },
      ],
      highlightColor: 'amber',
    },
    {
      badge: 'FINANCIAL EFFICIENCY',
      title: 'Zero Recurring Per-Seat Software Taxes, Forever',
      description: 'Scale from 50 to 5,000 employees across 20 warehouses without paying a penny more in license fees. Open-core ERPNext eliminates recurring software extortion and gives you permanent asset ownership.',
      icon: DollarSign,
      stats: [
        { label: 'Per-Seat License Cost', value: '$0 Forever' },
        { label: 'Average Client ROI', value: '380% Over 3 Yrs' },
      ],
      highlightColor: 'indigo',
    },
  ];

  return (
    <section className="why-choose-section" id="why-choose">
      <Container>
        <div className="why-choose-header">
          <span className="why-eyebrow">THE ARCHITECTURAL ADVANTAGE</span>
          <h2 className="why-choose-title">
            Why High-Performance Enterprises Build on Info Drill
          </h2>
          <p className="why-choose-subtitle">
            We merge deep systems engineering with enterprise ERP discipline and cutting-edge autonomous AI. 
            No proprietary lock-in. No bloated consultancy hand-waving.
          </p>
        </div>

        <div className="why-grid">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className={`why-card why-card--${card.highlightColor}`}>
                <div className="why-card__top">
                  <span className="why-card__badge">{card.badge}</span>
                  <div className="why-card__icon">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                </div>

                <h3 className="why-card__title">{card.title}</h3>
                <p className="why-card__desc">{card.description}</p>

                <div className="why-card__stats-grid">
                  {card.stats.map((s, sIdx) => (
                    <div key={sIdx} className="why-stat-box">
                      <span className="why-stat-label">{s.label}</span>
                      <span className="why-stat-val">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Callout */}
        <div className="why-banner">
          <div className="why-banner__text">
            <span className="why-banner__title">Ready to eliminate your legacy ERP license tax?</span>
            <span className="why-banner__sub">Request an architectural feasibility assessment with our senior systems engineers.</span>
          </div>
          <Button as="a" href="#contact" variant="primary" size="md" icon={ArrowRight}>
            START ARCHITECTURE ASSESSMENT
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default CompanyDifferentiatorsSection;
