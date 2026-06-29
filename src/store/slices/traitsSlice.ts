import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TraitSlot } from '../../types/game';
import { DEFAULT_PROFILE } from '../defaultProfile';
import { loadProfileField } from '../persistenceMiddleware';

const traitGrades = ['C', 'B', 'A', 'S', 'SS'] as const;
const traitStats = ['atk_percent', 'crit_dmg', 'boss_dmg', 'cd_reduction'] as const;

type TraitsState = TraitSlot[];
const initialState: TraitsState = DEFAULT_PROFILE.traits;

function randomGrade(): (typeof traitGrades)[number] {
  const rand = Math.random() * 100;
  if (rand < 2) return 'SS';
  if (rand < 7) return 'S';
  if (rand < 20) return 'A';
  if (rand < 50) return 'B';
  return 'C';
}

function traitValue(statType: (typeof traitStats)[number], grade: (typeof traitGrades)[number]) {
  const values = {
    atk_percent: { C: 5, B: 10, A: 18, S: 30, SS: 50 },
    crit_dmg: { C: 10, B: 20, A: 35, S: 60, SS: 100 },
    boss_dmg: { C: 8, B: 15, A: 25, S: 45, SS: 75 },
    cd_reduction: { C: 2, B: 4, A: 6, S: 10, SS: 15 },
  };
  return values[statType][grade];
}

const traitsSlice = createSlice({
  name: 'traits',
  initialState: loadProfileField('traits', 'traits', initialState),
  reducers: {
    resetTraits: () => initialState,
    rollTrait: (state, action: PayloadAction<number>) => {
      const trait = state[action.payload];
      if (!trait || trait.locked) return;
      const grade = randomGrade();
      const statType = traitStats[Math.floor(Math.random() * traitStats.length)];
      state[action.payload] = {
        ...trait,
        grade,
        statType,
        value: traitValue(statType, grade),
      };
    },
    toggleLockTrait: (state, action: PayloadAction<number>) => {
      const trait = state[action.payload];
      if (trait) trait.locked = !trait.locked;
    },
  },
});

export const { resetTraits, rollTrait, toggleLockTrait } = traitsSlice.actions;
export default traitsSlice.reducer;
