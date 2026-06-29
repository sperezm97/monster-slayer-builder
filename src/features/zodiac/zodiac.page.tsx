import React from 'react';
import { useBuilder } from '../builder/builder.hooks';
import { 
  ZODIAC_DATA
} from '../../data/gameData';

export const ZodiacPage: React.FC = () => {
  const { profile, toggleZodiacNode, updateCurrency } = useBuilder();

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
};
