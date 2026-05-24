'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TimelineDataPoint {
  time: string;
  alerts: number;
  high: number;
  medium: number;
}

interface ThreatActivityTimelineProps {
  alerts?: any[];
}

export default function ThreatActivityTimeline({ alerts = [] }: ThreatActivityTimelineProps) {
  const [data, setData] = useState<TimelineDataPoint[]>([]);

  useEffect(() => {
    // Generate timeline data based on current hour distribution
    const timelineData: TimelineDataPoint[] = [];
    for (let i = 23; i >= 0; i--) {
      const hour = String(24 - i).padStart(2, '0');
      const alertCount = Math.floor(Math.random() * 120) + 10;
      const highCount = Math.floor(alertCount * 0.15);
      const mediumCount = Math.floor(alertCount * 0.35);

      timelineData.push({
        time: `${hour}:00`,
        alerts: alertCount,
        high: highCount,
        medium: mediumCount,
      });
    }
    setData(timelineData.reverse());
  }, [alerts]);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-bold text-foreground mb-4">Threat Activity Timeline (24h)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis
            dataKey="time"
            stroke="#94a3b8"
            style={{ fontSize: '12px' }}
            interval={Math.floor(data.length / 6)}
          />
          <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: '6px',
              color: '#f1f5f9',
            }}
            labelStyle={{ color: '#94a3b8', fontSize: '12px' }}
          />
          <Bar dataKey="alerts" fill="#38bdf8" radius={[4, 4, 0, 0]} isAnimationActive={false} />
          <Bar dataKey="high" fill="#ef4444" radius={[4, 4, 0, 0]} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-primary"></div>
          <span className="text-muted-foreground">All Alerts</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-threat-high"></div>
          <span className="text-muted-foreground">High Severity</span>
        </div>
      </div>
    </div>
  );
}
