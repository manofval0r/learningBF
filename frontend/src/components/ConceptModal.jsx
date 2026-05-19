import React, { useState, useEffect } from 'react';
import { X, Network, FileText, Code2, Sparkles } from 'lucide-react';
import Prism from 'prismjs';

export default function ConceptModal({ node, onClose }) {
  const [activeTab, setActiveTab] = useState('text');

  useEffect(() => {
    if (activeTab === 'code') {
      Prism.highlightAll();
    }
  }, [activeTab, node]);

  if (!node) return null;

  const tabs = [
    { id: 'text', label: 'Plain Language Summary', icon: FileText },
    { id: 'diagram', label: 'Relational Flow Diagram', icon: Network },
    { id: 'code', label: 'Core Implementation Snippet', icon: Code2 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inkBlack/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-inkBlack w-full max-w-4xl rounded overflow-hidden border border-lavender/30 shadow-lg flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-lavender/20 flex items-center justify-between bg-[#0a1520]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded border border-lavender/30 bg-inkBlack text-emeraldAccent shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-emeraldAccent uppercase tracking-wider">{node.group || "Concept Node"}</div>
              <h3 className="text-xl font-mono font-medium text-alabaster">{node.label}</h3>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-lavender/10 text-lavender hover:text-alabaster transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Representation Tabs */}
        <div className="flex border-b border-lavender/20 bg-[#0a1520] px-6 pt-3 gap-1.5">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t text-xs font-mono transition-all duration-200 ${
                  isActive
                    ? 'bg-inkBlack text-alabaster font-medium border-t border-x border-lavender/20 shadow-sm'
                    : 'text-lavender hover:text-alabaster hover:bg-lavender/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emeraldAccent' : 'text-lavender'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Modal Content Body */}
        <div className="p-8 overflow-y-auto flex-1 bg-inkBlack">
          
          {activeTab === 'text' && (
            <div className="space-y-6">
              <h4 className="text-base font-mono font-medium text-alabaster">Contextual Explanation & Purpose</h4>
              <p className="text-xs text-lavender leading-relaxed bg-[#0a1520] p-6 rounded border border-lavender/20 shadow-inner font-mono">
                {node.representations?.text || "No summary available."}
              </p>
              <div className="p-4 rounded bg-[#0a1520] border border-lavender/20 flex items-center gap-3 text-xs font-mono text-alabaster shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emeraldAccent animate-pulse" />
                <span>Architecture Tip: Scoping database logic inside DAOs keeps controllers lightweight and testable.</span>
              </div>
            </div>
          )}

          {activeTab === 'diagram' && (
            <div className="space-y-6">
              <h4 className="text-base font-mono font-medium text-alabaster">Execution Workflow & System Triggers</h4>
              <div className="p-8 rounded bg-[#0a1520] border border-lavender/20 shadow-inner flex items-center justify-center min-h-[200px]">
                <div className="font-mono text-xs text-emeraldAccent text-center bg-inkBlack px-6 py-4 rounded border border-lavender/20 shadow-sm">
                  {node.representations?.diagram || "No diagram available."}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-mono font-medium text-alabaster">Annotated Java Implementation</h4>
                <span className="text-[10px] font-mono text-emeraldAccent bg-emeraldAccent/10 px-2.5 py-1 rounded border border-emeraldAccent/20">JavaFX 17 / JDBC</span>
              </div>
              <pre className="line-numbers rounded max-h-[400px]">
                <code className="language-java">
                  {node.representations?.code || "// No code snippet available."}
                </code>
              </pre>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-lavender/20 bg-[#0a1520] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-alabaster text-inkBlack text-xs font-mono font-medium hover:bg-alabaster/90 transition-colors shadow-sm"
          >
            Close Deep-Dive
          </button>
        </div>

      </div>
    </div>
  );
}
