import React from 'react';
import { Container } from '../../../components/ui/Container';
import { projectsData } from '../../projects/data/projectsData';
import { ArrowUpRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import './ProjectCaseStudiesSection.css';

export function ProjectCaseStudiesSection() {
  return (
    <section className="case-studies-section" id="case-studies">
      <Container>
        <div className="case-studies-header">
          <span className="case-studies-eyebrow">PRODUCTION TRACK RECORD</span>
          <h2 className="case-studies-title">
            Enterprise Impact Across Critical Industries
          </h2>
          <p className="case-studies-subtitle">
            Explore live production environments where Info Drill solved high-concurrency event telemetry, 
            automated ERPNext logistics, and private multi-agent AI pipelines.
          </p>
        </div>

        <div className="case-studies-grid">
          {projectsData.map((project) => (
            <article key={project.id} className="case-study-card">
              <div className="case-study-card__header">
                <span className="case-study-card__tag">{project.tag}</span>
                <span className="case-study-card__category">{project.category}</span>
              </div>

              <h3 className="case-study-card__title">{project.title}</h3>
              <p className="case-study-card__summary">{project.summary}</p>

              {/* Verified Metrics Strip */}
              <div className="case-study-card__metrics">
                {project.metrics.map((metric, idx) => (
                  <div key={idx} className="metric-badge">
                    <span className="metric-badge__value">{metric.value}</span>
                    <span className="metric-badge__label">{metric.label}</span>
                  </div>
                ))}
              </div>

              {/* Technologies Applied */}
              <div className="case-study-card__footer">
                <div className="case-study-card__tech-stack">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ProjectCaseStudiesSection;
