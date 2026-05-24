import { Alert } from '@/types/alert';

interface ThreatIntelPanelProps {
  alerts: Alert[];
}

export default function ThreatIntelPanel({ alerts }: ThreatIntelPanelProps) {
  const intelAlerts = alerts.slice(0, 5);

  return (
    <div className="border border-border bg-card/50 backdrop-blur rounded-lg p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">Threat Intelligence</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {intelAlerts.length > 0 ? (
          intelAlerts.map((alert, idx) => (
            <div key={idx} className="border border-border bg-card/30 rounded-lg p-4 hover:bg-card/50 transition-all-smooth">
              <p className="text-sm font-semibold text-foreground mb-2">{alert.source_ip}</p>
              <p className="text-xs text-muted-foreground mb-3">Suspicious activity detected</p>
              <span className="inline-block px-2 py-1 bg-red-900/20 text-red-400 text-xs rounded border border-red-700/50">
                MALICIOUS
              </span>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground col-span-full text-center py-8">No threat intelligence available</p>
        )}
      </div>
    </div>
  );
}
