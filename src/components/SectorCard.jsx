import React from 'react';
import { useBudgetStore } from '../hooks/useBudgetStore';

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

  return (
    <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2">{name}</h3>

      {/* Slider */}
      <input
        type="range"
        min={0}
        max={original * 2}
        value={value}
        onChange={handleChange}
        className="w-full h-2 mb-4 accent-govBlue"
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
    </div>
  );
}
