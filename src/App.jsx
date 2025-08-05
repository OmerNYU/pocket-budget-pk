import React from 'react';
import Header from './components/Header';
import BudgetBoard from './components/BudgetBoard';
import ChartPanel from './components/ChartPanel';
import ImpactTooltip from './components/ImpactTooltip.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Pocket Participatory Budget" />
      <main className="max-w-6xl mx-auto p-4 space-y-6">
        <ChartPanel />
        <ImpactTooltip />
        <BudgetBoard />
      </main>
    </div>
  );
}
