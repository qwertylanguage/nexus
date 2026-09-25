import React, { useState, useEffect } from 'react';
import { 
  Download, 
  FolderArchive, 
  X, 
  Terminal, 
  Database, 
  Check, 
  Copy, 
  Server, 
  FileJson, 
  ExternalLink,
  Cpu
} from 'lucide-react';
import { ApiService } from '../services/api';

interface SourceCodeZipModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'ru';
}

export const SourceCodeZipModal: React.FC<SourceCodeZipModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<'checking' | 'connected' | 'mock'>('checking');
  const [activeTab, setActiveTab] = useState<'quickstart' | 'datafiles' | 'endpoints'>('quickstart');

  useEffect(() => {
    if (!isOpen) return;
    fetch('/api/health')
      .then((res) => {
        if (res.ok) setServerStatus('connected');
        else setServerStatus('mock');
      })
      .catch(() => setServerStatus('mock'));
  }, [isOpen]);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const quickCommands = `git clone <repo> # или распакуйте nexus-platform-source.zip
cd nexus-platform
npm install
npm run dev`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-3xl rounded-3xl bg-[#0d1017] border border-white/[0.12] shadow-2xl overflow-hidden text-white flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-white/[0.08] flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <FolderArchive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
                <span>{lang === 'ru' ? 'Исходный код платформы (ZIP)' : 'Platform Source Code (.zip)'}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  Full-Stack Ready
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'ru' 
                  ? 'Фронтенд + Бэкенд на Express + Файловое хранилище данных (/data/*.json)'
                  : 'Frontend + Express Backend + Persistent JSON files storage (/data/*.json)'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Direct Download Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-purple-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                <Download className="w-4 h-4 text-cyan-400" />
                <span>{lang === 'ru' ? 'Архив со всеми файлами проекта' : 'Complete Project Archive'}</span>
              </div>
              <p className="text-xs text-slate-300">
                {lang === 'ru'
                  ? 'Содержит полный React + Vite фронтенд, server.ts с API, папки data/ и все ассеты.'
                  : 'Contains complete React + Vite UI, Express server.ts, data/ directory, and scripts.'}
              </p>
            </div>

            <a
              href="/nexus-platform-source.zip"
              download="nexus-platform-source.zip"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-95 text-slate-950 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{lang === 'ru' ? 'Скачать .ZIP (3 MB)' : 'Download .ZIP (3 MB)'}</span>
            </a>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/[0.08] gap-4 text-xs font-mono">
            <button
              onClick={() => setActiveTab('quickstart')}
              className={`pb-2.5 border-b-2 font-medium transition-colors cursor-pointer ${
                activeTab === 'quickstart'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {lang === 'ru' ? '1. Запуск проекта' : '1. Quickstart'}
            </button>
            <button
              onClick={() => setActiveTab('datafiles')}
              className={`pb-2.5 border-b-2 font-medium transition-colors cursor-pointer ${
                activeTab === 'datafiles'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {lang === 'ru' ? '2. Файлы данных (/data)' : '2. Data Files (/data)'}
            </button>
            <button
              onClick={() => setActiveTab('endpoints')}
              className={`pb-2.5 border-b-2 font-medium transition-colors cursor-pointer ${
                activeTab === 'endpoints'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {lang === 'ru' ? '3. REST API Эндпоинты' : '3. REST Endpoints'}
            </button>
          </div>

          {/* Tab 1: Quickstart */}
          {activeTab === 'quickstart' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  {lang === 'ru' ? 'Команды для терминала' : 'Terminal Commands'}
                </span>
                <div className="relative group">
                  <pre className="p-4 rounded-2xl bg-black/80 border border-white/[0.08] text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                    {quickCommands}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(quickCommands, 'cmd')}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-slate-300 transition-colors cursor-pointer"
                    title="Copy command"
                  >
                    {copiedCmd === 'cmd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <Server className="w-4 h-4 text-purple-400" />
                    <span>{lang === 'ru' ? 'Бэкенд (server.ts)' : 'Backend (server.ts)'}</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    {lang === 'ru'
                      ? 'Express сервер на порту 3000. Автоматически отдаёт статику Vite и обрабатывает запросы /api/* с записью в папку data/.'
                      : 'Express server on port 3000. Handles Vite middleware and /api/* routes reading/writing to /data/ folder.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    <span>{lang === 'ru' ? 'Фронтенд (src/)' : 'Frontend (src/)'}</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    {lang === 'ru'
                      ? '10 шагов интерактивного роадмапа, SVG канва, интерактивная защита, выгрузка и валидация паспортов.'
                      : '10-stage interactive roadmap, SVG topology canvas, oral defense AI dialogue, and cryptographic credentials.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Data Files */}
          {activeTab === 'datafiles' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                {lang === 'ru'
                  ? 'Все данные хранятся в формате JSON в директории /data. Бэкенд читает и обновляет эти файлы в реальном времени:'
                  : 'All persistent data is stored as human-readable JSON files in the /data directory:'}
              </p>

              <div className="space-y-2">
                {[
                  {
                    file: 'data/internships.json',
                    descRu: 'Каталог стажировок компаний (Apex, Synthetix, NeuralFrame)',
                    descEn: 'Company internship programs and requirements',
                    badge: 'GET / POST /api/internships'
                  },
                  {
                    file: 'data/tasks.json',
                    descRu: 'Задачи для кандидатов, рубрики оценивания и навыки',
                    descEn: 'Internship tasks, rubric weights and skills tested',
                    badge: 'GET / POST /api/tasks'
                  },
                  {
                    file: 'data/workEvents.json',
                    descRu: 'Телеметрия действий студента и ИИ (хэши, канва, коммиты)',
                    descEn: 'Human/AI telemetry work session log and hashes',
                    badge: 'GET / POST /api/work-events'
                  },
                  {
                    file: 'data/passports.json',
                    descRu: 'Выпущенные криптографические паспорта Nexus Passport',
                    descEn: 'Issued verifiable TWIN passports and Merkle roots',
                    badge: 'GET / POST /api/passports'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <FileJson className="w-4 h-4 text-cyan-400 shrink-0" />
                      <div>
                        <span className="font-mono font-bold text-white">{item.file}</span>
                        <div className="text-[11px] text-slate-400">
                          {lang === 'ru' ? item.descRu : item.descEn}
                        </div>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-lg border border-purple-500/20 shrink-0">
                      {item.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Endpoints */}
          {activeTab === 'endpoints' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono pb-1">
                <span className="text-slate-400">REST API Server</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Express 4.21 Active
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                {[
                  { method: 'GET', path: '/api/health', desc: 'Server health and storage status' },
                  { method: 'GET', path: '/api/internships', desc: 'Read all internships from data/internships.json' },
                  { method: 'POST', path: '/api/internships', desc: 'Append new internship to data/internships.json' },
                  { method: 'GET', path: '/api/tasks', desc: 'Read tasks from data/tasks.json' },
                  { method: 'POST', path: '/api/tasks', desc: 'Save task to data/tasks.json' },
                  { method: 'GET', path: '/api/work-events', desc: 'Fetch telemetry stream from data/workEvents.json' },
                  { method: 'POST', path: '/api/work-events', desc: 'Record new work event to file' },
                  { method: 'GET', path: '/api/passports', desc: 'Read passports from data/passports.json' },
                  { method: 'POST', path: '/api/passports', desc: 'Mint new passport and append to data/passports.json' },
                  { method: 'GET', path: '/api/download-zip', desc: 'Download full project source code as zip' }
                ].map((ep, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-black/60 border border-white/[0.06] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        ep.method === 'GET' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {ep.method}
                      </span>
                      <span className="text-slate-200">{ep.path}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 hidden sm:inline">{ep.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/[0.08] bg-black/40 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>Storage: JSON files in <code className="text-cyan-300">/data</code></span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors cursor-pointer"
            >
              {lang === 'ru' ? 'Закрыть' : 'Close'}
            </button>
            <a
              href="/nexus-platform-source.zip"
              download="nexus-platform-source.zip"
              className="px-4 py-2 rounded-xl font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === 'ru' ? 'Скачать .zip' : 'Download .zip'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
