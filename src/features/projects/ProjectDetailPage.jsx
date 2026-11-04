import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  PhoneCall,
  CheckSquare,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  Zap,
  BarChart3,
  Calendar,
  Users,
  LayoutDashboard,
  Building2,
  Mic,
  MapPin,
  FileSpreadsheet,
  CreditCard,
  Settings
} from 'lucide-react';
import { useRoute } from '../../context/RouteContext';
import { useModal } from '../../context/ModalContext';
import { getProjectBySlug, projects } from '../../data/projects';
import { ProductShowcaseSection } from '../../components/ProductShowcaseSection';
import './ProjectDetailPage.css';

const CALL_INFO_SHOWCASE_ITEMS = [
  {
    id: 'dashboard',
    badge: 'Live Telecalling',
    badgeVariant: 'blue',
    title: 'Live Call Performance',
    description: 'Today, Yesterday and Last Week telecalling statistics unified in one centralized executive view.',
    points: [
      'Real-time volume tracking across incoming, outgoing, and missed calls',
      'Daily and weekly connected talk-time duration monitoring',
      'Instant visibility into unique clients connected and team output',
    ],
    image: '/images/callinfo/dashboard.png',
    floatingChip: { label: 'Live Sync', icon: Zap, variant: 'blue' },
  },
  {
    id: 'leads',
    badge: 'Smart CRM',
    badgeVariant: 'emerald',
    title: 'Smart Lead Management',
    description: 'Add, import, assign and track sales leads across your organization with frictionless pipelines.',
    points: [
      'Multi-tag lead categorization and bulk CSV contact imports',
      'Automatic distribution by branch, company territory, or individual executive',
      'Full attempt counts, follow-up scheduler, and real-time status progression',
    ],
    image: '/images/callinfo/leads.png',
    floatingChip: { label: 'Lead Tracking', icon: Users, variant: 'emerald' },
  },
  {
    id: 'overview-report',
    badge: 'Staff Analytics',
    badgeVariant: 'indigo',
    title: 'Employee Performance Reports',
    description: 'Lead allocation, contact rates and status distribution evaluated with complete transparency.',
    points: [
      'Employee-wise contact rate benchmarks and assigned lead quota tracking',
      'Granular date range filters with one-click export to CSV spreadsheets',
      'Objective visibility into team conversion rates and follow-up discipline',
    ],
    image: '/images/callinfo/overview-report.png',
    floatingChip: { label: 'Real-time Reports', icon: BarChart3, variant: 'indigo' },
  },
  {
    id: 'call-history',
    badge: 'Telecom Audit',
    badgeVariant: 'blue',
    title: 'Complete Call Logs',
    description: 'Filter comprehensive call logs by tag, employee, call type, status, duration and date.',
    points: [
      'Detailed call logs with duration counters, timestamps, and caller tags',
      'Multi-parameter filter engine for swift compliance audits and dispute checks',
      'Direct integration with client CRM history and communication ledgers',
    ],
    image: '/images/callinfo/call-history.png',
    floatingChip: { label: 'Complete Call Logs', icon: PhoneCall, variant: 'blue' },
  },
  {
    id: 'settings',
    badge: 'Device Sync',
    badgeVariant: 'indigo',
    title: 'Easy Setup and Device Connection',
    description: 'Company profile, Android device sync and automated cloud backup parameters configured in minutes.',
    points: [
      'Instant Android smartphone pairing using unique alphanumeric pairing codes',
      'Customizable sync intervals and background auto-backup protocols',
      'Centralized company profile management and role-based access permissions',
    ],
    image: '/images/callinfo/settings.png',
    floatingChip: { label: 'Auto-Sync Active', icon: CheckCircle2, variant: 'indigo' },
  },
];

const TASK_MANAGER_SHOWCASE_ITEMS = [
  {
    id: 'dashboard',
    badge: 'OVERVIEW',
    badgeVariant: 'blue',
    title: 'Live Project Dashboard',
    description: 'See sites, people, open tasks and completed work in one clear view.',
    points: [
      'Task status chart for every site',
      'Filter by site, user and department',
      'Recent tasks at a glance',
    ],
    image: '/images/taskmanager/dashboard.png',
    floatingChip: { label: 'Live Dashboard', icon: LayoutDashboard, variant: 'blue' },
  },
  {
    id: 'sites',
    badge: 'MULTI-SITE',
    badgeVariant: 'emerald',
    title: 'Manage Every Site Easily',
    description: 'Track all your sites with partners, departments and open tasks in one place.',
    points: [
      'Site cards with partner and team details',
      'Open task count for each site',
      'Add a new site in one click',
    ],
    image: '/images/taskmanager/sites.png',
    floatingChip: { label: 'Multi-Site', icon: Building2, variant: 'emerald' },
  },
  {
    id: 'new-task',
    badge: 'SMART TASKS',
    badgeVariant: 'indigo',
    title: 'Create Tasks in Seconds',
    description: 'Add tasks with all the details your team needs, even by voice.',
    points: [
      'Voice input for title and notes',
      'Attach photos, videos, files and audio',
      'Priority, deadline, repeat and reminders',
    ],
    image: '/images/taskmanager/new-task.png',
    floatingChip: { label: 'Voice Input', icon: Mic, variant: 'indigo' },
  },
  {
    id: 'people',
    badge: 'TEAM',
    badgeVariant: 'blue',
    title: 'Clear Roles for Every Person',
    description: 'Manage partners, employees and department heads for each site.',
    points: [
      'Role badges: Partner, Employee, Dept Head',
      'Site and department mapping',
      'Quick people search',
    ],
    image: '/images/taskmanager/people.png',
    floatingChip: { label: 'Role Based', icon: Users, variant: 'blue' },
  },
  {
    id: 'all-tasks',
    badge: 'TASK TRACKING',
    badgeVariant: 'emerald',
    title: 'Track Every Task to Completion',
    description: 'Filter and follow tasks by status, priority, site and user.',
    points: [
      'Status filters: Open, In progress, Blocked, Done',
      'Daily and weekly repeating tasks',
      'Deadline and assignee on every task',
    ],
    image: '/images/taskmanager/all-tasks.png',
    floatingChip: { label: 'Real-time Status', icon: CheckSquare, variant: 'emerald' },
  },
];

const OPTIMIZE_SHOWCASE_ITEMS = [
  {
    id: 'dashboard',
    badge: 'OVERVIEW',
    badgeVariant: 'blue',
    title: 'Your Field Team at a Glance',
    description: 'Track customers, employees, expenses and orders from one simple dashboard.',
    points: [
      'Live totals for customers, employees, expenses and orders',
      'Expense and new customer trends',
      'Pending expenses and leaves in one place',
    ],
    image: '/images/optimize/dashboard.png',
    floatingChip: { label: 'Live Overview', icon: LayoutDashboard, variant: 'blue' },
  },
  {
    id: 'map',
    badge: 'LIVE TRACKING',
    badgeVariant: 'emerald',
    title: 'See Your Team on the Map',
    description: 'Know where every field user is, in real time.',
    points: [
      'Live location of users on field',
      'Map and Satellite views',
      'Quick user search and state filter',
    ],
    image: '/images/optimize/map.png',
    floatingChip: { label: 'Live Location', icon: MapPin, variant: 'emerald' },
  },
  {
    id: 'trip-summary',
    badge: 'TRIPS',
    badgeVariant: 'indigo',
    title: 'Daily Trip Summary',
    description: 'Check who is present and who is absent for any day, in one click.',
    points: [
      'Date strip to jump between days',
      'Total present and total absent counts',
      'One-click export',
    ],
    image: '/images/optimize/trip-summary.png',
    floatingChip: { label: 'Auto Reports', icon: Calendar, variant: 'indigo' },
  },
  {
    id: 'attendance',
    badge: 'ATTENDANCE',
    badgeVariant: 'emerald',
    title: 'Attendance Reports in Seconds',
    description: 'Generate attendance reports for any date range and export them.',
    points: [
      'Choose from and to dates',
      'Generate report instantly',
      'Export to Excel',
    ],
    image: '/images/optimize/attendance.png',
    floatingChip: { label: 'Excel Export', icon: FileSpreadsheet, variant: 'emerald' },
  },
  {
    id: 'payments',
    badge: 'PAYMENTS',
    badgeVariant: 'blue',
    title: 'Simple Payment Tracking',
    description: 'Record and manage payments with search, filters and export.',
    points: [
      'Add payments quickly',
      'Search and filter records',
      'Export to Excel',
    ],
    image: '/images/optimize/payments.png',
    floatingChip: { label: 'Easy Payments', icon: CreditCard, variant: 'blue' },
  },
  {
    id: 'settings',
    badge: 'CONFIGURATION',
    badgeVariant: 'indigo',
    title: 'Configure It Your Way',
    description: 'Set up your organisation, trips, orders, products, expenses and leaves.',
    points: [
      'Trip, order and product configuration',
      'Expense types and holiday setup',
      'Leave rules for your team',
    ],
    image: '/images/optimize/settings.png',
    floatingChip: { label: 'Custom Setup', icon: Settings, variant: 'indigo' },
  },
];

/**
 * Visual illustration for each project in the hero section
 */
function ProjectVisualPreview({ slug }) {
  if (slug === 'call-info') {
    return (
      <div className="project-preview-card project-preview-card--call">
        <div className="preview-top-bar">
          <div className="preview-traffic-lights">
            <span className="dot dot--red" />
            <span className="dot dot--yellow" />
            <span className="dot dot--green" />
          </div>
          <span className="preview-status-pill">
            <span className="live-pulse" /> Live Telephony Stream
          </span>
        </div>

        <div className="preview-card-body">
          <div className="call-visual-header">
            <div className="call-avatar">
              <PhoneCall size={20} color="#4F46E5" />
            </div>
            <div>
              <div className="call-title">Call #84920 · Priority Enterprise</div>
              <div className="call-sub">Ahmedabad HQ ↔ Global Operations · 04:32 min</div>
            </div>
          </div>

          <div className="waveform-container">
            <div className="waveform-bar" style={{ height: '35%' }} />
            <div className="waveform-bar" style={{ height: '65%' }} />
            <div className="waveform-bar" style={{ height: '90%' }} />
            <div className="waveform-bar" style={{ height: '40%' }} />
            <div className="waveform-bar waveform-bar--active" style={{ height: '100%' }} />
            <div className="waveform-bar" style={{ height: '75%' }} />
            <div className="waveform-bar" style={{ height: '45%' }} />
            <div className="waveform-bar" style={{ height: '80%' }} />
            <div className="waveform-bar" style={{ height: '60%' }} />
            <div className="waveform-bar" style={{ height: '30%' }} />
          </div>

          <div className="sentiment-metric-row">
            <div className="metric-tag">
              <span className="metric-tag__label">Caller Sentiment</span>
              <span className="metric-tag__val metric-tag__val--positive">94% Positive</span>
            </div>
            <div className="metric-tag">
              <span className="metric-tag__label">Intent Classification</span>
              <span className="metric-tag__val">ERP Implementation</span>
            </div>
            <div className="metric-tag">
              <span className="metric-tag__label">CRM Sync</span>
              <span className="metric-tag__val metric-tag__val--done">Auto-Synced ✓</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === 'task-manager') {
    return (
      <div className="project-preview-card project-preview-card--task">
        <div className="preview-top-bar">
          <div className="preview-traffic-lights">
            <span className="dot dot--red" />
            <span className="dot dot--yellow" />
            <span className="dot dot--green" />
          </div>
          <span className="preview-status-pill">Sprint Workspace · Live</span>
        </div>

        <div className="preview-card-body">
          <div className="task-columns-grid">
            <div className="task-mini-col">
              <span className="col-header">In Progress (4)</span>
              <div className="task-mini-card">
                <div className="task-card-title">ERP Inventory API Sync</div>
                <div className="task-card-meta">
                  <span className="task-badge task-badge--urgent">Critical</span>
                  <span className="task-user">DevOps Lead</span>
                </div>
              </div>
              <div className="task-mini-card">
                <div className="task-card-title">Multi-Tenant Auth Migration</div>
                <div className="task-card-meta">
                  <span className="task-badge">Backend</span>
                  <span className="task-user">Architect</span>
                </div>
              </div>
            </div>

            <div className="task-mini-col">
              <span className="col-header">Review &amp; QA (3)</span>
              <div className="task-mini-card task-mini-card--done">
                <div className="task-card-title">GST E-Invoicing Engine</div>
                <div className="task-card-meta">
                  <span className="task-badge task-badge--success">Passed</span>
                  <span className="task-user">QA Lead</span>
                </div>
              </div>
            </div>
          </div>

          <div className="task-footer-progress">
            <div className="progress-label-row">
              <span>Sprint Completion</span>
              <span className="font-bold text-indigo-600">82% on track</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: '82%' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Optimize default
  return (
    <div className="project-preview-card project-preview-card--optimize">
      <div className="preview-top-bar">
        <div className="preview-traffic-lights">
          <span className="dot dot--red" />
          <span className="dot dot--yellow" />
          <span className="dot dot--green" />
        </div>
        <span className="preview-status-pill">
          <span className="live-pulse" /> ML Engine Active
        </span>
      </div>

      <div className="preview-card-body">
        <div className="optimize-header-row">
          <div>
            <div className="opt-title">Demand &amp; Route Intelligence</div>
            <div className="opt-sub">Multi-Branch Inventory Optimization</div>
          </div>
          <span className="opt-gain-chip">+23% Margin Gain</span>
        </div>

        <div className="optimize-chart-bars">
          <div className="chart-bar-group">
            <div className="chart-bar" style={{ height: '45%' }} />
            <span>W1</span>
          </div>
          <div className="chart-bar-group">
            <div className="chart-bar" style={{ height: '60%' }} />
            <span>W2</span>
          </div>
          <div className="chart-bar-group">
            <div className="chart-bar" style={{ height: '78%' }} />
            <span>W3</span>
          </div>
          <div className="chart-bar-group">
            <div className="chart-bar chart-bar--highlight" style={{ height: '96%' }} />
            <span>W4</span>
          </div>
        </div>

        <div className="optimize-kpis-grid">
          <div className="kpi-box">
            <span className="kpi-box__num">2.4x</span>
            <span className="kpi-box__label">Dispatch Speed</span>
          </div>
          <div className="kpi-box">
            <span className="kpi-box__num">-18%</span>
            <span className="kpi-box__label">Dead Stock</span>
          </div>
          <div className="kpi-box">
            <span className="kpi-box__num">97.1%</span>
            <span className="kpi-box__label">Forecast Precision</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectDetailPage({ slug }) {
  const { navigate } = useRoute();
  const { openGetStartedModal } = useModal();
  const project = getProjectBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (project) {
      document.title = `${project.title} — ${project.tagline} | InfoDrill AI Solutions`;
    } else {
      document.title = 'Project Not Found | InfoDrill AI Solutions';
    }
  }, [slug, project]);

  // Project Not Found View
  if (!project) {
    return (
      <div className="project-not-found-page">
        <div className="project-not-found-card">
          <span className="not-found-code">404</span>
          <h1 className="not-found-title">Project Not Found</h1>
          <p className="not-found-desc">
            We could not locate the project with slug <code className="slug-code">"{slug}"</code>.
            It may have been renamed or moved.
          </p>

          <div className="not-found-actions">
            <button
              type="button"
              onClick={() => navigate('#portfolio')}
              className="ref-pill-btn"
            >
              <span className="ref-pill-btn__arrow" aria-hidden="true">
                <ArrowLeft size={16} />
              </span>
              <span>Back to Portfolio</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="ref-pill-btn--secondary"
            >
              <span>Return to Homepage</span>
            </button>
          </div>

          <div className="available-projects-list">
            <span className="available-title">Explore Our Flagship Projects:</span>
            <div className="available-chips">
              {projects.map((p) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => navigate(`/projects/${p.slug}`)}
                  className="available-chip"
                >
                  <span>{p.title}</span>
                  <ArrowRight size={13} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail-page">
      {/* Top Breadcrumb Bar */}
      <div className="project-breadcrumb-bar">
        <div className="project-container">
          <div className="breadcrumb-inner">
            <button
              type="button"
              onClick={() => navigate('#portfolio')}
              className="back-portfolio-link"
              aria-label="Navigate back to Portfolio"
            >
              <ArrowLeft size={16} />
              <span>Back to Portfolio</span>
            </button>

            <div className="breadcrumb-trail">
              <span onClick={() => navigate('/')} className="trail-item trail-item--link">Home</span>
              <span className="trail-sep">/</span>
              <span onClick={() => navigate('#portfolio')} className="trail-item trail-item--link">Portfolio</span>
              <span className="trail-sep">/</span>
              <span className="trail-item trail-item--active">{project.title}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="project-hero-section">
        <div className="project-container">
          <div className="project-hero-grid">
            {/* Left Content */}
            <motion.div
              className="project-hero-left"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="project-hero-badge-wrap">
                <span className="project-category-badge">
                  <Sparkles size={13} className="text-blue-600" />
                  <span>{project.category}</span>
                </span>
                <span className="project-verified-chip">Verified Enterprise Platform</span>
              </div>

              <h1 className="project-hero-title">{project.title}</h1>
              <p className="project-hero-tagline">{project.tagline}</p>
              <p className="project-hero-desc">{project.description}</p>

              {/* CTAs */}
              <div className="project-hero-actions">
                <button
                  type="button"
                  onClick={openGetStartedModal}
                  className="ref-pill-btn"
                  aria-label={`Get Started with ${project.title}`}
                >
                  <span className="ref-pill-btn__arrow" aria-hidden="true">
                    <ArrowUpRight size={18} />
                  </span>
                  <span>Get Started with {project.title}</span>
                </button>

                <a href="#features" className="ref-pill-btn--secondary">
                  <span>Explore Key Features</span>
                  <ArrowRight size={15} />
                </a>
              </div>

              {/* Quick Metric Highlights */}
              {project.stats && (
                <div className="project-metrics-row">
                  {project.stats.map((st, i) => (
                    <div key={i} className="project-metric-item">
                      <span className="metric-val">{st.value}</span>
                      <span className="metric-label">{st.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Right Visual Preview */}
            <motion.div
              className="project-hero-right"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectVisualPreview slug={project.slug} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Preview Showcase (Call Info ONLY) */}
      {project.slug === 'call-info' && (
        <ProductShowcaseSection
          eyebrow="PRODUCT PREVIEW"
          title="See Call Info in Action"
          subtitle="Explore the live telecalling dashboard, lead management pipelines, and employee performance analytics."
          items={CALL_INFO_SHOWCASE_ITEMS}
        />
      )}

      {/* Product Preview Showcase (Task Manager ONLY) */}
      {project.slug === 'task-manager' && (
        <ProductShowcaseSection
          eyebrow="PRODUCT PREVIEW"
          title="See Task Manager in Action"
          subtitle="Track multiple sites, assign team roles, and manage tasks from start to finish."
          items={TASK_MANAGER_SHOWCASE_ITEMS}
        />
      )}

      {/* Product Preview Showcase (Optimize ONLY) */}
      {project.slug === 'optimize' && (
        <ProductShowcaseSection
          eyebrow="PRODUCT PREVIEW"
          title="See Optimize in Action"
          subtitle="Real-time GPS tracking, automated attendance, trip summaries, and expense management in one platform."
          items={OPTIMIZE_SHOWCASE_ITEMS}
        />
      )}

      {/* Key Features Section */}
      <section className="project-features-section" id="features">
        <div className="project-container">
          <div className="features-section-header">
            <span className="ref-section-eyebrow">CAPABILITIES &amp; ARCHITECTURE</span>
            <h2 className="features-section-title">
              Engineered for Enterprise Reliability &amp; High-Velocity Execution
            </h2>
            <p className="features-section-desc">
              Discover the core capabilities and modular architecture powering {project.title}.
              Built specifically to eliminate operational drag and scale securely.
            </p>
          </div>

          <div className="features-cards-grid">
            {project.features.map((feat, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="feature-card__icon-box">
                  <CheckCircle2 size={20} className="text-indigo-600" />
                </div>
                <h3 className="feature-card__title">{feat.title}</h3>
                <p className="feature-card__desc">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="project-tech-section">
        <div className="project-container">
          <div className="tech-box">
            <div className="tech-box-header">
              <div className="tech-icon-wrap">
                <Cpu size={22} className="text-indigo-600" />
              </div>
              <div>
                <h3 className="tech-box-title">Production Technology Stack</h3>
                <p className="tech-box-sub">
                  Robust, battle-tested modern tools architected for zero-downtime scalability.
                </p>
              </div>
            </div>

            <div className="tech-tags-list">
              {project.techStack.map((tech, i) => (
                <div key={i} className="tech-pill">
                  <span className="tech-dot" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Conversion Banner */}
      <section className="project-cta-banner-section">
        <div className="project-container">
          <div className="project-cta-banner">
            <div className="banner-left">
              <span className="ref-section-eyebrow">READY TO DEPLOY?</span>
              <h2 className="banner-title">
                Bring {project.title} into your enterprise workflows.
              </h2>
              <p className="banner-sub">
                Consult with our software architects. We provide a tailored implementation plan,
                clear milestones, and guaranteed 24-hour response.
              </p>
            </div>

            <div className="banner-actions">
              <button
                type="button"
                onClick={openGetStartedModal}
                className="ref-pill-btn"
                aria-label={`Get Started with ${project.title}`}
              >
                <span className="ref-pill-btn__arrow" aria-hidden="true">
                  <ArrowUpRight size={18} />
                </span>
                <span>Get Started</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('#portfolio')}
                className="ref-pill-btn--secondary"
              >
                <span>Back to Portfolio</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProjectDetailPage;

