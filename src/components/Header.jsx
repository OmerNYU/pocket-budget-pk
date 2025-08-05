import React from 'react';
import { useBudgetStore } from '../hooks/useBudgetStore';

export default function Header({ title }) {
  const { quests, activeQuestId, setQuest, clearQuest } = useBudgetStore();

  const handleChange = (e) => {
    const id = e.target.value;
    if (!id) {
      clearQuest();
    } else {
      setQuest(id);
    }
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        {quests.length > 0 && (
          <select
            value={activeQuestId ?? ''}
            onChange={handleChange}
            className="border rounded p-2 ml-4"
          >
            <option value="">No Quest</option>
            {quests.map((q) => (
              <option key={q.id} value={q.id}>
                {q.name}
              </option>
            ))}
          </select>
        )}
      </div>
    </header>
  );
}
