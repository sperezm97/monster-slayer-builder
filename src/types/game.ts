export type ElementType = 'fire' | 'water' | 'earth' | 'wind' | 'light' | 'dark' | 'none';

export type RarityType = 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';

export type EquipmentSlot = 'weapon' | 'armor' | 'ring' | 'amulet';

export interface Hero {
  id: string;
  name: string;
  description: string;
  baseAtk: number;
  baseHp: number;
  atkScale: number;
  hpScale: number;
  icon: string;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  type: 'active' | 'passive';
  element: ElementType;
  baseMultiplier: number; // percentage, e.g. 150 for 150%
  multiplierScale: number; // increase per level
  cooldown: number; // in seconds
  maxLevel: number;
  icon: string;
}

export interface Equipment {
  id: string;
  slot: EquipmentSlot;
  name: string;
  rarity: RarityType;
  level: number;
  baseStatValue: number;
  statScale: number;
  statType: 'flat_atk' | 'flat_hp' | 'atk_percent' | 'hp_percent';
  icon: string;
}

export interface MasteryNode {
  id: string;
  name: string;
  description: string;
  maxLevel: number;
  statType: 'atk_percent' | 'hp_percent' | 'crit_rate' | 'crit_dmg' | 'gold_percent';
  bonusPerLevel: number; // e.g. 0.02 for 2%
  baseCost: number;
  costScale: number;
}

export interface Relic {
  id: string;
  name: string;
  description: string;
  maxLevel: number;
  statType: 'atk_percent' | 'hp_percent' | 'gold_percent' | 'exp_percent';
  bonusPerLevel: number;
  baseCost: number;
  costScale: number;
}

export interface TraitSlot {
  id: string;
  grade: 'None' | 'C' | 'B' | 'A' | 'S' | 'SS';
  statType: 'None' | 'atk_percent' | 'crit_dmg' | 'boss_dmg' | 'cd_reduction';
  value: number; // percentage
  locked: boolean;
}

export interface AwakenNode {
  id: string;
  star: number;
  description: string;
  bonusType: 'atk_percent' | 'hp_percent' | 'skill_dmg_percent';
  value: number;
}

export interface Pet {
  id: string;
  name: string;
  description: string;
  maxLevel: number;
  statType: 'gold_percent' | 'atk_percent' | 'exp_percent' | 'crit_rate' | 'hp_percent';
  bonusPerLevel: number; // e.g. 0.05 for 5%
  baseCost: number;
  icon: string;
}

export interface Potion {
  id: string;
  name: string;
  description: string;
  statType: 'gold_percent' | 'game_speed' | 'drop_rate';
  bonusValue: number; // e.g. 0.50 for +50%
  costElixir: number;
}

export interface ZodiacNode {
  id: string;
  constellation: 'Aries' | 'Taurus' | 'Gemini' | 'Cancer';
  name: string;
  description: string;
  bonusType: 'atk_percent' | 'crit_dmg' | 'atk_speed' | 'cd_reduction';
  value: number; // e.g. 0.08 for +8%
  starPointsCost: number;
}

export interface WorldStage {
  stageNumber: number;
  name: string;
  bossHp: number;
  bossAtk: number;
  recommendedDps: number;
}

export interface PlayerProfile {
  heroId: string;
  heroLevel: number;
  heroAwakenStars: number; // 0 to 5
  ascensionLevel: number;
  equippedSkills: string[]; // max 6 skills
  skillLevels: Record<string, number>; // skillId -> level
  equippedGear: Record<EquipmentSlot, { id: string; rarity: RarityType; level: number } | null>;
  masteryLevels: Record<string, number>; // nodeId -> level
  relicLevels: Record<string, number>; // relicId -> level
  traits: TraitSlot[]; // exactly 5 slots
  petLevels: Record<string, number>; // petId -> level
  equippedPets: string[]; // max 3 pets
  activePotions: string[]; // active potion IDs
  unlockedZodiacNodes: string[]; // zodiacNode IDs
  currentStage: number;
  goldOwned: number;
  gemsOwned: number;
  masteryPointsOwned: number;
  relicShardsOwned: number;
  starPointsOwned: number;
  elixirOwned: number;
}
