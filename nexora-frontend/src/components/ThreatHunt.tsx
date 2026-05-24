'use client';

import { useState } from 'react';

export default function ThreatHunt() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/hunt/query?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Hunt error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-border bg-card/50 backdrop-blur rounded-lg p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">Threat Hunt Console</h2>

      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search IP / user / severity / alert type..."
          className="flex-1 px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all-smooth"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition-all-smooth"
        >
          {loading ? 'Hunting...' : 'Hunt'}
        </button>
      </form>

      {results.length > 0 && (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {results.map((result, idx) => (
            <div key={idx} className="p-3 bg-card border border-border rounded text-sm text-muted-foreground hover:bg-card/70 transition-all-smooth">
              <p className="text-foreground font-medium">{result.alert_type}</p>
              <p className="text-xs">IP: {result.source_ip} | User: {result.username || '-'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
