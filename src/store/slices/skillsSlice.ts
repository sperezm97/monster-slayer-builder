import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_PROFILE } from '../defaultProfile';
import { loadProfileSlice } from '../persistenceMiddleware';

export interface SkillsState {
  equippedSkills: string[];
  skillLevels: Record<string, number>;
}

const initialState: SkillsState = {
  equippedSkills: DEFAULT_PROFILE.equippedSkills,
  skillLevels: DEFAULT_PROFILE.skillLevels,
};

const skillsSlice = createSlice({
  name: 'skills',
  initialState: loadProfileSlice('skills', initialState),
  reducers: {
    resetSkills: () => initialState,
    toggleEquipSkill: (state, action: PayloadAction<string>) => {
      const skillId = action.payload;
      if (state.equippedSkills.includes(skillId)) {
        state.equippedSkills = state.equippedSkills.filter((id) => id !== skillId);
      } else if (state.equippedSkills.length < 6) {
        state.equippedSkills.push(skillId);
      }
    },
    setSkillLevel: (state, action: PayloadAction<{ skillId: string; level: number }>) => {
      state.skillLevels[action.payload.skillId] = Math.max(1, action.payload.level);
    },
  },
});

export const { resetSkills, toggleEquipSkill, setSkillLevel } = skillsSlice.actions;
export default skillsSlice.reducer;
