import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_PROFILE } from '../defaultProfile';
import { loadProfileSlice } from '../persistenceMiddleware';

export interface WorldState {
  currentStage: number;
}

const initialState: WorldState = {
  currentStage: DEFAULT_PROFILE.currentStage,
};

const worldSlice = createSlice({
  name: 'world',
  initialState: loadProfileSlice('world', initialState),
  reducers: {
    resetWorld: () => initialState,
    setCurrentStage: (state, action: PayloadAction<number>) => {
      state.currentStage = Math.max(1, action.payload);
    },
  },
});

export const { resetWorld, setCurrentStage } = worldSlice.actions;
export default worldSlice.reducer;
