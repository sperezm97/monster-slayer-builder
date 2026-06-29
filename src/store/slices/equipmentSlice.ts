import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { EquipmentSlot, RarityType } from '../../types/game';
import { DEFAULT_PROFILE } from '../defaultProfile';
import { loadProfileField } from '../persistenceMiddleware';

type EquipmentState = typeof DEFAULT_PROFILE.equippedGear;
const initialState: EquipmentState = DEFAULT_PROFILE.equippedGear;

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState: loadProfileField('equipment', 'equippedGear', initialState),
  reducers: {
    resetEquipment: () => initialState,
    equipGear: (state, action: PayloadAction<{ slot: EquipmentSlot; name: string }>) => {
      const currentSlot = state[action.payload.slot];
      state[action.payload.slot] = {
        id: action.payload.name,
        rarity: currentSlot?.rarity || 'common',
        level: currentSlot?.level || 1,
      };
    },
    setGearLevel: (state, action: PayloadAction<{ slot: EquipmentSlot; level: number }>) => {
      const gear = state[action.payload.slot];
      if (gear) gear.level = Math.max(1, action.payload.level);
    },
    setGearRarity: (state, action: PayloadAction<{ slot: EquipmentSlot; rarity: RarityType }>) => {
      const gear = state[action.payload.slot];
      if (gear) gear.rarity = action.payload.rarity;
    },
  },
});

export const { resetEquipment, equipGear, setGearLevel, setGearRarity } = equipmentSlice.actions;
export default equipmentSlice.reducer;
