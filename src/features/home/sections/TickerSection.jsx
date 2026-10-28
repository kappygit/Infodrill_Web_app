import React from 'react';
import './TickerSection.css';

export function TickerSection() {
  return (
    <section className="ticker-section" aria-label="Our Enterprise Clients">
      <div className="ticker-container">
        <div className="ticker-heading-wrap">
          <span className="ticker-heading-eyebrow">TRUSTED ENTERPRISE INFRASTRUCTURE</span>
          <h3 className="ticker-heading">Powering Critical Operations for Growing Companies</h3>
        </div>
        
        <div className="ticker-logos-grid">
          {/* 1. SwitchMYLoan.in */}
          <div className="client-logo client-logo--switchmyloan">
            <span className="sml-text-1">Switch</span>
            <span className="sml-badge">MY</span>
            <span className="sml-text-2">Loan.in</span>
          </div>

          {/* 2. Colour Olive */}
          <div className="client-logo client-logo--colourolive">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#84CC16" strokeWidth="2" />
              <circle cx="12" cy="12" r="4.5" fill="#84CC16" />
            </svg>
            <span className="co-text">Colour Olive</span>
          </div>

          {/* 3. Paperchase */}
          <div className="client-logo client-logo--paperchase">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="7" cy="7" r="4" fill="#38BDF8" />
              <circle cx="17" cy="7" r="4" fill="#38BDF8" />
              <circle cx="7" cy="17" r="4" fill="#38BDF8" />
              <circle cx="17" cy="17" r="4" fill="#38BDF8" />
            </svg>
            <div className="pc-text-wrap">
              <span className="pc-title">paperchase</span>
              <span className="pc-sub">business services</span>
            </div>
          </div>

          {/* 4. EXILLAR */}
          <div className="client-logo client-logo--exillar">
            <svg width="22" height="18" viewBox="0 0 24 20" fill="none">
              <polygon points="0,20 8,0 16,0 8,20" fill="#38BDF8" />
              <polygon points="12,20 20,0 24,0 16,20" fill="#38BDF8" opacity="0.6" />
            </svg>
            <span className="ex-text">EXILLAR</span>
          </div>

          {/* 5. OnData Services */}
          <div className="client-logo client-logo--ondata">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" stroke="#06B6D4" strokeWidth="2" strokeLinejoin="round" />
              <path d="M12 6L18 9.5V14.5L12 18L6 14.5V9.5L12 6Z" fill="#06B6D4" opacity="0.4" />
            </svg>
            <div className="od-text-wrap">
              <span className="od-title">OnData Services</span>
              <span className="od-sub">we power your growth</span>
            </div>
          </div>

          {/* 6. StepGroow */}
          <div className="client-logo client-logo--stepgroow">
            <span className="sg-step">Step</span>
            <span className="sg-slash">/</span>
            <span className="sg-groow">Groow</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TickerSection;
