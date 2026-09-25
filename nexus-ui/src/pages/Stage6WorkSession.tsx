import React, { useState, useRef, useEffect } from 'react';
import { 
  WorkEvent, 
  CanvasShape, 
  InternshipTask,
  WorkEventType
} from '../types';
import { 
  INITIAL_CANVAS_SHAPES, 
  INITIAL_SOLUTION_CODE, 
  INITIAL_WORK_EVENTS 
} from '../mockData';
import { 
  Code2, 
  Bot, 
  Send, 
  CheckCircle2, 
  Edit3, 
  Cpu, 
  Activity, 
  Plus, 
  Trash2, 
  Layers, 
  Move, 
  ArrowRight, 
  Sparkles,
  Maximize2,
  FileCode,
  ShieldAlert,
  Hash
} from 'lucide-react';

interface Stage6WorkSessionProps {
  task: InternshipTask;
  workEvents: WorkEvent[];
  onAddWorkEvent: (event: WorkEvent) => void;
  onProceedToSubmit: () => void;
  lang: 'en' | 'ru';
}

export const Stage6WorkSession: React.FC<Stage6WorkSessionProps> = ({
  task,
  workEvents,
  onAddWorkEvent,
  onProceedToSubmit,
  lang
}) => {
  // Tabs: 'canvas' (Whiteboard) or 'code' (Solution editor) or 'split'
  const [activeTab, setActiveTab] = useState<'split' | 'canvas' | 'code'>('split');
  
  // Solution Code State (Human -> Solution)
  const [solutionCode, setSolutionCode] = useState<string>(INITIAL_SOLUTION_CODE);
  
  // Interactive Canvas Shapes
  const [shapes, setShapes] = useState<CanvasShape[]>(INITIAL_CANVAS_SHAPES);
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // AI Copilot state (Human -> AI and AI -> Response)
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiStreaming, setAiStreaming] = useState(false);
  const [suggestedDiff, setSuggestedDiff] = useState<string | null>(null);
  const [aiResponsesList, setAiResponsesList] = useState<Array<{ role: 'human' | 'ai'; text: string; time: string }>>([
    {
      role: 'human',
      text: 'How should we handle uncommitted log rollback when isolated node 03 rejoins with divergent term 12?',
      time: '10:17:15'
    },
    {
      role: 'ai',
      text: 'Under Raft consensus invariants, since node 03 had an asymmetric partition and never achieved majority quorum (3 nodes), its uncommitted entries at term 12 are stale. Call FindLatestCommonCommit(followerID, lastLogIndex) to calculate matchIndex and truncate follower log.',
      time: '10:17:18'
    }
  ]);

  // Keystroke throttle ref for recording work events
  const lastKeystrokeTimeRef = useRef<number>(0);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setSolutionCode(val);

    const now = Date.now();
    if (now - lastKeystrokeTimeRef.current > 4000) {
      lastKeystrokeTimeRef.current = now;
      const newEvent: WorkEvent = {
        id: `ev-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        timeOffsetSec: Math.floor(Math.random() * 500) + 400,
        type: 'HUMAN_KEYSTROKE',
        actor: 'HUMAN',
        summary: 'Human refined consensus logic in editor',
        payload: `Updated code segment (${val.length} chars)`
      };
      onAddWorkEvent(newEvent);
    }
  };

  // AI Prompt Dispatch (Human -> AI)

  const handleSendPrompt = (customText?: string) => {
    const textToSend = customText ?? aiPrompt;

    if (!textToSend.trim()) return;

    const timeStr = new Date().toLocaleTimeString('en-US', {
      hour12: false
    });

    const aiAnswer = `if followerTerm > h.currentTerm {
    if !h.wal.HasQuorumHeartbeat() {
        h.currentTerm = followerTerm
        return errors.New("stepped down: recognized higher term follower")
    }
}

matchIndex := h.wal.FindLatestCommonCommit(
    followerID,
    lastLogIndex
)`;

    setAiResponsesList((prev) => [
      ...prev,
      {
        role: 'human',
        text: textToSend,
        time: timeStr
      },
      {
        role: 'ai',
        text: 'AI Copilot proposed a quorum heartbeat guard. Review the suggested patch before applying it.',
        time: timeStr
      }
    ]);

    setSuggestedDiff(aiAnswer);
    setAiPrompt('');
    setAiStreaming(false);
  };

  // Human Verify & Edit (Human -> Verify/Edit)
  const handleApplyVerifiedDiff = () => {
    if (!suggestedDiff) return;

    const updated = solutionCode.replace(
      '// Human verification: Guard against stale election cycles',
      `// Verified and edited by Alex Chen:\n\t${suggestedDiff}\n\t// End verified patch`
    );
    setSolutionCode(updated);

    const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false });
    const verifyEv: WorkEvent = {
      id: `ev-${Date.now()}`,
      timestamp: timeStr,
      timeOffsetSec: 450,
      type: 'HUMAN_EDIT',
      actor: 'HUMAN',
      summary: 'Human inspected, verified and merged AI patch',
      payload: 'Applied quorum heartbeat guard with manual lock review',
      diffPercent: 38
    };
    //onAddWorkEvent(verifyEv);
    setSuggestedDiff(null);
  };

  // Canvas Interactions
  const handleAddCanvasShape = (type: 'box' | 'cylinder' | 'cloud') => {
    const newShape: CanvasShape = {
      id: `shape-${Date.now()}`,
      type,
      x: 180 + Math.random() * 80,
      y: 120 + Math.random() * 60,
      width: 150,
      height: 70,
      label: type === 'box' ? 'State Machine Replica' : type === 'cylinder' ? 'Quorum Store' : 'Network Boundary',
      color: type === 'box' ? '#0284c7' : type === 'cylinder' ? '#059669' : '#dc2626'
    };
    setShapes((prev) => [...prev, newShape]);
    setSelectedShapeId(newShape.id);

    const drawEv: WorkEvent = {
      id: `ev-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      timeOffsetSec: 320,
      type: 'HUMAN_CANVAS_DRAW',
      actor: 'HUMAN',
      summary: `Human added canvas node: ${newShape.label}`,
      payload: `Created shape ${newShape.type} at (${Math.round(newShape.x)}, ${Math.round(newShape.y)})`
    };
    //onAddWorkEvent(drawEv);
  };

  const handleUpdateSelectedShapeText = (text: string) => {
    if (!selectedShapeId) return;
    setShapes((prev) =>
      prev.map((s) => (s.id === selectedShapeId ? { ...s, label: text } : s))
    );
  };

  const handleDeleteSelectedShape = () => {
    if (!selectedShapeId) return;
    setShapes((prev) => prev.filter((s) => s.id !== selectedShapeId));
    setSelectedShapeId(null);
  };

  // Dragging logic for canvas
  const handleMouseDownShape = (id: string, e: React.MouseEvent) => {
    setSelectedShapeId(id);
    setIsDragging(true);
    const shape = shapes.find((s) => s.id === id);
    if (shape) {
      setDragOffset({
        x: e.clientX - shape.x,
        y: e.clientY - shape.y
      });
    }
  };

  const handleMouseMoveCanvas = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging || !selectedShapeId) return;
    const svgRect = e.currentTarget.getBoundingClientRect();
    const newX = Math.max(10, Math.min(650, e.clientX - svgRect.left - 40));
    const newY = Math.max(10, Math.min(300, e.clientY - svgRect.top - 20));

    setShapes((prev) =>
      prev.map((s) => (s.id === selectedShapeId ? { ...s, x: newX, y: newY } : s))
    );
  };

  const handleMouseUpCanvas = () => {
    setIsDragging(false);
  };

  const selectedShape = shapes.find((s) => s.id === selectedShapeId);

  // Compute live human/AI ratio
  const humanEventsCount = workEvents.filter((e) => e.actor === 'HUMAN').length;
  const aiEventsCount = workEvents.filter((e) => e.actor === 'AI').length;
  const totalEvents = Math.max(1, humanEventsCount + aiEventsCount);
  const humanPercent = Math.round((humanEventsCount / totalEvents) * 100);
  const aiPercent = 100 - humanPercent;

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 text-left space-y-4">
      {/* Workspace Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">
              {lang === 'ru' ? 'Шаг 6 из 10 · Активная Рабочая Сессия' : 'Roadmap Step 6 of 10 · Live Work Session'}
            </span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight mt-0.5">
            {task.title}
          </h2>
        </div>

        {/* View Mode Switcher & Telemetry Badge */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setActiveTab('split')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'split' ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-400'
              }`}
            >
              Split View
            </button>
            <button
              onClick={() => setActiveTab('canvas')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'canvas' ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-400'
              }`}
            >
              Canvas (Whiteboard)
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'code' ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-400'
              }`}
            >
              Solution Editor
            </button>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">Ratio:</span>
            <span className="text-cyan-400 font-bold">{humanPercent}% Human</span>
            <span className="text-slate-600">/</span>
            <span className="text-indigo-400 font-bold">{aiPercent}% AI</span>
          </div>

          <button
            onClick={onProceedToSubmit}
            className="px-4 py-2 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:opacity-95 shadow-sm flex items-center gap-1.5 shrink-0"
          >
            <span>{lang === 'ru' ? 'Завершить сессию' : 'Submit Solution'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main 3-Column Studio Grid: Left (Canvas/Code) + Right (AI Copilot) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* LEFT / CENTER WORKSPACE (7 or 8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* 1. EDITABLE CANVAS / WHITEBOARD */}
          {(activeTab === 'split' || activeTab === 'canvas') && (
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-3 relative overflow-hidden shadow-lg">
              {/* Canvas Controls Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono text-white font-semibold">
                    {lang === 'ru' ? 'Интерактивная Канва Архитектуры (Whiteboard)' : 'Architecture Topology Canvas'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    ({shapes.length} nodes · drag & click to edit)
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleAddCanvasShape('box')}
                    className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono flex items-center gap-1"
                    title="Add Replica Node"
                  >
                    <Plus className="w-3 h-3 text-cyan-400" />
                    <span>Box</span>
                  </button>
                  <button
                    onClick={() => handleAddCanvasShape('cylinder')}
                    className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono flex items-center gap-1"
                    title="Add Storage Node"
                  >
                    <Plus className="w-3 h-3 text-emerald-400" />
                    <span>Store</span>
                  </button>
                  <button
                    onClick={() => handleAddCanvasShape('cloud')}
                    className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono flex items-center gap-1"
                    title="Add Network Partition"
                  >
                    <Plus className="w-3 h-3 text-rose-400" />
                    <span>Partition</span>
                  </button>

                  {selectedShape && (
                    <button
                      onClick={handleDeleteSelectedShape}
                      className="p-1 rounded bg-rose-950/60 border border-rose-800 text-rose-400 hover:bg-rose-900 text-xs ml-2"
                      title="Delete selected node"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* SVG Canvas Board */}
              <div className="relative rounded-xl border border-slate-800/80 bg-slate-950 overflow-hidden h-72 cursor-crosshair">
                {/* Blueprint grid background */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                  }}
                />

                <svg
                  className="w-full h-full"
                  onMouseMove={handleMouseMoveCanvas}
                  onMouseUp={handleMouseUpCanvas}
                >
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrow-red" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                    </marker>
                  </defs>

                  {/* Connecting lines between nodes */}
                  <line x1="180" y1="125" x2="240" y2="105" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#arrow)" />
                  <line x1="410" y1="105" x2="480" y2="80" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrow)" />
                  <line x1="325" y1="150" x2="380" y2="200" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#arrow-red)" />
                  <line x1="180" y1="245" x2="250" y2="150" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* Render interactive shapes */}
                  {shapes.map((s) => {
                    const isSel = s.id === selectedShapeId;
                    return (
                      <g
                        key={s.id}
                        transform={`translate(${s.x}, ${s.y})`}
                        onMouseDown={(e) => handleMouseDownShape(s.id, e)}
                        className="cursor-move select-none"
                      >
                        {s.type === 'box' && (
                          <rect
                            width={s.width}
                            height={s.height}
                            rx={8}
                            fill={s.color}
                            fillOpacity="0.18"
                            stroke={isSel ? '#38bdf8' : s.color}
                            strokeWidth={isSel ? 2.5 : 1.5}
                          />
                        )}

                        {s.type === 'cylinder' && (
                          <rect
                            width={s.width}
                            height={s.height}
                            rx={20}
                            fill={s.color}
                            fillOpacity="0.22"
                            stroke={isSel ? '#38bdf8' : s.color}
                            strokeWidth={isSel ? 2.5 : 1.5}
                          />
                        )}

                        {s.type === 'cloud' && (
                          <rect
                            width={s.width}
                            height={s.height}
                            rx={14}
                            fill={s.color}
                            fillOpacity="0.15"
                            stroke={isSel ? '#f87171' : s.color}
                            strokeWidth={isSel ? 2.5 : 1.5}
                            strokeDasharray="4 2"
                          />
                        )}

                        {/* Shape Multiline Text */}
                        {s.label.split('\n').map((line, lIdx) => (
                          <text
                            key={lIdx}
                            x={s.width / 2}
                            y={s.height / 2 - (s.label.split('\n').length - 1) * 8 + lIdx * 16}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill="#f1f5f9"
                            fontSize="11"
                            fontFamily="monospace"
                            fontWeight="500"
                            pointerEvents="none"
                          >
                            {line}
                          </text>
                        ))}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Shape Label Editor Bar if shape selected */}
              {selectedShape && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                  <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-mono text-slate-400 text-[11px]">Edit node:</span>
                  <input
                    type="text"
                    value={selectedShape.label}
                    onChange={(e) => handleUpdateSelectedShapeText(e.target.value)}
                    className="flex-1 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                  <span className="text-[10px] text-slate-500 font-mono">
                    ({Math.round(selectedShape.x)}, {Math.round(selectedShape.y)})
                  </span>
                </div>
              )}
            </div>
          )}

          {/* 2. SOLUTION CODE EDITOR (Human -> Solution) */}
          {(activeTab === 'split' || activeTab === 'code') && (
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-2.5 shadow-lg">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono text-white font-semibold">
                    {lang === 'ru' ? 'Решение Студента (Human → Solution)' : 'Solution Source: consensus_recovery.go'}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {lang === 'ru' ? 'Синхронизировано' : 'Auto-saving'}
                </span>
              </div>

              <div className="relative">
                <textarea
                  value={solutionCode}
                  onChange={handleCodeChange}
                  rows={activeTab === 'code' ? 18 : 11}
                  className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors selection:bg-cyan-500 selection:text-slate-950 resize-y"
                  spellCheck={false}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
                <span>Go 1.22 · Raft Consensus Protocol</span>
                <span>WorkEvents telemetry active</span>
              </div>
            </div>
          )}

          {/* 3. SUGGESTED AI DIFF CARD (Human -> Verify/Edit) */}
          {suggestedDiff && (
            <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/50 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-mono text-indigo-300 font-semibold">
                    {lang === 'ru' ? 'AI Предложение (Human → Verify / Edit)' : 'AI Proposal Ready for Human Verification'}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/20 px-2 py-0.5 rounded">
                  Pending Review
                </span>
              </div>

              <pre className="p-3 rounded-lg bg-slate-950 border border-indigo-900/50 text-[11px] font-mono text-indigo-200 overflow-x-auto">
                {suggestedDiff}
              </pre>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  onClick={() => setSuggestedDiff(null)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white text-xs font-mono"
                >
                  {lang === 'ru' ? 'Отклонить' : 'Dismiss'}
                </button>
                <button
                  onClick={handleApplyVerifiedDiff}
                  className="px-4 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{lang === 'ru' ? 'Проверить и Применить (Verify/Edit)' : 'Verify & Merge Patch'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: AI Copilot & WorkEvents Stream (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* AI COPILOT CHAT (Human -> AI & AI -> Response) */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-3 flex flex-col h-[380px] shadow-lg">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono text-white font-semibold">
                  TWIN AI Copilot
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                Telemetry Synced
              </span>
            </div>

            {/* Conversation Log */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 scrollbar-thin text-xs">
              {aiResponsesList.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-xl border text-left ${
                    msg.role === 'human'
                      ? 'bg-slate-950 border-slate-800 text-slate-300 ml-4'
                      : 'bg-indigo-950/30 border-indigo-800/40 text-indigo-100 mr-4'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                    <span className={msg.role === 'human' ? 'text-cyan-400' : 'text-indigo-400'}>
                      {msg.role === 'human' ? 'Human Prompt' : 'AI Response'}
                    </span>
                    <span>{msg.time}</span>
                  </div>
                  <div className="text-xs leading-relaxed font-sans">{msg.text}</div>
                </div>
              ))}

              {aiStreaming && (
                <div className="p-2.5 rounded-xl bg-indigo-950/20 border border-indigo-800/40 text-indigo-300 text-xs flex items-center gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing consensus invariant check...</span>
                </div>
              )}
            </div>

            {/* Quick Prompt Pills */}
            <div className="flex flex-wrap gap-1 pt-1">
              <button
                  type="button"
                  onClick={() =>
                  handleSendPrompt(
                    'How to prevent split vote loops during asymmetric partition recovery?'
                  )
                }
                className="px-2 py-1 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[10px] text-slate-400 hover:text-cyan-300 font-mono truncate max-w-full"
              >
                Split vote loops?
              </button>
              <button
                  type="button"
                  onClick={() =>
                  handleSendPrompt(
                    'Generate exponential backoff retry loop for follower log sync.'
                  )
                }
                className="px-2 py-1 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[10px] text-slate-400 hover:text-cyan-300 font-mono truncate max-w-full"
              >
                Backoff retry loop
              </button>
            </div>

            {/* Prompt Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendPrompt();
              }}
              className="flex items-center gap-2 pt-2 border-t border-slate-800"
            >
              <input
                type="text"
                placeholder={lang === 'ru' ? 'Human → AI запрос...' : 'Prompt AI Copilot...'}
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 font-sans"
              />
              <button
                type="submit"
                disabled={aiStreaming || !aiPrompt.trim()}
                className="p-2 rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 disabled:opacity-40 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* WORKEVENTS LIVE STREAM (WorkEvents сохраняются) */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-3 shadow-lg">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono text-white font-semibold">
                  {lang === 'ru' ? 'WorkEvents Телеметрия' : 'WorkEvents Telemetry Log'}
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">
                {workEvents.length} recorded
              </span>
            </div>

            {/* Scrollable list of recorded events */}
            <div className="max-h-56 overflow-y-auto space-y-2 pr-1 scrollbar-thin text-xs">
              {workEvents.slice(-6).reverse().map((ev) => (
                <div
                  key={ev.id}
                  className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1 font-mono text-[11px]"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-semibold ${
                        ev.actor === 'HUMAN' ? 'text-cyan-400' : 'text-indigo-400'
                      }`}
                    >
                      {ev.type}
                    </span>
                    <span className="text-slate-500 text-[10px]">{ev.timestamp}</span>
                  </div>
                  <div className="text-slate-300 text-xs font-sans leading-tight">
                    {ev.summary}
                  </div>
                  {ev.diffPercent && (
                    <div className="text-[10px] text-amber-400 font-mono">
                      Human Intervention: {ev.diffPercent}% diff modified
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span className="flex items-center gap-1">
  <Activity className="w-3 h-3 text-emerald-400" />
  Evidence logging: ACTIVE
              </span>
              <span className="text-cyan-400 cursor-pointer hover:underline" onClick={onProceedToSubmit}>
                {lang === 'ru' ? 'К отправке →' : 'Review & Submit →'}
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
