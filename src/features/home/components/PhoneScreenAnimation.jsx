import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Menu, 
  Home, 
  Box, 
  FileText, 
  BarChart2, 
  Package, 
  DollarSign, 
  Clock, 
  ChevronDown, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import './PhoneScreenAnimation.css';

export default function PhoneScreenAnimation() {
  const [activeNav, setActiveNav] = useState('home');
  const [hoveredPoint, setHoveredPoint] = useState(2); // 15 Apr by default
  const [counts, setCounts] = useState({
    sales: 0,
    orders: 0,
    stock: 0,
    pending: 0
  });

  // Smooth number counting animation on mount
  useEffect(() => {
    const duration = 1200;
    const startTime = performance.now();

    const animateCounts = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setCounts({
        sales: Math.round(ease * 248000),
        orders: Math.round(ease * 124),
        stock: Math.round(ease * 1280),
        pending: Math.round(ease * 18)
      });

      if (progress < 1) {
        requestAnimationFrame(animateCounts);
      }
    };

    const rafId = requestAnimationFrame(animateCounts);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Format currency with Indian grouping: ₹2,48,000
  const formatIndianCurrency = (val) => {
    return '₹' + val.toLocaleString('en-IN');
  };

  return (
    <div className="phone-erp-dashboard">
      
      {/* 1. Header Greeting & Actions */}
      <div className="phone-erp-header">
        <div className="phone-greeting-block">
          <span className="phone-greeting-label">Good Morning,</span>
          <h3 className="phone-greeting-name">Business Owner</h3>
          <span className="phone-greeting-sub">Here's your business overview</span>
        </div>
        <div className="phone-header-controls">
          <button type="button" className="phone-icon-btn phone-icon-btn--bell" aria-label="Notifications">
            <Bell size={13} color="#475569" />
            <span className="phone-notification-dot" />
          </button>
          <button type="button" className="phone-icon-btn" aria-label="Menu">
            <Menu size={13} color="#475569" />
          </button>
        </div>
      </div>

      {/* 2. Four Mini Summary KPI Cards */}
      <div className="phone-kpi-grid">
        {/* Card 1: Total Sales */}
        <div className="phone-kpi-card">
          <div className="phone-kpi-icon-wrap phone-kpi-icon-wrap--blue">
            <DollarSign size={10} color="#2563EB" strokeWidth={2.8} />
          </div>
          <span className="phone-kpi-label">Total Sales</span>
          <span className="phone-kpi-value">{formatIndianCurrency(counts.sales)}</span>
          <span className="phone-kpi-pill phone-kpi-pill--green">↑ 12%</span>
        </div>

        {/* Card 2: Total Orders */}
        <div className="phone-kpi-card">
          <div className="phone-kpi-icon-wrap phone-kpi-icon-wrap--cyan">
            <Package size={10} color="#0891B2" strokeWidth={2.8} />
          </div>
          <span className="phone-kpi-label">Total Orders</span>
          <span className="phone-kpi-value">{counts.orders}</span>
          <span className="phone-kpi-pill phone-kpi-pill--green">↑ 8%</span>
        </div>

        {/* Card 3: Stock Items */}
        <div className="phone-kpi-card">
          <div className="phone-kpi-icon-wrap phone-kpi-icon-wrap--purple">
            <Box size={10} color="#7C3AED" strokeWidth={2.8} />
          </div>
          <span className="phone-kpi-label">Stock Items</span>
          <span className="phone-kpi-value">{counts.stock.toLocaleString('en-IN')}</span>
          <span className="phone-kpi-pill phone-kpi-pill--green">↑ 5%</span>
        </div>

        {/* Card 4: Pending */}
        <div className="phone-kpi-card">
          <div className="phone-kpi-icon-wrap phone-kpi-icon-wrap--red">
            <Clock size={10} color="#DC2626" strokeWidth={2.8} />
          </div>
          <span className="phone-kpi-label">Pending</span>
          <span className="phone-kpi-value">{counts.pending}</span>
          <span className="phone-kpi-pill phone-kpi-pill--red">↓ 3%</span>
        </div>
      </div>

      {/* 3. Sales Overview Section with Smooth Curved Area Chart */}
      <div className="phone-chart-section">
        <div className="phone-section-header">
          <span className="phone-section-title">Sales Overview</span>
          <div className="phone-date-dropdown">
            <span>This Month</span>
            <ChevronDown size={10} color="#64748B" />
          </div>
        </div>

        {/* Spline Area Chart */}
        <div className="phone-spline-chart-wrap">
          <svg className="phone-spline-svg" viewBox="0 0 260 75" preserveAspectRatio="none">
            <defs>
              <linearGradient id="salesSplineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#818CF8" stopOpacity="0.32" />
                <stop offset="60%" stopColor="#C7D2FE" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#EEF2FF" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Gradient Fill under curve */}
            <path 
              d="M 5 62 Q 35 48 65 52 T 125 35 T 185 24 T 255 38 L 255 75 L 5 75 Z"
              fill="url(#salesSplineGrad)"
            />

            {/* Glow stroke underneath */}
            <path 
              d="M 5 62 Q 35 48 65 52 T 125 35 T 185 24 T 255 38"
              fill="none"
              stroke="#A5B4FC"
              strokeWidth="4"
              strokeOpacity="0.3"
            />

            {/* Main Smooth Spline Stroke */}
            <path 
              d="M 5 62 Q 35 48 65 52 T 125 35 T 185 24 T 255 38"
              fill="none"
              stroke="#6366F1"
              strokeWidth="2.2"
              strokeLinecap="round"
            />

            {/* Peak Dot at 15 Apr (x: 125, y: 35) */}
            <circle cx="125" cy="35" r="5" fill="#6366F1" fillOpacity="0.25" className="animate-pulse" />
            <circle cx="125" cy="35" r="3" fill="#4F46E5" />
            <circle cx="125" cy="35" r="1.2" fill="#FFFFFF" />
          </svg>

          {/* Interactive Tooltip over Peak */}
          <div className="phone-chart-tooltip" style={{ left: '48%', top: '12%' }}>
            <span>₹1,42,000</span>
          </div>

          {/* X-axis date labels */}
          <div className="phone-chart-x-labels">
            <span>1 Apr</span>
            <span>8 Apr</span>
            <span className="active-date">15 Apr</span>
            <span>22 Apr</span>
            <span>30 Apr</span>
          </div>
        </div>
      </div>

      {/* 4. Recent Orders List */}
      <div className="phone-orders-section">
        <div className="phone-section-header">
          <span className="phone-section-title">Recent Orders</span>
          <button type="button" className="phone-view-all-btn">
            <span>View All</span>
            <ArrowRight size={9} />
          </button>
        </div>

        <div className="phone-orders-list">
          {/* Order 1: Processing */}
          <div className="phone-order-row">
            <div className="phone-order-left">
              <div className="phone-order-avatar phone-order-avatar--orange">
                <Package size={11} color="#EA580C" />
              </div>
              <div className="phone-order-info">
                <span className="phone-order-id">#ORD-1045</span>
                <span className="phone-order-sub">Customer Order</span>
              </div>
            </div>
            <span className="phone-status-pill phone-status-pill--processing">
              Processing
            </span>
          </div>

          {/* Order 2: Delivered */}
          <div className="phone-order-row">
            <div className="phone-order-left">
              <div className="phone-order-avatar phone-order-avatar--blue">
                <Box size={11} color="#2563EB" />
              </div>
              <div className="phone-order-info">
                <span className="phone-order-id">#ORD-1044</span>
                <span className="phone-order-sub">Wholesale Purchase</span>
              </div>
            </div>
            <span className="phone-status-pill phone-status-pill--delivered">
              Delivered
            </span>
          </div>

          {/* Order 3: Pending */}
          <div className="phone-order-row">
            <div className="phone-order-left">
              <div className="phone-order-avatar phone-order-avatar--red">
                <Clock size={11} color="#DC2626" />
              </div>
              <div className="phone-order-info">
                <span className="phone-order-id">#ORD-1043</span>
                <span className="phone-order-sub">Retail Order</span>
              </div>
            </div>
            <span className="phone-status-pill phone-status-pill--pending">
              Pending
            </span>
          </div>
        </div>
      </div>

      {/* 5. Bottom Navigation Bar */}
      <div className="phone-bottom-nav">
        <button 
          type="button" 
          className={`phone-nav-item ${activeNav === 'home' ? 'phone-nav-item--active' : ''}`}
          onClick={() => setActiveNav('home')}
        >
          <Home size={14} />
          <span>Home</span>
        </button>

        <button 
          type="button" 
          className={`phone-nav-item ${activeNav === 'inventory' ? 'phone-nav-item--active' : ''}`}
          onClick={() => setActiveNav('inventory')}
        >
          <Box size={14} />
          <span>Inventory</span>
        </button>

        <button 
          type="button" 
          className={`phone-nav-item ${activeNav === 'orders' ? 'phone-nav-item--active' : ''}`}
          onClick={() => setActiveNav('orders')}
        >
          <FileText size={14} />
          <span>Orders</span>
        </button>

        <button 
          type="button" 
          className={`phone-nav-item ${activeNav === 'reports' ? 'phone-nav-item--active' : ''}`}
          onClick={() => setActiveNav('reports')}
        >
          <BarChart2 size={14} />
          <span>Reports</span>
        </button>
      </div>

    </div>
  );
}

