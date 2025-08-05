import React from 'react';

export default function Header({ title, onShowBadges }) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        {onShowBadges && (
          <button
            onClick={onShowBadges}
            className="px-3 py-1 bg-yellow-400 rounded-md shadow"
          >
            Trophy Case
          </button>
        )}
      </div>
    </header>
  );
}
