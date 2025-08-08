import React from 'react';
import Header from './components/Header';
import BudgetBoard from './components/BudgetBoard';
import ChartPanel from './components/ChartPanel';
import ImpactTooltip from './components/ImpactTooltip.jsx';
import QuestPanel from './components/QuestPanel';
import ScoreBar from './components/ScoreBar';
import ToastContainer from './components/ToastContainer';
import { useBudgetStore } from './hooks/useBudgetStore';

export default function App() {
  const activeQuestId = useBudgetStore((s) => s.activeQuestId);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Pocket Participatory Budget" />
      <main className="max-w-6xl mx-auto p-4 space-y-6">
        <QuestPanel />
        {activeQuestId && <ScoreBar />}
        <ChartPanel />
        <ImpactTooltip />
        <BudgetBoard />
      </main>
      <ToastContainer />
    </div>
  );
}
