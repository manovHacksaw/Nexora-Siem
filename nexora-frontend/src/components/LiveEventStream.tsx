'use client';

import { useEffect, useState } from 'react';
import { Clock, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { Alert } from '@/types/alert';

interface LiveEventStreamProps {
  alerts?: Alert[];
}

export default function LiveEventStream({ alerts = [] }: LiveEventStreamProps) {
  const [displayAlerts, setDisplayAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Show only the latest 8 alerts
    setDisplayAlerts(alerts.slice(0, 8));
  }, [alerts]);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'HIGH':
        return <AlertTriangle className="w-4 h-4 text-threat-high" />;
      case 'MEDIUM':
        return <AlertCircle className="w-4 h-4 text-threat-medium" />;
      default:
        return <Info className="w-4 h-4 text-threat-low" />;
    }
  };

  const getSeverityBgColor = (severity: string) => {
    switch (severity) {
      case 'HIGH':
        return 'bg-threat-high/10 border-threat-high/30';
      case 'MEDIUM':
        return 'bg-threat-medium/10 border-threat-medium/30';
      default:
        return 'bg-threat-low/10 border-threat-low/30';
    }
  };

  const formatTime = (timestamp?: string) => {
    if (!timestamp) return new Date().toLocaleTimeString('en-US', { hour12: false });
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour12: false });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold text-foreground">Live Event Stream</h3>
        <div className="ml-auto">
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-success-indicator/20 text-success-indicator text-xs font-semibold">
            <div className="w-2 h-2 rounded-full bg-success-indicator animate-pulse"></div>
            Live
          </span>
        </div>
      </div>

      {/* Event List */}
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {displayAlerts.length > 0 ? (
          displayAlerts.map((alert, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 p-3 rounded-lg border transition-all duration-300 hover:border-primary/50 cursor-pointer ${getSeverityBgColor(alert.severity)}`}
            >
              <div className="flex-shrink-0 mt-0.5">{getSeverityIcon(alert.severity)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-muted-foreground">{formatTime(alert.timestamp)}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    alert.severity === 'HIGH'
                      ? 'bg-threat-high/20 text-threat-high'
                      : alert.severity === 'MEDIUM'
                        ? 'bg-threat-medium/20 text-threat-medium'
                        : 'bg-threat-low/20 text-threat-low'
                  }`}>
                    {alert.severity}
                  </span>
                </div>
                <div className="text-sm text-foreground font-medium truncate">{alert.alert_type || 'Unknown Alert'}</div>
                <div className="text-xs text-muted-foreground mt-1 truncate">
                  {alert.source_ip || 'Unknown Source'} {alert.username ? `(${alert.username})` : ''}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            <p className="text-sm">No alerts to display</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground text-center">
        Showing {displayAlerts.length} of {alerts.length} recent events
      </div>
    </div>
  );
}
