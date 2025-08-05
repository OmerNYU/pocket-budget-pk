import React from 'react';
import { useBudgetStore } from '../hooks/useBudgetStore';
import SectorCard from './SectorCard';

export default function BudgetBoard() {
  // 1) Get the list of sectors from our store
  const sectors = useBudgetStore((state) => state.sectors);

  // Group sectors into rows of 3 for gradient zones
  const rows = [];
  for (let i = 0; i < sectors.length; i += 3) {
    rows.push(sectors.slice(i, i + 3));
  }
  const gradients = [
    'from-blue-50 to-blue-100',
    'from-green-50 to-green-100',
    'from-orange-50 to-orange-100'
  ];

  return (
    <div className="space-y-4 p-4">
      {rows.map((row, idx) => (
        <div
          key={idx}
          className={`p-4 rounded-lg bg-gradient-to-r ${gradients[idx % gradients.length]}`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {row.map((sec) => (
              <SectorCard key={sec.name} sector={sec} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
