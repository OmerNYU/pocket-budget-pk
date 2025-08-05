import React from 'react';
import Header from './components/Header';
import BudgetBoard from './components/BudgetBoard';
import ChartPanel from './components/ChartPanel';
import ImpactTooltip from './components/ImpactTooltip.jsx';
import QuestPanel from './components/QuestPanel';
import ScoreBar from './components/ScoreBar';
import BadgeModal from './components/BadgeModal';
import { useBudgetStore } from './hooks/useBudgetStore';

export default function App() {
  const { activeQuestId, recentBadge, clearRecentBadge } = useBudgetStore((s) => ({
    activeQuestId: s.activeQuestId,
    recentBadge: s.recentBadge,
    clearRecentBadge: s.clearRecentBadge,
  }));
  const [showBadges, setShowBadges] = React.useState(false);

  React.useEffect(() => {
    if (recentBadge) {
      const t = setTimeout(() => clearRecentBadge(), 3000);
      return () => clearTimeout(t);
    }
  }, [recentBadge, clearRecentBadge]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Pocket Participatory Budget" onShowBadges={() => setShowBadges(true)} />
      {recentBadge && (
        <div className="fixed top-4 right-4 bg-yellow-300 text-black px-4 py-2 rounded shadow-lg animate-bounce">
          Badge Unlocked: {recentBadge.name}
        </div>
      )}
      <main className="max-w-6xl mx-auto p-4 space-y-6">
        <QuestPanel />
        {activeQuestId && <ScoreBar />}
        <ChartPanel />
        <ImpactTooltip />
        <BudgetBoard />
      </main>
      {showBadges && <BadgeModal onClose={() => setShowBadges(false)} />}
    </div>
  );
}
