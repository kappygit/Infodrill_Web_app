import React, { useState } from 'react';
import { Container } from '../../../components/ui/Container';
import { Terminal, Database, Server, Shield, Layers, Code, Check } from 'lucide-react';
import './TechnologyCapabilitiesSection.css';

const techCategories = [
  {
    id: 'ai-agents',
    label: 'AI & Multi-Agent Swarms',
    icon: Terminal,
    description: 'Deterministic agentic state machines, vector embedding indexing, and private VPC LLM inference without hallucination risks.',
    techs: [
      { name: 'Python 3.12 (Async)', detail: 'High-Throughput Core Services' },
      { name: 'LangGraph & AutoGen', detail: 'State Machine Multi-Agent Routing' },
      { name: 'FastAPI Microservices', detail: 'Sub-10ms REST Endpoints' },
      { name: 'Qdrant & Pinecone', detail: 'Private Vector Knowledge Embeddings' },
      { name: 'LlamaIndex Enterprise', detail: 'Deterministic Document Parsing' },
      { name: 'Ollama & vLLM Engine', detail: 'Private On-Premise GPU Inference' },
    ],
  },
  {
    id: 'erp-frappe',
    label: 'Enterprise ERP & Frappe',
    icon: Server,
    description: 'Open-core ERPNext deployments configured for zero downtime, strict transactional integrity, and extreme scalability.',
    techs: [
      { name: 'ERPNext v15 Production', detail: 'Certified Open-Core ERP Engine' },
      { name: 'Frappe Framework Core', detail: 'Custom Business Logic & DocTypes' },
      { name: 'MariaDB 10.6 / Postgres', detail: 'ACID Relational Storage' },
      { name: 'Redis Cache & RQ Queues', detail: 'Asynchronous Background Workers' },
      { name: 'Docker Compose & Swarm', detail: 'Zero-Downtime Live Migrations' },
      { name: 'Bi-Directional Webhooks', detail: 'Sub-Second External ERP Sync' },
    ],
  },
  {
    id: 'frontend',
    label: 'Modern Frontend & Web',
    icon: Code,
    description: 'Ultra-fast React architectures engineered for zero layout shifts, accessible interfaces, and sub-second interaction speed.',
    techs: [
      { name: 'React 18.3 & Vite 6', detail: 'Modular Enterprise SPA Architecture' },
      { name: 'Vanilla CSS Design Tokens', detail: 'High-Performance Zero-Runtime CSS' },
      { name: 'Lucide SVG Iconography', detail: 'Accessible Consistent Vectors' },
      { name: 'Sub-Second Core Web Vitals', detail: '99+ Lighthouse Mobile Performance' },
      { name: 'Strict TypeScript Types', detail: 'Deterministic Client State' },
      { name: 'Real-Time WebSockets', detail: 'Live Pipeline Telemetry Feeds' },
    ],
  },
  {
    id: 'cloud-security',
    label: 'Cloud, Observability & Security',
    icon: Shield,
    description: 'Defense-in-depth infrastructure with complete cryptographic compliance, immutable audit trails, and 99.99% SLA.',
    techs: [
      { name: 'AWS ECS / EKS Clusters', detail: 'Containerized Resilient Deployment' },
      { name: 'OpenTelemetry & Prometheus', detail: 'Distributed Microservice Tracing' },
      { name: 'Hardened GitHub Actions', detail: 'Automated CI/CD with Zero Trust' },
      { name: 'HashiCorp Vault & KMS', detail: 'Hardware-Level Secrets Encryption' },
      { name: 'Cloudflare Enterprise', detail: 'Edge WAF, DDoS & CDN Shielding' },
      { name: 'SOC2 & HIPAA Compliant', detail: 'Immutable Audit Trail Verification' },
    ],
  },
];

export function TechnologyCapabilitiesSection() {
  const [activeTab, setActiveTab] = useState(techCategories[0].id);
  const currentCategory = techCategories.find((c) => c.id === activeTab) || techCategories[0];
  const IconComponent = currentCategory.icon;

  return (
    <section className="tech-capabilities-section" id="capabilities">
      <Container>
        <div className="tech-section-header">
          <span className="tech-eyebrow">BATTLE-TESTED ENTERPRISE STACK</span>
          <h2 className="tech-section-title">
            Open-Core Technologies. Zero Proprietary Lock-In.
          </h2>
          <p className="tech-section-subtitle">
            We select production-proven frameworks designed for extreme reliability, 
            complete data sovereignty, and deterministic enterprise execution.
          </p>
        </div>

        <div className="tech-matrix-container">
          {/* Navigation Category Tabs */}
          <div className="tech-tabs" role="tablist">
            {techCategories.map((cat) => {
              const TabIcon = cat.icon;
              const isActive = cat.id === activeTab;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`tech-tab ${isActive ? 'tech-tab--active' : ''}`}
                  onClick={() => setActiveTab(cat.id)}
                >
                  <TabIcon size={16} className="tech-tab__icon" aria-hidden="true" />
                  <span className="tech-tab__label">{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Category Display Panel */}
          <div className="tech-panel">
            <div className="tech-panel__header">
              <div className="tech-panel__badge">
                <IconComponent size={18} className="tech-panel__badge-icon" aria-hidden="true" />
                <span>{currentCategory.label}</span>
              </div>
              <p className="tech-panel__desc">{currentCategory.description}</p>
            </div>

            <div className="tech-grid">
              {currentCategory.techs.map((tech, idx) => (
                <div key={idx} className="tech-item-card">
                  <div className="tech-item-card__indicator">
                    <Check size={14} className="tech-item-card__check" aria-hidden="true" />
                  </div>
                  <div className="tech-item-card__content">
                    <div className="tech-item-card__name">{tech.name}</div>
                    <div className="tech-item-card__detail">{tech.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default TechnologyCapabilitiesSection;
