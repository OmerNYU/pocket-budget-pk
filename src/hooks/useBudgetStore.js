import create from 'zustand';
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
}));
