import React from 'react';
import { useBuilder } from '../builder/builder.hooks';
import { 
  AWAKEN_STARS_BONUS 
} from '../../data/gameData';

export const AwakenPage: React.FC = () => {
  const { profile, updateHeroAwaken } = useBuilder();

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
};
