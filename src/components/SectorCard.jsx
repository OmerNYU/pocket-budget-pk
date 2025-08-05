import React from 'react';
import { useBudgetStore } from '../hooks/useBudgetStore';

export default function SectorCard({ sector }) {
  const { name, original, value } = sector;
  const setSectorValue = useBudgetStore((state) => state.setSectorValue);

  const handleChange = (e) => {
    setSectorValue(name, Number(e.target.value));
  };

  return (
    <div className="p-4 border rounded-lg shadow bg-white">
      <h3 className="text-lg font-medium">{name}</h3>
      <input
        type="range"
        min={0}
        max={original * 2}
        value={value}
        onChange={handleChange}
        className="w-full mt-2"
      />
      <div className="flex justify-between text-sm mt-1">
        <span>Current: {value.toLocaleString()}</span>
        <span>Original: {original.toLocaleString()}</span>
      </div>
    </div>
  );
}
