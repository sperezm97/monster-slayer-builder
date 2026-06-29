import React from 'react';
import { useBuilder } from '../context/BuilderContext';
import { HEROES_DATA, WORLD_STAGES } from '../data/gameData';
import { Swords, Heart, Sparkles, Coins, Zap, Trophy, RefreshCw } from 'lucide-react';

export const SidebarStats: React.FC = () => {
  const { profile, stats, updateHeroLevel, updateAscensionLevel, updateCurrency, updateCurrentStage, resetProfile } = useBuilder();
  const currentHero = HEROES_DATA.find(h => h.id === profile.heroId) || HEROES_DATA[0];

  const currentStageInfo = WORLD_STAGES.find(s => s.stageNumber === profile.currentStage) || WORLD_STAGES[0];
  const isDpsSufficient = stats.finalDps >= currentStageInfo.recommendedDps;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-6 shadow-xl backdrop-blur-md">
      {/* Hero Badge */}
      <div className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
        <div className="text-4xl">{currentHero.icon}</div>
        <div className="flex-1">
          <h3 className="font-bold text-amber-400 text-lg">{currentHero.name}</h3>
          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{currentHero.description}</p>
        </div>
      </div>

      {/* Basic Hero Settings */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-400 font-semibold">Nivel Héroe</label>
          <input
            type="number"
            value={profile.heroLevel}
            onChange={(e) => updateHeroLevel(Number(e.target.value))}
            className="bg-slate-950 border border-slate-800 rounded-lg py-1.5 px-3 focus:outline-none focus:border-amber-500 font-mono text-amber-300"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-400 font-semibold">Ascensión</label>
          <input
            type="number"
            value={profile.ascensionLevel}
            onChange={(e) => updateAscensionLevel(Number(e.target.value))}
            className="bg-slate-950 border border-slate-800 rounded-lg py-1.5 px-3 focus:outline-none focus:border-amber-500 font-mono text-purple-300"
          />
        </div>
      </div>

      {/* Currencies Updator */}
      <div className="flex flex-col gap-2 bg-slate-950/40 p-4 rounded-xl border border-slate-800/50">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Recursos / Monedas</h4>
        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
          <div className="flex flex-col gap-0.5">
            <span className="text-slate-500">Oro (Gold)</span>
            <input
              type="number"
              value={profile.goldOwned}
              onChange={(e) => updateCurrency('goldOwned', Number(e.target.value))}
              className="bg-slate-950 border border-slate-800 rounded-md py-1 px-2 focus:outline-none focus:border-amber-500 text-yellow-400"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-slate-500">Gemas (Gems)</span>
            <input
              type="number"
              value={profile.gemsOwned}
              onChange={(e) => updateCurrency('gemsOwned', Number(e.target.value))}
              className="bg-slate-950 border border-slate-800 rounded-md py-1 px-2 focus:outline-none focus:border-amber-500 text-blue-400"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-slate-500">Ptos Maestría</span>
            <input
              type="number"
              value={profile.masteryPointsOwned}
              onChange={(e) => updateCurrency('masteryPointsOwned', Number(e.target.value))}
              className="bg-slate-950 border border-slate-800 rounded-md py-1 px-2 focus:outline-none focus:border-amber-500 text-emerald-400"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-slate-500">Fragmentos Reliquia</span>
            <input
              type="number"
              value={profile.relicShardsOwned}
              onChange={(e) => updateCurrency('relicShardsOwned', Number(e.target.value))}
              className="bg-slate-950 border border-slate-800 rounded-md py-1 px-2 focus:outline-none focus:border-amber-500 text-cyan-400"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-slate-500">Ptos Zodíaco</span>
            <input
              type="number"
              value={profile.starPointsOwned}
              onChange={(e) => updateCurrency('starPointsOwned', Number(e.target.value))}
              className="bg-slate-950 border border-slate-800 rounded-md py-1 px-2 focus:outline-none focus:border-amber-500 text-indigo-400"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-slate-500">Elíxir Alquimia</span>
            <input
              type="number"
              value={profile.elixirOwned}
              onChange={(e) => updateCurrency('elixirOwned', Number(e.target.value))}
              className="bg-slate-950 border border-slate-800 rounded-md py-1 px-2 focus:outline-none focus:border-amber-500 text-rose-400"
            />
          </div>
        </div>
      </div>

      {/* Calculated Stats Panel */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Estadísticas Calculadas</h4>

        {/* DPS Block */}
        <div className="bg-gradient-to-r from-amber-500/10 to-red-500/10 border border-amber-500/20 rounded-xl p-4 flex flex-col items-center">
          <span className="text-xs text-amber-400 uppercase font-bold tracking-widest flex items-center gap-1">
            <Swords size={14} /> Daño Estimado (DPS)
          </span>
          <span className="text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500 mt-1">
            {stats.finalDps.toLocaleString()}
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-slate-950/50 border border-slate-800/80 p-3 rounded-xl flex items-center gap-3">
            <Swords className="text-red-400" size={18} />
            <div className="flex flex-col">
              <span className="text-xxs text-slate-500 font-semibold uppercase">Ataque</span>
              <span className="font-bold font-mono text-slate-200">{stats.finalAtk.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-slate-950/50 border border-slate-800/80 p-3 rounded-xl flex items-center gap-3">
            <Heart className="text-emerald-400" size={18} />
            <div className="flex flex-col">
              <span className="text-xxs text-slate-500 font-semibold uppercase">Vida (HP)</span>
              <span className="font-bold font-mono text-slate-200">{stats.finalHp.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-slate-950/50 border border-slate-800/80 p-3 rounded-xl flex items-center gap-3">
            <Sparkles className="text-amber-400" size={18} />
            <div className="flex flex-col">
              <span className="text-xxs text-slate-500 font-semibold uppercase">Crítico (P. / D.)</span>
              <span className="font-bold font-mono text-slate-200 text-xs">
                {(stats.finalCritRate * 100).toFixed(1)}% / {(stats.finalCritDmg * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          <div className="bg-slate-950/50 border border-slate-800/80 p-3 rounded-xl flex items-center gap-3">
            <Zap className="text-cyan-400" size={18} />
            <div className="flex flex-col">
              <span className="text-xxs text-slate-500 font-semibold uppercase">Enfriamiento (CD)</span>
              <span className="font-bold font-mono text-slate-200">
                -{(stats.finalCdReduction * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          <div className="bg-slate-950/50 border border-slate-800/80 p-3 rounded-xl flex items-center gap-3">
            <Coins className="text-yellow-400" size={18} />
            <div className="flex flex-col">
              <span className="text-xxs text-slate-500 font-semibold uppercase">Multipl. Oro</span>
              <span className="font-bold font-mono text-yellow-400">
                x{stats.finalGoldMultiplier.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="bg-slate-950/50 border border-slate-800/80 p-3 rounded-xl flex items-center gap-3">
            <Trophy className="text-blue-400" size={18} />
            <div className="flex flex-col">
              <span className="text-xxs text-slate-500 font-semibold uppercase">Multipl. EXP</span>
              <span className="font-bold font-mono text-blue-400">
                x{stats.finalExpMultiplier.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* World Stages check */}
      <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-400 font-semibold">Simulador de Mundo:</span>
          <select
            value={profile.currentStage}
            onChange={(e) => updateCurrentStage(Number(e.target.value))}
            className="bg-slate-900 border border-slate-800 rounded px-2 py-0.5 font-mono text-slate-300 focus:outline-none"
          >
            {WORLD_STAGES.map((s) => (
              <option key={s.stageNumber} value={s.stageNumber}>
                Mundo {s.stageNumber}: {s.name}
              </option>
            ))}
          </select>
        </div>
        <div className="text-xs text-slate-500 font-mono mt-1 flex justify-between">
          <span>DPS Recomendado:</span>
          <span>{currentStageInfo.recommendedDps.toLocaleString()}</span>
        </div>
        <div className="mt-2 text-center">
          {isDpsSufficient ? (
            <span className="inline-block w-full py-1.5 px-3 rounded-lg text-xs font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-sm shadow-emerald-500/5">
              👑 ¡Victoria Asegurada!
            </span>
          ) : (
            <span className="inline-block w-full py-1.5 px-3 rounded-lg text-xs font-bold bg-red-500/10 border border-red-500/20 text-red-400 shadow-sm shadow-red-500/5">
              ⚠️ Se requiere +{Math.ceil(currentStageInfo.recommendedDps - stats.finalDps).toLocaleString()} DPS
            </span>
          )}
        </div>
      </div>

      {/* Reset State Button */}
      <button
        onClick={resetProfile}
        className="mt-auto w-full py-2.5 px-4 bg-slate-950/60 border border-slate-800 hover:border-red-500/30 hover:bg-red-500/5 text-slate-400 hover:text-red-400 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2"
      >
        <RefreshCw size={14} /> Reiniciar Datos (Reset)
      </button>
    </div>
  );
};
