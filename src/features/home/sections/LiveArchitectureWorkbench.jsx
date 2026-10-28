import React, { useState } from 'react';
import { Container } from '../../../components/ui/Container';
import { SectionHeading } from '../../../components/ui/SectionHeading';
import { Play, Check, Cpu, ArrowRight, ShieldCheck, Database, Layers, Activity, RefreshCw } from 'lucide-react';
import './LiveArchitectureWorkbench.css';

const scenarios = [
  {
    id: 'procurement',
    label: 'Automated Procurement',
    doctype: 'Purchase Order #PO-9412',
    inputEvent: 'Vendor Invoice PDF Received (Via Webhook)',
    steps: [
      { name: 'OCR & Parsing', agent: 'Document Parser', status: 'Verified', time: '18ms' },
      { name: 'Schema Validation', agent: 'Pydantic Gate', status: '100% Match', time: '8ms' },
      { name: 'ERP Reconciliation', agent: 'ERPNext Sync', status: 'Matched PO-9412', time: '42ms' },
      { name: 'GL Ledger Commit', agent: 'Frappe GL Agent', status: 'Committed', time: '26ms' },
    ],
    output: 'ERPNext Purchase Invoice generated, matched, and scheduled for payment with zero manual human data entry.',
  },
  {
    id: 'healthcare',
    label: 'Clinical Authorization',
    doctype: 'Prior Authorization #PA-3104',
    inputEvent: 'Patient Intake & Clinical Chart Event',
    steps: [
      { name: 'EHR Parsing', agent: 'HIPAA Gateway', status: 'De-identified', time: '22ms' },
      { name: 'RAG Policy Check', agent: 'Vector Qdrant', status: 'Guidelines Matched', time: '35ms' },
      { name: 'Adjudication Review', agent: 'Clinical Agent', status: 'Criteria Met', time: '54ms' },
      { name: 'EHR Writeback', agent: 'FHIR REST Bridge', status: 'Approved', time: '31ms' },
    ],
    output: 'Prior authorization request validated against clinical guidelines with deterministic cited evidence in sub-150ms.',
  },
  {
    id: 'inventory',
    label: 'Inventory Rebalancing',
    doctype: 'Stock Entry #STE-2026',
    inputEvent: 'Demand Surge Detected in Northern Distribution Hub',
    steps: [
      { name: 'Surge Telemetry', agent: 'Event Listener', status: 'Threshold Exceeded', time: '12ms' },
      { name: 'Warehouse Stock Check', agent: 'ERPNext Inventory', status: 'Central Has 4,200 Units', time: '28ms' },
      { name: 'Route Optimization', agent: 'Logistics Planner', status: 'Lowest Cost Route', time: '48ms' },
      { name: 'Stock Transfer Ticket', agent: 'Frappe Stock Engine', status: 'Dispatched', time: '19ms' },
    ],
    output: 'Automated inter-warehouse stock transfer ticket created and carrier pickup scheduled instantaneously.',
  },
  {
    id: 'financial',
    label: 'Financial Audit & GL Sync',
    doctype: 'Journal Entry #JV-5820',
    inputEvent: 'End-of-Month Multi-Currency Reconciliation Trigger',
    steps: [
      { name: 'Bank Feed Ingestion', agent: 'Treasury Sync', status: '14,200 Tx Balanced', time: '45ms' },
      { name: 'Currency FX Variance', agent: 'FX Rate Engine', status: 'Arbitrage Cleared', time: '16ms' },
      { name: 'Anomaly & Fraud Gate', agent: 'Guardrail Agent', status: 'Zero Flags', time: '38ms' },
      { name: 'GL Ledger Close', agent: 'ERPNext Accounts', status: 'Closed & Locked', time: '29ms' },
    ],
    output: 'Multi-currency general ledger closed and reconciled with an immutable cryptographic audit record.',
  },
];

export function LiveArchitectureWorkbench() {
  const [activeScenarioId, setActiveScenarioId] = useState('procurement');
  const [volume, setVolume] = useState(25); // thousands of tx / mo
  const [isRunning, setIsRunning] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(3);

  const scenario = scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];

  const handleRunExecution = () => {
    setIsRunning(true);
    setActiveStepIndex(0);
    setTimeout(() => setActiveStepIndex(1), 300);
    setTimeout(() => setActiveStepIndex(2), 700);
    setTimeout(() => {
      setActiveStepIndex(3);
      setIsRunning(false);
    }, 1100);
  };

  // Dynamic calculations
  const legacySaaSAnnualCost = Math.round(volume * 190 + 15000);
  const infoDrillCloudCost = Math.round(volume * 19 + 3200);
  const annualSavings = legacySaaSAnnualCost - infoDrillCloudCost;
  const p95Latency = Math.round(38 + (volume * 0.25));

  return (
    <section className="workbench-section" id="workbench">
      <Container>
        <div className="workbench-header">
          <span className="workbench-eyebrow">INTERACTIVE AGENTIC WORKBENCH</span>
          <h2 className="workbench-title">
            Test the Info Drill Autonomous State Machine
          </h2>
          <p className="workbench-subtitle">
            Simulate how Info Drill replaces manual human bottleneck queues with deterministic multi-agent 
            state machines and open-core ERPNext workflows.
          </p>
        </div>

        <div className="workbench-container" data-ui>
          {/* Top Scenario Selector Tabs */}
          <div className="workbench-tabs" role="tablist" aria-label="Select Workflow Scenario">
            {scenarios.map((sc) => (
              <button
                key={sc.id}
                type="button"
                className={`workbench-tab ${activeScenarioId === sc.id ? 'workbench-tab--active' : ''}`}
                onClick={() => {
                  setActiveScenarioId(sc.id);
                  setActiveStepIndex(3);
                }}
              >
                <span>{sc.label}</span>
              </button>
            ))}
          </div>

          {/* Main Interactive Stage */}
          <div className="workbench-stage">
            {/* Live Pipeline Flow Visual */}
            <div className="pipeline-flow">
              <div className="pipeline-flow__header">
                <div className="pipeline-flow__trigger">
                  <span className="pipeline-pulse-dot" />
                  <span className="pipeline-trigger-text">{scenario.inputEvent}</span>
                </div>
                <div className="pipeline-flow__actions">
                  <span className="pipeline-target-text">{scenario.doctype}</span>
                  <button 
                    type="button" 
                    className="pipeline-run-btn"
                    onClick={handleRunExecution}
                    disabled={isRunning}
                  >
                    <RefreshCw size={13} className={isRunning ? 'spin-icon' : ''} />
                    <span>{isRunning ? 'EXECUTING...' : 'RUN PIPELINE'}</span>
                  </button>
                </div>
              </div>

              {/* 4 Execution Steps */}
              <div className="pipeline-steps-grid">
                {scenario.steps.map((step, idx) => {
                  const isActive = activeStepIndex >= idx;
                  return (
                    <div 
                      key={idx} 
                      className={`pipeline-step-node ${isActive ? 'pipeline-step-node--active' : ''}`}
                    >
                      <div className="pipeline-step-node__top">
                        <span className="pipeline-step-agent">{step.agent}</span>
                        <span className="pipeline-step-time">{step.time}</span>
                      </div>
                      <div className="pipeline-step-node__name">{step.name}</div>
                      <div className="pipeline-step-node__status">
                        <Check size={13} className="pipeline-step-check" />
                        <span>{step.status}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Verified Result Banner */}
              <div className="pipeline-result-banner">
                <ShieldCheck size={22} className="pipeline-result-icon" />
                <p className="pipeline-result-text">{scenario.output}</p>
              </div>
            </div>

            {/* Real-Time Enterprise Economics Calculator */}
            <div className="workbench-calculator">
              <div className="calc-header-group">
                <h4 className="calc-title">Enterprise Load & Cost Economics Simulator</h4>
                <p className="calc-desc">
                  Adjust expected monthly transaction volume to simulate compute latency, zero-hallucination rate, and cost savings vs legacy SaaS:
                </p>
              </div>

              <div className="calc-slider-wrap">
                <div className="calc-slider-header">
                  <span className="calc-slider-label">Simulated Monthly Event Volume</span>
                  <span className="calc-slider-value">{volume.toLocaleString()}k events / month</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="calc-range-input"
                  aria-label="Monthly Transaction Volume"
                />
              </div>

              <div className="calc-metrics-grid">
                <div className="calc-metric-card">
                  <span className="calc-metric-lbl">Deterministic P95 Latency</span>
                  <span className="calc-metric-val calc-metric-val--cyan">{p95Latency}ms</span>
                </div>
                <div className="calc-metric-card">
                  <span className="calc-metric-lbl">Hallucination Rate</span>
                  <span className="calc-metric-val calc-metric-val--emerald">0.00% (Guaranteed)</span>
                </div>
                <div className="calc-metric-card">
                  <span className="calc-metric-lbl">Estimated Annual Savings</span>
                  <span className="calc-metric-val calc-metric-val--amber">${annualSavings.toLocaleString()}</span>
                </div>
                <div className="calc-metric-card">
                  <span className="calc-metric-lbl">Data Sovereignty</span>
                  <span className="calc-metric-val calc-metric-val--indigo">100% Private VPC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default LiveArchitectureWorkbench;
