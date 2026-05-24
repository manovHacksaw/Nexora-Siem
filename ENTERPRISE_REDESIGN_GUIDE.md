# Nexora SIEM Enterprise Dashboard Redesign

## Overview

The Nexora SIEM dashboard has been completely redesigned with a **premium enterprise-grade aesthetic** inspired by industry-leading SOC platforms (Elastic Security, CrowdStrike Falcon, SentinelOne). This document outlines the new design system, components, and architecture.

---

## Color System (Enterprise Premium)

### Primary Palette
- **Background**: `#081120` - Deep navy base
- **Secondary**: `#0f172a` - Sidebar background
- **Tertiary**: `#111827` - Hover/accent backgrounds
- **Card**: `#131d2e` - Card/panel backgrounds
- **Card Secondary**: `#162033` - Elevated cards

### Action Colors
- **Primary (Cyan)**: `#38bdf8` - Primary action/highlight
- **Accent (Blue)**: `#2563eb` - Secondary action
- **Threat High (Red)**: `#ef4444` - Critical/danger
- **Threat Medium (Orange)**: `#f59e0b` - Warning
- **Threat Low (Blue)**: `#3b82f6` - Info/low risk
- **Success (Green)**: `#22c55e` - Positive indicator

### Text Colors
- **Foreground**: `#f1f5f9` - Primary text (light)
- **Foreground Secondary**: `#e2e8f0` - Secondary text
- **Muted**: `#475569` - Tertiary text
- **Muted Foreground**: `#94a3b8` - Subtle text
- **Border**: `#1e293b` - Border/divider

---

## Component Architecture

### 11 Enterprise Components

#### 1. **Sidebar.tsx** - Collapsible Navigation
- **Width**: 64px collapsed, 240px expanded
- **Behavior**: Expands on hover, collapses on hover out
- **Items** (10 navigation options):
  - Overview, Alerts, Threat Intel, MITRE ATT&CK, UEBA Analytics
  - Threat Hunt, IOC Feeds, Logs, Integrations, Settings
- **Icons**: Lucide icons for visual clarity
- **Responsive**: Hides on mobile, expands on desktop

#### 2. **TopNav.tsx** - Sticky Header Navigation
- **Height**: 64px (4rem)
- **Content Sections**:
  - **Left**: Logo, "Nexora SIEM" branding
  - **Center**: Global search bar (monospace, searchable)
  - **Right**: Event counter, status indicator, WebSocket status, UTC clock, avatar
- **Features**:
  - Live pulsing indicator (ingestion status)
  - Real-time clock
  - Profile avatar with gradient background

#### 3. **KPICards.tsx** - Statistics Dashboard
- **Grid**: 3 columns (lg), 2 columns (md), 1 column (sm)
- **Cards** (6 total):
  - Total Alerts, High Severity, Medium Severity
  - Incidents, Detection Rate, Risk Score
- **Card Features**:
  - Large number display with trend percentage
  - Color-coded icon indicator
  - Mini sparkline chart
  - Hover effects with opacity change

#### 4. **ThreatActivityTimeline.tsx** - 24h Alert Chart
- **Chart Type**: Stacked bar chart (Recharts)
- **Data**: Hourly alert distribution over 24 hours
- **Series**: Total alerts (cyan) + High severity (red)
- **Interactive**: Tooltip on hover
- **Responsive**: Full-width with proper aspect ratio

#### 5. **LoginFailureHeatmap.tsx** - Brute Force Pattern
- **Layout**: 7 days (rows) × 24 hours (columns)
- **Color Intensity**: 5 levels (0-100 failures per cell)
- **Interaction**: Hover tooltip showing exact count
- **Legend**: Low → High gradient
- **Scrollable**: Horizontal scroll on small screens

#### 6. **ThreatSeverityGauge.tsx** - Risk Score Indicator
- **Visual**: SVG circular progress (SVG-based)
- **Percentage**: 0-100% animating with smooth transitions
- **Color Change**:
  - Red (≥75% critical)
  - Orange (50-74% high)
  - Green (<50% medium)
- **Details**: Risk breakdown pills (Critical, Medium, Safe)

#### 7. **LiveEventStream.tsx** - Real-time Alert Ticker
- **Live Badge**: Green pulsing dot indicator
- **Alert Rows** (8 visible):
  - Timestamp, Severity badge, Alert type, Source IP/Username
  - Color-coded by severity
- **Scrollable**: Max height 300px, scrollable content
- **Status**: Shows "X of Y recent events"

#### 8. **HuntConsole.tsx** - Enterprise Threat Hunt
- **Search Bar**: Monospace input field
- **Features**:
  - Query suggestions dropdown
  - Filter chip pills (removable)
  - 8 common threat hunt templates
- **Suggestions**: Failed Logins, Brute Force, Privilege Escalation, etc.
- **Query Display**: Shows active AND query at bottom

#### 9. **MitreMatrix.tsx** - ATT&CK Heatmap
- **Layout**: 6 tactics × 4 techniques grid
- **Tactics**: Initial Access, Credential Access, Persistence, Privilege Escalation, Discovery, Lateral Movement
- **Cell Colors**:
  - Red (≥80% activity high)
  - Orange (50-80% medium)
  - Blue (20-50% low)
  - Gray (<20% inactive)
- **Interactive**: Click to show technique details panel

#### 10. **IOCFeedsTable.tsx** - Threat Intelligence
- **Columns**: IP, Reputation, Country, Threat Type, Confidence, Last Seen, Action
- **Reputation Badges**:
  - Red: Malicious
  - Orange: Suspicious
  - Green: Clean
- **Actions**: Copy to clipboard, open external link
- **Scrollable**: Horizontal scroll for mobile
- **Shows**: 5 IOCs with "View All" link

#### 11. **AttackChainFlow.tsx** - Threat Progression
- **Flow**: 6-stage attack progression
- **Stages**: Reconnaissance → Compromise → Persistence → Privilege Escalation → Lateral Movement → Exfiltration
- **Node Cards**:
  - Stage name, timestamp, severity badge, details
  - Color-coded left border by severity
- **Bottom Stats**: Duration, stages, risk score, status
- **Action Buttons**: Investigate, Contain Threat

---

## Layout Structure

### Page Hierarchy
```
TopNav (fixed, z-50)
├─ Logo & Branding
├─ Global Search
└─ Status Indicators

Sidebar (fixed, z-40)
├─ Navigation Items (hover expandable)
└─ Toggle Button

Main Content (ml-20 pt-20)
├─ KPI Cards Grid (3 columns)
├─ Analytics Grid (2 columns)
│  ├─ Threat Timeline + Login Heatmap
│  └─ Severity Gauge + Live Stream
├─ Hunt Console (full-width)
├─ MITRE Matrix (full-width)
├─ IOC Feeds (full-width)
├─ Attack Chain (full-width)
└─ Recent Alerts (full-width)
```

### Responsive Breakpoints
- **sm** (640px): Single column, sidebar hidden
- **md** (768px): 2 columns, sidebar visible
- **lg** (1024px): 3-4 columns, full layout
- **xl** (1280px): 6 columns max for KPI cards

---

## Design System Details

### Typography
- **Fonts**: Inter / Geist (Tailwind default)
- **Sizes**:
  - Headings: 18px (font-bold)
  - Body: 14px (font-normal)
  - Small: 12px (font-semibold)
  - Code: 12px (font-mono)

### Spacing Scale
- **xs**: 2px
- **sm**: 4px
- **md**: 6px
- **lg**: 8px
- **xl**: 12px
- **2xl**: 16px (padding standard)
- **3xl**: 24px (section gaps)
- **4xl**: 32px

### Border Radius
- **sm**: 4px (small elements)
- **md**: 6px (cards, buttons)
- **lg**: 8px (modals)

### Shadows
- **card**: Subtle shadow on hover
- **alert**: Color-coded glow (threat-specific)
- **depth**: Minimal, mostly borders

### Animations
- **Duration**: 200-300ms standard
- **Easing**: ease-in-out
- **Effects**:
  - Hover: Border color + opacity changes
  - Active: Scale or shadow shift
  - Loading: Pulse animation (pulsing circle)
  - Transitions: Smooth 200ms for all state changes

---

## Component Features Highlight

### Severity Indicators
All severity displays follow consistent color scheme:
```
HIGH     → Red (#ef4444) with red/20 background
MEDIUM   → Orange (#f59e0b) with orange/20 background
LOW      → Blue (#3b82f6) with blue/20 background
INFO     → Cyan (#38bdf8) with cyan/20 background
```

### Badge Styles
- **Inline Badges**: Colored background with 20% opacity + contrasting text
- **Pill Badges**: Rounded background with border
- **Badge Sizes**: 12px text, 4-8px padding

### Interactive Elements
- **Buttons**: Hover state with opacity change (0.8 → 1.0)
- **Inputs**: Focus with ring (1px) and border color change to primary
- **Chips**: Removable with X icon, border-primary/40 default
- **Tables**: Row hover with bg-secondary/50 background shift

### Loading & States
- **Skeleton**: Subtle gray boxes with pulse animation
- **Loading**: Pulsing circle or spinner
- **Empty**: Centered text in container with 8rem height
- **Error**: Red border + background panel

---

## Key Design Principles

1. **Information Density** - Maximize content per viewport without clutter
2. **Visual Hierarchy** - Size, color, position guide attention
3. **Consistency** - Repeated patterns for predictability
4. **Dark Theme Only** - No light mode (SOC analysts work 24/7)
5. **Professional** - No neon, hacker aesthetic, or decorative elements
6. **Accessibility** - WCAG AA compliant (1.4.3 contrast ratio minimum)
7. **Performance** - Smooth 60fps animations, minimal layout shifts

---

## Customization Guide

### Changing Colors
Edit `/src/app/globals.css` @theme section:
```css
@theme {
  --color-background: #YOUR_COLOR;
  --color-primary: #YOUR_COLOR;
  /* ... other colors */
}
```

### Adding Navigation Items
Edit `Sidebar.tsx` `navItems` array:
```tsx
const navItems: NavItem[] = [
  { id: 'newitem', label: 'New Item', icon: <Icon />, href: '/path' },
  // ...
];
```

### Customizing KPI Metrics
Edit `KPICards.tsx` `useEffect` hook to calculate custom metrics.

### Changing Chart Data
Each chart component accepts alert data and generates visualizations. Update the data generation logic in each component's `useEffect`.

---

## Performance Optimizations

- Memoized components with React.memo where appropriate
- Recharts lazy rendering for large datasets
- CSS-based animations (performant)
- Minimal re-renders with proper dependency arrays
- Code splitting via Next.js

---

## Future Enhancements

- [ ] Dark/Light theme toggle
- [ ] Custom dashboard layouts
- [ ] Real-time WebSocket updates for all charts
- [ ] Advanced filtering on tables
- [ ] Export functionality (CSV, PDF)
- [ ] User preferences persistence
- [ ] Mobile app version

---

## Development Workflow

### Running the Dashboard
```bash
cd nexora-frontend
npm run dev
# Dashboard at http://localhost:3000
```

### Building for Production
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

---

## Support & Documentation

For questions or issues:
1. Check component TypeScript interfaces in `/src/components/`
2. Review globals.css for color/styling details
3. Inspect page.tsx for component composition
4. Check types/alert.ts for data structures

---

**Last Updated**: May 24, 2026  
**Version**: 2.0 Enterprise Redesign  
**Status**: Production Ready
