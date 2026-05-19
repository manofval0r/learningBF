import React, { useState, useEffect } from 'react';
import { Terminal, FileCode, Search, FileText, Code2, Cpu, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';
import Prism from 'prismjs';

export default function CodebaseExplorer({ annotations }) {
  const files = annotations?.codebaseFiles || [];
  const tooltipDefs = annotations?.tooltipDefinitions || {};
  const [selectedFile, setSelectedFile] = useState(files[0] || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('plain'); // 'plain' vs 'technical'
  const [activeTooltip, setActiveTooltip] = useState(null);

  useEffect(() => {
    if (selectedFile) {
      Prism.highlightAll();
      setActiveTooltip(null);
    }
  }, [selectedFile, activeTab]);

  useEffect(() => {
    if (files.length > 0 && !selectedFile) {
      setSelectedFile(files[0]);
    }
  }, [files]);

  const filteredFiles = files.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Find which tooltip definitions exist in the currently selected file's code
  const matchingTooltips = selectedFile 
    ? Object.keys(tooltipDefs).filter(term => selectedFile.code.includes(term))
    : [];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-inkBlack">
      
      {/* Section Header */}
      <div className="bg-[#0a1520] p-8 rounded border border-lavender/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded border border-lavender/30 bg-inkBlack text-emeraldAccent shadow-sm">
              <Terminal className="w-5 h-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-alabaster">
              Annotated Codebase Explorer
            </h2>
          </div>
          <p className="text-xs text-lavender max-w-xl font-mono">
            Browse the core Java classes of BudgetFit. Switch between Plain Language summaries and Technical Depth tabs. Hover over key term chips for instant ELI5 explanations.
          </p>
        </div>

        {/* File Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-lavender" />
          <input
            type="text"
            placeholder="Search classes or summaries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-inkBlack border border-lavender/30 rounded pl-10 pr-4 py-2.5 text-xs font-mono text-alabaster placeholder-lavender outline-none focus:border-emeraldAccent transition-colors"
          />
        </div>
      </div>

      {/* Explorer Workspace (Two-Column Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: File Tree */}
        <div className="lg:col-span-4 bg-[#0a1520] rounded border border-lavender/20 p-5 space-y-4 max-h-[750px] overflow-y-auto shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-lavender/20">
            <h3 className="text-xs font-mono font-medium text-alabaster uppercase tracking-wider">Project Files</h3>
            <span className="text-[10px] font-mono text-emeraldAccent bg-emeraldAccent/10 px-2 py-0.5 rounded border border-emeraldAccent/20">{filteredFiles.length} Classes</span>
          </div>

          <div className="space-y-2">
            {filteredFiles.map((file) => {
              const isSelected = selectedFile?.name === file.name;
              return (
                <button
                  key={file.name}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left p-3.5 rounded transition-all duration-200 flex items-start gap-3 border ${
                    isSelected
                      ? 'bg-inkBlack border-emeraldAccent text-alabaster shadow-sm'
                      : 'bg-inkBlack/60 border-lavender/10 text-lavender hover:bg-inkBlack hover:text-alabaster'
                  }`}
                >
                  <FileCode className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-emeraldAccent' : 'text-lavender'}`} />
                  <div>
                    <div className={`text-xs font-mono font-medium ${isSelected ? 'text-alabaster' : 'text-lavender'}`}>
                      {file.name}
                    </div>
                    <div className="text-[10px] font-mono text-lavender/80 line-clamp-1 mt-1">
                      {file.summary}
                    </div>
                  </div>
                </button>
              );
            })}
            {filteredFiles.length === 0 && (
              <div className="p-8 text-center text-xs text-lavender font-mono">
                No classes match your search query.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Code Viewer & Dual-Pane Annotations */}
        <div className="lg:col-span-8 bg-[#0a1520] rounded border border-lavender/20 overflow-hidden flex flex-col min-h-[750px] shadow-sm">
          
          {selectedFile ? (
            <>
              {/* Code Viewer Header */}
              <div className="p-6 border-b border-lavender/20 bg-inkBlack flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] font-mono text-emeraldAccent uppercase tracking-wider mb-1">{selectedFile.path}</div>
                  <h3 className="text-xl font-mono font-medium text-alabaster">{selectedFile.name}</h3>
                </div>

                {/* Annotation Dual-Pane Switcher */}
                <div className="flex items-center bg-[#0a1520] p-1 rounded border border-lavender/20">
                  <button
                    onClick={() => setActiveTab('plain')}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-mono transition-all duration-200 ${
                      activeTab === 'plain'
                        ? 'bg-inkBlack text-alabaster font-medium border border-lavender/20 shadow-sm'
                        : 'text-lavender hover:text-alabaster'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 text-emeraldAccent" />
                    Plain Language
                  </button>
                  <button
                    onClick={() => setActiveTab('technical')}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-mono transition-all duration-200 ${
                      activeTab === 'technical'
                        ? 'bg-inkBlack text-alabaster font-medium border border-lavender/20 shadow-sm'
                        : 'text-lavender hover:text-alabaster'
                    }`}
                  >
                    <Cpu className="w-3.5 h-3.5 text-emeraldAccent" />
                    Technical Depth
                  </button>
                </div>
              </div>

              {/* Annotation Panel Banner */}
              <div className="p-6 bg-inkBlack/60 border-b border-lavender/20">
                {activeTab === 'plain' ? (
                  <div className="space-y-3 animate-fadeIn">
                    <div className="flex items-center gap-2 text-xs font-mono font-medium text-emeraldAccent uppercase tracking-wider">
                      <CheckCircle className="w-4 h-4" />
                      <span>General System Comprehension</span>
                    </div>
                    <p className="text-xs sm:text-sm text-lavender leading-relaxed font-mono">
                      {selectedFile.summary}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 animate-fadeIn">
                    <div className="flex items-center gap-2 text-xs font-mono font-medium text-emeraldAccent uppercase tracking-wider">
                      <AlertCircle className="w-4 h-4" />
                      <span>Architectural & Technical Breakdown</span>
                    </div>
                    <p className="text-xs text-lavender leading-relaxed font-mono">
                      {selectedFile.technicalDepth || "No technical breakdown provided."}
                    </p>
                  </div>
                )}
              </div>

              {/* Interactive Code Tooltip Engine Bar */}
              {matchingTooltips.length > 0 && (
                <div className="p-4 bg-[#0a1520] border-b border-lavender/20 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-alabaster">
                    <HelpCircle className="w-4 h-4 text-emeraldAccent" />
                    <span className="font-medium">Interactive Hover Tooltips (ELI5 Explanations):</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {matchingTooltips.map(term => (
                      <div
                        key={term}
                        onMouseEnter={() => setActiveTooltip(term)}
                        onMouseLeave={() => setActiveTooltip(null)}
                        className={`px-3 py-1.5 rounded border text-xs font-mono cursor-pointer transition-all duration-200 ${
                          activeTooltip === term
                            ? 'bg-inkBlack border-emeraldAccent text-emeraldAccent shadow-md scale-105'
                            : 'bg-inkBlack border-lavender/30 text-lavender hover:border-lavender/60 hover:text-alabaster'
                        }`}
                      >
                        {term}
                      </div>
                    ))}
                  </div>

                  {/* Active Tooltip Popover Box */}
                  {activeTooltip && (
                    <div className="mt-3 p-4 rounded bg-inkBlack border border-emeraldAccent text-xs font-mono text-alabaster leading-relaxed animate-fadeIn shadow-lg">
                      <div className="text-[10px] text-emeraldAccent uppercase tracking-wider mb-1 font-medium">ELI5 Explanation for `{activeTooltip}`:</div>
                      {tooltipDefs[activeTooltip]}
                    </div>
                  )}
                </div>
              )}

              {/* Syntax Highlighted Code Display */}
              <div className="p-6 flex-1 overflow-auto bg-inkBlack">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-lavender/20 text-xs font-mono text-lavender">
                  <span>Source Code Inspection</span>
                  <span>Language: Java 17</span>
                </div>
                <pre className="line-numbers rounded bg-transparent p-0 my-0 border-0 shadow-none">
                  <code className="language-java">
                    {selectedFile.code}
                  </code>
                </pre>
              </div>
            </>
          ) : (
            <div className="p-16 text-center text-lavender font-mono my-auto">
              Select a Java class from the file tree to begin exploring.
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
