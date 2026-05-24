'use client';

import { ArrowRight, AlertTriangle } from 'lucide-react';

interface AttackNode {
  id: string;
  label: string;
  time: string;
  severity: 'high' | 'medium' | 'low';
  details: string;
}

const attackChain: AttackNode[] = [
  {
    id: '1',
    label: 'Reconnaissance',
    time: '12:45 UTC',
    severity: 'low',
    details: 'Port scanning detected on internal subnet',
  },
  {
    id: '2',
    label: 'Initial Compromise',
    time: '12:58 UTC',
    severity: 'high',
    details: 'Exploitation of unpatched vulnerability',
  },
  {
    id: '3',
    label: 'Persistence',
    time: '13:05 UTC',
    severity: 'high',
    details: 'Scheduled task created for lateral movement',
  },
  {
    id: '4',
    label: 'Privilege Escalation',
    time: '13:12 UTC',
    severity: 'high',
    details: 'Attempted token impersonation detected',
  },
  {
    id: '5',
    label: 'Lateral Movement',
    time: '13:25 UTC',
    severity: 'high',
    details: 'Pass-the-hash attack across domain',
  },
  {
    id: '6',
    label: 'Data Exfiltration',
    time: '13:42 UTC',
    severity: 'high',
    details: 'Large file transfer to external IP',
  },
];

export default function AttackChainFlow() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-threat-high/20 border-threat-high text-threat-high';
      case 'medium':
        return 'bg-threat-medium/20 border-threat-medium text-threat-medium';
      case 'low':
        return 'bg-threat-low/20 border-threat-low text-threat-low';
      default:
        return 'bg-muted/20 border-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h3 className="text-lg font-bold text-foreground mb-4">Correlated Attack Chain</h3>
      <p className="text-xs text-muted-foreground mb-6">
        Detected threat actor progression over time with MITRE ATT&CK mapping
      </p>

      {/* Attack Flow */}
      <div className="space-y-0 mb-6">
        {attackChain.map((node, index) => (
          <div key={node.id}>
            {/* Node */}
            <div className={`flex items-start gap-4 p-4 rounded-lg border-l-4 ${getSeverityColor(node.severity)} bg-secondary/50`}>
              {/* Icon */}
              <div className="flex-shrink-0 mt-1">
                <div className={`p-2 rounded-lg ${getSeverityColor(node.severity).split(' ')[0]}`}>
                  <AlertTriangle className={`w-5 h-5 ${getSeverityColor(node.severity).split(' ')[2]}`} />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-foreground">{node.label}</span>
                  <span className="text-xs font-mono text-muted-foreground">{node.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{node.details}</p>
              </div>

              {/* Severity Badge */}
              <div className="flex-shrink-0">
                <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase ${getSeverityColor(node.severity).split(' ')[2]} ${getSeverityColor(node.severity).split(' ')[0]}`}>
                  {node.severity}
                </span>
              </div>
            </div>

            {/* Arrow Connector */}
            {index < attackChain.length - 1 && (
              <div className="flex justify-center py-2">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border">
        <div>
          <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Duration</p>
          <p className="text-lg font-bold text-foreground">57 min</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Stages</p>
          <p className="text-lg font-bold text-foreground">{attackChain.length}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Risk Score</p>
          <p className="text-lg font-bold text-threat-high">Critical</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Status</p>
          <p className="text-lg font-bold text-warning-indicator">Active</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-3">
        <button className="flex-1 px-4 py-2 rounded-lg bg-threat-high/20 border border-threat-high/50 text-threat-high font-semibold text-sm hover:bg-threat-high/30 transition-colors duration-200">
          Investigate
        </button>
        <button className="flex-1 px-4 py-2 rounded-lg bg-primary/20 border border-primary/50 text-primary font-semibold text-sm hover:bg-primary/30 transition-colors duration-200">
          Contain Threat
        </button>
      </div>
    </div>
  );
}
