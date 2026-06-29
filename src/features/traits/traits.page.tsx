import React from 'react';
import { useBuilder } from '../builder/builder.hooks';
import { Sparkles, Lock, Unlock } from 'lucide-react';

export const TraitsPage: React.FC = () => {
  const { profile, rollTrait, toggleLockTrait } = useBuilder();

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
};
