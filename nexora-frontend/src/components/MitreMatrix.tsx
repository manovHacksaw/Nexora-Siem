'use client';

import { useState } from 'react';

const mitreTactics = [
  'Initial Access',
  'Credential Access',
  'Persistence',
  'Privilege Escalation',
  'Discovery',
  'Lateral Movement',
];

const mitreExamples = {
  'Initial Access': ['T1190', 'T1189', 'T1200', 'T1566'],
  'Credential Access': ['T1110', 'T1555', 'T1056', 'T1040'],
  'Persistence': ['T1098', 'T1547', 'T1547.14', 'T1137'],
  'Privilege Escalation': ['T1548', 'T1134', 'T1547.14', 'T1547.4'],
  'Discovery': ['T1087', 'T1010', 'T1217', 'T1526'],
  'Lateral Movement': ['T1570', 'T1021', 'T1570', 'T1021.4'],
};

interface MatrixCell {
  tactic: string;
  technique: string;
  activity: number;
}

export default function MitreMatrix() {
  const [selectedCell, setSelectedCell] = useState<MatrixCell | null>(null);

  // Generate activity data for each cell
  const generateActivityData = () => {
    const data: MatrixCell[] = [];
    mitreTactics.forEach((tactic) => {
      const techniques = mitreExamples[tactic as keyof typeof mitreExamples] || [];
      techniques.forEach((technique) => {
        data.push({
          tactic,
          technique,
          activity: Math.floor(Math.random() * 100),
        });
      });
    });
    return data;
  };

  const matrixData = generateActivityData();

  const getActivityColor = (activity: number) => {
    if (activity >= 80) return 'bg-threat-high';
    if (activity >= 50) return 'bg-threat-medium';
    if (activity >= 20) return 'bg-threat-low';
    return 'bg-muted/20';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h3 className="text-lg font-bold text-foreground mb-4">MITRE ATT&CK Matrix</h3>
      <p className="text-xs text-muted-foreground mb-4">
        Heatmap showing detected ATT&CK techniques. Intensity indicates activity level.
      </p>

      {/* Matrix Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-max">
          {/* Header */}
          <div className="flex gap-1 mb-2">
            <div className="w-32 flex-shrink-0"></div>
            {mitreTactics.map((tactic) => (
              <div key={tactic} className="w-24 text-xs font-bold text-primary text-center px-1">
                {tactic.split(' ')[0]}
              </div>
            ))}
          </div>

          {/* Grid rows */}
          <div className="space-y-1">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex gap-1">
                <div className="w-32 flex-shrink-0 text-xs text-muted-foreground font-semibold pr-2">
                  Technique {idx + 1}
                </div>
                {mitreTactics.map((tactic) => {
                  const cellData = matrixData.find(
                    (d) =>
                      d.tactic === tactic &&
                      d.technique === (mitreExamples[tactic as keyof typeof mitreExamples][idx] || `T${idx}`)
                  );
                  return (
                    <div
                      key={`${tactic}-${idx}`}
                      onClick={() => setSelectedCell(cellData || { tactic, technique: 'T0000', activity: 0 })}
                      className={`w-24 h-12 rounded-lg border border-border cursor-pointer transition-all duration-200 flex items-center justify-center text-xs font-bold ${
                        cellData ? getActivityColor(cellData.activity) : 'bg-muted/10'
                      } hover:border-primary/50 hover:ring-1 hover:ring-primary/20`}
                    >
                      {cellData && <span className="text-foreground opacity-0 hover:opacity-100">{cellData.activity}%</span>}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      {selectedCell && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-foreground">
                {selectedCell.tactic} - {selectedCell.technique}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Activity Level: <span className="text-primary">{selectedCell.activity}%</span>
              </p>
            </div>
            <button
              onClick={() => setSelectedCell(null)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-4 text-xs">
        <span className="text-muted-foreground">Activity:</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-threat-high"></div>
            <span className="text-muted-foreground">80+%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-threat-medium"></div>
            <span className="text-muted-foreground">50-80%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-threat-low"></div>
            <span className="text-muted-foreground">20-50%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-muted/20"></div>
            <span className="text-muted-foreground">Low</span>
          </div>
        </div>
      </div>
    </div>
  );
}
