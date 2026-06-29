import React, { useState } from 'react';
import { useBuilder } from '../context/BuilderContext';
import { 
  HEROES_DATA, 
  SKILLS_DATA, 
  GEAR_TEMPLATES, 
  MASTERY_DATA, 
  RELICS_DATA, 
  PETS_DATA, 
  POTIONS_DATA, 
  ZODIAC_DATA, 
  WORLD_STAGES, 
  AWAKEN_STARS_BONUS 
} from '../data/gameData';
import type { EquipmentSlot, RarityType } from '../types/game';
import { Sparkles, Lock, Unlock, Trophy } from 'lucide-react';

interface TabsContentProps {
  activeTab: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({ activeTab }) => {
  const { 
    profile, 
    stats,
    updateHeroId,
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
    updateCurrency
  } = useBuilder();

  const [selectedSlot, setSelectedSlot] = useState<EquipmentSlot | null>('weapon');

  switch (activeTab) {
    case 'heroes':
      return (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {HEROES_DATA.map((hero) => {
              const isActive = profile.heroId === hero.id;
              return (
                <div 
                  key={hero.id}
                  onClick={() => updateHeroId(hero.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col gap-4 ${
                    isActive 
                      ? 'bg-slate-900 border-amber-500 shadow-lg shadow-amber-500/5' 
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{hero.icon}</span>
                    <div>
                      <h4 className="font-bold text-slate-200">{hero.name}</h4>
                      <span className="text-xxs text-amber-500 font-bold uppercase tracking-wider">
                        {isActive ? 'Seleccionado' : 'Hacer Activo'}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed flex-1">
                    {hero.description}
                  </p>
                  <div className="border-t border-slate-800/80 pt-3 grid grid-cols-2 gap-2 text-xxs font-mono text-slate-500">
                    <div>Atk Base: <span className="text-slate-300 font-bold">{hero.baseAtk}</span></div>
                    <div>Crecim. Atk: <span className="text-slate-300 font-bold">+{hero.atkScale}</span></div>
                    <div>Vida Base: <span className="text-slate-300 font-bold">{hero.baseHp}</span></div>
                    <div>Crecim. Vida: <span className="text-slate-300 font-bold">+{hero.hpScale}</span></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );

    case 'skills':
      return (
        <div className="flex flex-col gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Habilidades Equipadas ({profile.equippedSkills.length}/6)</h4>
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 6 }).map((_, i) => {
                const skillId = profile.equippedSkills[i];
                const skill = skillId ? SKILLS_DATA.find(s => s.id === skillId) : null;
                return (
                  <div 
                    key={i} 
                    className="aspect-square bg-slate-900 border border-slate-800 rounded-xl flex flex-col items-center justify-center relative group"
                  >
                    {skill ? (
                      <>
                        <span className="text-2xl">{skill.icon}</span>
                        <span className="text-[10px] font-bold text-slate-300 truncate w-full text-center px-1 mt-1">{skill.name}</span>
                        <button 
                          onClick={() => toggleEquipSkill(skill.id)}
                          className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold shadow"
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <span className="text-slate-600 text-xs italic font-medium">Vacío</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SKILLS_DATA.map((skill) => {
              const isEquipped = profile.equippedSkills.includes(skill.id);
              const level = profile.skillLevels[skill.id] || 1;
              const currentMultiplier = skill.baseMultiplier + (level - 1) * skill.multiplierScale;

              return (
                <div 
                  key={skill.id}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex gap-4 hover:border-slate-700 transition-all"
                >
                  <div className="text-4xl bg-slate-900 border border-slate-800 rounded-xl w-14 h-14 flex items-center justify-center shrink-0">
                    {skill.icon}
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-200 text-sm">{skill.name}</h4>
                        <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                          skill.type === 'active' ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400' : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                        }`}>
                          {skill.type === 'active' ? `Activa (${skill.cooldown}s CD)` : 'Pasiva'}
                        </span>
                        {skill.element !== 'none' && (
                          <span className="ml-2 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                            {skill.element}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <label className="text-xxs text-slate-500 font-mono">Nivel:</label>
                        <input
                          type="number"
                          min="1"
                          max={skill.maxLevel}
                          value={level}
                          onChange={(e) => updateSkillLevel(skill.id, Number(e.target.value))}
                          className="bg-slate-900 border border-slate-800 rounded w-12 text-center py-0.5 font-mono text-xs text-amber-300"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">
                      {skill.description}
                    </p>
                    <div className="mt-2 text-xxs font-mono text-slate-500">
                      Multiplicador: <span className="text-slate-300 font-bold">{currentMultiplier}%</span> 
                      {skill.type === 'active' ? ' Daño' : ' Multiplicador'}
                    </div>

                    <button
                      onClick={() => toggleEquipSkill(skill.id)}
                      disabled={!isEquipped && profile.equippedSkills.length >= 6}
                      className={`mt-3 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                        isEquipped
                          ? 'bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/25'
                          : 'bg-amber-500 hover:bg-amber-600 text-slate-950 disabled:opacity-30 disabled:hover:bg-amber-500'
                      }`}
                    >
                      {isEquipped ? 'Desequipar' : 'Equipar habilidad'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );

    case 'equipment':
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Equipment slots picker */}
          <div className="md:col-span-1 bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Ranuras de Equipo</h4>
            {(['weapon', 'armor', 'ring', 'amulet'] as EquipmentSlot[]).map((slot) => {
              const item = profile.equippedGear[slot];
              const isSelected = selectedSlot === slot;

              return (
                <div 
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                    isSelected 
                      ? 'bg-slate-900 border-amber-500' 
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {item ? (slot === 'weapon' ? '🗡️' : slot === 'armor' ? '👕' : slot === 'ring' ? '💍' : '📿') : '❓'}
                    </span>
                    <div>
                      <h5 className="font-bold text-slate-200 text-xs capitalize">{slot}</h5>
                      <span className="text-xxs text-slate-400 truncate max-w-[120px] block">
                        {item ? item.id : 'No equipado'}
                      </span>
                    </div>
                  </div>

                  {item && (
                    <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                      item.rarity === 'mythic' ? 'bg-red-500/10 border border-red-500/20 text-red-400' :
                      item.rarity === 'legendary' ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400' :
                      item.rarity === 'epic' ? 'bg-purple-500/10 border border-purple-500/20 text-purple-400' :
                      item.rarity === 'rare' ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' :
                      'bg-slate-800 border border-slate-700 text-slate-400'
                    }`}>
                      {item.rarity} +{item.level}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Edit Panel for the selected slot */}
          <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-6">
            {selectedSlot ? (
              (() => {
                const item = profile.equippedGear[selectedSlot];
                const templates = GEAR_TEMPLATES[selectedSlot] || [];

                return (
                  <>
                    <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                      <h4 className="font-bold text-slate-200 text-sm uppercase tracking-wider capitalize">
                        Modificar {selectedSlot === 'weapon' ? 'Arma' : selectedSlot === 'armor' ? 'Armadura' : selectedSlot === 'ring' ? 'Anillo' : 'Amuleto'}
                      </h4>
                    </div>

                    {/* Selector of templates */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-slate-400 font-semibold">Seleccionar Objeto Base</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {templates.map(t => (
                          <div 
                            key={t.name}
                            onClick={() => equipGear(selectedSlot, t.name)}
                            className={`p-3 rounded-lg border text-center cursor-pointer transition-all ${
                              item?.id === t.name 
                                ? 'bg-amber-500/10 border-amber-500 text-amber-400' 
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                            }`}
                          >
                            <span className="text-xl block mb-1">{t.icon}</span>
                            <span className="text-[10px] font-bold block truncate">{t.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {item ? (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs text-slate-400 font-semibold">Rareza del Objeto</label>
                          <select
                            value={item.rarity}
                            onChange={(e) => updateGearRarity(selectedSlot, e.target.value as RarityType)}
                            className="bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 focus:outline-none focus:border-amber-500 font-mono text-slate-300 text-xs"
                          >
                            <option value="common">Común (Gris)</option>
                            <option value="rare">Raro (Azul)</option>
                            <option value="epic">Épico (Púrpura)</option>
                            <option value="legendary">Legendario (Naranja)</option>
                            <option value="mythic">Mítico (Rojo)</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-xs text-slate-400 font-semibold">Nivel de Mejora (+0 a +200)</label>
                          <input
                            type="number"
                            min="1"
                            max="200"
                            value={item.level}
                            onChange={(e) => updateGearLevel(selectedSlot, Number(e.target.value))}
                            className="bg-slate-950 border border-slate-800 rounded-lg py-1.5 px-3 focus:outline-none focus:border-amber-500 font-mono text-amber-300 text-xs"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-xs text-slate-500 italic">
                        Por favor selecciona un objeto de arriba para equiparlo en este slot.
                      </div>
                    )}
                  </>
                );
              })()
            ) : (
              <div className="text-center py-20 text-xs text-slate-500 italic">
                Selecciona una ranura a la izquierda para modificar su equipamiento.
              </div>
            )}
          </div>
        </div>
      );

    case 'mastery':
      return (
        <div className="flex flex-col gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex justify-between items-center">
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Árbol de Maestrías Pasivas</h4>
              <p className="text-xs text-slate-400 mt-1">Gasta tus Puntos de Maestría para desbloquear bufos globales permanentes.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 py-1.5 px-4 rounded-xl text-center">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Disponibles</span>
              <span className="font-mono font-bold text-emerald-400">{profile.masteryPointsOwned} Ptos</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {MASTERY_DATA.map(node => {
              const currentLvl = profile.masteryLevels[node.id] || 0;
              const cost = Math.round(node.baseCost * Math.pow(node.costScale, currentLvl));

              return (
                <div 
                  key={node.id}
                  className="bg-slate-950 border border-slate-800 hover:border-slate-700/80 p-4 rounded-2xl flex items-center justify-between transition-all"
                >
                  <div className="flex-1">
                    <h5 className="font-bold text-slate-200 text-sm">{node.name}</h5>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{node.description}</p>
                    <div className="flex gap-4 mt-2 text-xxs font-mono text-slate-500">
                      <span>Nivel: <span className="text-slate-300 font-bold">{currentLvl}/{node.maxLevel}</span></span>
                      <span>
                        Efecto: <span className="text-emerald-400 font-bold">+{(currentLvl * node.bonusPerLevel * 100).toFixed(1)}%</span>
                        {currentLvl < node.maxLevel && ` (Sig: +${((currentLvl + 1) * node.bonusPerLevel * 100).toFixed(1)}%)`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 border-l border-slate-800 pl-4">
                    <div className="flex flex-col items-end mr-2">
                      <span className="text-[10px] text-slate-500">Costo Sig.</span>
                      <span className="font-mono text-xs text-amber-400 font-bold">{cost} Ptos</span>
                    </div>

                    <div className="flex gap-1.5">
                      <button
                        onClick={() => {
                          if (currentLvl > 0) {
                            updateMasteryLevel(node.id, currentLvl - 1);
                            updateCurrency('masteryPointsOwned', profile.masteryPointsOwned + Math.round(node.baseCost * Math.pow(node.costScale, currentLvl - 1)));
                          }
                        }}
                        disabled={currentLvl === 0}
                        className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center disabled:opacity-30"
                      >
                        -
                      </button>
                      <button
                        onClick={() => {
                          if (profile.masteryPointsOwned >= cost && currentLvl < node.maxLevel) {
                            updateMasteryLevel(node.id, currentLvl + 1);
                            updateCurrency('masteryPointsOwned', profile.masteryPointsOwned - cost);
                          }
                        }}
                        disabled={profile.masteryPointsOwned < cost || currentLvl >= node.maxLevel}
                        className="w-8 h-8 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:bg-slate-850 disabled:border-slate-800 text-slate-950 font-bold text-xs flex items-center justify-center disabled:text-slate-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );

    case 'relic':
      return (
        <div className="flex flex-col gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex justify-between items-center">
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Reliquias Ancestrales</h4>
              <p className="text-xs text-slate-400 mt-1">Mejora reliquias usando Fragmentos para aumentar estadísticas multiplicativas globales.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 py-1.5 px-4 rounded-xl text-center font-mono text-cyan-400">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Fragmentos</span>
              <span className="font-bold">{profile.relicShardsOwned.toLocaleString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RELICS_DATA.map(relic => {
              const currentLvl = profile.relicLevels[relic.id] || 0;
              const cost = Math.round(relic.baseCost * Math.pow(relic.costScale, currentLvl));
              const currentBonus = currentLvl * relic.bonusPerLevel * 100;

              return (
                <div 
                  key={relic.id}
                  className="bg-slate-950 border border-slate-800 hover:border-slate-700/80 p-4 rounded-2xl flex flex-col gap-3 transition-all justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <h5 className="font-bold text-slate-200 text-sm flex items-center gap-1.5">
                        <span className="text-xl">🏺</span> {relic.name}
                      </h5>
                      <span className="font-mono text-xs text-slate-500">Lv. {currentLvl}/{relic.maxLevel}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{relic.description}</p>
                  </div>

                  <div className="border-t border-slate-900/80 pt-3 flex justify-between items-center mt-auto">
                    <div className="font-mono text-xxs flex flex-col gap-0.5">
                      <span className="text-slate-500">Bufo Actual:</span>
                      <span className="text-cyan-400 font-bold">+{currentBonus.toFixed(1)}%</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xxs font-mono text-slate-500 mr-1">Cost: {cost} shards</span>
                      <button
                        onClick={() => {
                          if (currentLvl > 0) {
                            updateRelicLevel(relic.id, currentLvl - 1);
                            updateCurrency('relicShardsOwned', profile.relicShardsOwned + Math.round(relic.baseCost * Math.pow(relic.costScale, currentLvl - 1)));
                          }
                        }}
                        disabled={currentLvl === 0}
                        className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-bold disabled:opacity-30"
                      >
                        -
                      </button>
                      <button
                        onClick={() => {
                          if (profile.relicShardsOwned >= cost && currentLvl < relic.maxLevel) {
                            updateRelicLevel(relic.id, currentLvl + 1);
                            updateCurrency('relicShardsOwned', profile.relicShardsOwned - cost);
                          }
                        }}
                        disabled={profile.relicShardsOwned < cost || currentLvl >= relic.maxLevel}
                        className="px-3 py-1 rounded bg-cyan-500 hover:bg-cyan-600 text-slate-950 text-xs font-bold disabled:bg-slate-850 disabled:text-slate-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );

    case 'traits':
      return (
        <div className="flex flex-col gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex justify-between items-center">
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Simulador de Atributos (Traits)</h4>
              <p className="text-xs text-slate-400 mt-1">Tira atributos para obtener bonificadores aleatorios de nivel C a SS. Cuesta 20 Gemas por tirada.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 py-1.5 px-4 rounded-xl text-center font-mono text-blue-400">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Gemas Disponibles</span>
              <span className="font-bold">{profile.gemsOwned.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {profile.traits.map((trait, index) => {
              return (
                <div 
                  key={trait.id}
                  className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-4">
                    {/* Grade Icon Badge */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold font-mono text-lg shadow-md border ${
                      trait.grade === 'SS' ? 'bg-red-500/10 border-red-500 text-red-400 shadow-red-500/5' :
                      trait.grade === 'S' ? 'bg-amber-500/10 border-amber-500 text-amber-400 shadow-amber-500/5' :
                      trait.grade === 'A' ? 'bg-purple-500/10 border-purple-500 text-purple-400 shadow-purple-500/5' :
                      trait.grade === 'B' ? 'bg-blue-500/10 border-blue-500 text-blue-400' :
                      trait.grade === 'C' ? 'bg-slate-800 border-slate-700 text-slate-400' :
                      'bg-slate-900 border-dashed border-slate-800 text-slate-600'
                    }`}>
                      {trait.grade === 'None' ? '?' : trait.grade}
                    </div>

                    <div>
                      <h5 className="font-bold text-slate-200 text-sm">
                        Slot {index + 1}: {trait.statType === 'None' ? 'Vacío' : 
                          trait.statType === 'atk_percent' ? 'Ataque porcentual (ATK%)' :
                          trait.statType === 'crit_dmg' ? 'Daño Crítico (Crit DMG%)' :
                          trait.statType === 'boss_dmg' ? 'Daño a Jefes (Boss DMG%)' :
                          'Reducción de Enfriamiento (CD%)'
                        }
                      </h5>
                      <span className="font-mono text-xs text-slate-400">
                        {trait.statType === 'None' ? 'Haz clic en tirar para empezar' : `Otorga +${trait.value}%`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleLockTrait(index)}
                      className={`p-2 rounded-lg border transition-all ${
                        trait.locked 
                          ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-400'
                      }`}
                      title={trait.locked ? 'Desbloquear ranura' : 'Bloquear ranura para que no cambie'}
                    >
                      {trait.locked ? <Lock size={16} /> : <Unlock size={16} />}
                    </button>

                    <button
                      onClick={() => rollTrait(index)}
                      disabled={trait.locked || profile.gemsOwned < 20}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-slate-850 disabled:to-slate-850 disabled:border-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 disabled:opacity-40"
                    >
                      <Sparkles size={14} /> Tirar (20 Gemas)
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );

    case 'awaken':
      return (
        <div className="flex flex-col gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 text-center">
            <h4 className="font-bold text-slate-200 text-sm">Estrellas de Despertar (Hero Awaken)</h4>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Desbloquea bufos gigantescos e incrementos de daño en habilidades incrementando las estrellas de tu héroe.
            </p>
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: 5 }).map((_, i) => {
                const starNum = i + 1;
                const isActivated = profile.heroAwakenStars >= starNum;
                return (
                  <button
                    key={i}
                    onClick={() => updateHeroAwaken(isActivated ? starNum - 1 : starNum)}
                    className="text-4xl transition-all hover:scale-110 active:scale-95 focus:outline-none"
                  >
                    {isActivated ? '⭐' : '☆'}
                  </button>
                );
              })}
            </div>
            <span className="text-xxs text-slate-500 font-mono block mt-2">Haz clic en las estrellas para subirlas o bajarlas.</span>
          </div>

          <div className="flex flex-col gap-3">
            {AWAKEN_STARS_BONUS.map(bonus => {
              const isUnlocked = profile.heroAwakenStars >= bonus.star;
              return (
                <div 
                  key={bonus.star}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                    isUnlocked 
                      ? 'bg-slate-900 border-amber-500/30' 
                      : 'bg-slate-950 border-slate-800/80 opacity-50'
                  }`}
                >
                  <div>
                    <h5 className="font-bold text-slate-200 text-xs">
                      Despertar {bonus.star} Estrellas
                    </h5>
                    <p className="text-xs text-slate-400 mt-0.5">{bonus.desc}</p>
                  </div>
                  <span className={`text-[10px] font-bold uppercase py-0.5 px-2 rounded ${
                    isUnlocked ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-slate-900 text-slate-600 border border-slate-800'
                  }`}>
                    {isUnlocked ? 'Activo' : 'Bloqueado'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      );

    case 'ascension':
      return (
        <div className="flex flex-col gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 flex flex-col items-center gap-4">
            <Trophy className="text-purple-500 animate-bounce" size={48} />
            <div className="text-center">
              <h4 className="font-bold text-slate-200 text-sm">Nivel de Ascensión Actual: {profile.ascensionLevel}</h4>
              <p className="text-xs text-slate-400 mt-1.5 max-w-md leading-relaxed">
                Cada rango de Ascensión otorga un multiplicador permanente de **+15% a todas tus estadísticas generales** (ATK y HP).
              </p>
            </div>
            
            <div className="bg-slate-950 border border-slate-800 py-3 px-6 rounded-xl text-center font-mono text-purple-400 font-bold">
              Multiplicador de Ascensión: x{(1 + profile.ascensionLevel * 0.15).toFixed(2)}
            </div>

            <button
              onClick={() => updateCurrency('goldOwned', Math.max(0, profile.goldOwned - 200000))} // Ascension costs 200k gold simulated
              onClickCapture={() => updateAscensionLevel(profile.ascensionLevel + 1)}
              className="py-2.5 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-600/10 transition-all"
            >
              Ascender Rango (Coste Oro)
            </button>
          </div>
        </div>
      );

    case 'pets':
      return (
        <div className="flex flex-col gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Mascotas Equipadas ({profile.equippedPets.length}/3)</h4>
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 3 }).map((_, i) => {
                const petId = profile.equippedPets[i];
                const pet = petId ? PETS_DATA.find(p => p.id === petId) : null;
                return (
                  <div 
                    key={i} 
                    className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between relative group"
                  >
                    {pet ? (
                      <>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{pet.icon}</span>
                          <span className="text-xs font-bold text-slate-200 truncate">{pet.name}</span>
                        </div>
                        <button 
                          onClick={() => toggleEquipPet(pet.id)}
                          className="bg-red-500/10 hover:bg-red-500/25 border border-red-500/20 text-red-400 rounded-md py-0.5 px-1.5 text-[10px] font-bold transition-all"
                        >
                          Quitar
                        </button>
                      </>
                    ) : (
                      <span className="text-slate-600 text-xs italic font-medium py-1.5 w-full text-center">Vacío</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PETS_DATA.map(pet => {
              const isEquipped = profile.equippedPets.includes(pet.id);
              const lvl = profile.petLevels[pet.id] || 1;
              const bonus = lvl * pet.bonusPerLevel * 100;

              return (
                <div 
                  key={pet.id}
                  className="bg-slate-950 border border-slate-800 hover:border-slate-700/80 p-4 rounded-2xl flex gap-4 transition-all"
                >
                  <span className="text-4xl bg-slate-900 border border-slate-800 rounded-xl w-14 h-14 flex items-center justify-center shrink-0">
                    {pet.icon}
                  </span>
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-200 text-sm">{pet.name}</h4>
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">
                          {pet.statType === 'atk_percent' ? 'Multiplicador Daño' :
                           pet.statType === 'gold_percent' ? 'Ganancia Oro' :
                           pet.statType === 'crit_rate' ? 'Tasa Crítica' :
                           'Ganancia EXP'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <label className="text-xxs text-slate-500 font-mono">Nivel:</label>
                        <input
                          type="number"
                          min="1"
                          max={pet.maxLevel}
                          value={lvl}
                          onChange={(e) => updatePetLevel(pet.id, Number(e.target.value))}
                          className="bg-slate-900 border border-slate-800 rounded w-12 text-center py-0.5 font-mono text-xs text-amber-300"
                        />
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed mt-1">
                      {pet.description}
                    </p>

                    <div className="mt-2 text-xxs font-mono text-slate-500">
                      Multiplicador actual: <span className="text-emerald-400 font-bold">+{bonus.toFixed(0)}%</span>
                    </div>

                    <button
                      onClick={() => toggleEquipPet(pet.id)}
                      disabled={!isEquipped && profile.equippedPets.length >= 3}
                      className={`mt-3 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                        isEquipped
                          ? 'bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/25'
                          : 'bg-amber-500 hover:bg-amber-600 text-slate-950 disabled:opacity-30'
                      }`}
                    >
                      {isEquipped ? 'Desequipar' : 'Equipar mascota'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );

    case 'alchemy':
      return (
        <div className="flex flex-col gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex justify-between items-center">
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Alquimia y Pociones</h4>
              <p className="text-xs text-slate-400 mt-1">Consume Elíxir de Alquimia para activar tónicos y potenciadores de estadísticas temporales.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 py-1.5 px-4 rounded-xl text-center font-mono text-rose-400">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Elíxir</span>
              <span className="font-bold">{profile.elixirOwned} unidades</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {POTIONS_DATA.map(pot => {
              const isActive = profile.activePotions.includes(pot.id);

              return (
                <div 
                  key={pot.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col gap-4 justify-between ${
                    isActive 
                      ? 'bg-slate-900 border-rose-500 shadow-md shadow-rose-500/5' 
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">🧪</span>
                    <div>
                      <h4 className="font-bold text-slate-200 text-xs">{pot.name}</h4>
                      <span className="font-mono text-xxs text-slate-500 block">Coste: {pot.costElixir} Elíxir</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed flex-1">
                    {pot.description}
                  </p>

                  <button
                    onClick={() => {
                      if (!isActive && profile.elixirOwned >= pot.costElixir) {
                        togglePotion(pot.id);
                        updateCurrency('elixirOwned', profile.elixirOwned - pot.costElixir);
                      } else if (isActive) {
                        togglePotion(pot.id);
                      }
                    }}
                    disabled={!isActive && profile.elixirOwned < pot.costElixir}
                    className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
                      isActive 
                        ? 'bg-rose-500 hover:bg-rose-600 text-white shadow' 
                        : 'bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 disabled:opacity-40'
                    }`}
                  >
                    {isActive ? 'Desactivar poción' : 'Activar poción'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      );

    case 'world':
      return (
        <div className="flex flex-col gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4">
            <h4 className="font-bold text-slate-200 text-sm">Registro de Zonas Mundiales</h4>
            <p className="text-xs text-slate-400 mt-1">
              Visualiza los requisitos de daño (DPS) para cada una de las zonas del mapa de Monster Slayer y planea tu avance.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {WORLD_STAGES.map(stage => {
              const isCleared = profile.currentStage > stage.stageNumber;
              const isActive = profile.currentStage === stage.stageNumber;
              const isUnlocked = profile.currentStage >= stage.stageNumber;
              const isDpsEnough = stats.finalDps >= stage.recommendedDps;

              return (
                <div 
                  key={stage.stageNumber}
                  onClick={() => isUnlocked && updateCurrentStage(stage.stageNumber)}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                    isActive ? 'bg-slate-900 border-amber-500 shadow-md' :
                    isCleared ? 'bg-slate-950/40 border-slate-800/80 opacity-60 hover:opacity-90' :
                    isUnlocked ? 'bg-slate-950 border-slate-800 hover:border-slate-700' :
                    'bg-slate-950/20 border-slate-900/50 opacity-30 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">
                      {isCleared ? '✅' : isActive ? '⚔️' : '🔒'}
                    </span>
                    <div>
                      <h5 className="font-bold text-slate-200 text-sm">
                        Fase {stage.stageNumber}: {stage.name}
                      </h5>
                      <span className="font-mono text-xxs text-slate-500">
                        Vida Boss: {stage.bossHp.toLocaleString()} | DPS Recomendado: {stage.recommendedDps.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {isActive && (
                      <span className={`text-[10px] font-bold uppercase py-0.5 px-2 rounded ${
                        isDpsEnough ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {isDpsEnough ? 'Victoria Segura' : 'DPS Insuficiente'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );

    case 'zodiac':
      return (
        <div className="flex flex-col gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex justify-between items-center">
            <div>
              <h4 className="font-bold text-slate-200 text-sm">Nodos del Zodíaco Astral</h4>
              <p className="text-xs text-slate-400 mt-1">Activa estrellas de las constelaciones usando tus Puntos de Zodíaco para recibir bufos definitivos.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 py-1.5 px-4 rounded-xl text-center font-mono text-indigo-400">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Puntos Zodiaco</span>
              <span className="font-bold">{profile.starPointsOwned} Ptos</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Aries', 'Taurus'].map(constellation => {
              const nodes = ZODIAC_DATA.filter(n => n.constellation === constellation);

              return (
                <div key={constellation} className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
                  <h4 className="font-bold text-slate-300 text-sm border-b border-slate-900 pb-2 mb-3 flex items-center gap-2">
                    🌌 Constelación de {constellation}
                  </h4>
                  
                  <div className="flex flex-col gap-2">
                    {nodes.map(node => {
                      const isUnlocked = profile.unlockedZodiacNodes.includes(node.id);
                      
                      return (
                        <div 
                          key={node.id}
                          className={`p-3 rounded-xl border flex justify-between items-center transition-all ${
                            isUnlocked 
                              ? 'bg-indigo-500/5 border-indigo-500/30' 
                              : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-800'
                          }`}
                        >
                          <div>
                            <h5 className="font-bold text-slate-200 text-xs">{node.name}</h5>
                            <p className="text-xxs text-slate-400 mt-0.5">{node.description}</p>
                            <span className="text-xxs font-mono text-indigo-400 mt-1 block">
                              Efecto: +{(node.value * 100).toFixed(0)}% {
                                node.bonusType === 'atk_percent' ? 'Ataque' :
                                node.bonusType === 'crit_dmg' ? 'Daño Crítico' :
                                node.bonusType === 'atk_speed' ? 'Vel. Ataque' :
                                'Reduc. CD'
                              }
                            </span>
                          </div>

                          <button
                            onClick={() => {
                              if (isUnlocked) {
                                toggleZodiacNode(node.id);
                                updateCurrency('starPointsOwned', profile.starPointsOwned + node.starPointsCost);
                              } else if (profile.starPointsOwned >= node.starPointsCost) {
                                toggleZodiacNode(node.id);
                                updateCurrency('starPointsOwned', profile.starPointsOwned - node.starPointsCost);
                              }
                            }}
                            disabled={!isUnlocked && profile.starPointsOwned < node.starPointsCost}
                            className={`py-1 px-3 rounded-lg text-xxs font-bold transition-all ${
                              isUnlocked 
                                ? 'bg-indigo-500 hover:bg-indigo-600 text-white' 
                                : 'bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 disabled:opacity-40'
                            }`}
                          >
                            {isUnlocked ? 'Desactivar' : `Activar (${node.starPointsCost} ptos)`}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );

    default:
      return null;
  }
};
