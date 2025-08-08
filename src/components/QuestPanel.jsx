import { useCallback, memo } from 'react';
import { useBudgetStore } from '../hooks/useBudgetStore';
import { shallow } from 'zustand/shallow';

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
  const { quests, activeQuestId, setQuest, computeQuestScore } =
    useBudgetStore(
      (s) => ({
        quests: s.quests,
        activeQuestId: s.activeQuestId,
        setQuest: s.setQuest,
        computeQuestScore: s.computeQuestScore,
      }),
      shallow
    );

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

