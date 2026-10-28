import React from 'react';
import { Container } from '../../../components/ui/Container';
import { Search, Compass, ShieldCheck, Rocket, ArrowRight } from 'lucide-react';
import './ProcessApproachSection.css';

const steps = [
  {
    stepNumber: '01',
    icon: Search,
    title: 'Architecture & Schema Audit',
    subtitle: 'STAGE 1: INVESTIGATION',
    description:
      'We audit legacy databases, undocumented APIs, process bottlenecks, and compliance parameters to construct an immutable technical architecture contract.',
    deliverable: 'Architecture Contract & Threat Model',
  },
  {
    stepNumber: '02',
    icon: Compass,
    title: 'Rapid Prototyping & Schema Design',
    subtitle: 'STAGE 2: VALIDATION',
    description:
      'We validate data flows, model ERPNext DocType schemas, and test agent decision boundaries with real enterprise payloads before full rollout.',
    deliverable: 'Interactive MVP & Verified Test Fixtures',
  },
  {
    stepNumber: '03',
    icon: ShieldCheck,
    title: 'Security Hardening & Eval Gateways',
    subtitle: 'STAGE 3: SECURITY GATES',
    description:
      'Rigorous penetration testing, SOC2/HIPAA compliance verification, automated regression suites, and edge-case hallucination stress testing.',
    deliverable: 'Audit Sign-off & Automated CI/CD Gates',
  },
  {
    stepNumber: '04',
    icon: Rocket,
    title: 'Production Scale & Live Observability',
    subtitle: 'STAGE 4: PRODUCTION ROLLOUT',
    description:
      'Containerized deployment on high-availability private infrastructure with real-time distributed tracing, metrics dashboards, and automated scaling.',
    deliverable: 'P99 SLA Guarantee & 24/7 Runbook',
  },
];

export function ProcessApproachSection() {
  return (
    <section className="process-section" id="process">
      <Container>
        <div className="process-header">
          <span className="process-eyebrow">DETERMINISTIC DELIVERY</span>
          <h2 className="process-title">
            The 4-Stage Precision Delivery Lifecycle
          </h2>
          <p className="process-subtitle">
            How Info Drill transforms complex enterprise operational challenges into deterministic, 
            high-performance software systems on guaranteed timelines.
          </p>
        </div>

        <div className="process-timeline">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="process-step-card">
                <div className="process-step-card__top">
                  <div className="process-step-card__icon-box">
                    <Icon size={20} className="process-step-card__icon" aria-hidden="true" />
                  </div>
                  <span className="process-step-card__num">{item.stepNumber}</span>
                </div>

                <span className="process-step-card__subtitle">{item.subtitle}</span>
                <h3 className="process-step-card__title">{item.title}</h3>
                <p className="process-step-card__desc">{item.description}</p>

                <div className="process-step-card__deliverable">
                  <span className="deliverable-label">SIGNED DELIVERABLE:</span>
                  <span className="deliverable-value">{item.deliverable}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default ProcessApproachSection;
