import { useMemo } from 'react';
import type { EquipmentSlot, RarityType } from '../../types/game';
import { calculatePlayerStats } from '../../utils/calculations';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectProfile } from '../../store';
import { resetHeroes, setAscensionLevel, setHeroAwakenStars, setHeroId, setHeroLevel, ascend } from '../../store/slices/heroesSlice';
import { resetSkills, setSkillLevel, toggleEquipSkill } from '../../store/slices/skillsSlice';
import { equipGear, resetEquipment, setGearLevel, setGearRarity } from '../../store/slices/equipmentSlice';
import { resetMastery, setMasteryLevel } from '../../store/slices/masterySlice';
import { resetRelics, setRelicLevel } from '../../store/slices/relicsSlice';
import { resetWorld, setCurrentStage } from '../../store/slices/worldSlice';
import { resetZodiac, toggleZodiacNode } from '../../store/slices/zodiacSlice';
import { resetTraits, rollTrait, toggleLockTrait } from '../../store/slices/traitsSlice';
import { resetPets, setPetLevel, toggleEquipPet } from '../../store/slices/petsSlice';
import { resetAlchemy, togglePotion } from '../../store/slices/alchemySlice';
import { resetCurrency, setCurrency, spendCurrency } from '../../store/slices/currencySlice';
import type { CurrencyKey } from '../../store/slices/currencySlice';

export function useBuilder() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const stats = useMemo(() => calculatePlayerStats(profile), [profile]);

  return {
    profile,
    stats,
    updateHeroId: (id: string) => dispatch(setHeroId(id)),
    updateHeroLevel: (level: number) => dispatch(setHeroLevel(level)),
    updateHeroAwaken: (stars: number) => dispatch(setHeroAwakenStars(stars)),
    updateAscensionLevel: (level: number) => dispatch(setAscensionLevel(level)),
    ascendHero: () => {
      dispatch(ascend());
      dispatch(spendCurrency({ key: 'goldOwned', amount: 200000 }));
    },
    toggleEquipSkill: (skillId: string) => dispatch(toggleEquipSkill(skillId)),
    updateSkillLevel: (skillId: string, level: number) => dispatch(setSkillLevel({ skillId, level })),
    equipGear: (slot: EquipmentSlot, name: string) => dispatch(equipGear({ slot, name })),
    updateGearLevel: (slot: EquipmentSlot, level: number) => dispatch(setGearLevel({ slot, level })),
    updateGearRarity: (slot: EquipmentSlot, rarity: RarityType) => dispatch(setGearRarity({ slot, rarity })),
    updateMasteryLevel: (nodeId: string, level: number) => dispatch(setMasteryLevel({ nodeId, level })),
    updateRelicLevel: (relicId: string, level: number) => dispatch(setRelicLevel({ relicId, level })),
    rollTrait: (index: number) => {
      if (profile.traits[index]?.locked || profile.gemsOwned < 20) return;
      dispatch(rollTrait(index));
      dispatch(spendCurrency({ key: 'gemsOwned', amount: 20 }));
    },
    toggleLockTrait: (index: number) => dispatch(toggleLockTrait(index)),
    updatePetLevel: (petId: string, level: number) => dispatch(setPetLevel({ petId, level })),
    toggleEquipPet: (petId: string) => dispatch(toggleEquipPet(petId)),
    togglePotion: (potionId: string) => dispatch(togglePotion(potionId)),
    toggleZodiacNode: (nodeId: string) => dispatch(toggleZodiacNode(nodeId)),
    updateCurrentStage: (stage: number) => dispatch(setCurrentStage(stage)),
    updateCurrency: (key: CurrencyKey, value: number) => dispatch(setCurrency({ key, value })),
    resetProfile: () => {
      dispatch(resetHeroes());
      dispatch(resetSkills());
      dispatch(resetEquipment());
      dispatch(resetMastery());
      dispatch(resetRelics());
      dispatch(resetTraits());
      dispatch(resetPets());
      dispatch(resetAlchemy());
      dispatch(resetCurrency());
      dispatch(resetWorld());
      dispatch(resetZodiac());
    },
  };
}
