import React, { useState } from 'react';
import { useBuilder } from '../builder/builder.hooks';
import { 
  GEAR_TEMPLATES
} from '../../data/gameData';
import type { EquipmentSlot, RarityType } from '../../types/game';

export const EquipmentPage: React.FC = () => {
  const { profile, equipGear, updateGearLevel, updateGearRarity } = useBuilder();
  const [selectedSlot, setSelectedSlot] = useState<EquipmentSlot | null>('weapon');

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
};
