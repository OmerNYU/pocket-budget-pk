import React, { useEffect, useState } from 'react';
import { useBudgetStore } from '../hooks/useBudgetStore';

export default function ScoreBar() {
  const {
    getQuestScore,
    timerStart,
    elapsedTime,
    isTimerRunning,
    stopTimer,
    getFinalScore,
  } = useBudgetStore(); // scoring and timing helpers
  const { score, success } = getQuestScore();
  const barColor = success ? 'bg-green-500' : 'bg-red-500';

  const [displayTime, setDisplayTime] = useState(0);
  const [finalResult, setFinalResult] = useState(null);

  useEffect(() => {
    let interval;
    if (isTimerRunning && timerStart) {
      interval = setInterval(() => {
        setDisplayTime(Math.floor((Date.now() - timerStart) / 1000));
      }, 1000);
    } else {
      setDisplayTime(Math.floor(elapsedTime / 1000));
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerStart, elapsedTime]);

  const handleSubmit = () => {
    stopTimer();
    const result = getFinalScore();
    setFinalResult(result);
  };

  return (
    <div className="space-y-2">
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
        <div
          className={`${barColor} h-4 transition-[width] duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="text-sm font-semibold text-center">Score: {score}</p>
      <div className="flex items-center justify-between">
        <span className="font-mono text-sm">Time: {displayTime}s</span>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Submit Score
        </button>
      </div>
      {finalResult && (
        <p className="text-center font-bold">
          Final Score: {finalResult.final} (Time -{finalResult.timePenalty}, Balance -{finalResult.balancePenalty})
        </p>
      )}
    </div>
  );
}
