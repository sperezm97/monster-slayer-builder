import { useState } from 'react';
import { SidebarStats } from './components/shared/organisms/SidebarStats';
import { TabsContent } from './features/builder/builder.page';
import { OptimizationAdvisor } from './components/shared/organisms/OptimizationAdvisor';
import { Swords } from 'lucide-react';

const TABS = [
  { id: 'heroes', label: 'Héroes', icon: '🎯' },
  { id: 'skills', label: 'Poderes', icon: '🔥' },
  { id: 'equipment', label: 'Equipos', icon: '🗡️' },
  { id: 'mastery', label: 'Maestrías', icon: '🎖️' },
  { id: 'relic', label: 'Reliquias', icon: '🏺' },
  { id: 'traits', label: 'Atributos', icon: '💎' },
  { id: 'awaken', label: 'Despertar', icon: '⭐' },
  { id: 'ascension', label: 'Ascensión', icon: '🏆' },
  { id: 'pets', label: 'Mascotas', icon: '🐺' },
  { id: 'alchemy', label: 'Alquimia', icon: '🧪' },
  { id: 'world', label: 'Zonas', icon: '⚔️' },
  { id: 'zodiac', label: 'Zodíaco', icon: '🌌' }
];

function BuilderApp() {
  const [activeTab, setActiveTab] = useState('heroes');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Header */}
      <header className="border-b border-slate-900 bg-slate-900/40 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-amber-500 to-red-500 rounded-xl shadow-lg shadow-amber-500/10">
              <Swords className="text-slate-950" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent leading-none">
                MONSTER SLAYER BUILDER
              </h1>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mt-1">
                Optimador de Estrategia e Idle RPG
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-xxs text-slate-400 font-mono font-bold uppercase tracking-wider">Local Storage Sincronizado</span>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Side: Stats sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <SidebarStats />
        </div>

        {/* Right Side: Tabs switcher, selected tab content, advisor */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* Tabs header wrapper (scrollable on mobile) */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-2.5 overflow-x-auto scrollbar-none flex gap-1 items-center">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-4 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 focus:outline-none ${
                    isActive 
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/5' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Tab content box */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 min-h-[400px] shadow-sm backdrop-blur-sm">
            <TabsContent activeTab={activeTab} />
          </div>

          {/* Recommendation Advisor */}
          <OptimizationAdvisor />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xxs text-slate-600 font-medium">
        <p>© 2026 Monster Slayer Companion. Construido con React + Vite + Tailwind CSS.</p>
      </footer>
    </div>
  );
}

export default function App() {
  return <BuilderApp />;
}
