import React from 'react';

export default function Header({ title }) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
    </header>
  );
}
