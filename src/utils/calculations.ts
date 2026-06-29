import type { PlayerProfile } from '../types/game';
import { HEROES_DATA, SKILLS_DATA, MASTERY_DATA, RELICS_DATA, PETS_DATA, POTIONS_DATA, ZODIAC_DATA, AWAKEN_STARS_BONUS } from '../data/gameData';

export interface CalculatedStats {
  baseAtk: number;
  baseHp: number;
  flatAtkGear: number;
  flatHpGear: number;
  percentAtkGear: number;
  percentHpGear: number;
  
  masteryAtkPercent: number;
  masteryHpPercent: number;
  masteryCritRate: number;
  masteryCritDmg: number;
  masteryGoldPercent: number;

  relicAtkPercent: number;
  relicHpPercent: number;
  relicGoldPercent: number;
  relicExpPercent: number;

  petAtkPercent: number;
  petHpPercent: number;
  petGoldPercent: number;
  petExpPercent: number;
  petCritRate: number;

  traitAtkPercent: number;
  traitCritDmg: number;
  traitBossDmg: number;
  traitCdReduction: number;

  awakenAtkPercent: number;
  awakenHpPercent: number;
  awakenSkillDmg: number;

  zodiacAtkPercent: number;
  zodiacCritDmg: number;
  zodiacAtkSpeed: number;
  zodiacCdReduction: number;

  potionGoldPercent: number;
  potionGameSpeed: number;
  potionDropRate: number;

  finalAtk: number;
  finalHp: number;
  finalCritRate: number;
  finalCritDmg: number;
  finalAtkSpeed: number;
  finalCdReduction: number;
  finalGoldMultiplier: number;
  finalExpMultiplier: number;
  finalDps: number;
}

export function calculatePlayerStats(profile: PlayerProfile): CalculatedStats {
  const hero = HEROES_DATA.find(h => h.id === profile.heroId) || HEROES_DATA[0];
  
  // 1. Base stats from hero level
  const baseAtk = hero.baseAtk + (profile.heroLevel - 1) * hero.atkScale;
  const baseHp = hero.baseHp + (profile.heroLevel - 1) * hero.hpScale;

  // 2. Gear stats
  let flatAtkGear = 0;
  let flatHpGear = 0;
  let percentAtkGear = 0;
  let percentHpGear = 0;

  Object.entries(profile.equippedGear).forEach(([slot, item]) => {
    if (!item) return;
    // Calculate stat based on template level scaling
    const rarityMultiplier = 
      item.rarity === 'common' ? 1.0 :
      item.rarity === 'rare' ? 1.5 :
      item.rarity === 'epic' ? 2.2 :
      item.rarity === 'legendary' ? 3.5 :
      6.0; // mythic
    
    // Base values per slot
    let baseVal = 10;
    let scaleVal = 2;

    if (slot === 'weapon') {
      baseVal = 25;
      scaleVal = 4;
    } else if (slot === 'armor') {
      baseVal = 150;
      scaleVal = 25;
    } else if (slot === 'ring') {
      baseVal = 5; // e.g. 5%
      scaleVal = 0.5; // +0.5% per level
    } else if (slot === 'amulet') {
      baseVal = 5; // e.g. 5%
      scaleVal = 0.5;
    }

    const value = (baseVal + (item.level - 1) * scaleVal) * rarityMultiplier;

    if (slot === 'weapon') {
      flatAtkGear += value;
    } else if (slot === 'armor') {
      flatHpGear += value;
    } else if (slot === 'ring') {
      percentAtkGear += value / 100;
    } else if (slot === 'amulet') {
      percentHpGear += value / 100;
    }
  });

  // 3. Masteries
  let masteryAtkPercent = 0;
  let masteryHpPercent = 0;
  let masteryCritRate = 0;
  let masteryCritDmg = 0;
  let masteryGoldPercent = 0;

  Object.entries(profile.masteryLevels).forEach(([nodeId, level]) => {
    const node = MASTERY_DATA.find(n => n.id === nodeId);
    if (!node || level === 0) return;
    const bonus = node.bonusPerLevel * level;
    if (node.statType === 'atk_percent') masteryAtkPercent += bonus;
    else if (node.statType === 'hp_percent') masteryHpPercent += bonus;
    else if (node.statType === 'crit_rate') masteryCritRate += bonus;
    else if (node.statType === 'crit_dmg') masteryCritDmg += bonus;
    else if (node.statType === 'gold_percent') masteryGoldPercent += bonus;
  });

  // 4. Relics
  let relicAtkPercent = 0;
  let relicHpPercent = 0;
  let relicGoldPercent = 0;
  let relicExpPercent = 0;

  Object.entries(profile.relicLevels).forEach(([relicId, level]) => {
    const relic = RELICS_DATA.find(r => r.id === relicId);
    if (!relic || level === 0) return;
    const bonus = relic.bonusPerLevel * level;
    if (relic.statType === 'atk_percent') relicAtkPercent += bonus;
    else if (relic.statType === 'hp_percent') relicHpPercent += bonus;
    else if (relic.statType === 'gold_percent') relicGoldPercent += bonus;
    else if (relic.statType === 'exp_percent') relicExpPercent += bonus;
  });

  // 5. Pets
  let petAtkPercent = 0;
  let petHpPercent = 0;
  let petGoldPercent = 0;
  let petExpPercent = 0;
  let petCritRate = 0;

  profile.equippedPets.forEach((petId) => {
    const pet = PETS_DATA.find(p => p.id === petId);
    if (!pet) return;
    const level = profile.petLevels[petId] || 1;
    const bonus = pet.bonusPerLevel * level;
    if (pet.statType === 'atk_percent') petAtkPercent += bonus;
    else if (pet.statType === 'hp_percent') petHpPercent += bonus;
    else if (pet.statType === 'gold_percent') petGoldPercent += bonus;
    else if (pet.statType === 'exp_percent') petExpPercent += bonus;
    else if (pet.statType === 'crit_rate') petCritRate += bonus;
  });

  // 6. Traits
  let traitAtkPercent = 0;
  let traitCritDmg = 0;
  let traitBossDmg = 0;
  let traitCdReduction = 0;

  profile.traits.forEach((trait) => {
    if (trait.grade === 'None' || trait.statType === 'None') return;
    const value = trait.value / 100;
    if (trait.statType === 'atk_percent') traitAtkPercent += value;
    else if (trait.statType === 'crit_dmg') traitCritDmg += value;
    else if (trait.statType === 'boss_dmg') traitBossDmg += value;
    else if (trait.statType === 'cd_reduction') traitCdReduction += value;
  });

  // 7. Awaken
  let awakenAtkPercent = 0;
  let awakenHpPercent = 0;
  let awakenSkillDmg = 0;

  for (let s = 1; s <= profile.heroAwakenStars; s++) {
    const bonus = AWAKEN_STARS_BONUS.find(b => b.star === s);
    if (!bonus) continue;
    if (bonus.bonusType === 'atk_percent') awakenAtkPercent += bonus.value;
    else if (bonus.bonusType === 'hp_percent') awakenHpPercent += bonus.value;
    else if (bonus.bonusType === 'skill_dmg_percent') awakenSkillDmg += bonus.value;
  }

  // 8. Zodiac
  let zodiacAtkPercent = 0;
  let zodiacCritDmg = 0;
  let zodiacAtkSpeed = 0;
  let zodiacCdReduction = 0;

  profile.unlockedZodiacNodes.forEach((nodeId) => {
    const node = ZODIAC_DATA.find(z => z.id === nodeId);
    if (!node) return;
    if (node.bonusType === 'atk_percent') zodiacAtkPercent += node.value;
    else if (node.bonusType === 'crit_dmg') zodiacCritDmg += node.value;
    else if (node.bonusType === 'atk_speed') zodiacAtkSpeed += node.value;
    else if (node.bonusType === 'cd_reduction') zodiacCdReduction += node.value;
  });

  // 9. Potions
  let potionGoldPercent = 0;
  let potionGameSpeed = 0;
  let potionDropRate = 0;

  profile.activePotions.forEach((potionId) => {
    const potion = POTIONS_DATA.find(p => p.id === potionId);
    if (!potion) return;
    if (potion.statType === 'gold_percent') potionGoldPercent += potion.bonusValue;
    else if (potion.statType === 'game_speed') potionGameSpeed += potion.bonusValue;
    else if (potion.statType === 'drop_rate') potionDropRate += potion.bonusValue;
  });

  // 10. Passives from equipped skills
  let skillAtkPercent = 0;
  let skillAtkSpeed = 0;
  let skillCritRate = 0;

  profile.equippedSkills.forEach((skillId) => {
    const skill = SKILLS_DATA.find(s => s.id === skillId);
    if (!skill || skill.type !== 'passive') return;
    const level = profile.skillLevels[skillId] || 1;
    const bonus = (skill.baseMultiplier + (level - 1) * skill.multiplierScale) / 100;
    if (skill.id === 'atk_boost') skillAtkPercent += bonus;
    else if (skill.id === 'swift_moves') skillAtkSpeed += bonus;
    else if (skill.id === 'crit_focus') skillCritRate += bonus;
  });

  // Ascension multiplier (applied globally to total stats)
  const ascensionMultiplier = 1 + profile.ascensionLevel * 0.15; // +15% per level

  // Compile calculations
  const finalAtk = 
    (baseAtk + flatAtkGear) * 
    (1 + percentAtkGear + masteryAtkPercent + relicAtkPercent + petAtkPercent + traitAtkPercent + awakenAtkPercent + zodiacAtkPercent + skillAtkPercent) * 
    ascensionMultiplier;

  const finalHp = 
    (baseHp + flatHpGear) * 
    (1 + percentHpGear + masteryHpPercent + relicHpPercent + petHpPercent + awakenHpPercent + skillAtkPercent) * // Let's use standard factors
    ascensionMultiplier;

  const finalCritRate = Math.min(1.0, 0.05 + masteryCritRate + petCritRate + skillCritRate);
  const finalCritDmg = 1.50 + masteryCritDmg + traitCritDmg + zodiacCritDmg;
  
  const finalAtkSpeed = 1.0 + zodiacAtkSpeed + skillAtkSpeed;
  const finalCdReduction = Math.min(0.75, traitCdReduction + zodiacCdReduction);

  const finalGoldMultiplier = 1 + masteryGoldPercent + relicGoldPercent + petGoldPercent + potionGoldPercent;
  const finalExpMultiplier = 1 + relicExpPercent + petExpPercent;

  // Calculate DPS (Base on Atk, speed, crits, and skill bonus)
  // Standard skill damage multiplier based on equipped active skills average multipliers
  let activeSkillMultiplierBonus = 1.0;
  let activeCount = 0;
  profile.equippedSkills.forEach(skillId => {
    const skill = SKILLS_DATA.find(s => s.id === skillId);
    if (skill && skill.type === 'active') {
      const lvl = profile.skillLevels[skillId] || 1;
      const multiplier = (skill.baseMultiplier + (lvl - 1) * skill.multiplierScale) / 100;
      activeSkillMultiplierBonus += multiplier / (skill.cooldown * (1 - finalCdReduction));
      activeCount++;
    }
  });

  // Base attack DPS + Active Skill DPS
  const baseAttackDps = finalAtk * finalAtkSpeed * (1 + finalCritRate * (finalCritDmg - 1));
  const skillDps = activeCount > 0 ? (finalAtk * activeSkillMultiplierBonus * (1 + awakenSkillDmg)) : 0;
  const finalDps = Math.round(baseAttackDps + skillDps);

  return {
    baseAtk,
    baseHp,
    flatAtkGear,
    flatHpGear,
    percentAtkGear,
    percentHpGear,
    
    masteryAtkPercent,
    masteryHpPercent,
    masteryCritRate,
    masteryCritDmg,
    masteryGoldPercent,

    relicAtkPercent,
    relicHpPercent,
    relicGoldPercent,
    relicExpPercent,

    petAtkPercent,
    petHpPercent,
    petGoldPercent,
    petExpPercent,
    petCritRate,

    traitAtkPercent,
    traitCritDmg,
    traitBossDmg,
    traitCdReduction,

    awakenAtkPercent,
    awakenHpPercent,
    awakenSkillDmg,

    zodiacAtkPercent,
    zodiacCritDmg,
    zodiacAtkSpeed,
    zodiacCdReduction,

    potionGoldPercent,
    potionGameSpeed,
    potionDropRate,

    finalAtk: Math.round(finalAtk),
    finalHp: Math.round(finalHp),
    finalCritRate,
    finalCritDmg,
    finalAtkSpeed,
    finalCdReduction,
    finalGoldMultiplier,
    finalExpMultiplier,
    finalDps
  };
}
