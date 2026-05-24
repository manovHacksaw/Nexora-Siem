export type AlertSeverity = 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';

export interface Alert {
  id?: string;
  timestamp: string;
  alert_type: string;
  severity: AlertSeverity;
  source_ip: string;
  username?: string;
  description?: string;
  mitre_attack?: {
    technique?: string;
    tactic?: string;
  };
}

export interface CorrelationChain {
  chain_type: string;
  description: string;
  events: string[];
  severity: AlertSeverity;
}
