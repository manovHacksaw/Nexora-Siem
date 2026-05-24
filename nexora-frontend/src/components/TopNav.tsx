'use client';

import { useState, useEffect } from 'react';
import { Search, Wifi, Circle, Target } from 'lucide-react';

export default function TopNav() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [eventCount] = useState(1247);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleString('en-US', {
          timeZone: 'UTC',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50 shadow-sm">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left Side - Logo & Branding */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
            <Target className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">Nexora SIEM</div>
            <div className="text-xs text-muted-foreground">Security Operations</div>
          </div>
        </div>

        {/* Center - Search Bar */}
        <div className="hidden md:flex flex-1 mx-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search IP, user, alert..."
              className="w-full bg-secondary border border-border rounded-[var(--radius)] pl-10 pr-4 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-all duration-200"
              style={{ boxShadow: 'none' }}
              onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 102, 204, 0.1), 0 0 0 1px rgb(0, 102, 204)'; }}
              onBlur={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
            />
          </div>
        </div>

        {/* Right Side - Status & Controls */}
        <div className="flex items-center gap-5">
          {/* Event Counter */}
          <div className="hidden lg:flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">Events:</span>
            <span className="font-semibold text-foreground">{eventCount.toLocaleString()}</span>
          </div>

          {/* Connection Status */}
          <div className="flex items-center gap-1.5 text-xs">
            <div className="relative">
              <Circle className="w-2.5 h-2.5 text-success-indicator fill-success-indicator animate-pulse" />
            </div>
            <span className="text-muted-foreground hidden sm:inline">Active</span>
          </div>

          {/* WebSocket Status */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Wifi className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Live</span>
          </div>

          {/* UTC Clock */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
            <span>{currentTime}</span>
          </div>

          {/* Avatar */}
          <button className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-200">
            <span className="text-xs font-semibold text-primary">SB</span>
          </button>
        </div>
      </div>
    </header>
  );
}
