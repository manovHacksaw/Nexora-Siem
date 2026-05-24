'use client';

import { useMemo } from 'react';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

interface HeatmapCell {
  day: string;
  hour: string;
  value: number;
}

export default function LoginFailureHeatmap() {
  const data = useMemo(() => {
    const heatmapData: HeatmapCell[] = [];
    days.forEach((day) => {
      hours.forEach((hour) => {
        const value = Math.floor(Math.random() * 100);
        heatmapData.push({ day, hour, value });
      });
    });
    return heatmapData;
  }, []);

  const getColorIntensity = (value: number) => {
    if (value < 10) return 'bg-opacity-20';
    if (value < 30) return 'bg-opacity-40';
    if (value < 50) return 'bg-opacity-60';
    if (value < 75) return 'bg-opacity-80';
    return 'bg-opacity-100';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-bold text-foreground mb-4">Login Failure Heatmap (7 days)</h3>
      <div className="overflow-x-auto">
        <div className="min-w-max">
          {/* Header with hours */}
          <div className="flex gap-1 mb-1 ml-12">
            {hours.map((hour) => (
              <div key={hour} className="w-6 text-xs text-muted-foreground text-center">
                {hour.split(':')[0]}
              </div>
            ))}
          </div>

          {/* Heatmap rows */}
          <div className="space-y-1">
            {days.map((day) => (
              <div key={day} className="flex items-center gap-1">
                <div className="w-10 text-xs font-semibold text-muted-foreground text-right">{day}</div>
                <div className="flex gap-1">
                  {data
                    .filter((cell) => cell.day === day)
                    .map((cell) => (
                      <div
                        key={`${cell.day}-${cell.hour}`}
                        className={`w-6 h-6 rounded-sm bg-threat-high ${getColorIntensity(cell.value)} border border-border/50 cursor-pointer hover:border-primary transition-all duration-200 group relative`}
                        title={`${day} ${cell.hour}: ${cell.value} failures`}
                      >
                        <div className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-card border border-border px-2 py-1 rounded text-xs text-foreground whitespace-nowrap z-10">
                          {cell.value} failures
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-4 text-xs">
        <span className="text-muted-foreground">Low</span>
        {[20, 40, 60, 80, 100].map((opacity) => (
          <div
            key={opacity}
            className="w-4 h-4 rounded bg-threat-high border border-border/50"
            style={{ opacity: opacity / 100 }}
          ></div>
        ))}
        <span className="text-muted-foreground">High</span>
      </div>
    </div>
  );
}
