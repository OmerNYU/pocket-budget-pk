import { create } from 'zustand';
import budgetData from '../data/budget2025.json';

// Transform imported data: keep original and current values
const initialSectors = budgetData.map((s) => ({
  name: s.name,
  original: s.value,
  value: s.value,
}));

// Zustand store
export const useBudgetStore = create((set, get) => ({
  sectors: initialSectors,

  // Quest definitions
  quests: [
    {
      id: 'boost-education',
      name: 'Boost Education',
      description:
        'Increase Education budget by ≥15% while keeping Health ≥80%',
      target: { sector: 'EDUCATION MINISTRY', pct: 15 },
      constraints: [
        { sector: 'HEALTH MINISTRY', minPct: 80 },
      ],
    },
  ],
  activeQuestId: null,

  // Update a sector's current value
  setSectorValue: (name, newValue) => set((state) => ({
    sectors: state.sectors.map((sec) =>
      sec.name === name ? { ...sec, value: newValue } : sec
    ),
  })),

  // Reset all sectors to original values
  resetSectors: () => set({ sectors: initialSectors }),

  // Get total of original allocations
  getTotalOriginal: () => initialSectors.reduce((sum, s) => sum + s.original, 0),

  // Get total of current allocations
  getTotalCurrent: () => get().sectors.reduce((sum, s) => sum + s.value, 0),

  // Quest actions
  setQuest: (id) => set({ activeQuestId: id }),
  clearQuest: () => set({ activeQuestId: null }),

  // Compute quest score
  getQuestScore: () => {
    const { activeQuestId, quests, sectors } = get();
    const quest = quests.find((q) => q.id === activeQuestId);
    if (!quest) return { score: 0, success: false };

    const targetSec = sectors.find((s) => s.name === quest.target.sector);
    const increasePct =
      ((targetSec.value - targetSec.original) / targetSec.original) * 100;
    let score = Math.min(
      60,
      Math.max(0, (increasePct / quest.target.pct) * 60)
    );

    let constraintsMet = true;
    quest.constraints.forEach((c) => {
      const sec = sectors.find((s) => s.name === c.sector);
      const pct = (sec.value / sec.original) * 100;
      const share = 40 / quest.constraints.length;
      if (pct >= c.minPct) {
        score += share;
      } else {
        score -= share;
        constraintsMet = false;
      }
    });

    score = Math.max(0, Math.min(100, Math.round(score)));
    const success =
      increasePct >= quest.target.pct && constraintsMet;
    return { score, success };
  },
}));
