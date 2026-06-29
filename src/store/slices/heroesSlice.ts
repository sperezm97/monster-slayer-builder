import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_PROFILE } from '../defaultProfile';
import { loadProfileSlice } from '../persistenceMiddleware';

export interface HeroesState {
  heroId: string;
  heroLevel: number;
  heroAwakenStars: number;
  ascensionLevel: number;
}

const initialState: HeroesState = {
  heroId: DEFAULT_PROFILE.heroId,
  heroLevel: DEFAULT_PROFILE.heroLevel,
  heroAwakenStars: DEFAULT_PROFILE.heroAwakenStars,
  ascensionLevel: DEFAULT_PROFILE.ascensionLevel,
};

const heroesSlice = createSlice({
  name: 'heroes',
  initialState: loadProfileSlice('heroes', initialState),
  reducers: {
    resetHeroes: () => initialState,
    setHeroId: (state, action: PayloadAction<string>) => {
      state.heroId = action.payload;
    },
    setHeroLevel: (state, action: PayloadAction<number>) => {
      state.heroLevel = Math.max(1, action.payload);
    },
    setHeroAwakenStars: (state, action: PayloadAction<number>) => {
      state.heroAwakenStars = Math.min(5, Math.max(0, action.payload));
    },
    setAscensionLevel: (state, action: PayloadAction<number>) => {
      state.ascensionLevel = Math.max(0, action.payload);
    },
    ascend: (state) => {
      state.ascensionLevel += 1;
    },
  },
});

export const { resetHeroes, setHeroId, setHeroLevel, setHeroAwakenStars, setAscensionLevel, ascend } = heroesSlice.actions;
export default heroesSlice.reducer;
