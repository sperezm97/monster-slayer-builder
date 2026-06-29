import React from 'react';
import { useBuilder } from '../builder/builder.hooks';
import { 
  RELICS_DATA
} from '../../data/gameData';

export const RelicsPage: React.FC = () => {
  const { profile, updateRelicLevel, updateCurrency } = useBuilder();

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
};
