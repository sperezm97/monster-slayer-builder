import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_PROFILE } from '../defaultProfile';
import { loadProfileSlice } from '../persistenceMiddleware';

export interface ZodiacState {
  unlockedZodiacNodes: string[];
}

const initialState: ZodiacState = {
  unlockedZodiacNodes: DEFAULT_PROFILE.unlockedZodiacNodes,
};

const zodiacSlice = createSlice({
  name: 'zodiac',
  initialState: loadProfileSlice('zodiac', initialState),
  reducers: {
    resetZodiac: () => initialState,
    toggleZodiacNode: (state, action: PayloadAction<string>) => {
      const nodeId = action.payload;
      state.unlockedZodiacNodes = state.unlockedZodiacNodes.includes(nodeId)
        ? state.unlockedZodiacNodes.filter((id) => id !== nodeId)
        : [...state.unlockedZodiacNodes, nodeId];
    },
  },
});

export const { resetZodiac, toggleZodiacNode } = zodiacSlice.actions;
export default zodiacSlice.reducer;
