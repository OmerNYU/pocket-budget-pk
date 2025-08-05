import React from 'react';
import { useBudgetStore } from '../hooks/useBudgetStore';

export default function ScoreBar() {
  const { getQuestScore } = useBudgetStore();
  const { score, success } = getQuestScore();
  const barColor = success ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
      <div
        className={`${barColor} h-4 transition-[width] duration-500`}
        style={{ width: `${score}%` }}
      />
      <p className="mt-1 text-sm font-semibold text-center">Score: {score}</p>
    </div>
  );
}
