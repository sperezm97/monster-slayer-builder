import React, { createContext, useContext, useState, useEffect } from 'react';
import type { PlayerProfile, EquipmentSlot, RarityType } from '../types/game';
import { calculatePlayerStats } from '../utils/calculations';
import type { CalculatedStats } from '../utils/calculations';

interface BuilderContextType {
  profile: PlayerProfile;
  stats: CalculatedStats;
  updateHeroId: (id: string) => void;
  updateHeroLevel: (level: number) => void;
  updateHeroAwaken: (stars: number) => void;
  updateAscensionLevel: (level: number) => void;
  toggleEquipSkill: (skillId: string) => void;
  updateSkillLevel: (skillId: string, level: number) => void;
  equipGear: (slot: EquipmentSlot, name: string) => void;
  updateGearLevel: (slot: EquipmentSlot, level: number) => void;
  updateGearRarity: (slot: EquipmentSlot, rarity: RarityType) => void;
  updateMasteryLevel: (nodeId: string, level: number) => void;
  updateRelicLevel: (relicId: string, level: number) => void;
  rollTrait: (index: number) => void;
  toggleLockTrait: (index: number) => void;
  updatePetLevel: (petId: string, level: number) => void;
  toggleEquipPet: (petId: string) => void;
  togglePotion: (potionId: string) => void;
  toggleZodiacNode: (nodeId: string) => void;
  updateCurrentStage: (stage: number) => void;
  updateCurrency: (key: 'goldOwned' | 'gemsOwned' | 'masteryPointsOwned' | 'relicShardsOwned' | 'starPointsOwned' | 'elixirOwned', value: number) => void;
  resetProfile: () => void;
}

const DEFAULT_PROFILE: PlayerProfile = {
  heroId: 'ranger',
  heroLevel: 10,
  heroAwakenStars: 0,
  ascensionLevel: 0,
  equippedSkills: ['fireball', 'slash', 'crit_focus'],
  skillLevels: { fireball: 1, slash: 1, crit_focus: 1 },
  equippedGear: {
    weapon: { id: 'Espada de Hierro', rarity: 'common', level: 1 },
    armor: { id: 'Armadura de Placas', rarity: 'common', level: 1 },
    ring: null,
    amulet: null
  },
  masteryLevels: {},
  relicLevels: {},
  traits: [
    { id: 't0', grade: 'None', statType: 'None', value: 0, locked: false },
    { id: 't1', grade: 'None', statType: 'None', value: 0, locked: false },
    { id: 't2', grade: 'None', statType: 'None', value: 0, locked: false },
    { id: 't3', grade: 'None', statType: 'None', value: 0, locked: false },
    { id: 't4', grade: 'None', statType: 'None', value: 0, locked: false }
  ],
  petLevels: {},
  equippedPets: [],
  activePotions: [],
  unlockedZodiacNodes: [],
  currentStage: 1,
  goldOwned: 50000,
  gemsOwned: 2000,
  masteryPointsOwned: 15,
  relicShardsOwned: 100,
  starPointsOwned: 5,
  elixirOwned: 80
};

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'monster_slayer_builder_profile';

export const BuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<PlayerProfile>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure traits array is formatted properly
        if (!parsed.traits || parsed.traits.length !== 5) {
          parsed.traits = DEFAULT_PROFILE.traits;
        }
        return parsed;
      } catch (e) {
        console.error("Failed to parse saved profile, resetting.", e);
        return DEFAULT_PROFILE;
      }
    }
    return DEFAULT_PROFILE;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  const updateHeroId = (id: string) => {
    setProfile(prev => ({ ...prev, heroId: id }));
  };

  const updateHeroLevel = (level: number) => {
    setProfile(prev => ({ ...prev, heroLevel: Math.max(1, level) }));
  };

  const updateHeroAwaken = (stars: number) => {
    setProfile(prev => ({ ...prev, heroAwakenStars: Math.min(5, Math.max(0, stars)) }));
  };

  const updateAscensionLevel = (level: number) => {
    setProfile(prev => ({ ...prev, ascensionLevel: Math.max(0, level) }));
  };

  const toggleEquipSkill = (skillId: string) => {
    setProfile(prev => {
      const isEquipped = prev.equippedSkills.includes(skillId);
      let newEquipped = [...prev.equippedSkills];
      if (isEquipped) {
        newEquipped = newEquipped.filter(id => id !== skillId);
      } else {
        if (newEquipped.length < 6) {
          newEquipped.push(skillId);
        }
      }
      return { ...prev, equippedSkills: newEquipped };
    });
  };

  const updateSkillLevel = (skillId: string, level: number) => {
    setProfile(prev => ({
      ...prev,
      skillLevels: { ...prev.skillLevels, [skillId]: Math.max(1, level) }
    }));
  };

  const equipGear = (slot: EquipmentSlot, name: string) => {
    setProfile(prev => {
      const currentSlot = prev.equippedGear[slot];
      const newGear = {
        id: name,
        rarity: currentSlot?.rarity || 'common',
        level: currentSlot?.level || 1
      };
      return {
        ...prev,
        equippedGear: { ...prev.equippedGear, [slot]: newGear }
      };
    });
  };

  const updateGearLevel = (slot: EquipmentSlot, level: number) => {
    setProfile(prev => {
      const gear = prev.equippedGear[slot];
      if (!gear) return prev;
      return {
        ...prev,
        equippedGear: {
          ...prev.equippedGear,
          [slot]: { ...gear, level: Math.max(1, level) }
        }
      };
    });
  };

  const updateGearRarity = (slot: EquipmentSlot, rarity: RarityType) => {
    setProfile(prev => {
      const gear = prev.equippedGear[slot];
      if (!gear) return prev;
      return {
        ...prev,
        equippedGear: {
          ...prev.equippedGear,
          [slot]: { ...gear, rarity }
        }
      };
    });
  };

  const updateMasteryLevel = (nodeId: string, level: number) => {
    setProfile(prev => ({
      ...prev,
      masteryLevels: { ...prev.masteryLevels, [nodeId]: Math.max(0, level) }
    }));
  };

  const updateRelicLevel = (relicId: string, level: number) => {
    setProfile(prev => ({
      ...prev,
      relicLevels: { ...prev.relicLevels, [relicId]: Math.max(0, level) }
    }));
  };

  const rollTrait = (index: number) => {
    setProfile(prev => {
      const traits = [...prev.traits];
      if (traits[index].locked) return prev;

      // Grade distribution: C (50%), B (30%), A (13%), S (5%), SS (2%)
      const rand = Math.random() * 100;
      let grade: 'C' | 'B' | 'A' | 'S' | 'SS' = 'C';
      if (rand < 2) grade = 'SS';
      else if (rand < 7) grade = 'S';
      else if (rand < 20) grade = 'A';
      else if (rand < 50) grade = 'B';

      // Stat types
      const statTypes: ('atk_percent' | 'crit_dmg' | 'boss_dmg' | 'cd_reduction')[] = [
        'atk_percent', 'crit_dmg', 'boss_dmg', 'cd_reduction'
      ];
      const statType = statTypes[Math.floor(Math.random() * statTypes.length)];

      // Stat values based on type & grade
      let baseVal = 5;
      if (statType === 'atk_percent') {
        baseVal = grade === 'C' ? 5 : grade === 'B' ? 10 : grade === 'A' ? 18 : grade === 'S' ? 30 : 50;
      } else if (statType === 'crit_dmg') {
        baseVal = grade === 'C' ? 10 : grade === 'B' ? 20 : grade === 'A' ? 35 : grade === 'S' ? 60 : 100;
      } else if (statType === 'boss_dmg') {
        baseVal = grade === 'C' ? 8 : grade === 'B' ? 15 : grade === 'A' ? 25 : grade === 'S' ? 45 : 75;
      } else if (statType === 'cd_reduction') {
        baseVal = grade === 'C' ? 2 : grade === 'B' ? 4 : grade === 'A' ? 6 : grade === 'S' ? 10 : 15;
      }

      traits[index] = {
        ...traits[index],
        grade,
        statType,
        value: baseVal
      };

      return {
        ...prev,
        traits,
        gemsOwned: Math.max(0, prev.gemsOwned - 20) // Rolls cost 20 gems
      };
    });
  };

  const toggleLockTrait = (index: number) => {
    setProfile(prev => {
      const traits = [...prev.traits];
      traits[index] = { ...traits[index], locked: !traits[index].locked };
      return { ...prev, traits };
    });
  };

  const updatePetLevel = (petId: string, level: number) => {
    setProfile(prev => ({
      ...prev,
      petLevels: { ...prev.petLevels, [petId]: Math.max(1, level) }
    }));
  };

  const toggleEquipPet = (petId: string) => {
    setProfile(prev => {
      const isEquipped = prev.equippedPets.includes(petId);
      let newEquipped = [...prev.equippedPets];
      if (isEquipped) {
        newEquipped = newEquipped.filter(id => id !== petId);
      } else {
        if (newEquipped.length < 3) {
          newEquipped.push(petId);
        }
      }
      return { ...prev, equippedPets: newEquipped };
    });
  };

  const togglePotion = (potionId: string) => {
    setProfile(prev => {
      const isActive = prev.activePotions.includes(potionId);
      let newActive = [...prev.activePotions];
      if (isActive) {
        newActive = newActive.filter(id => id !== potionId);
      } else {
        newActive.push(potionId);
      }
      return { ...prev, activePotions: newActive };
    });
  };

  const toggleZodiacNode = (nodeId: string) => {
    setProfile(prev => {
      const isUnlocked = prev.unlockedZodiacNodes.includes(nodeId);
      let newUnlocked = [...prev.unlockedZodiacNodes];
      if (isUnlocked) {
        newUnlocked = newUnlocked.filter(id => id !== nodeId);
      } else {
        newUnlocked.push(nodeId);
      }
      return { ...prev, unlockedZodiacNodes: newUnlocked };
    });
  };

  const updateCurrentStage = (stage: number) => {
    setProfile(prev => ({ ...prev, currentStage: Math.max(1, stage) }));
  };

  const updateCurrency = (key: 'goldOwned' | 'gemsOwned' | 'masteryPointsOwned' | 'relicShardsOwned' | 'starPointsOwned' | 'elixirOwned', value: number) => {
    setProfile(prev => ({ ...prev, [key]: Math.max(0, value) }));
  };

  const resetProfile = () => {
    setProfile(DEFAULT_PROFILE);
  };

  const stats = calculatePlayerStats(profile);

  return (
    <BuilderContext.Provider value={{
      profile,
      stats,
      updateHeroId,
      updateHeroLevel,
      updateHeroAwaken,
      updateAscensionLevel,
      toggleEquipSkill,
      updateSkillLevel,
      equipGear,
      updateGearLevel,
      updateGearRarity,
      updateMasteryLevel,
      updateRelicLevel,
      rollTrait,
      toggleLockTrait,
      updatePetLevel,
      toggleEquipPet,
      togglePotion,
      toggleZodiacNode,
      updateCurrentStage,
      updateCurrency,
      resetProfile
    }}>
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
};
