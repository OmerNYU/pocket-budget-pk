import React from 'react';
import DashboardShell from './layouts/DashboardShell.jsx';
import ChartPanel from './components/ChartPanel.jsx';
import ImpactTooltip from './components/ImpactTooltip.jsx';
import BudgetBoard from './components/BudgetBoard.jsx';
import QuestPanel from './components/QuestPanel';
import ScoreBar from './components/ScoreBar';
import ToastContainer from './components/ToastContainer';
import { useBudgetStore } from './hooks/useBudgetStore';

export default function App() {
  const activeQuestId = useBudgetStore((s) => s.activeQuestId);

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-soft-md p-6">
          <QuestPanel />
          {activeQuestId && <ScoreBar />}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-soft-md p-6">
            <h2 className="text-slate-700 font-semibold mb-4">Budget Overview</h2>
            <ChartPanel />
          </div>
          <div className="bg-white rounded-2xl shadow-soft-md p-6">
            <h2 className="text-slate-700 font-semibold mb-4">Summary</h2>
            <p className="text-gray-600 text-sm">AI summary coming soon.</p>
          </div>
        </div>

        <div className="mb-6">
          <ImpactTooltip />
        </div>

        <div className="bg-white rounded-2xl shadow-soft-md p-6">
          <h2 className="text-slate-700 font-semibold mb-4">Adjust Allocations</h2>
          <BudgetBoard />
        </div>

        <ToastContainer />
      </div>
    </DashboardShell>
  );
}
