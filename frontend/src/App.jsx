import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import SystemOverview from './components/SystemOverview.jsx';
import RelationalMindMap from './components/RelationalMindMap.jsx';
import CodebaseExplorer from './components/CodebaseExplorer.jsx';
import SqliteSandbox from './components/SqliteSandbox.jsx';
import ProjectHistory from './components/ProjectHistory.jsx';
import ChatbotAssistant from './components/ChatbotAssistant.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [annotations, setAnnotations] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnotations();
  }, []);

  const fetchAnnotations = async () => {
    try {
      const res = await fetch('/api/annotations');
      const data = await res.json();
      setAnnotations(data);
    } catch (err) {
      console.error("Error fetching codebase annotations:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-inkBlack text-alabaster font-sans selection:bg-lavender selection:text-inkBlack">
      
      {/* Top Minimalist Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Hero Header (Only rendered in System Overview for maximum impact) */}
      {activeTab === 'overview' && <HeroSection setActiveTab={setActiveTab} annotations={annotations} />}

      {/* Main Content Workspace */}
      <main className="flex-1 relative z-10">
        {loading ? (
          <div className="py-32 text-center text-lavender font-mono text-xs animate-pulse">
            Loading BudgetFit architectural knowledge base & annotated snippets...
          </div>
        ) : (
          <>
            {activeTab === 'overview' && <SystemOverview setActiveTab={setActiveTab} annotations={annotations} />}
            {activeTab === 'mindmap' && <RelationalMindMap annotations={annotations} />}
            {activeTab === 'explorer' && <CodebaseExplorer annotations={annotations} />}
            {activeTab === 'sandbox' && <SqliteSandbox />}
            {activeTab === 'history' && <ProjectHistory annotations={annotations} />}
            {activeTab === 'chatbot' && <ChatbotAssistant />}
          </>
        )}
      </main>

      {/* Sleek Minimalist Footer */}
      <footer className="mt-auto border-t border-lavender/20 bg-inkBlack py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-sm font-mono font-medium text-alabaster tracking-tight">BudgetFit Architecture Portal</div>
            <p className="text-xs text-lavender font-mono mt-1">Empowering teammates with relational learning & codebase exploration.</p>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono text-lavender">
            <button onClick={() => setActiveTab('overview')} className="hover:text-alabaster transition-colors">Overview</button>
            <button onClick={() => setActiveTab('mindmap')} className="hover:text-alabaster transition-colors">Mind-Map</button>
            <button onClick={() => setActiveTab('explorer')} className="hover:text-alabaster transition-colors">Explorer</button>
            <button onClick={() => setActiveTab('sandbox')} className="hover:text-alabaster transition-colors">Sandbox</button>
            <button onClick={() => setActiveTab('history')} className="hover:text-alabaster transition-colors">History</button>
          </div>

          <div className="text-xs font-mono text-lavender border border-lavender/20 px-4 py-2 rounded bg-inkBlack shadow-inner">
            Created with <span className="text-emeraldAccent font-medium">Antigravity</span>
            Developed by <span className="text-emeraldAccent font-medium">Group 7</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
