import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_PROFILE } from '../defaultProfile';
import { loadProfileField } from '../persistenceMiddleware';

type RelicsState = Record<string, number>;
const initialState: RelicsState = DEFAULT_PROFILE.relicLevels;

const relicsSlice = createSlice({
  name: 'relics',
  initialState: loadProfileField('relics', 'relicLevels', initialState),
  reducers: {
    resetRelics: () => initialState,
    setRelicLevel: (state, action: PayloadAction<{ relicId: string; level: number }>) => {
      state[action.payload.relicId] = Math.max(0, action.payload.level);
    },
  },
});

export const { resetRelics, setRelicLevel } = relicsSlice.actions;
export default relicsSlice.reducer;
