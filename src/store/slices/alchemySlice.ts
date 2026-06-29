import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_PROFILE } from '../defaultProfile';
import { loadProfileSlice } from '../persistenceMiddleware';

export interface AlchemyState {
  activePotions: string[];
}

const initialState: AlchemyState = {
  activePotions: DEFAULT_PROFILE.activePotions,
};

const alchemySlice = createSlice({
  name: 'alchemy',
  initialState: loadProfileSlice('alchemy', initialState),
  reducers: {
    resetAlchemy: () => initialState,
    togglePotion: (state, action: PayloadAction<string>) => {
      const potionId = action.payload;
      state.activePotions = state.activePotions.includes(potionId)
        ? state.activePotions.filter((id) => id !== potionId)
        : [...state.activePotions, potionId];
    },
  },
});

export const { resetAlchemy, togglePotion } = alchemySlice.actions;
export default alchemySlice.reducer;
