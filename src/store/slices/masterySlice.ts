import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_PROFILE } from '../defaultProfile';
import { loadProfileField } from '../persistenceMiddleware';

type MasteryState = Record<string, number>;
const initialState: MasteryState = DEFAULT_PROFILE.masteryLevels;

const masterySlice = createSlice({
  name: 'mastery',
  initialState: loadProfileField('mastery', 'masteryLevels', initialState),
  reducers: {
    resetMastery: () => initialState,
    setMasteryLevel: (state, action: PayloadAction<{ nodeId: string; level: number }>) => {
      state[action.payload.nodeId] = Math.max(0, action.payload.level);
    },
  },
});

export const { resetMastery, setMasteryLevel } = masterySlice.actions;
export default masterySlice.reducer;
