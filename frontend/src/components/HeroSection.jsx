import React from 'react';
import { ArrowRight, Terminal, Cpu, CheckCircle } from 'lucide-react';

export default function HeroSection({ setActiveTab, annotations }) {
  const eli5 = annotations?.eli5Overview || {
    title: "What BudgetFit Actually Does (Plain English)",
    description: "BudgetFit is a desktop finance tracker that helps users manage their money, practice banking, and learn financial discipline. It is built using Java and stores its data in a local SQLite database.",
    coreFeatures: [
      { name: "1. Income & Expense Tracker", description: "Users log their monthly paycheck and record daily expenses. The app categorizes spending (Groceries, Rent, Utilities) and shows exactly how much money is left to spend." },
      { name: "2. ATM Banking Simulator", description: "Simulates a real ATM where users can deposit virtual cash, withdraw money, or send peer-to-peer transfers to friends." },
      { name: "3. Step-Up Security PIN", description: "Just like a real physical ATM, BudgetFit pops up a security prompt asking for a 4-digit secret PIN before allowing any money to leave the account." },
      { name: "4. Virtual Investment Simulator", description: "Lets users buy and sell virtual stocks (like Apple or Tesla). It even simulates live stock market changes, making prices fluctuate up or down by 5%." },
      { name: "5. Savings Goals", description: "Helps users set target amounts for big purchases (like a new laptop or vacation) and tracks their saving progress over time." }
    ]
  };

  return (
    <div className="relative overflow-hidden py-16 lg:py-24 border-b border-lavender/20 bg-inkBlack">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Minimalist Announcement Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#0a1520] border border-lavender/30 text-xs font-mono text-lavender shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emeraldAccent" />
            <span>Teammate Onboarding Portal:</span>
            <span className="text-alabaster font-medium">Master the BudgetFit Codebase in Minutes</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-alabaster leading-tight mb-6">
            Immersive, Relational <br className="hidden sm:inline" />
            <span className="text-emeraldAccent font-mono font-medium">Architecture Tutorial</span>
          </h1>
          <p className="text-base sm:text-lg text-lavender leading-relaxed max-w-2xl mx-auto">
            Explore the inner workings of the <span className="text-alabaster font-medium">BudgetFit JavaFX + SQLite</span> project. Discover how controllers interact, inspect live database triggers, and query the codebase with an AI assistant.
          </p>
        </div>

        {/* Call To Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
          <button
            onClick={() => setActiveTab('mindmap')}
            className="flex items-center gap-2 px-6 py-3 rounded bg-alabaster text-inkBlack font-mono font-medium text-xs hover:bg-alabaster/90 transition-colors shadow-sm"
          >
            Explore 2D Mind-Map
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setActiveTab('explorer')}
            className="flex items-center gap-2 px-6 py-3 rounded bg-[#0a1520] text-alabaster font-mono font-medium text-xs border border-lavender/30 hover:bg-lavender/10 transition-colors"
          >
            <Terminal className="w-4 h-4 text-emeraldAccent" />
            Browse Annotated Code
          </button>

          <button
            onClick={() => setActiveTab('sandbox')}
            className="flex items-center gap-2 px-6 py-3 rounded bg-[#0a1520] text-alabaster font-mono font-medium text-xs border border-lavender/30 hover:bg-lavender/10 transition-colors"
          >
            <Cpu className="w-4 h-4 text-emeraldAccent" />
            Live SQLite Sandbox
          </button>
        </div>

        {/* ELI5 "What BudgetFit Actually Does" Overview */}
        <div className="pt-12 border-t border-lavender/20 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-normal text-alabaster tracking-tight mb-2">{eli5.title}</h2>
            <p className="text-xs font-mono text-lavender max-w-xl mx-auto">{eli5.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {eli5.coreFeatures.map((feat, idx) => (
              <div key={idx} className="bg-[#0a1520] p-5 rounded border border-lavender/20 flex flex-col justify-between hover:border-emeraldAccent/40 transition-colors shadow-sm">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-4 h-4 text-emeraldAccent flex-shrink-0" />
                    <h3 className="text-xs font-mono font-medium text-alabaster leading-tight">{feat.name}</h3>
                  </div>
                  <p className="text-[11px] text-lavender leading-relaxed">{feat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
