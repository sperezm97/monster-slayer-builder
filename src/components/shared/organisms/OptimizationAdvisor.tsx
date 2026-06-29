import React from 'react';
import { useBuilder } from '../../../features/builder/builder.hooks';
import { MASTERY_DATA, RELICS_DATA } from '../../../data/gameData';
import { TrendingUp } from 'lucide-react';

interface Recommendation {
  system: string;
  name: string;
  description: string;
  cost: number;
  currency: string;
  efficiency: number; // Stat gain per 100 units of currency
  actionText: string;
  icon: string;
}

export const OptimizationAdvisor: React.FC = () => {
  const { profile, stats } = useBuilder();

  // Generate recommendation list
  const getRecommendations = (): Recommendation[] => {
    const list: Recommendation[] = [];

    // 1. Mastery Upgrades
    MASTERY_DATA.forEach(node => {
      const currentLvl = profile.masteryLevels[node.id] || 0;
      if (currentLvl >= node.maxLevel) return;

      // Mastery points cost
      const cost = Math.round(node.baseCost * Math.pow(node.costScale, currentLvl));
      const bonusPct = node.bonusPerLevel * 100;
      
      // Calculate efficiency: stat percentage gain per point
      const efficiency = bonusPct / cost;

      let desc = '';
      if (node.statType === 'atk_percent') desc = `Siguiente nivel otorga +${bonusPct}% de Daño total`;
      else if (node.statType === 'crit_dmg') desc = `Siguiente nivel otorga +${bonusPct}% de Daño Crítico`;
      else if (node.statType === 'crit_rate') desc = `Siguiente nivel otorga +${bonusPct}% de Tasa Crítica`;
      else if (node.statType === 'gold_percent') desc = `Siguiente nivel otorga +${bonusPct}% de Ganancia de Oro`;
      else desc = `Siguiente nivel otorga +${bonusPct}% de Vida Máxima`;

      list.push({
        system: 'Maestrías',
        name: node.name,
        description: desc,
        cost,
        currency: 'Ptos Maestría',
        efficiency,
        actionText: 'Asignar Punto',
        icon: '🎖️'
      });
    });

    // 2. Relic Upgrades
    RELICS_DATA.forEach(relic => {
      const currentLvl = profile.relicLevels[relic.id] || 0;
      if (currentLvl >= relic.maxLevel) return;

      const cost = Math.round(relic.baseCost * Math.pow(relic.costScale, currentLvl));
      const bonusPct = relic.bonusPerLevel * 100;
      
      // Efficiency calculation
      const efficiency = (bonusPct / cost) * 10; // Normalized for Relic Shards scale

      let desc = '';
      if (relic.statType === 'atk_percent') desc = `Siguiente nivel otorga +${bonusPct}% de Daño total`;
      else if (relic.statType === 'gold_percent') desc = `Siguiente nivel otorga +${bonusPct}% de Ganancia de Oro`;
      else if (relic.statType === 'hp_percent') desc = `Siguiente nivel otorga +${bonusPct}% de Vida Máxima`;
      else desc = `Siguiente nivel otorga +${bonusPct}% de Ganancia de EXP`;

      list.push({
        system: 'Reliquias',
        name: relic.name,
        description: desc,
        cost,
        currency: 'Frag. Reliquia',
        efficiency,
        actionText: 'Subir Nivel',
        icon: '🏺'
      });
    });

    // 3. Equipment Upgrades (Weapon)
    const weapon = profile.equippedGear.weapon;
    if (weapon) {
      const cost = Math.round(weapon.level * 180 + 50); // Cost in Gold
      const flatAtkGain = 4 * (weapon.rarity === 'common' ? 1.0 : weapon.rarity === 'rare' ? 1.5 : weapon.rarity === 'epic' ? 2.2 : weapon.rarity === 'legendary' ? 3.5 : 6.0);
      const percentGain = (flatAtkGain / (stats.baseAtk + stats.flatAtkGear)) * 100;
      
      const efficiency = (percentGain / cost) * 10000; // Normalized for Gold scale

      list.push({
        system: 'Equipamiento',
        name: `Mejorar ${weapon.id}`,
        description: `Sube a +${weapon.level + 1}. Otorga aprox. +${flatAtkGain.toFixed(0)} de Ataque base (+${percentGain.toFixed(2)}% daño relativo)`,
        cost,
        currency: 'Oro',
        efficiency,
        actionText: 'Refinar Arma',
        icon: '🗡️'
      });
    }

    // Sort by efficiency descending
    return list.sort((a, b) => b.efficiency - a.efficiency).slice(0, 4);
  };

  const recommendations = getRecommendations();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
      <h3 className="text-md font-bold text-slate-200 mb-4 flex items-center gap-2">
        <TrendingUp className="text-amber-500" size={20} />
        Asesor de Estrategia y Optimización
      </h3>
      <p className="text-xs text-slate-400 mb-5 leading-relaxed">
        El asesor de optimización analiza tus niveles actuales y calcula qué mejoras te otorgan el mayor incremento de estadísticas relativo al costo de su respectiva moneda.
      </p>

      <div className="flex flex-col gap-4">
        {recommendations.length > 0 ? (
          recommendations.map((rec, idx) => (
            <div 
              key={idx} 
              className={`p-4 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition-all ${
                idx === 0 
                  ? 'bg-gradient-to-r from-amber-500/10 to-slate-950/60 border-amber-500/30' 
                  : 'bg-slate-950/60 border-slate-800/80'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">{rec.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xxs font-bold text-slate-500 uppercase px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                      {rec.system}
                    </span>
                    {idx === 0 && (
                      <span className="text-xxs font-bold text-amber-500 uppercase px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 animate-pulse">
                        ¡Máxima Eficiencia!
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-slate-200 text-sm mt-1">{rec.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{rec.description}</p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1.5 self-stretch sm:self-auto sm:border-l border-slate-800 sm:pl-4">
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 font-mono">
                  Costo: <span className={
                    rec.currency === 'Oro' ? 'text-yellow-400 font-bold' :
                    rec.currency === 'Ptos Maestría' ? 'text-emerald-400 font-bold' :
                    'text-cyan-400 font-bold'
                  }>{rec.cost.toLocaleString()}</span> {rec.currency}
                </span>
                <span className="text-xxs text-slate-500 font-mono italic">
                  Eficiencia: {rec.efficiency.toFixed(4)} pts/%
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-sm text-slate-500 italic">
            ¡Has maximizado todas las estadísticas disponibles para calcular!
          </div>
        )}
      </div>
    </div>
  );
};
