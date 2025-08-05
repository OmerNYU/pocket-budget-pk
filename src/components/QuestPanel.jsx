import React from 'react';
import { useBudgetStore } from '../hooks/useBudgetStore';

export default function QuestPanel() {
  // Access quest data and timer controls from the store
  const {
    quests,
    activeQuestId,
    setQuest,
    clearQuest,
    startTimer,
    stopTimer,
  } = useBudgetStore();

  const handleSelect = (id) => {
    if (activeQuestId === id) {
      clearQuest();
      stopTimer();
    } else {
      setQuest(id);
      startTimer();
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-700 to-indigo-500 text-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-2">Quest Mode</h2>
      <div className="flex flex-wrap gap-4">
        {quests.map((q) => (
          <button
            key={q.id}
            onClick={() => handleSelect(q.id)}
            className={`p-3 rounded-md text-left w-60 transition transform hover:scale-105 focus:outline-none ${
              activeQuestId === q.id ? 'bg-orange-500' : 'bg-blue-600'
            }`}
          >
            <div className="font-semibold">{q.name}</div>
            <p className="text-sm mt-1">{q.description}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
