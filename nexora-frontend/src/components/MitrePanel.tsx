import { Alert } from '@/types/alert';

interface MitrePanelProps {
  alerts: Alert[];
}

export default function MitrePanel({ alerts }: MitrePanelProps) {
  const mitreAlerts = alerts.slice(0, 6);

  return (
    <div className="border border-border bg-card/50 backdrop-blur rounded-lg p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">MITRE ATT&CK Mapping</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mitreAlerts.length > 0 ? (
          mitreAlerts.map((alert, idx) => (
            <div key={idx} className="border border-border bg-card/30 rounded-lg p-4 hover:bg-card/50 transition-all-smooth">
              <h3 className="text-sm font-semibold text-foreground mb-2">{alert.alert_type}</h3>
              <p className="text-xs text-primary mb-3">{alert.mitre_attack?.technique || 'T1110 - Brute Force'}</p>
              <p className="text-xs text-muted-foreground">{alert.mitre_attack?.tactic || 'Credential Access'}</p>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground col-span-full text-center py-8">No MITRE mappings available</p>
        )}
      </div>
    </div>
  );
}
