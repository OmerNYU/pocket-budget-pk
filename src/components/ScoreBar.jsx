import { memo } from 'react';
import { useBudgetStore } from '../hooks/useBudgetStore';

const ScoreBar = () => {
  // Select each field separately so the selector never returns a new object.
  // React 19 requires snapshots from external stores to be referentially
  // stable during a render; returning objects can trigger warnings and rerender loops.
  const score = useBudgetStore((s) => s.score);
  const success = useBudgetStore((s) => s.success);
  const barColor = success ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className="w-full">
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
        <div
          className={`${barColor} h-4 transition-[width] duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="text-sm font-semibold text-center mt-1">
        Score: {score}/100
      </p>
    </div>
  );
};

export default memo(ScoreBar);

