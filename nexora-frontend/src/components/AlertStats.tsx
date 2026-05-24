import { Alert } from '@/types/alert';

interface AlertStatsProps {
  alerts: Alert[];
}

export default function AlertStats({ alerts }: AlertStatsProps) {
  const total = alerts.length;
  const high = alerts.filter((a) => a.severity === 'HIGH').length;
  const medium = alerts.filter((a) => a.severity === 'MEDIUM').length;
  const low = alerts.filter((a) => a.severity === 'LOW').length;

  const stats = [
    {
      label: 'Total Alerts',
      value: total,
      color: 'text-foreground',
      bgGlow: '',
    },
    {
      label: 'High Severity',
      value: high,
      color: 'text-red-400',
      bgGlow: 'glow-alert',
    },
    {
      label: 'Medium Severity',
      value: medium,
      color: 'text-yellow-400',
      bgGlow: 'glow-warning',
    },
    {
      label: 'Low Severity',
      value: low,
      color: 'text-blue-400',
      bgGlow: 'glow-info',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgGlow} border border-border bg-card/50 backdrop-blur rounded-lg p-6 transition-all-smooth hover:bg-card/70`}
        >
          <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
          <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
