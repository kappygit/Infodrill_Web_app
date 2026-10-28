import React from 'react';
import { Container } from '../../../components/ui/Container';
import { AlertCircle, CheckCircle2, ShieldX, TrendingDown, Cpu, ArrowRight } from 'lucide-react';
import './ValuePropositionSection.css';

export function ValuePropositionSection() {
  const deterrents = [
    {
      icon: ShieldX,
      title: 'Brittle Monoliths & Seat Licenses',
      description: 'Legacy proprietary ERPs trap enterprises in recurring per-seat fees that escalate with headcount, while rigid codebases fail to adapt to custom manufacturing workflows.',
      tag: 'FINANCIAL DRAIN',
      riskStat: '$180K+ / yr in seat taxes',
    },
    {
      icon: TrendingDown,
      title: 'Shallow AI Wrappers & Hallucinations',
      description: 'Generic AI chatbots without strict Pydantic schemas, vector guardrails, or ERP writeback lead to catastrophic hallucinations in mission-critical operations.',
      tag: 'OPERATIONAL RISK',
      riskStat: '42% validation failure rate',
    },
    {
      icon: AlertCircle,
      title: 'Disconnected Operational Silos',
      description: 'Procurement, CRM, GL accounting, and warehouse inventory remain isolated across 8+ SaaS subscriptions, blinding executive leadership to real-time cash leaks.',
      tag: 'DATA BLINDNESS',
      riskStat: '14+ manual CSV handoffs',
    },
    {
      icon: CheckCircle2,
      title: 'The Info Drill Architectural Remedy',
      description: 'Zero-license ERPNext open-core deployments paired with deterministic multi-agent state machines, guaranteeing 100% data sovereignty, instant GL sync, and zero seat fees.',
      tag: 'THE INFO DRILL REMEDY',
      riskStat: '100% Data Sovereignty · $0 Seat Fees',
      isHighlight: true,
    },
  ];

  return (
    <section className="deterrents-section" id="about">
      <Container>
        <div className="deterrents-card">
          <div className="deterrents-card__header">
            <span className="deterrents-eyebrow">EXECUTIVE OPERATIONAL DIAGNOSTIC</span>
            <h2 className="deterrents-card__title">
              What Deters Most Enterprises from Operational Excellence?
            </h2>
            <p className="deterrents-card__subtitle">
              Most growth-focused enterprises are held back by the burden of fragmented SaaS tools, 
              brittle manual processes, hallucination-prone AI prototypes, and skyrocketing software license bills.
            </p>
          </div>

          <div className="deterrents-grid">
            {deterrents.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`deterrent-item ${item.isHighlight ? 'deterrent-item--highlight' : ''}`}
                >
                  <div className="deterrent-item__top">
                    <div className="deterrent-item__icon-wrap">
                      <Icon size={20} className="deterrent-item__icon" aria-hidden="true" />
                    </div>
                    <span className="deterrent-item__tag">{item.tag}</span>
                  </div>

                  <h3 className="deterrent-item__title">{item.title}</h3>
                  <p className="deterrent-item__desc">{item.description}</p>

                  <div className="deterrent-item__stat">
                    <span className="stat-label">IMPACT / GUARANTEE:</span>
                    <span className="stat-value">{item.riskStat}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ValuePropositionSection;
