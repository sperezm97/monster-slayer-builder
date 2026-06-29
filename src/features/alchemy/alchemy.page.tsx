import React from 'react';
import { useBuilder } from '../builder/builder.hooks';
import { 
  POTIONS_DATA
} from '../../data/gameData';

export const AlchemyPage: React.FC = () => {
  const { profile, togglePotion, updateCurrency } = useBuilder();

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
};
