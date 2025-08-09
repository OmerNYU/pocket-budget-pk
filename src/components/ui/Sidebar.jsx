import React from 'react';

export default function Sidebar() {
  return (
    <aside className="hidden lg:block w-64 m-4 bg-white/80 shadow-soft-md rounded-2xl p-4">
      <div className="mb-8 flex items-center gap-2">
        <img src="/assets/img/logo-ct.svg" alt="Logo" className="h-8 w-auto" />
        <span className="text-slate-700 font-semibold">Pocket Budget</span>
      </div>
      <nav>
        <ul className="flex flex-col gap-2">
          <li>
            <a href="#" className="block px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-100">
              Dashboard
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
