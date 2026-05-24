'use client';

import { useState } from 'react';
import { ExternalLink, Copy } from 'lucide-react';

interface IOC {
  id: string;
  ip: string;
  reputation: string;
  country: string;
  threatType: string;
  confidence: number;
  lastSeen: string;
}

const mockIOCs: IOC[] = [
  {
    id: '1',
    ip: '192.168.1.105',
    reputation: 'Malicious',
    country: 'CN',
    threatType: 'C2 Communication',
    confidence: 98,
    lastSeen: '2 min',
  },
  {
    id: '2',
    ip: '10.0.0.42',
    reputation: 'Suspicious',
    country: 'RU',
    threatType: 'Phishing Infrastructure',
    confidence: 85,
    lastSeen: '15 min',
  },
  {
    id: '3',
    ip: '172.16.0.50',
    reputation: 'Clean',
    country: 'US',
    threatType: 'None',
    confidence: 5,
    lastSeen: '1 hour',
  },
  {
    id: '4',
    ip: '203.0.113.45',
    reputation: 'Malicious',
    country: 'KP',
    threatType: 'Botnet',
    confidence: 92,
    lastSeen: '3 min',
  },
  {
    id: '5',
    ip: '198.51.100.10',
    reputation: 'Suspicious',
    country: 'IR',
    threatType: 'DDoS Infrastructure',
    confidence: 78,
    lastSeen: '45 min',
  },
];

export default function IOCFeedsTable() {
  const [copiedIP, setCopiedIP] = useState<string | null>(null);

  const copyToClipboard = (ip: string) => {
    navigator.clipboard.writeText(ip);
    setCopiedIP(ip);
    setTimeout(() => setCopiedIP(null), 2000);
  };

  const getReputationColor = (reputation: string) => {
    switch (reputation) {
      case 'Malicious':
        return 'bg-threat-high/20 text-threat-high border-threat-high/30';
      case 'Suspicious':
        return 'bg-threat-medium/20 text-threat-medium border-threat-medium/30';
      case 'Clean':
        return 'bg-success-indicator/20 text-success-indicator border-success-indicator/30';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-threat-high';
    if (confidence >= 70) return 'text-threat-medium';
    if (confidence >= 50) return 'text-warning-indicator';
    return 'text-success-indicator';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h3 className="text-lg font-bold text-foreground mb-4">IOC Feeds & Threat Intelligence</h3>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                IP Address
              </th>
              <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Reputation
              </th>
              <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Country
              </th>
              <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Threat Type
              </th>
              <th className="text-center px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Confidence
              </th>
              <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Last Seen
              </th>
              <th className="text-center px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {mockIOCs.map((ioc) => (
              <tr
                key={ioc.id}
                className="border-b border-border/50 hover:bg-secondary/50 transition-colors duration-200 cursor-pointer"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted/20 px-2 py-1 rounded font-mono text-primary">{ioc.ip}</code>
                    <button
                      onClick={() => copyToClipboard(ioc.ip)}
                      className="hover:text-primary transition-colors duration-200"
                      title="Copy IP"
                    >
                      {copiedIP === ioc.ip ? (
                        <span className="text-xs text-success-indicator">✓</span>
                      ) : (
                        <Copy className="w-3 h-3 text-muted-foreground hover:text-foreground" />
                      )}
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-1 rounded text-xs font-bold border ${getReputationColor(ioc.reputation)}`}>
                    {ioc.reputation}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-foreground font-semibold">{ioc.country}</span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{ioc.threatType}</td>
                <td className={`px-4 py-3 text-center font-bold ${getConfidenceColor(ioc.confidence)}`}>
                  {ioc.confidence}%
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{ioc.lastSeen}</td>
                <td className="px-4 py-3 text-center">
                  <button className="text-primary hover:text-accent transition-colors duration-200">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
        <span>Showing {mockIOCs.length} IOCs from active feeds</span>
        <button className="text-primary hover:text-accent transition-colors duration-200 font-semibold">
          View All IOCs →
        </button>
      </div>
    </div>
  );
}
