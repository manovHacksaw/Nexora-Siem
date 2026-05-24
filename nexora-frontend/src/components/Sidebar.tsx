'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  Bell,
  Lightbulb,
  Target,
  BarChart3,
  Search,
  List,
  FileText,
  Plug,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={24} />, href: '/' },
  { id: 'alerts', label: 'Alerts', icon: <Bell size={24} />, href: '/alerts' },
  { id: 'threat-intel', label: 'Threat Intel', icon: <Lightbulb size={24} />, href: '/threat-intel' },
  { id: 'mitre', label: 'MITRE ATT&CK', icon: <Target size={24} />, href: '/mitre' },
  { id: 'ueba', label: 'UEBA Analytics', icon: <BarChart3 size={24} />, href: '/ueba' },
  { id: 'threat-hunt', label: 'Threat Hunt', icon: <Search size={24} />, href: '/threat-hunt' },
  { id: 'ioc-feeds', label: 'IOC Feeds', icon: <List size={24} />, href: '/ioc-feeds' },
  { id: 'logs', label: 'Logs', icon: <FileText size={24} />, href: '/logs' },
  { id: 'integrations', label: 'Integrations', icon: <Plug size={24} />, href: '/integrations' },
  { id: 'settings', label: 'Settings', icon: <Settings size={24} />, href: '/settings' },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border transition-all duration-300 ease-in-out z-40 ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <nav className="flex flex-col h-full">
        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-3 space-y-1 px-2">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-[var(--radius)] transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-secondary ${
                isExpanded ? 'justify-start' : 'justify-center'
              }`}
              title={!isExpanded ? item.label : undefined}
            >
              <span className="flex-shrink-0 w-5 h-5 text-primary opacity-70 group-hover:opacity-100">{item.icon}</span>
              {isExpanded && <span className="text-sm font-medium truncate">{item.label}</span>}
            </a>
          ))}
        </div>

        {/* Toggle Button */}
        <div className="border-t border-border p-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center py-2 rounded-[var(--radius)] hover:bg-secondary transition-all duration-200 text-muted-foreground hover:text-foreground"
            aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>
      </nav>
    </aside>
  );
}
