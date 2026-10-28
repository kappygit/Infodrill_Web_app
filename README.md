# Info Drill — Enterprise Intelligence & Scalable Engineering

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF.svg)](https://vitejs.dev/)
[![Design](https://img.shields.io/badge/Design_Tokens-Vanilla_CSS-06B6D4.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
[![Build](https://img.shields.io/badge/Build-Passing-10B981.svg)](https://github.com)

A high-performance, production-grade corporate website engineered for **Info Drill** (`infodrill.com`). Built using a scalable **Feature-Based React.js Architecture**, zero-runtime Vanilla CSS Design Tokens, and an editorial dark-precision visual aesthetic synthesized from leading agency benchmarks (Fyntic, Wilun, Movya, Sigzen, and Aavatto).

---

## 1. Executive Summary & Architecture Overview

The Info Drill corporate platform is engineered around **business feature boundaries** rather than flat component buckets. This design ensures that as your engineering team expands, new modules (e.g., dynamic case studies, client portals, real-time telemetry dashboards) can be added or updated with zero risk of regression across unrelated pages.

### Key Architectural Pillars:
- **Feature-Based Organization**: Each domain feature (`home`, `services`, `projects`, `contact`) encapsulates its own presentation components, data layers, hooks, and styles.
- **Separation of Concerns**: UI components remain pure and presentation-focused. Business logic lives in custom hooks (`useContactForm`, `useScrollPosition`), and backend communication is routed through a centralized API service layer.
- **High-Performance Design System**: Built with modern CSS custom properties (`tokens.css`), eliminating heavy utility CSS dependencies and enabling instant load times and native dark-mode precision.
- **Enterprise Standards**: Fully responsive across mobile, tablet, and ultra-wide screens, accessible heading hierarchy, `:focus-visible` keyboard states, and `prefers-reduced-motion` compliance.

---

## 2. Directory & File Structure

```text
Infodrill.com/
├── public/                     # Static assets and favicons
├── scripts/
│   └── setup-rollup-wasm.js   # Automated postinstall script for Windows policy compatibility
├── src/
│   ├── app/
│   │   ├── App.jsx             # Top-level application shell with accessibility skip-links
│   │   └── App.css             # Root layout and global flex containers
│   ├── components/             # Shared reusable primitives
│   │   ├── ui/
│   │   │   ├── Button.jsx      # Reusable multi-variant button with glow states & loading spinners
│   │   │   ├── Button.css
│   │   │   ├── Badge.jsx       # Status badge with optional live pulse beacon
│   │   │   ├── Badge.css
│   │   │   ├── SectionHeading.jsx # Unified section title, eyebrow, and subtitle
│   │   │   └── Container.jsx   # Responsive container wrapper (standard and narrow)
│   │   └── layout/
│   │       ├── Navbar.jsx      # Floating notched glassmorphic header with scroll telemetry
│   │       ├── Navbar.css
│   │       ├── MobileNavigation.jsx # Accessible mobile drawer with keyboard ESC capture
│   │       ├── MobileNavigation.css
│   │       ├── Footer.jsx      # Enterprise multi-column footer with live status indicator
│   │       └── Footer.css
│   ├── config/
│   │   ├── env.js              # Validated environment variable resolver with fallbacks
│   │   └── siteConfig.js       # Centralized business metadata, phone, email, and navigation
│   ├── features/               # Business feature modules
│   │   ├── home/
│   │   │   ├── sections/
│   │   │   │   ├── HeroSection.jsx & .css               # Hero with rotating orbital core engine
│   │   │   │   ├── TickerSection.jsx & .css             # Continuous marquee capabilities banner
│   │   │   │   ├── ValuePropositionSection.jsx & .css   # 4-pillar architectural advantage
│   │   │   │   ├── ServicesGridSection.jsx & .css       # 6 interactive enterprise service modules
│   │   │   │   ├── TechnologyCapabilitiesSection.jsx & .css # Tabbed stack architecture matrix
│   │   │   │   ├── ProcessApproachSection.jsx & .css    # 4-stage precision engineering lifecycle
│   │   │   │   ├── ProjectCaseStudiesSection.jsx & .css # Production case studies with verified metrics
│   │   │   │   ├── CompanyDifferentiatorsSection.jsx & .css # Data sovereignty & SLA standards
│   │   │   │   └── ContactEnquirySection.jsx & .css     # Direct advisory channels & form
│   │   │   ├── HomePage.jsx    # Narrative section assembler
│   │   │   └── index.js        # Feature barrel export
│   │   ├── services/
│   │   │   └── data/
│   │   │       └── servicesData.js # Verified 6-service data model
│   │   ├── projects/
│   │   │   └── data/
│   │   │       └── projectsData.js # Verified enterprise case study data model
│   │   └── contact/
│   │       ├── hooks/
│   │       │   └── useContactForm.js # Form validation, error handling, and state machine
│   │       └── components/
│   │           ├── ContactForm.jsx   # Accessible inquiry form with submitting & success states
│   │           └── ContactForm.css
│   ├── hooks/
│   │   └── useScrollPosition.js # rAF-throttled scroll observer for sticky headers
│   ├── services/
│   │   └── api/
│   │       ├── client.js       # Production fetch client with timeout and simulated fallback
│   │       ├── endpoints.js    # API route registry
│   │       └── errorHandler.js # User-friendly error message normalizer
│   └── styles/
│       ├── tokens.css          # Semantic CSS tokens (Obsidian, Cyan, Indigo, spacing, radii)
│       ├── globals.css         # Typography reset, heading scale, custom scrollbar
│       └── utilities.css       # Layout grids, glass cards, and micro-animations
├── index.html                  # HTML5 semantic shell, SEO tags, Outfit & Jakarta fonts
├── vite.config.js              # Vite configuration with path aliases (`@/`)
├── package.json                # Project dependencies and npm scripts
├── .env.example                # Template for environment configuration
└── README.md                   # System documentation
```

---

## 3. Technology Stack

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Core Framework** | React 18.3.1 | Industry-standard declarative component model with Concurrent features |
| **Build Tooling** | Vite 6.2.0 | Instant Hot Module Replacement (HMR) and optimized Rollup production builds |
| **Styling Engine** | Vanilla CSS Tokens | Zero runtime overhead, clean CSS custom properties, and full layout control |
| **Iconography** | Lucide React | Accessible, lightweight SVG icons consistent with modern enterprise aesthetics |
| **Typography** | Google Fonts | `Outfit` (display headlines), `Plus Jakarta Sans` (body), `JetBrains Mono` (telemetry) |
| **WASM Engine** | `@rollup/wasm-node` | Enables seamless compilation on Windows environments with Application Control / AppLocker |

---

## 4. Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher (tested on Node `v24.16.0`)
- **npm**: `v9.0.0` or higher

### Installation
Clone the repository and install all dependencies:
```bash
git clone <repository-url>
cd Infodrill.com
npm install
```

> **Note on Windows Environments**: The project includes an automated `postinstall` script (`scripts/setup-rollup-wasm.js`) that verifies Rollup WASM compatibility, allowing clean builds even on corporate Windows machines where native `.node` DLLs are restricted by Application Control policies.

### Development Server
To start the local development server with instant HMR:
```bash
npm run dev
```
The server will boot locally at `http://localhost:5173/`.

### Production Build
To validate TypeScript types, bundle static assets, and generate production output:
```bash
npm run build
```
Production bundles are output to the `dist/` directory.

### Preview Production Build
To preview the generated production bundle locally:
```bash
npm run preview
```

---

## 5. Environment Configuration

The application uses Vite environment variables prefixed with `VITE_`.

1. Copy `.env.example` to create your local `.env`:
   ```bash
   cp .env.example .env
   ```
2. Configure your variables:
   ```env
   # API Base URL for future backend integration (Leave empty for simulated mode)
   VITE_API_BASE_URL=https://api.infodrill.com

   # Environment Mode
   VITE_APP_ENV=development

   # Optional Public Analytics or Telemetry ID
   VITE_ANALYTICS_ID=
   ```

*Security Note: Never commit private API secrets or credentials to client-side `.env` files.*

---

## 6. How to Update Official Content & Assets (Senior Developer Guide)

All corporate content is decoupled from layout code so you can update official branding and business details without modifying UI templates:

### 1. Company Information & Navigation
Open [`src/config/siteConfig.js`](file:///c:/Users/Subhash/OneDrive/Desktop/Infodrill.com/src/config/siteConfig.js) to edit:
- Company name, tagline, and SEO description
- Direct contact details (email, phone, corporate headquarters, operating hours)
- Social media links (LinkedIn, Twitter/X, GitHub)
- Capabilities ticker items

### 2. Services & Solutions
Open [`src/features/services/data/servicesData.js`](file:///c:/Users/Subhash/OneDrive/Desktop/Infodrill.com/src/features/services/data/servicesData.js) to:
- Add, update, or reorder services
- Modify service feature checklists, tags, and verified metrics

### 3. Case Studies & Deployments
Open [`src/features/projects/data/projectsData.js`](file:///c:/Users/Subhash/OneDrive/Desktop/Infodrill.com/src/features/projects/data/projectsData.js) to:
- Update case study summaries, industry tags, and client metrics
- Adjust the technology stack tags associated with each project

### 4. Logos & Branding Assets
- Replace the SVG favicon in [`index.html`](file:///c:/Users/Subhash/OneDrive/Desktop/Infodrill.com/index.html) with your official brand vector.
- Custom vector marks can be placed directly in `src/assets/images/` and imported into [`src/components/layout/Navbar.jsx`](file:///c:/Users/Subhash/OneDrive/Desktop/Infodrill.com/src/components/layout/Navbar.jsx).

---

## 7. Backend API Integration Approach

The application is pre-configured with an enterprise API layer located at [`src/services/api/`](file:///c:/Users/Subhash/OneDrive/Desktop/Infodrill.com/src/services/api/):
- **`client.js`**: Centralized HTTP client using native `fetch` with configurable timeouts, JSON headers, and HTTP error normalization.
  - When `VITE_API_BASE_URL` is configured, inquiries submitted through the contact form are dispatched to `${VITE_API_BASE_URL}/v1/inquiries`.
  - When no backend is connected (development mode), the client cleanly simulates network latency (800ms) and resolves with a successful response for verification.
- **`endpoints.js`**: Registry of backend routes (`inquiries`, `newsletter`, `telemetry`).
- **`errorHandler.js`**: Sanitizes backend HTTP error status codes into human-readable messages.

---

## 8. Accessibility & SEO Compliance

- **Semantic Landmark Structure**: Uses semantic `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` elements.
- **Heading Order**: Exactly one `<h1>` per page, followed by properly nested `<h2>` and `<h3>` tags.
- **Accessible Interactions**: All buttons and form controls feature clear `:focus-visible` outline rings with high contrast.
- **Reduced Motion**: All animated elements (marquee tickers, rotating orbital rings, floating telemetry cards) respect the user's OS `prefers-reduced-motion: reduce` preference by pausing or using static fallbacks.
- **Metadata**: Pre-configured with OpenGraph cards, title tags, and search engine descriptions in `index.html`.

---

## 9. License & Ownership

Proprietary enterprise software developed for **Info Drill**. All rights reserved.
