import React, { useState, useEffect, useRef } from 'react';
import { Network, ZoomIn, ZoomOut, RotateCcw, Filter, HelpCircle, Eye } from 'lucide-react';
import ConceptModal from './ConceptModal.jsx';

export default function RelationalMindMap({ annotations }) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [zoomLevel, setZoomLevel] = useState(1);
  const canvasRef = useRef(null);

  const nodes = annotations?.mindmapNodes || [];
  const connections = annotations?.mindmapConnections || [];

  const groups = ['All', 'Core', 'Controller', 'DAO', 'Service', 'Database'];

  const filteredNodes = activeFilter === 'All' 
    ? nodes 
    : nodes.filter(n => n.group === activeFilter);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.15, 1.6));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.15, 0.5));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-inkBlack">
      
      {/* Section Header & Group Filters */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-[#0a1520] p-8 rounded border border-lavender/20 shadow-sm">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded border border-lavender/30 bg-inkBlack text-emeraldAccent shadow-sm">
              <Network className="w-5 h-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-alabaster">
              2D Interactive Constellation Mindmap
            </h2>
          </div>
          <p className="text-xs text-lavender max-w-xl font-mono">
            Hover over any node below for an instant plain-English summary card. Click a node to open the full architectural deep-dive modal.
          </p>
        </div>

        {/* Group Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 bg-inkBlack p-1.5 rounded border border-lavender/20 shadow-inner">
          <Filter className="w-3.5 h-3.5 text-lavender ml-2 mr-1" />
          {groups.map(group => (
            <button
              key={group}
              onClick={() => setActiveFilter(group)}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-all duration-200 ${
                activeFilter === group
                  ? 'bg-alabaster text-inkBlack font-medium shadow-sm'
                  : 'text-lavender hover:text-alabaster hover:bg-lavender/10'
              }`}
            >
              {group}
            </button>
          ))}
        </div>
      </div>

      {/* Mind Map Workspace Wrapper */}
      <div className="relative bg-[#0a1520] rounded border border-lavender/20 shadow-sm overflow-hidden">
        
        {/* Floating Zoom Toolbar (Pinned) */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-1.5 bg-inkBlack p-1.5 rounded border border-lavender/20 shadow-sm">
          <button onClick={handleZoomIn} className="p-2 rounded hover:bg-lavender/10 text-lavender hover:text-alabaster transition-colors" title="Zoom In">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button onClick={handleZoomOut} className="p-2 rounded hover:bg-lavender/10 text-lavender hover:text-alabaster transition-colors" title="Zoom Out">
            <ZoomOut className="w-4 h-4" />
          </button>
          <button onClick={handleResetZoom} className="p-2 rounded hover:bg-lavender/10 text-lavender hover:text-alabaster transition-colors" title="Reset Zoom">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Instant Hover Summary Card (Pinned, Responsive) */}
        {hoveredNode && (
          <div className="absolute top-4 left-4 right-4 sm:right-auto sm:top-6 sm:left-6 z-30 bg-inkBlack p-6 rounded border border-emeraldAccent/40 shadow-lg sm:max-w-sm space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-lavender/20 pb-2">
              <span className="text-xs font-mono font-medium text-emeraldAccent uppercase tracking-wider">{hoveredNode.group}</span>
              <span className="text-[10px] font-mono text-lavender bg-lavender/10 px-2 py-0.5 rounded">Instant Hover Summary</span>
            </div>
            <h4 className="text-base font-mono font-medium text-alabaster">{hoveredNode.label}</h4>
            <p className="text-xs text-lavender leading-relaxed font-mono">{hoveredNode.representations?.text}</p>
            <div className="text-[10px] font-mono text-emeraldAccent pt-2 flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>Click node to view full code & diagram</span>
            </div>
          </div>
        )}

        {/* Legend Panel (Pinned, Desktop Only) */}
        {!hoveredNode && (
          <div className="absolute bottom-6 left-6 z-20 hidden md:block bg-inkBlack p-5 rounded border border-lavender/20 shadow-sm max-w-xs space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-alabaster uppercase tracking-wider mb-2 border-b border-lavender/20 pb-2">
              <span>Architecture Legend</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-mono text-lavender">
              <span className="w-2.5 h-2.5 rounded bg-alabaster" />
              <span>Core Launchers & Config</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-mono text-lavender">
              <span className="w-2.5 h-2.5 rounded bg-emeraldAccent" />
              <span>JavaFX Controllers (UI Hubs)</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-mono text-lavender">
              <span className="w-2.5 h-2.5 rounded bg-lavender" />
              <span>DAOs & Business Services</span>
            </div>
          </div>
        )}

        {/* Mobile Swipe Instructions (Pinned, Mobile Only) */}
        {!hoveredNode && (
          <div className="md:hidden absolute bottom-4 left-4 z-20 bg-inkBlack/90 px-3 py-1.5 rounded border border-lavender/20 text-[10px] font-mono text-lavender shadow-sm pointer-events-none flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emeraldAccent animate-pulse" />
            <span>Swipe left/right or up/down to pan</span>
          </div>
        )}

        {/* Scrollable Canvas Viewport */}
        <div className="overflow-auto w-full h-[700px] p-6 cursor-grab active:cursor-grabbing">
          
          {/* Interactive Mind Map Graph Container */}
          <div 
            className="relative w-[1000px] h-[650px] mx-auto transition-transform duration-300 origin-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* SVG Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <marker id="arrowMinimal" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#778da9" opacity="0.6" />
                </marker>
              </defs>

              {connections.map((conn, idx) => {
                // Find source and target node objects
                const sourceNode = nodes.find(n => n.id === conn.source);
                const targetNode = nodes.find(n => n.id === conn.target);
                if (!sourceNode || !targetNode) return null;

                const sourceVisible = filteredNodes.some(n => n.id === conn.source);
                const targetVisible = filteredNodes.some(n => n.id === conn.target);
                if (!sourceVisible || !targetVisible) return null;

                return (
                  <g key={idx}>
                    <line
                      x1={sourceNode.x}
                      y1={sourceNode.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke="#778da9"
                      strokeWidth="1.5"
                      strokeOpacity="0.3"
                      markerEnd="url(#arrowMinimal)"
                      className="transition-all duration-300"
                    />
                    {/* Connection Label */}
                    <text
                      x={(sourceNode.x + targetNode.x) / 2}
                      y={(sourceNode.y + targetNode.y) / 2 - 6}
                      fill="#778da9"
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="middle"
                      className="bg-inkBlack px-1 py-0.5 rounded opacity-90 cursor-default"
                    >
                      {conn.type}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Interactive Nodes */}
            {filteredNodes.map(node => {
              const isSelected = selectedNode?.id === node.id;
              const isHovered = hoveredNode?.id === node.id;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-4 rounded cursor-pointer transition-all duration-200 flex flex-col items-center gap-2 w-44 text-center shadow-sm ${
                    isSelected || isHovered
                      ? 'bg-inkBlack border border-emeraldAccent shadow-md scale-105 z-30'
                      : 'bg-inkBlack border border-lavender/30 hover:border-lavender/60 z-10'
                  }`}
                  style={{ left: `${node.x}px`, top: `${node.y}px` }}
                >
                  {/* Minimalist Icon Badge */}
                  <div className="w-10 h-10 rounded border border-lavender/20 bg-[#0a1520] flex items-center justify-center mb-1">
                    <Network className={`w-5 h-5 ${node.group === 'Controller' ? 'text-emeraldAccent' : node.group === 'Core' ? 'text-alabaster' : 'text-lavender'}`} />
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-medium text-alabaster tracking-tight line-clamp-1">{node.label}</h4>
                    <span className="text-[9px] font-mono text-lavender uppercase tracking-wider block mt-0.5">{node.group}</span>
                  </div>

                  <div className="w-full pt-1.5 border-t border-lavender/20 flex items-center justify-center gap-1 text-[9px] font-mono text-emeraldAccent">
                    <span>Click to Deep Dive</span>
                  </div>
                </div>
              );
            })}

          </div>

        </div>

      </div>

      {/* Selected Node Deep-Dive Modal */}
      <ConceptModal node={selectedNode} onClose={() => setSelectedNode(null)} />

    </div>
  );
}
