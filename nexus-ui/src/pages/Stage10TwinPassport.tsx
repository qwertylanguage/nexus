import React, { useState } from 'react';
import { TwinPassportData } from '../types';
import { 
  INITIAL_TWIN_PASSPORT, 
  STUDENT_AVATAR 
} from '../mockData';
import { NexusLogo } from '../components/NexusLogo';
import { 
  ShieldCheck, 
  Download, 
  Share2, 
  Check, 
  QrCode, 
  RotateCcw,
  Layers,
  Fingerprint
} from 'lucide-react';

interface Stage10TwinPassportProps {
  passportData?: TwinPassportData;
  onRestartRoadmap: () => void;
  onOpenCanvasView: () => void;
  lang: 'en' | 'ru';
}

export const Stage10TwinPassport: React.FC<Stage10TwinPassportProps> = ({
  passportData = INITIAL_TWIN_PASSPORT,
  onRestartRoadmap,
  onOpenCanvasView,
  lang
}) => {
  const [copied, setCopied] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleCopyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(passportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `nexus_passport_${passportData.passportId}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-left space-y-8 select-none">
      {/* Editorial Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
          {lang === 'ru' ? 'Шаг 10 · TWIN Passport' : 'Step 10 · TWIN Passport'}
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Nexus TWIN Passport
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm">
          {lang === 'ru'
            ? 'Криптографический сертификат компетенций человека и ИИ.'
            : 'Cryptographic proof-of-competence passport.'}
        </p>
      </div>

      {/* Main Grid: Left Holographic 3D Card, Right Verified Competency Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
        
        {/* Holographic Passport Card */}
        <div className="lg:col-span-6 flex justify-center">
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
              transition: 'transform 0.15s ease-out'
            }}
            className="w-full max-w-[380px] rounded-[32px] p-7 bg-gradient-to-b from-[#131722] via-[#0d1017] to-[#07080b] border border-white/[0.15] shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(34,211,238,0.12)] relative overflow-hidden text-white"
          >
            {/* Shimmer gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-purple-500/10 to-transparent pointer-events-none" />

            {/* Top row */}
            <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/[0.1]">
              <NexusLogo size="sm" theme="dark" showWordmark={true} />
              <div className="flex items-center gap-1 text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{passportData.status}</span>
              </div>
            </div>

            {/* Student identity */}
            <div className="relative z-10 pt-5 flex items-center gap-3.5">
              <img
                src={passportData.studentAvatar || STUDENT_AVATAR}
                alt={passportData.studentName}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-white/[0.2] shadow-sm"
              />
              <div>
                <h4 className="text-lg font-bold text-white tracking-tight">
                  {passportData.studentName}
                </h4>
                <div className="text-xs text-slate-400 font-mono">
                  {passportData.studentRole}
                </div>
                <div className="text-[10px] text-cyan-400 font-mono mt-0.5">
                  ID: {passportData.passportId}
                </div>
              </div>
            </div>

            {/* Score & Telemetry Badges */}
            {/* Verification & Telemetry */}
            <div className="relative z-10 my-6 grid grid-cols-2 gap-2 bg-black/40 p-3 rounded-2xl border border-white/[0.08] text-center">
              <div>
                <div className="text-[10px] font-mono text-slate-500">
                  Live Verification
                </div>
                <div className="text-sm font-black text-emerald-400 font-mono mt-1">
                  VERIFIED
                </div>
              </div>

              <div className="border-l border-white/[0.08]">
                <div className="text-[10px] font-mono text-slate-500">
                  Human / AI Telemetry
                </div>
                <div className="text-xs font-bold text-purple-300 font-mono mt-1">
                  {passportData.humanAiRatio.human}% / {passportData.humanAiRatio.ai}%
                </div>
              </div>
            </div>

            {/* Merkle & Hash info */}
            <div className="relative z-10 text-[10px] font-mono text-slate-400 space-y-1 bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.04]">
              <div className="flex justify-between">
                <span>Program:</span>
                <span className="text-white truncate max-w-[180px]">{passportData.internshipTitle}</span>
              </div>
              <div className="flex justify-between">
                <span>Evidence:</span>
                <span className="text-emerald-400">VERIFIED</span>
              </div>

            </div>

            {/* Card Footer with QR */}
            <div className="relative z-10 pt-4 mt-4 border-t border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                <Fingerprint className="w-3.5 h-3.5 text-purple-400" />
                <span>Evidence-backed identity</span>
              </div>
              <QrCode className="w-6 h-6 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Right Column: Skills & Actions */}
        <div className="lg:col-span-6 space-y-5">
          {/* Skills Breakdown Box */}
          <div className="rounded-3xl bg-[#0e1118] border border-white/[0.08] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-sm font-bold text-white">
                {lang === 'ru' ? 'Подтвержденные компетенции' : 'Verified Competencies'}
              </h3>
              <span className="text-[10px] font-mono text-cyan-400 font-bold">5 / 5 Verified</span>
            </div>

            <div className="space-y-3">
              {passportData.skills.map((skill, i) => (
                  <div
                      key={i}
                      className="p-3 rounded-2xl bg-white/[0.025] border border-white/[0.06]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold text-slate-200">
                          {skill.name}
                        </div>

                        <div className="text-[10px] text-slate-500 mt-1">
                          {lang === 'ru'
                              ? 'Практическая задача + Live Verification'
                              : 'Practical task + Live Verification'}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        VERIFIED
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleDownloadJson}
                className="py-3 px-4 rounded-2xl font-bold text-xs bg-white/[0.04] border border-white/[0.1] text-white hover:bg-white/[0.08] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>{lang === 'ru' ? 'Скачать JSON' : 'Export JSON'}</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="py-3 px-4 rounded-2xl font-bold text-xs bg-white/[0.04] border border-white/[0.1] text-white hover:bg-white/[0.08] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-purple-400" />}
                <span>{copied ? (lang === 'ru' ? 'Скопировано!' : 'Copied!') : (lang === 'ru' ? 'Поделиться' : 'Share Link')}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onOpenCanvasView}
                className="py-3 px-4 rounded-2xl font-bold text-xs bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>{lang === 'ru' ? 'Канва Родмапа' : 'Roadmap Canvas'}</span>
              </button>

              <button
                onClick={onRestartRoadmap}
                className="py-3 px-4 rounded-2xl font-bold text-xs bg-purple-500/10 text-purple-300 border border-purple-500/30 hover:bg-purple-500/20 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-purple-400" />
                <span>{lang === 'ru' ? 'Пройти снова' : 'Restart Roadmap'}</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
