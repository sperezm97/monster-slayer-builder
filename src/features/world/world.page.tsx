import React from 'react';
import { useBuilder } from '../builder/builder.hooks';
import { 
  WORLD_STAGES
} from '../../data/gameData';

export const WorldPage: React.FC = () => {
  const { profile, stats, updateCurrentStage } = useBuilder();

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
};
