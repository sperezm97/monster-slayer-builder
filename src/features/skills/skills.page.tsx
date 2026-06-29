import React from 'react';
import { useBuilder } from '../builder/builder.hooks';
import { 
  SKILLS_DATA
} from '../../data/gameData';

export const SkillsPage: React.FC = () => {
  const { profile, toggleEquipSkill, updateSkillLevel } = useBuilder();

  return (
        <div className="flex flex-col gap-6">
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Habilidades Equipadas ({profile.equippedSkills.length}/6)</h4>
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 6 }).map((_, i) => {
                const skillId = profile.equippedSkills[i];
                const skill = skillId ? SKILLS_DATA.find(s => s.id === skillId) : null;
                return (
                  <div 
                    key={i} 
                    className="aspect-square bg-slate-900 border border-slate-800 rounded-xl flex flex-col items-center justify-center relative group"
                  >
                    {skill ? (
                      <>
                        <span className="text-2xl">{skill.icon}</span>
                        <span className="text-[10px] font-bold text-slate-300 truncate w-full text-center px-1 mt-1">{skill.name}</span>
                        <button 
                          onClick={() => toggleEquipSkill(skill.id)}
                          className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold shadow"
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <span className="text-slate-600 text-xs italic font-medium">Vacío</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SKILLS_DATA.map((skill) => {
              const isEquipped = profile.equippedSkills.includes(skill.id);
              const level = profile.skillLevels[skill.id] || 1;
              const currentMultiplier = skill.baseMultiplier + (level - 1) * skill.multiplierScale;

              return (
                <div 
                  key={skill.id}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex gap-4 hover:border-slate-700 transition-all"
                >
                  <div className="text-4xl bg-slate-900 border border-slate-800 rounded-xl w-14 h-14 flex items-center justify-center shrink-0">
                    {skill.icon}
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-200 text-sm">{skill.name}</h4>
                        <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                          skill.type === 'active' ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400' : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                        }`}>
                          {skill.type === 'active' ? `Activa (${skill.cooldown}s CD)` : 'Pasiva'}
                        </span>
                        {skill.element !== 'none' && (
                          <span className="ml-2 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                            {skill.element}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <label className="text-xxs text-slate-500 font-mono">Nivel:</label>
                        <input
                          type="number"
                          min="1"
                          max={skill.maxLevel}
                          value={level}
                          onChange={(e) => updateSkillLevel(skill.id, Number(e.target.value))}
                          className="bg-slate-900 border border-slate-800 rounded w-12 text-center py-0.5 font-mono text-xs text-amber-300"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">
                      {skill.description}
                    </p>
                    <div className="mt-2 text-xxs font-mono text-slate-500">
                      Multiplicador: <span className="text-slate-300 font-bold">{currentMultiplier}%</span> 
                      {skill.type === 'active' ? ' Daño' : ' Multiplicador'}
                    </div>

                    <button
                      onClick={() => toggleEquipSkill(skill.id)}
                      disabled={!isEquipped && profile.equippedSkills.length >= 6}
                      className={`mt-3 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                        isEquipped
                          ? 'bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/25'
                          : 'bg-amber-500 hover:bg-amber-600 text-slate-950 disabled:opacity-30 disabled:hover:bg-amber-500'
                      }`}
                    >
                      {isEquipped ? 'Desequipar' : 'Equipar habilidad'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
  );
};
