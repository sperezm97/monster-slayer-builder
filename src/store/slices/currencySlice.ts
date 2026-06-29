import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_PROFILE } from '../defaultProfile';
import { loadProfileSlice } from '../persistenceMiddleware';

export type CurrencyKey = 'goldOwned' | 'gemsOwned' | 'masteryPointsOwned' | 'relicShardsOwned' | 'starPointsOwned' | 'elixirOwned';

export type CurrencyState = Pick<typeof DEFAULT_PROFILE, CurrencyKey>;

const initialState: CurrencyState = {
  goldOwned: DEFAULT_PROFILE.goldOwned,
  gemsOwned: DEFAULT_PROFILE.gemsOwned,
  masteryPointsOwned: DEFAULT_PROFILE.masteryPointsOwned,
  relicShardsOwned: DEFAULT_PROFILE.relicShardsOwned,
  starPointsOwned: DEFAULT_PROFILE.starPointsOwned,
  elixirOwned: DEFAULT_PROFILE.elixirOwned,
};

const currencySlice = createSlice({
  name: 'currency',
  initialState: loadProfileSlice('currency', initialState),
  reducers: {
    resetCurrency: () => initialState,
    setCurrency: (state, action: PayloadAction<{ key: CurrencyKey; value: number }>) => {
      state[action.payload.key] = Math.max(0, action.payload.value);
    },
    spendCurrency: (state, action: PayloadAction<{ key: CurrencyKey; amount: number }>) => {
      state[action.payload.key] = Math.max(0, state[action.payload.key] - action.payload.amount);
    },
  },
});

export const { resetCurrency, setCurrency, spendCurrency } = currencySlice.actions;
export default currencySlice.reducer;
