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
    <header className="fixed top-0 left-0 right-0 h-16 bg-secondary border-b border-border z-50">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left Side - Logo & Branding */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Target className="w-6 h-6 text-primary" />
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">Nexora SIEM</div>
            <div className="text-xs text-muted-foreground">Enterprise Security</div>
          </div>
        </div>

        {/* Center - Search Bar */}
        <div className="hidden md:flex flex-1 mx-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search IP / User / IOC / Alert Type..."
              className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 font-mono"
            />
          </div>
        </div>

        {/* Right Side - Status & Controls */}
        <div className="flex items-center gap-6">
          {/* Event Counter */}
          <div className="hidden lg:flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Today:</span>
            <span className="font-semibold text-foreground">{eventCount.toLocaleString()}</span>
          </div>

          {/* Connection Status */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="relative">
                <Circle className="w-3 h-3 text-success-indicator fill-success-indicator animate-pulse" />
              </div>
              <span className="text-xs text-muted-foreground">Ingesting</span>
            </div>
          </div>

          {/* WebSocket Status */}
          <div className="flex items-center gap-1.5 text-xs">
            <Wifi className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground hidden sm:inline">Connected</span>
          </div>

          {/* UTC Clock */}
          <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
            <span>{currentTime}</span>
            <span>UTC</span>
          </div>

          {/* Avatar */}
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent hover:opacity-80 transition-opacity duration-200">
            <span className="text-sm font-bold text-primary-foreground">SB</span>
          </button>
        </div>
      </div>
    </header>
  );
}
