'use client';

import { useEffect, useState } from 'react';
import { CorrelationChain } from '@/types/alert';

export default function CorrelationPanel() {
  const [chains, setChains] = useState<CorrelationChain[]>([]);

  useEffect(() => {
    const loadChains = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/correlation/chains');
        const data = await response.json();
        setChains(data.chains || []);
      } catch (error) {
        console.error('Correlation fetch error:', error);
      }
    };

    loadChains();
  }, []);

  const getSeverityColor = (severity: string) => {
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
      <h2 className="text-xl font-bold text-foreground mb-6">Correlated Attack Chains</h2>

      <div className="space-y-4">
        {chains.length > 0 ? (
          chains.map((chain, idx) => (
            <div key={idx} className="border border-border bg-card/30 rounded-lg p-4 hover:bg-card/50 transition-all-smooth">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-sm font-semibold text-foreground">{chain.chain_type}</h3>
                <span className={`text-xs font-medium px-2 py-1 rounded ${getSeverityColor(chain.severity)}`}>
                  {chain.severity}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{chain.description}</p>
              <div className="text-xs text-primary font-mono bg-black/20 rounded px-3 py-2 overflow-x-auto">
                {chain.events?.join(' → ') || 'Unknown Sequence'}
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-center py-8">No attack chains detected</p>
        )}
      </div>
    </div>
  );
}
