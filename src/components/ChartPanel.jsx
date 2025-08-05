import React from 'react';
import { useBudgetStore } from '../hooks/useBudgetStore';
// Chart.js and react-chartjs-2
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartPanel() {
  // Get totals from store
  const totalOriginal = useBudgetStore((state) => state.getTotalOriginal());
  const totalCurrent = useBudgetStore((state) => state.getTotalCurrent());

  // Prepare data for the chart
  const data = {
    labels: ['Original', 'Current'],
    datasets: [
      {
        data: [totalOriginal, totalCurrent],
        backgroundColor: ['#0069B4', '#2E7D32'], // govBlue & successGreen
        hoverOffset: 4
      }
    ]
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">Budget Allocation Comparison</h2>
      <Doughnut data={data} />
      <div className="mt-4 text-sm flex justify-around">
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-[#0069B4] mr-1"></span>Original
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-[#2E7D32] mr-1"></span>Current
        </div>
      </div>
    </div>
  );
}
