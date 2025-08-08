import { useCallback, memo } from 'react';
import { useBudgetStore } from '../hooks/useBudgetStore';

const QuestCard = memo(function QuestCard({ quest, active, onSelect }) {
  return (
    <button
      onClick={() => onSelect(quest.id)}
      className={`p-3 rounded-md text-left w-60 transition transform hover:scale-105 focus:outline-none ${
        active ? 'bg-orange-500 text-white' : 'bg-blue-600 text-white'
      }`}
    >
      <div className="font-semibold">{quest.name}</div>
      <p className="text-sm mt-1">{quest.description}</p>
    </button>
  );
});

function QuestPanel() {
  // Select each piece of state individually to avoid returning a new object
  // from the store selector. Returning new objects causes React 19 to warn
  // about uncached snapshots and can lead to infinite re-render loops.
  const quests = useBudgetStore((s) => s.quests);
  const activeQuestId = useBudgetStore((s) => s.activeQuestId);
  const setQuest = useBudgetStore((s) => s.setQuest);
  const computeQuestScore = useBudgetStore((s) => s.computeQuestScore);

  const handleSelect = useCallback(
    (id) => {
      setQuest(id);
      computeQuestScore();
    },
    [setQuest, computeQuestScore]
  );

  return (
    <section className="bg-gradient-to-r from-blue-700 to-indigo-500 text-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-2">Quest Mode</h2>
      <div className="flex flex-wrap gap-4">
        {quests.map((q) => (
          <QuestCard
            key={q.id}
            quest={q}
            active={activeQuestId === q.id}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </section>
  );
}

export default memo(QuestPanel);

