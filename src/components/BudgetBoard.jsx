import React from 'react';
import { useBudgetStore } from '../hooks/useBudgetStore';
import SectorCard from './SectorCard';

export default function BudgetBoard() {
  // 1) Get the list of sectors from our store
  const sectors = useBudgetStore((state) => state.sectors);

  return (
    // 2) Render a responsive grid of SectorCard components
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sectors.map((sec) => (
        <SectorCard key={sec.name} sector={sec} />
      ))}
    </div>
  );
}
