'use client';

import { Alert } from '@/types/alert';

interface AlertModalProps {
  alert: Alert;
  isOpen: boolean;
  onClose: () => void;
}

export default function AlertModal({ alert, isOpen, onClose }: AlertModalProps) {
  if (!isOpen) return null;

  const getSeverityColor = (severity: string) => {
    switch (severity?.toUpperCase()) {
      case 'HIGH':
        return 'text-red-400';
      case 'MEDIUM':
        return 'text-yellow-400';
      case 'LOW':
        return 'text-blue-400';
      default:
        return 'text-cyan-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg max-w-md w-full overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">Alert Investigation</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Alert Type</p>
            <p className="text-sm text-foreground font-medium">{alert.alert_type}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-1">Severity</p>
            <p className={`text-sm font-bold ${getSeverityColor(alert.severity)}`}>{alert.severity}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-1">Source IP</p>
            <p className="text-sm text-foreground font-mono">{alert.source_ip}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-1">Username</p>
            <p className="text-sm text-foreground">{alert.username || '-'}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-1">Timestamp</p>
            <p className="text-sm text-foreground font-mono">{alert.timestamp}</p>
          </div>

          {alert.description && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Description</p>
              <p className="text-sm text-foreground">{alert.description}</p>
            </div>
          )}

          {alert.mitre_attack && (
            <>
              <div>
                <p className="text-xs text-muted-foreground mb-1">MITRE Technique</p>
                <p className="text-sm text-primary">{alert.mitre_attack.technique || 'Unknown'}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">MITRE Tactic</p>
                <p className="text-sm text-foreground">{alert.mitre_attack.tactic || 'Unknown'}</p>
              </div>
            </>
          )}
        </div>

        <div className="flex gap-3 p-6 border-t border-border bg-card/50">
          <button
            onClick={() => {
              /* TODO: Escalate incident logic */
            }}
            className="flex-1 px-4 py-2 bg-accent/20 text-accent rounded font-medium text-sm hover:bg-accent/30 transition-all-smooth"
          >
            Escalate Incident
          </button>
          <button
            onClick={() => {
              /* TODO: Block IP logic */
            }}
            className="flex-1 px-4 py-2 bg-destructive/20 text-destructive rounded font-medium text-sm hover:bg-destructive/30 transition-all-smooth"
          >
            Block IP
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-muted/20 text-muted-foreground rounded font-medium text-sm hover:bg-muted/30 transition-all-smooth"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
