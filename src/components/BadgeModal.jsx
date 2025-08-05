import React from 'react';
import { useBudgetStore } from '../hooks/useBudgetStore';

export default function BadgeModal({ onClose }) {
  const { badges, earnedBadges } = useBudgetStore((s) => ({
    badges: s.badges,
    earnedBadges: s.earnedBadges,
  }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Trophy Case</h2>
        <ul className="space-y-3">
          {badges.map((b) => {
            const unlocked = earnedBadges.includes(b.id);
            return (
              <li
                key={b.id}
                className={`p-3 border rounded-md ${unlocked ? 'bg-yellow-100' : 'bg-gray-100 text-gray-400'}`}
              >
                <div className="font-semibold">{b.name}</div>
                <p className="text-sm">{b.description}</p>
              </li>
            );
          })}
        </ul>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
}
