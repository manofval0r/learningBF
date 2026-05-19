import React from 'react';
import { Layers, Network, Code2, Database, History, BotMessageSquare } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'overview', label: 'System Overview', icon: Layers },
    { id: 'mindmap', label: 'Relational Mind-Map', icon: Network },
    { id: 'explorer', label: 'Codebase Explorer', icon: Code2 },
    { id: 'sandbox', label: 'Live SQLite Sandbox', icon: Database },
    { id: 'history', label: 'Project History', icon: History },
    { id: 'chatbot', label: 'AI Assistant', icon: BotMessageSquare },
  ];

  return (
    <header className="sticky top-0 z-50 bg-inkBlack/90 backdrop-blur-md border-b border-lavender/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Minimalist Logo / Brand */}
        <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setActiveTab('overview')}>
          <div className="w-9 h-9 rounded border border-lavender/30 bg-inkBlack flex items-center justify-center shadow-sm">
            <Network className="w-4 h-4 text-emeraldAccent" />
          </div>
          <div>
            <div className="text-base font-mono font-medium tracking-tight text-alabaster flex items-center gap-2">
              BudgetFit
              <span className="text-[10px] font-mono text-emeraldAccent px-1.5 py-0.5 rounded border border-emeraldAccent/20 bg-emeraldAccent/5">v2.0</span>
            </div>
            <p className="text-[9px] font-mono text-lavender tracking-widest uppercase mt-0.5">Minimalist Architecture Portal</p>
          </div>
        </div>

        {/* Minimalist Navigation Items */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0a1520] p-1.5 rounded border border-lavender/20 shadow-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-mono transition-all duration-200 ${
                  isActive
                    ? 'bg-alabaster text-inkBlack font-medium shadow-sm'
                    : 'text-lavender hover:text-alabaster hover:bg-lavender/10'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-inkBlack' : 'text-lavender'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Status Indicator */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded bg-[#0a1520] border border-lavender/20 text-xs font-mono text-alabaster/80 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emeraldAccent animate-pulse" />
            <span className="text-[11px]">SQLite Connected</span>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="bg-[#0a1520] border border-lavender/30 text-alabaster text-xs font-mono rounded p-2 outline-none focus:border-emeraldAccent"
            >
              {navItems.map(item => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </div>
        </div>

      </div>
    </header>
  );
}
