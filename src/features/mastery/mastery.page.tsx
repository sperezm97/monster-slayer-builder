import React from 'react';
import { useBuilder } from '../builder/builder.hooks';
import { 
  MASTERY_DATA
} from '../../data/gameData';

export const MasteryPage: React.FC = () => {
  const { profile, updateMasteryLevel, updateCurrency } = useBuilder();

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
};
