'use client';

import { Alert } from '@/types/alert';

interface AlertChartsProps {
  alerts: Alert[];
}

export default function AlertCharts({ alerts }: AlertChartsProps) {
  const high = alerts.filter((a) => a.severity === 'HIGH').length;
  const medium = alerts.filter((a) => a.severity === 'MEDIUM').length;
  const low = alerts.filter((a) => a.severity === 'LOW').length;
  const total = high + medium + low;

  const typeMap = alerts.reduce(
    (acc, alert) => {
      const type = alert.alert_type || 'unknown';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Calculate percentages
  const highPercent = total > 0 ? Math.round((high / total) * 100) : 0;
  const mediumPercent = total > 0 ? Math.round((medium / total) * 100) : 0;
  const lowPercent = total > 0 ? Math.round((low / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Severity Distribution */}
      <div className="border border-border bg-card/50 backdrop-blur rounded-lg p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">Severity Distribution</h2>
        <div className="space-y-4">
          {/* HIGH */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-red-400">HIGH</span>
              <span className="text-sm text-muted-foreground">{high}</span>
            </div>
            <div className="w-full bg-red-900/20 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full transition-all-smooth"
                style={{ width: `${highPercent}%` }}
              ></div>
            </div>
          </div>

          {/* MEDIUM */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-yellow-400">MEDIUM</span>
              <span className="text-sm text-muted-foreground">{medium}</span>
            </div>
            <div className="w-full bg-yellow-900/20 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full transition-all-smooth"
                style={{ width: `${mediumPercent}%` }}
              ></div>
            </div>
          </div>

          {/* LOW */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-400">LOW</span>
              <span className="text-sm text-muted-foreground">{low}</span>
            </div>
            <div className="w-full bg-blue-900/20 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all-smooth"
                style={{ width: `${lowPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Type Distribution */}
      <div className="border border-border bg-card/50 backdrop-blur rounded-lg p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">Alert Type Distribution</h2>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {Object.entries(typeMap).length > 0 ? (
            Object.entries(typeMap)
              .sort((a, b) => b[1] - a[1])
              .map(([type, count]) => {
                const percent = total > 0 ? Math.round((count / total) * 100) : 0;
                return (
                  <div key={type}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-foreground truncate">{type}</span>
                      <span className="text-sm text-muted-foreground">{count}</span>
                    </div>
                    <div className="w-full bg-primary/10 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all-smooth"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })
          ) : (
            <p className="text-muted-foreground text-center py-8">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
}
