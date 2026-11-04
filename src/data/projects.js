/**
 * INFODRILL AI SOLUTIONS — Projects Data Store
 * Flagship projects featured in Portfolio and dedicated project detail pages.
 */

export const projects = [
  {
    slug: 'call-info',
    title: 'Call Info',
    tagline: 'Intelligent Voice & Telephony Analytics Platform',
    summary: 'Automated call recording analysis, sentiment tracking, and CRM synchronization.',
    category: 'Voice AI & Telephony',
    description:
      'Call Info is an enterprise telephony intelligence and analytics platform engineered by InfoDrill. It integrates directly with VoIP, PBX, and mobile call infrastructure to automatically transcribe conversations, detect customer sentiment, extract action items, and sync call history with your ERP and CRM systems in real time.',
    features: [
      {
        title: 'Real-Time Speech-to-Text & Summaries',
        desc: 'Instant multilingual audio transcription and AI-generated call summaries stored directly in your customer ledger.',
      },
      {
        title: 'Sentiment & Intent Detection',
        desc: 'Identifies caller emotion, dissatisfaction indicators, and purchase intent signals with 96% classification accuracy.',
      },
      {
        title: 'Automated CRM & ERP Sync',
        desc: 'Eliminates post-call manual logging by automatically updating contact records, deals, and support tickets.',
      },
      {
        title: 'Escalation & SLA Alerts',
        desc: 'Immediate Slack, WhatsApp, and email alerts when high-value accounts or critical issues are detected on calls.',
      },
      {
        title: 'Agent Performance Analytics',
        desc: 'Objective scoring of talk-to-listen ratios, script adherence, resolution speed, and customer satisfaction metrics.',
      },
      {
        title: 'Enterprise Encryption & Compliance',
        desc: 'End-to-end 256-bit AES audio encryption, role-based access, and complete telecom compliance auditing.',
      },
    ],
    techStack: ['React', 'Node.js', 'Python Whisper', 'PostgreSQL', 'WebRTC', 'FastAPI'],
    image: '/images/projects/call-info.svg',
    stats: [
      { label: 'Transcription Accuracy', value: '98.4%' },
      { label: 'Post-Call Logging Time Saved', value: '85%' },
      { label: 'Daily Calls Processed', value: '100K+' },
    ],
  },
  {
    slug: 'task-manager',
    title: 'Task Manager',
    tagline: 'Collaborative Enterprise Workflow & Project Execution Engine',
    summary: 'Smart task allocation, team capacity planning, and automated milestone tracking.',
    category: 'Enterprise Productivity',
    description:
      'Task Manager delivers structured, high-velocity project management built specifically for growing businesses. Replace fragmented spreadsheets and chaotic message threads with automated task assignments, milestone dependencies, real-time workload heatmaps, and seamless ERP inventory synchronization.',
    features: [
      {
        title: 'Multi-View Project Boards',
        desc: 'Seamlessly toggle between Kanban boards, Gantt timelines, calendar sprints, and detailed tabular execution lists.',
      },
      {
        title: 'Automated Workload Balancing',
        desc: 'Smart resource allocation algorithms prevent team burnout by automatically distributing tasks based on capacity.',
      },
      {
        title: 'Milestone Dependency Tracking',
        desc: 'Critical path analysis highlights bottleneck risks before they delay client deliverables or supply chain dispatches.',
      },
      {
        title: 'ERP & Inventory Linking',
        desc: 'Directly attach production work orders, raw material requisitions, and purchase orders to project tasks.',
      },
      {
        title: 'Automated Approval Pipelines',
        desc: 'Multi-tier sign-off workflows for budgets, client change requests, and quality-check verifications.',
      },
      {
        title: 'Role-Based Audit & Time Logs',
        desc: 'Granular permissions, billable hour tracking, and immutable audit trails for complete operational transparency.',
      },
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Redis', 'PostgreSQL'],
    image: '/images/projects/task-manager.svg',
    stats: [
      { label: 'On-Time Delivery Rate', value: '99.2%' },
      { label: 'Weekly Management Hours Saved', value: '18 hrs' },
      { label: 'Active Tasks Tracked', value: '500K+' },
    ],
  },
  {
    slug: 'optimize',
    title: 'Optimize',
    tagline: 'AI-Powered Operations & Supply Chain Optimization Suite',
    summary: 'Predictive inventory forecasting, automated route planning, and cost reduction.',
    category: 'AI & Operations',
    description:
      'Optimize is InfoDrill’s algorithmic operations engine that spots bottlenecks, forecasts stock demand, and fine-tunes resource utilization across your entire supply chain. Using machine learning models tailored to local business patterns, Optimize reduces inventory holding costs while boosting order fulfillment speed.',
    features: [
      {
        title: 'Predictive Demand Forecasting',
        desc: 'ML models analyze seasonal order patterns, supplier lead times, and market trends to prevent stockouts.',
      },
      {
        title: 'Multi-Warehouse Route Planning',
        desc: 'Automated dispatch routing minimizes fuel expenditure and delivery turnarounds for multi-branch fleets.',
      },
      {
        title: 'Margin & Cost Leakage Detection',
        desc: 'Real-time financial anomaly scanning flags hidden procurement variances, dead stock, and price fluctuations.',
      },
      {
        title: 'Vendor SLA & Scorecard Engine',
        desc: 'Automatically evaluate vendor reliability, delivery timeliness, defect ratios, and pricing competitiveness.',
      },
      {
        title: 'Autonomous Stock Replenishment',
        desc: 'Algorithmic purchase-order triggering directly integrated with vendor APIs when reorder thresholds are crossed.',
      },
      {
        title: 'Executive ROI Analytics',
        desc: 'High-level dashboard forecasting quarterly operating margins, working capital efficiency, and carbon footprint.',
      },
    ],
    techStack: ['React', 'Python', 'TensorFlow', 'FastAPI', 'PostgreSQL', 'Docker'],
    image: '/images/projects/optimize.svg',
    stats: [
      { label: 'Inventory Cost Reduction', value: '23%' },
      { label: 'Order Dispatch Acceleration', value: '2.4x' },
      { label: 'Forecast Accuracy', value: '97.1%' },
    ],
  },
];

/**
 * Helper to get a project by slug
 */
export function getProjectBySlug(slug) {
  if (!slug) return null;
  const normalized = slug.trim().toLowerCase();
  return projects.find((p) => p.slug.toLowerCase() === normalized) || null;
}

export default projects;

