'use client';

import { useEffect, useState } from 'react';
import { AlertCircle, TrendingUp, TrendingDown, Activity, Shield, Zap } from 'lucide-react';

interface KPI {
  label: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  color: string;
}

interface KPICardsProps {
  alerts?: any[];
}

export default function KPICards({ alerts = [] }: KPICardsProps) {
  const [kpis, setKpis] = useState<KPI[]>([]);

  useEffect(() => {
    // Calculate KPI metrics from alerts
    const totalAlerts = alerts.length;
    const highSeverity = alerts.filter((a) => a.severity === 'HIGH').length;
    const mediumSeverity = alerts.filter((a) => a.severity === 'MEDIUM').length;
    const incidents = Math.ceil(totalAlerts * 0.12); // Estimate 12% as incidents
    const detectionRate = totalAlerts > 0 ? Math.round((highSeverity / totalAlerts) * 100) : 0;
    const avgRisk = Math.round((highSeverity * 3 + mediumSeverity) / Math.max(totalAlerts, 1));

    setKpis([
      {
        label: 'Total Alerts',
        value: totalAlerts,
        change: 12,
        icon: <AlertCircle className="w-5 h-5" />,
        color: 'text-primary',
      },
      {
        label: 'High Severity',
        value: highSeverity,
        change: -8,
        icon: <AlertCircle className="w-5 h-5" />,
        color: 'text-threat-high',
      },
      {
        label: 'Medium Severity',
        value: mediumSeverity,
        change: 5,
        icon: <Activity className="w-5 h-5" />,
        color: 'text-threat-medium',
      },
      {
        label: 'Incidents',
        value: incidents,
        change: 2,
        icon: <Shield className="w-5 h-5" />,
        color: 'text-threat-low',
      },
      {
        label: 'Detection Rate',
        value: detectionRate,
        change: 3,
        icon: <Zap className="w-5 h-5" />,
        color: 'text-success-indicator',
      },
      {
        label: 'Risk Score',
        value: avgRisk,
        change: -4,
        icon: <TrendingDown className="w-5 h-5" />,
        color: 'text-accent',
      },
    ]);
  }, [alerts]);

  const getTrendIcon = (change: number) => {
    return change >= 0 ? (
      <TrendingUp className="w-4 h-4 text-threat-medium" />
    ) : (
      <TrendingDown className="w-4 h-4 text-success-indicator" />
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {kpis.map((kpi, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-[var(--radius)] p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`p-2.5 rounded-lg bg-secondary ${kpi.color}`}>{kpi.icon}</div>
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              {getTrendIcon(kpi.change)}
              <span className={kpi.change >= 0 ? 'text-threat-medium' : 'text-success-indicator'}>
                {Math.abs(kpi.change)}%
              </span>
            </div>
          </div>
          <div className="mb-4">
            <div className="text-3xl font-semibold text-foreground">{kpi.value.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground mt-1">{kpi.label}</div>
          </div>
          {/* Mini sparkline placeholder */}
          <div className="h-7 flex items-end gap-0.5 opacity-50 group-hover:opacity-70 transition-opacity duration-300">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-primary/30 rounded-sm"
                style={{ height: `${Math.random() * 100}%` }}
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
