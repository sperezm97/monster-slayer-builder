import { configureStore } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';
import heroesReducer from './slices/heroesSlice';
import skillsReducer from './slices/skillsSlice';
import equipmentReducer from './slices/equipmentSlice';
import masteryReducer from './slices/masterySlice';
import relicsReducer from './slices/relicsSlice';
import traitsReducer from './slices/traitsSlice';
import petsReducer from './slices/petsSlice';
import alchemyReducer from './slices/alchemySlice';
import currencyReducer from './slices/currencySlice';
import worldReducer from './slices/worldSlice';
import zodiacReducer from './slices/zodiacSlice';
import { persistenceMiddleware } from './persistenceMiddleware';

export const store = configureStore({
  reducer: {
    heroes: heroesReducer,
    skills: skillsReducer,
    equipment: equipmentReducer,
    mastery: masteryReducer,
    relics: relicsReducer,
    traits: traitsReducer,
    pets: petsReducer,
    alchemy: alchemyReducer,
    currency: currencyReducer,
    world: worldReducer,
    zodiac: zodiacReducer,
  },
  middleware: (getDefault) => getDefault().concat(persistenceMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selectProfile = createSelector(
  [
    (state: RootState) => state.heroes,
    (state: RootState) => state.skills,
    (state: RootState) => state.equipment,
    (state: RootState) => state.mastery,
    (state: RootState) => state.relics,
    (state: RootState) => state.traits,
    (state: RootState) => state.pets,
    (state: RootState) => state.alchemy,
    (state: RootState) => state.currency,
    (state: RootState) => state.world,
    (state: RootState) => state.zodiac,
  ],
  (heroes, skills, equipment, mastery, relics, traits, pets, alchemy, currency, world, zodiac) => ({
    ...heroes,
    ...skills,
    equippedGear: equipment,
    masteryLevels: mastery,
    relicLevels: relics,
    traits,
    ...pets,
    ...alchemy,
    ...currency,
    ...world,
    ...zodiac,
  }),
);
