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
  lang: 'en',
  setLang: (lang) => set({ lang }),

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
  score: 0,
  success: false,
  highScore: 0,
  toasts: [],

  // Update a sector's current value
  setSectorValue: (name, newValue) => {
    set((state) => ({
      sectors: state.sectors.map((sec) =>
        sec.name === name ? { ...sec, value: newValue } : sec
      ),
    }));
    if (get().activeQuestId) get().computeQuestScore();
  },

  // Reset all sectors to original values
  resetSectors: () => {
    set({ sectors: initialSectors });
    if (get().activeQuestId) get().computeQuestScore();
  },

  // Get total of original allocations
  getTotalOriginal: () => initialSectors.reduce((sum, s) => sum + s.original, 0),

  // Get total of current allocations
  getTotalCurrent: () => get().sectors.reduce((sum, s) => sum + s.value, 0),

  // Quest actions
  setQuest: (id) => set({ activeQuestId: id }),
  clearQuest: () => set({ activeQuestId: null, score: 0, success: false }),

  // Compute quest score and store result
  computeQuestScore: () => {
    const {
      activeQuestId,
      quests,
      sectors,
      highScore,
      success: prevSuccess,
      toasts,
    } = get();
    const quest = quests.find((q) => q.id === activeQuestId);
    if (!quest) {
      set({ score: 0, success: false });
      return;
    }

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
        constraintsMet = false;
      }
    });

    score = Math.max(0, Math.min(100, Math.round(score)));
    const success =
      increasePct >= quest.target.pct && constraintsMet;

    const newToasts = [];
    if (score > highScore) {
      newToasts.push({ id: Date.now() + Math.random(), message: `New high score: ${score}` });
    }
    if (success && !prevSuccess) {
      newToasts.push({ id: Date.now() + Math.random(), message: 'Quest completed!' });
    }

    set({
      score,
      success,
      highScore: Math.max(highScore, score),
      toasts: newToasts.length ? [...toasts, ...newToasts] : toasts,
    });
  },

  // Getter for quest score
  getQuestScore: () => {
    const { score, success } = get();
    return { score, success };
  },
  
  // Toast utilities
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
