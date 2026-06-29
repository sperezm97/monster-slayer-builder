import React from 'react';
import { useBuilder } from '../builder/builder.hooks';
import { Trophy } from 'lucide-react';

export const AscensionPage: React.FC = () => {
  const { profile, ascendHero } = useBuilder();

  return (
        <div className="flex flex-col gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 flex flex-col items-center gap-4">
            <Trophy className="text-purple-500 animate-bounce" size={48} />
            <div className="text-center">
              <h4 className="font-bold text-slate-200 text-sm">Nivel de Ascensión Actual: {profile.ascensionLevel}</h4>
              <p className="text-xs text-slate-400 mt-1.5 max-w-md leading-relaxed">
                Cada rango de Ascensión otorga un multiplicador permanente de **+15% a todas tus estadísticas generales** (ATK y HP).
              </p>
            </div>
            
            <div className="bg-slate-950 border border-slate-800 py-3 px-6 rounded-xl text-center font-mono text-purple-400 font-bold">
              Multiplicador de Ascensión: x{(1 + profile.ascensionLevel * 0.15).toFixed(2)}
            </div>

            <button
              onClick={ascendHero}
              className="py-2.5 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-600/10 transition-all"
            >
              Ascender Rango (Coste Oro)
            </button>
          </div>
        </div>
  );
};
