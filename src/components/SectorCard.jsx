import React from 'react';
import { useBudgetStore } from '../hooks/useBudgetStore';
import impactRules from '../data/impact_rules.json';

// Helper to format numbers as Rs 1,234,567
const fmt = (n) =>
  `Rs ${n.toLocaleString('en-IN')}`; // Indian numbering with lakh/crore separators

export default function SectorCard({ sector }) {
  const { name, original, value } = sector;
  const setSectorValue = useBudgetStore((state) => state.setSectorValue);

  const handleChange = (e) => {
    setSectorValue(name, Number(e.target.value));
  };

  // Determine color for current vs original
  const deltaColor = value >= original ? 'text-green-600' : 'text-red-600';

  // Impact calculation
  const rule = impactRules.find((r) => r.sector === name);
  const deltaPct = ((value - original) / original) * 100;
  const showImpact = rule && Math.abs(deltaPct) >= 5;
  let impactText = '';
  if (rule) {
    const effect = rule.coeff * deltaPct;
    const action = deltaPct < 0 ? 'Cutting' : 'Boosting';
    const sign = effect > 0 ? '+' : '';
    impactText = `${action} ${rule.short || name} by ${Math.abs(deltaPct).toFixed(1)}% → ${rule.description} ${sign}${effect.toFixed(1)}${rule.unit}`;
  }

  return (
    <div className="p-6 bg-white border-2 border-blue-800 rounded-xl shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-xl">
      <h3 className="text-lg font-semibold mb-2">{name}</h3>

      {/* Slider */}
      <input
        type="range"
        min={0}
        max={original * 2}
        value={value}
        onChange={handleChange}
        className="w-full h-2 mb-4 accent-orange-500 transition-transform duration-300 active:scale-105"
        aria-label={`Adjust budget for ${name}`}
      />

      {/* Values */}
      <div className="space-y-1 text-sm">
        <div>
          <span className="font-medium">Original:</span>{' '}
          <span>{fmt(original)}</span>
        </div>
        <div>
          <span className="font-medium">Current:</span>{' '}
          <span className={deltaColor}>{fmt(value)}</span>
        </div>
      </div>

      {/* Impact line */}
      {rule && (
        <p
          className={`mt-2 text-sm transition-opacity duration-300 ${
            showImpact ? 'opacity-100' : 'opacity-0'
          } ${deltaPct < 0 ? 'text-orange-600' : 'text-green-600'}`}
        >
          {impactText}
        </p>
      )}
    </div>
  );
}
