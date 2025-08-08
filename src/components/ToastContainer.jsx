import React, { useEffect, memo } from 'react';
import { useBudgetStore } from '../hooks/useBudgetStore';
import { shallow } from 'zustand/shallow';

const Toast = memo(function Toast({ id, message, onRemove }) {
  useEffect(() => {
    const t = setTimeout(() => onRemove(id), 3000);
    return () => clearTimeout(t);
  }, [id, onRemove]);

  return (
    <div className="bg-blue-600 text-white px-4 py-2 rounded shadow animate-toast">
      {message}
    </div>
  );
});

export default function ToastContainer() {
  const { toasts, removeToast } = useBudgetStore(
    (s) => ({ toasts: s.toasts, removeToast: s.removeToast }),
    shallow
  );

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {toasts.map((t) => (
        <Toast key={t.id} id={t.id} message={t.message} onRemove={removeToast} />
      ))}
      <style>{`
        @keyframes toast-in { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-toast { animation: toast-in 0.3s ease-out; }
      `}</style>
    </div>
  );
}

