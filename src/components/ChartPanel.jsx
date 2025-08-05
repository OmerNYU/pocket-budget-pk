import React, { useEffect, useState } from 'react';
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

  // Trigger a subtle scale animation when current total updates
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(true);
    const t = setTimeout(() => setAnimate(false), 300);
    return () => clearTimeout(t);
  }, [totalCurrent]);

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
    <div className="p-4 bg-white rounded-lg shadow flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-2">Budget Allocation Comparison</h2>
      <div
        className={`w-64 h-64 flex items-center justify-center transition-transform duration-300 ${
          animate ? 'scale-105' : 'scale-100'
        }`}
      >
        <Doughnut data={data} />
      </div>
      <div className="mt-4 text-sm flex justify-around w-full">
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
