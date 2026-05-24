'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';

const suggestedFilters = [
  { label: 'Failed Logins', query: 'event_type:failed_login' },
  { label: 'Brute Force', query: 'event_type:brute_force' },
  { label: 'Privilege Escalation', query: 'severity:HIGH' },
  { label: 'Data Exfiltration', query: 'action:exfiltrate' },
  { label: 'Lateral Movement', query: 'event_type:lateral_movement' },
  { label: 'Credential Access', query: 'mitre_technique:T1110' },
  { label: 'Command & Control', query: 'event_type:c2_communication' },
  { label: 'Persistence', query: 'mitre_tactic:persistence' },
];

interface FilterChip {
  id: string;
  label: string;
  query: string;
}

export default function HuntConsole() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterChip[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const addFilter = (filter: { label: string; query: string }) => {
    const newFilter: FilterChip = {
      id: `${filter.label}-${Date.now()}`,
      ...filter,
    };
    setActiveFilters([...activeFilters, newFilter]);
  };

  const removeFilter = (id: string) => {
    setActiveFilters(activeFilters.filter((f) => f.id !== id));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addFilter({ label: searchQuery, query: searchQuery });
      setSearchQuery('');
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h3 className="text-lg font-bold text-foreground mb-4">Enterprise Threat Hunt Console</h3>

      {/* Search Input */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by IP, hostname, user, IOC, event type..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(e.target.value.length > 0);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="w-full bg-secondary border border-border rounded-lg pl-12 pr-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 font-mono"
          />

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestedFilters.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg overflow-hidden z-10 shadow-lg">
              {suggestedFilters.slice(0, 6).map((filter) => (
                <button
                  key={filter.label}
                  onClick={() => {
                    addFilter(filter);
                    setSearchQuery('');
                    setShowSuggestions(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-secondary transition-colors duration-200 text-sm text-foreground border-b border-border/50 last:border-b-0"
                >
                  <span className="text-muted-foreground">{filter.label}</span>
                  <span className="text-xs text-primary ml-2">{filter.query}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </form>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {activeFilters.map((filter) => (
            <div
              key={filter.id}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-primary text-xs font-semibold"
            >
              <span>{filter.label}</span>
              <button
                onClick={() => removeFilter(filter.id)}
                className="hover:opacity-80 transition-opacity duration-200"
                aria-label="Remove filter"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Suggested Filters */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Common Threat Hunts</p>
        <div className="flex flex-wrap gap-2">
          {suggestedFilters.map((filter) => (
            <button
              key={filter.label}
              onClick={() => addFilter(filter)}
              className="px-3 py-1.5 rounded-lg bg-secondary border border-border text-foreground text-xs font-medium hover:border-primary/50 hover:bg-card transition-all duration-200"
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Query Info */}
      <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
        <span>
          {activeFilters.length > 0
            ? `Searching: ${activeFilters.map((f) => f.query).join(' AND ')}`
            : 'No active filters'}
        </span>
      </div>
    </div>
  );
}
