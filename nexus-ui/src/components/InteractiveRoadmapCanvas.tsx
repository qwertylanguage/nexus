import React, { useState } from 'react';
import { RoadmapStageId, UserRole, RoadmapStep } from '../types';
import { ROADMAP_STEPS } from '../mockData';
import { 
  ArrowRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink,
  Layers,
  Sparkles,
  CheckCircle2,
  Workflow
} from 'lucide-react';

interface InteractiveRoadmapCanvasProps {
  currentStage: RoadmapStageId;
  setCurrentStage: (stage: RoadmapStageId) => void;
  userRole: UserRole;
  onCloseCanvas: () => void;
  lang: 'en' | 'ru';
}

interface CanvasNode {
  id: RoadmapStageId | string;
  isStage: boolean;
  number?: number;
  title: string;
  desc: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  branch?: 'STUDENT' | 'COMPANY' | 'COMMON';
}

const INITIAL_NODES: CanvasNode[] = [
  {
    id: 'login',
    isStage: true,
    number: 1,
    title: '1. Login & Welcome',
    desc: 'Parallax & motion entry with role credentials',
    x: 40,
    y: 180,
    width: 220,
    height: 90,
    color: '#06b6d4'
  },
  {
    id: 'role-selection',
    isStage: true,
    number: 2,
    title: '2. Role Selection',
    desc: 'STUDENT vs COMPANY dual track',
    x: 320,
    y: 180,
    width: 220,
    height: 90,
    color: '#6366f1'
  },
  {
    id: 'internships',
    isStage: true,
    number: 3,
    title: '3. Internships',
    desc: 'Student: View list · Company: Create',
    x: 600,
    y: 180,
    width: 230,
    height: 95,
    color: '#3b82f6'
  },
  {
    id: 'tasks',
    isStage: true,
    number: 4,
    title: '4. Application / Tasks',
    desc: 'Student: Apply · Company: Tasks + Skills',
    x: 890,
    y: 180,
    width: 240,
    height: 95,
    color: '#8b5cf6'
  },
  {
    id: 'start-task',
    isStage: true,
    number: 5,
    title: '5. Student Starts Task',
    desc: 'Sandbox launch & pre-flight checklist',
    x: 1190,
    y: 180,
    width: 220,
    height: 90,
    color: '#0284c7'
  },
  {
    id: 'work-session',
    isStage: true,
    number: 6,
    title: '6. Work Session',
    desc: 'Human ↔ AI on whiteboard + code + WorkEvents',
    x: 1470,
    y: 180,
    width: 260,
    height: 105,
    color: '#10b981'
  },
  {
    id: 'submit-solution',
    isStage: true,
    number: 7,
    title: '7. Submit Solution',
    desc: 'Pre-flight sanity audit & integrity commit',
    x: 1790,
    y: 180,
    width: 220,
    height: 90,
    color: '#f59e0b'
  },
  {
    id: 'explanation',
    isStage: true,
    number: 8,
    title: '8. Explanation (Oral Defense)',
    desc: 'AI question → Student answer → AI follow-up',
    x: 2070,
    y: 180,
    width: 250,
    height: 95,
    color: '#ec4899'
  },
  {
    id: 'evidence',
    isStage: true,
    number: 9,
    title: '9. Evidence Generated',
    desc: 'Merkle root hash & telemetry manifest',
    x: 2380,
    y: 180,
    width: 230,
    height: 90,
    color: '#a855f7'
  },
  {
    id: 'twin-passport',
    isStage: true,
    number: 10,
    title: '10. TWIN Passport',
    desc: 'Verified digital credential & skills radar',
    x: 2670,
    y: 180,
    width: 240,
    height: 100,
    color: '#eab308'
  }
];

export const InteractiveRoadmapCanvas: React.FC<InteractiveRoadmapCanvasProps> = ({
  currentStage,
  setCurrentStage,
  userRole,
  onCloseCanvas,
  lang
}) => {
  const [nodes, setNodes] = useState<CanvasNode[]>(INITIAL_NODES);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(0.85);
  const [pan, setPan] = useState({ x: 50, y: 50 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });

  // Node Dragging
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDownNode = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNodeId(id);
    setDraggingNodeId(id);
    const node = nodes.find((n) => n.id === id);
    if (node) {
      setDragOffset({
        x: e.clientX / zoom - node.x,
        y: e.clientY / zoom - node.y
      });
    }
  };

  const handleMouseDownCanvas = (e: React.MouseEvent) => {
    setIsPanning(true);
    setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingNodeId) {
      const newX = e.clientX / zoom - dragOffset.x;
      const newY = e.clientY / zoom - dragOffset.y;
      setNodes((prev) =>
        prev.map((n) => (n.id === draggingNodeId ? { ...n, x: newX, y: newY } : n))
      );
    } else if (isPanning) {
      setPan({
        x: e.clientX - startPan.x,
        y: e.clientY - startPan.y
      });
    }
  };

  const handleMouseUp = () => {
    setDraggingNodeId(null);
    setIsPanning(false);
  };

  const handleAddCustomNode = () => {
    const newNode: CanvasNode = {
      id: `custom-note-${Date.now()}`,
      isStage: false,
      title: 'Custom Roadmap Note',
      desc: 'Double click to edit requirement or spec',
      x: 350 - pan.x,
      y: 350 - pan.y,
      width: 200,
      height: 80,
      color: '#06b6d4'
    };
    setNodes((prev) => [...prev, newNode]);
    setSelectedNodeId(newNode.id);
  };

  const handleUpdateNodeTitle = (title: string) => {
    if (!selectedNodeId) return;
    setNodes((prev) =>
      prev.map((n) => (n.id === selectedNodeId ? { ...n, title } : n))
    );
  };

  const handleUpdateNodeDesc = (desc: string) => {
    if (!selectedNodeId) return;
    setNodes((prev) =>
      prev.map((n) => (n.id === selectedNodeId ? { ...n, desc } : n))
    );
  };

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden bg-slate-950 select-none">
      {/* Canvas Top Floating Toolbar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-xl pointer-events-auto backdrop-blur-md">
          <div className="flex items-center gap-2 px-2 text-xs font-mono text-cyan-400 font-semibold">
            <Workflow className="w-4 h-4" />
            <span>{lang === 'ru' ? 'Интерактивная Канва Родмапа' : 'Editable Roadmap Canvas'}</span>
          </div>

          <button
            onClick={handleAddCustomNode}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === 'ru' ? 'Добавить Заметку' : 'Add Note'}</span>
          </button>
        </div>

        {/* Zoom and close controls */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-xl pointer-events-auto backdrop-blur-md">
          <button
            onClick={() => setZoom((z) => Math.max(0.4, z - 0.1))}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="px-1 text-xs font-mono text-slate-400 tabular-nums">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom((z) => Math.min(1.5, z + 0.1))}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setZoom(0.85);
              setPan({ x: 50, y: 50 });
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs"
            title="Reset canvas"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onCloseCanvas}
            className="ml-2 px-3 py-1 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
          >
            {lang === 'ru' ? 'Вернуться к Странице' : 'Exit to Page'}
          </button>
        </div>
      </div>

      {/* Canvas Area with drag, pan, zoom */}
      <div
        className="w-full h-full cursor-grab active:cursor-grabbing relative"
        onMouseDown={handleMouseDownCanvas}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Background Dot Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
            transform: `translate(${pan.x % 28}px, ${pan.y % 28}px)`
          }}
        />

        {/* Canvas World */}
        <div
          className="absolute top-0 left-0 w-full h-full origin-top-left"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`
          }}
        >
          {/* SVG Connecting Flow Lines between Stage Nodes */}
          <svg className="absolute inset-0 w-[3200px] h-[1000px] pointer-events-none">
            <defs>
              <marker id="canvas-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
              </marker>
            </defs>

            {nodes.map((node, i) => {
              if (i < nodes.length - 1 && node.isStage && nodes[i + 1]?.isStage) {
                const nextNode = nodes[i + 1];
                const x1 = node.x + node.width;
                const y1 = node.y + node.height / 2;
                const x2 = nextNode.x;
                const y2 = nextNode.y + nextNode.height / 2;
                return (
                  <path
                    key={`line-${node.id}`}
                    d={`M ${x1} ${y1} C ${x1 + 40} ${y1}, ${x2 - 40} ${y2}, ${x2} ${y2}`}
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2"
                    strokeDasharray={i % 2 === 0 ? 'none' : '4 2'}
                    markerEnd="url(#canvas-arrow)"
                    opacity="0.6"
                  />
                );
              }
              return null;
            })}
          </svg>

          {/* Render Nodes */}
          {nodes.map((node) => {
            const isSelected = node.id === selectedNodeId;
            const isCurrentActiveStage = node.id === currentStage;

            return (
              <div
                key={node.id}
                onMouseDown={(e) => handleMouseDownNode(node.id, e)}
                style={{
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  width: `${node.width}px`,
                  minHeight: `${node.height}px`
                }}
                className={`absolute p-4 rounded-2xl cursor-pointer text-left transition-shadow border backdrop-blur-md shadow-2xl ${
                  isCurrentActiveStage
                    ? 'bg-slate-900 border-cyan-400 ring-2 ring-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.3)]'
                    : isSelected
                    ? 'bg-slate-900 border-cyan-500 shadow-xl'
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span
                    className="text-xs font-mono font-bold"
                    style={{ color: node.color }}
                  >
                    {node.number ? `STEP 0${node.number}` : 'CUSTOM NOTE'}
                  </span>

                  {node.isStage && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentStage(node.id as RoadmapStageId);
                        onCloseCanvas();
                      }}
                      className="px-2 py-0.5 rounded bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 text-[10px] font-mono flex items-center gap-1 transition-colors"
                      title="Open page"
                    >
                      <span>Jump</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>

                <div className="text-sm font-bold text-white tracking-tight leading-snug">
                  {node.title}
                </div>

                <div className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {node.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Node Inspector Sidebar if a node is selected */}
      {selectedNode && (
        <div className="absolute bottom-4 left-4 z-20 w-80 p-4 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl backdrop-blur-md space-y-3 text-left">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-mono text-cyan-400 font-semibold">
            <span>{lang === 'ru' ? 'Редактировать Блок Канвы' : 'Edit Canvas Block'}</span>
            <button
              onClick={() => setSelectedNodeId(null)}
              className="text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <label className="block text-slate-400 font-mono text-[10px] mb-1">
                {lang === 'ru' ? 'Заголовок шага' : 'Title'}
              </label>
              <input
                type="text"
                value={selectedNode.title}
                onChange={(e) => handleUpdateNodeTitle(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white font-sans text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-mono text-[10px] mb-1">
                {lang === 'ru' ? 'Описание' : 'Description'}
              </label>
              <textarea
                rows={2}
                value={selectedNode.desc}
                onChange={(e) => handleUpdateNodeDesc(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white font-sans text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
          </div>

          {selectedNode.isStage && (
            <button
              onClick={() => {
                setCurrentStage(selectedNode.id as RoadmapStageId);
                onCloseCanvas();
              }}
              className="w-full py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>{lang === 'ru' ? 'Открыть страницу этого шага' : 'Open This Roadmap Page'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
