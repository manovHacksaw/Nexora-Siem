'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

interface ThreatSeverityGaugeProps {
  alerts?: any[];
}

export default function ThreatSeverityGauge({ alerts = [] }: ThreatSeverityGaugeProps) {
  const [riskPercentage, setRiskPercentage] = useState(72);

  useEffect(() => {
    if (alerts.length === 0) {
      setRiskPercentage(72);
      return;
    }

    const highCount = alerts.filter((a) => a.severity === 'HIGH').length;
    const percentage = Math.round((highCount / alerts.length) * 100);
    setRiskPercentage(Math.min(percentage * 1.5, 100)); // Scale for better visualization
  }, [alerts]);

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (riskPercentage / 100) * circumference;

  const getRiskColor = () => {
    if (riskPercentage >= 75) return 'text-threat-high';
    if (riskPercentage >= 50) return 'text-threat-medium';
    return 'text-success-indicator';
  };

  const getRiskLabel = () => {
    if (riskPercentage >= 75) return 'CRITICAL';
    if (riskPercentage >= 50) return 'HIGH RISK';
    return 'MEDIUM RISK';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 flex flex-col items-center justify-center">
      <h3 className="text-lg font-bold text-foreground mb-6">Environment Risk Score</h3>

      {/* Circular Gauge */}
      <div className="relative w-48 h-48 mb-6">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="#1e293b"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke={riskPercentage >= 75 ? '#ef4444' : riskPercentage >= 50 ? '#f59e0b' : '#22c55e'}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`text-4xl font-bold ${getRiskColor()}`}>{Math.round(riskPercentage)}%</div>
          <div className="text-xs text-muted-foreground mt-1">Risk Level</div>
        </div>
      </div>

      {/* Risk Label & Icon */}
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className={`w-5 h-5 ${getRiskColor()}`} />
        <span className={`font-bold ${getRiskColor()}`}>{getRiskLabel()}</span>
      </div>

      {/* Risk Indicators */}
      <div className="w-full space-y-2 text-xs">
        <div className="flex items-center justify-between p-2 bg-threat-high/10 border border-threat-high/20 rounded">
          <span className="text-threat-high">Critical Threats</span>
          <span className="font-bold">{Math.round(riskPercentage * 1.2)}</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-threat-medium/10 border border-threat-medium/20 rounded">
          <span className="text-threat-medium">Medium Threats</span>
          <span className="font-bold">{Math.round(riskPercentage * 0.8)}</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-success-indicator/10 border border-success-indicator/20 rounded">
          <span className="text-success-indicator">Safe</span>
          <span className="font-bold">{100 - Math.round(riskPercentage)}</span>
        </div>
      </div>
    </div>
  );
}
