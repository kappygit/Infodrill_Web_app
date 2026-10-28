# INFODRILL AI SOLUTIONS — Design System & Tokens (DESIGN.md)

## 1. Brand Identity & Product Voice
- **Company**: INFODRILL AI SOLUTIONS
- **Tagline**: IT Solutions for Modern Businesses
- **Mission**: Building enterprise-grade custom ERP, CRM, AI-powered systems, and cloud software for businesses across India.
- **Surface Mode**: **Persuade** (High-trust, editorial neo-grotesk with warm pastel framing and tactile micro-interactions).

---

## 2. Color System & Design Tokens

Defined in [`src/styles/tokens.css`](file:///c:/Users/Subhash/OneDrive/Desktop/Infodrill.com/src/styles/tokens.css):

### Surface Palettes
| Token | Hex | Role |
|-------|-----|------|
| `--color-page-bg` | `#FFFFFF` | Global canvas background |
| `--color-hero-bg` | `#FDECE2` | Hero container warm peach surface |
| `--color-card-peach` | `#FEEAE0` | Primary warm card container |
| `--color-card-blue` | `#E0F2FE` | Highlighting tech & AI capabilities |
| `--color-card-purple` | `#F3E8FF` | Modern intelligence & cloud cards |
| `--color-card-yellow` | `#FEF9C3` | Ratings, highlights, and accent cards |
| `--color-dark-notch` | `#121212` | Sticky navigation bar & dark buttons |

### Accent Colors
| Token | Hex | Role |
|-------|-----|------|
| `--color-accent-blue` | `#2563EB` | Signature interactive arrow & links |
| `--color-accent-orange`| `#F97316` | Secondary accent & action buttons |
| `--color-accent-yellow`| `#FFDE00` | Logo geometry & star ratings |
| `--color-accent-green` | `#10B981` | Verification badges & positive stats |

### Typography Tokens
| Token | Font Family | Role |
|-------|-------------|------|
| `--font-display` | `'Outfit', 'Plus Jakarta Sans', sans-serif` | Hero and section titles (bold condensed uppercase) |
| `--font-heading` | `'Outfit', 'Plus Jakarta Sans', sans-serif` | Card titles, badges, and pill buttons |
| `--font-body` | `'Plus Jakarta Sans', sans-serif` | Paragraphs, descriptions, inputs, navigation |
| `--font-mono` | `'JetBrains Mono', monospace` | Metric counters, tech stack tags, code |

---

## 3. Typographic Hierarchy

- **Hero Headline (`h1`)**: `clamp(2.75rem, 6.5vw, 5.25rem)` / line-height: `0.98` / font-weight: `800`
- **Section Heading (`h2`)**: `clamp(2.25rem, 4.8vw, 3.85rem)` / line-height: `1.02` / font-weight: `700`
- **Sub-headline (`h3`)**: `clamp(1.4rem, 2.5vw, 2.1rem)` / line-height: `1.08` / font-weight: `700`
- **Card Title (`h4`)**: `1.25rem` – `1.35rem` / line-height: `1.15` / font-weight: `800`
- **Body (`p`)**: `1.0rem` / line-height: `1.6` / color: `var(--color-text-body)` (`#555555`)
- **Pill Badges & Tags**: `0.75rem` – `0.875rem` / font-weight: `700` / uppercase

---

## 4. Component Patterns

### 1. The Floating Notch Header
- Floating centered pill navbar (`#121212`) pinned at the top.
- Bespoke concave inverted-corner fillets (`notch-fillet--left` and `notch-fillet--right`).
- Responsive switch to a drawer on mobile with keyboard focus containment.

### 2. Signature Pill Button (`.ref-pill-btn`)
- Rounded pill capsule (`border-radius: var(--radius-pill)`).
- Circular arrow disc (`36px × 36px`) on the leading edge that rotates 45° on hover.
- Soft layered drop shadow with lift transition.

### 3. Rounded Card Surfaces
- Large radius corners (`var(--radius-xl)` = 28px, `var(--radius-2xl)` = 36px).
- Generous internal padding (32px – 48px).
- Subtle border stroke: `1px solid rgba(0, 0, 0, 0.04)`.

---

## 5. Responsive Breakpoint Rules
- **Desktop Wide**: `1260px` max container width, `24px` horizontal padding.
- **Laptop / Tablet Landscape (≤ 1024px)**: 3-column grids scale down to 2 columns.
- **Tablet Portrait (≤ 768px)**: Floating notch switches to sticky mobile header with drawer toggle.
- **Mobile (≤ 640px)**: All grids transition to single-column vertical flow with full-width action buttons.
