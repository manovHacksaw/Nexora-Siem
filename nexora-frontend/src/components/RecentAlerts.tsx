import { Alert } from '@/types/alert';

interface RecentAlertsProps {
  alerts: Alert[];
  onInvestigate: (alert: Alert) => void;
}

export default function RecentAlerts({ alerts, onInvestigate }: RecentAlertsProps) {
  const getSeverityClass = (severity: string) => {
    switch (severity?.toUpperCase()) {
      case 'HIGH':
        return 'severity-high';
      case 'MEDIUM':
        return 'severity-medium';
      case 'LOW':
        return 'severity-low';
      default:
        return 'severity-info';
    }
  };

  return (
    <div className="border border-border bg-card/50 backdrop-blur rounded-lg p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">Recent Alerts</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Timestamp</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Alert Type</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Severity</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Source IP</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">User</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {alerts.length > 0 ? (
              alerts.map((alert, idx) => (
                <tr key={idx} className="border-b border-border/50 hover:bg-card/50 transition-all-smooth">
                  <td className="py-3 px-4 text-foreground text-xs">{alert.timestamp}</td>
                  <td className="py-3 px-4 text-foreground">{alert.alert_type}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getSeverityClass(alert.severity)}`}>
                      {alert.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-foreground font-mono text-xs">{alert.source_ip}</td>
                  <td className="py-3 px-4 text-muted-foreground text-xs">{alert.username || '-'}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => onInvestigate(alert)}
                      className="px-3 py-1 bg-primary/20 text-primary rounded text-xs font-medium hover:bg-primary/30 transition-all-smooth"
                    >
                      Investigate
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 px-4 text-center text-muted-foreground">
                  No alerts
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
