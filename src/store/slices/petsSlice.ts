import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_PROFILE } from '../defaultProfile';
import { loadProfileSlice } from '../persistenceMiddleware';

export interface PetsState {
  petLevels: Record<string, number>;
  equippedPets: string[];
}

const initialState: PetsState = {
  petLevels: DEFAULT_PROFILE.petLevels,
  equippedPets: DEFAULT_PROFILE.equippedPets,
};

const petsSlice = createSlice({
  name: 'pets',
  initialState: loadProfileSlice('pets', initialState),
  reducers: {
    resetPets: () => initialState,
    setPetLevel: (state, action: PayloadAction<{ petId: string; level: number }>) => {
      state.petLevels[action.payload.petId] = Math.max(1, action.payload.level);
    },
    toggleEquipPet: (state, action: PayloadAction<string>) => {
      const petId = action.payload;
      if (state.equippedPets.includes(petId)) {
        state.equippedPets = state.equippedPets.filter((id) => id !== petId);
      } else if (state.equippedPets.length < 3) {
        state.equippedPets.push(petId);
      }
    },
  },
});

export const { resetPets, setPetLevel, toggleEquipPet } = petsSlice.actions;
export default petsSlice.reducer;
