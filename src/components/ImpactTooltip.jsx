
import React from 'react';
import rulesList from '../data/impact_rules.json';
import { useBudgetStore } from '../hooks/useBudgetStore';

export default function ImpactTooltip() {
  // 1) Get current sectors state
  const sectors = useBudgetStore((state) => state.sectors);

  // 2) Generate messages based on percentage changes
  const messages = sectors.flatMap((sec) => {
    const { name, original, value } = sec;
    const rule = rulesList.find((r) => r.sector === name);
    if (!rule) return [];

    const deltaPct = ((value - original) / original) * 100;
    if (Math.abs(deltaPct) < 1) return [];// skip tiny changes

    const effect = (rule.coeff * deltaPct).toFixed(1);
    const direction = deltaPct > 0 ? 'increase' : 'decrease';
    const verb = deltaPct > 0 ? 'Increasing' : 'Decreasing';

    return [`${verb} ${name} by ${Math.abs(deltaPct.toFixed(1))}% will ${rule.description} by ${Math.abs(effect)} ${rule.unit}.`];
  });

  if (messages.length === 0) return null;

  return (
    <div className="p-4 bg-white rounded-lg shadow max-h-60 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2">Impact Insights</h2>
      <ul className="list-disc list-inside text-sm space-y-1">
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
