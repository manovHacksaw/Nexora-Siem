# Nexora SIEM Frontend

A modern, professional Security Information and Event Management (SIEM) dashboard built with Next.js 16 and Tailwind CSS, featuring a Splunk-inspired dark theme optimized for security operations.

## Features

- **Real-time Alert Monitoring**: WebSocket-based live alert streaming with auto-refresh
- **Severity-based Visualization**: Quick overview of HIGH, MEDIUM, and LOW severity alerts
- **Alert Type Distribution**: Visual representation of different alert types
- **Threat Hunt Console**: Search alerts by IP, user, severity, or alert type
- **MITRE ATT&CK Mapping**: Map detected threats to MITRE ATT&CK tactics and techniques
- **Threat Intelligence**: Display suspicious IPs and malicious activity indicators
- **Correlated Attack Chains**: View AI-detected attack chains and lateral movement patterns
- **Recent Alerts Table**: Sortable table of recent security events with investigation tools
- **Alert Investigation Modal**: Detailed examination of individual alerts with action buttons

## Tech Stack

- **Framework**: Next.js 16.2.6 (App Router)
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **Language**: TypeScript
- **Charting**: Custom SVG-based visualizations
- **HTTP Client**: Native Fetch API
- **Real-time**: WebSocket for live alert updates

## Design

The dashboard uses a professional dark theme inspired by enterprise SIEM solutions like Splunk:

- **Background**: Deep dark (#1a1a1a) for reduced eye strain during long monitoring sessions
- **Accent Colors**: 
  - Blue (#0084d4) for primary actions and info
  - Red (#dc2626) for critical/high-severity alerts
  - Yellow (#f59e0b) for medium-severity alerts
  - Cyan/Blue for low-severity alerts
- **Glassmorphism**: Semi-transparent cards with backdrop blur for depth
- **Responsive Layout**: Mobile-first design adapting to all screen sizes

## Project Structure

```
nexora-frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main dashboard page
│   │   └── globals.css         # Global styles and CSS variables
│   ├── components/
│   │   ├── Header.tsx          # Top navigation bar
│   │   ├── LiveTicker.tsx      # Scrolling alert ticker
│   │   ├── AlertStats.tsx      # Alert count statistics
│   │   ├── AlertCharts.tsx     # Severity and type distribution
│   │   ├── ThreatHunt.tsx      # Search functionality
│   │   ├── MitrePanel.tsx      # MITRE ATT&CK mapping
│   │   ├── ThreatIntelPanel.tsx # Threat intelligence display
│   │   ├── CorrelationPanel.tsx # Attack chain visualization
│   │   ├── RecentAlerts.tsx    # Alert table
│   │   └── AlertModal.tsx      # Alert details modal
│   └── types/
│       └── alert.ts            # TypeScript interfaces
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── postcss.config.js           # PostCSS configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm run start
```

## API Integration

The dashboard connects to the Nexora SIEM backend API:

- **Base URL**: `http://127.0.0.1:8000`
- **Endpoints Used**:
  - `GET /alerts/recent` - Fetch recent alerts
  - `GET /correlation/chains` - Fetch correlated attack chains
  - `GET /hunt/query?q=<query>` - Search alerts
  - `WS /ws/live-alerts` - WebSocket for real-time alerts

## Configuration

### Theme Customization

Edit the CSS variables in `src/app/globals.css` under the `@theme` block to change colors:

```css
@theme {
  --color-primary: oklch(46% 0.18 213);  /* Change this to adjust primary color */
  --color-accent: oklch(60% 0.2 0);      /* Change this to adjust accent color */
}
```

### Environment Variables

Create a `.env.local` file if needed for API endpoint configuration:

```
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

## Performance Optimizations

- Client-side rendering for interactive dashboard with real-time updates
- WebSocket for efficient live alert streaming (fallback to polling every 30s)
- Tailwind CSS purging to minimize bundle size
- Optimized image loading with Next.js Image component
- Code splitting and lazy loading of components

## Responsive Design

The dashboard is fully responsive:
- **Mobile**: Single column layout
- **Tablet**: 2-column grid
- **Desktop**: 4-column grid with optimized spacing

## Accessibility

- Semantic HTML elements (header, main, etc.)
- ARIA labels and roles for screen readers
- Keyboard navigation support
- Color contrast ratios meeting WCAG AA standards
- Proper heading hierarchy

## Security Considerations

- Content Security Policy headers
- XSS protection through React's built-in sanitization
- Secure WebSocket connections in production (WSS)
- Environment variable handling for sensitive data

## Future Enhancements

- [ ] Advanced filtering and sorting capabilities
- [ ] Custom dashboard layouts
- [ ] Alert trend graphs and historical analysis
- [ ] User authentication and RBAC
- [ ] Export functionality (PDF, CSV)
- [ ] Dark/Light theme toggle
- [ ] Incident response workflows
- [ ] AI-powered anomaly detection visualization

## Troubleshooting

### WebSocket Connection Issues

If live alerts aren't updating:
1. Ensure the backend API is running on `http://127.0.0.1:8000`
2. Check browser console for connection errors
3. The fallback polling will still fetch updates every 30 seconds

### Styling Issues

If Tailwind styles aren't applying:
1. Clear `.next` cache: `rm -rf .next`
2. Rebuild: `npm run build`

### API Connection Errors

If alerts aren't loading:
1. Verify the backend is running
2. Check CORS settings in backend configuration
3. Ensure API endpoints are correctly configured

## Contributing

This project is part of the Nexora SIEM research platform. All contributions should maintain the current architecture and design standards.

## License

ISC

## Author

Built as part of the Nexora SIEM project by Harsh Yadav.

---

**Note**: This dashboard is designed for authorized security operations centers and educational/research environments only. Do not use against systems without proper authorization.
