import React from 'react';
import { useBuilder } from '../builder/builder.hooks';
import { 
  HEROES_DATA
} from '../../data/gameData';

export const HeroesPage: React.FC = () => {
  const { profile, updateHeroId } = useBuilder();

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
};
