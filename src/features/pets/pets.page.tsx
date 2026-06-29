import React from 'react';
import { useBuilder } from '../builder/builder.hooks';
import { 
  PETS_DATA
} from '../../data/gameData';

export const PetsPage: React.FC = () => {
  const { profile, updatePetLevel, toggleEquipPet } = useBuilder();

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
};
