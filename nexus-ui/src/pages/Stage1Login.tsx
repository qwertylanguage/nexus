import React, { useState, useEffect, useRef } from 'react';
import { UserRole } from '../types';
import { NexusLogo } from '../components/NexusLogo';
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  User, 
  Building2 
} from 'lucide-react';

interface Stage1LoginProps {
  onLoginSuccess: (role: UserRole) => void;
  lang: 'en' | 'ru';
}

export const Stage1Login: React.FC<Stage1LoginProps> = ({ onLoginSuccess, lang }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('STUDENT');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Canvas ref for animated ambient particle motion
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Motion particle constellation in the background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate minimalist motion nodes
    const particleCount = 42;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.6 ? '#22d3ee' : Math.random() > 0.3 ? '#c084fc' : '#60a5fa',
      alpha: Math.random() * 0.5 + 0.2
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint connections between close nodes
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.strokeStyle = particles[i].color;
            ctx.globalAlpha = (1 - dist / 140) * 0.15;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleConfirmAccount = (role: UserRole) => {
    setSelectedRole(role);
    setShowGoogleModal(false);
    setIsSigningIn(true);

    setTimeout(() => {
      setIsSigningIn(false);
      onLoginSuccess(role);
    }, 600);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-[#07080b] text-slate-100 flex flex-col justify-between select-none">
      
      {/* Background Interactive Motion Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-60 z-0"
      />

      {/* Ambient Pulsing Neon Glow Spots */}
      <div 
        className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 30}px, ${mousePos.y * 30}px, 0)`
        }}
      />
      <div 
        className="absolute top-1/3 -right-32 w-[550px] h-[550px] rounded-full bg-purple-600/10 blur-[140px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${-mousePos.x * 40}px, ${-mousePos.y * 40}px, 0)`
        }}
      />

      {/* Top Header Logo */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 pt-8 flex items-center justify-between">
        <NexusLogo size="lg" theme="dark" animated />
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md text-[11px] font-mono text-cyan-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Nexus Protocol</span>
          </div>
        </div>
      </div>

      {/* Main Split Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 py-10 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center w-full">
          
          {/* LEFT: Clean, uncluttered, minimalist typography */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
                {lang === 'ru' ? 'Вход через Google' : 'Sign in with Google'}
              </h1>

              <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
                {lang === 'ru'
                  ? 'Nexus использует единый вход через Google для быстрого и безопасного доступа ко всем возможностям платформы.'
                  : 'Nexus uses single sign-on via Google for fast, secure access to all platform capabilities.'}
              </p>
            </div>

            {/* Google Card Button with subtle hover glow */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                type="button"
                onClick={() => setShowGoogleModal(true)}
                disabled={isSigningIn}
                className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.15] hover:border-white/[0.3] shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 text-white font-medium text-sm sm:text-base cursor-pointer disabled:opacity-50"
              >
                {/* Official Google G Logo SVG */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>

                <span className="font-sans font-medium tracking-tight">
                  {isSigningIn
                    ? (lang === 'ru' ? 'Вход...' : 'Connecting...')
                    : (lang === 'ru' ? 'Войти через Google' : 'Sign in with Google')}
                </span>

                {isSigningIn && (
                  <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin ml-1" />
                )}
              </button>

              {/* Fast Direct Enter shortcut */}
              <button
                onClick={() => handleConfirmAccount(selectedRole)}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold py-2 px-3 rounded-lg hover:bg-white/[0.04] transition-colors cursor-pointer"
              >
                <span>{lang === 'ru' ? 'Быстрый вход →' : 'Quick Fast-Track →'}</span>
              </button>
            </div>

            {/* Minimal Role Shortcut Bar */}
            <div className="pt-4 border-t border-white/[0.06]">
              <div className="text-[11px] font-mono text-slate-500 mb-2.5">
                {lang === 'ru' ? 'Профиль для быстрого доступа:' : 'Quick profile selection:'}
              </div>

              <div className="grid grid-cols-2 gap-3 max-w-sm">
                <button
                  type="button"
                  onClick={() => setSelectedRole('STUDENT')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedRole === 'STUDENT'
                      ? 'bg-cyan-500/10 border-cyan-500/60 text-white shadow-sm ring-1 ring-cyan-500/30'
                      : 'bg-white/[0.02] border-white/[0.08] text-slate-400 hover:border-white/[0.16]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <User className={`w-3.5 h-3.5 ${selectedRole === 'STUDENT' ? 'text-cyan-400' : 'text-slate-500'}`} />
                    {selectedRole === 'STUDENT' && <Check className="w-3 h-3 text-cyan-400" />}
                  </div>
                  <div className="text-xs font-bold text-white">
                    {lang === 'ru' ? 'Студент' : 'Student'}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    Alex Chen
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('COMPANY')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedRole === 'COMPANY'
                      ? 'bg-purple-500/10 border-purple-500/60 text-white shadow-sm ring-1 ring-purple-500/30'
                      : 'bg-white/[0.02] border-white/[0.08] text-slate-400 hover:border-white/[0.16]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Building2 className={`w-3.5 h-3.5 ${selectedRole === 'COMPANY' ? 'text-purple-400' : 'text-slate-500'}`} />
                    {selectedRole === 'COMPANY' && <Check className="w-3 h-3 text-purple-400" />}
                  </div>
                  <div className="text-xs font-bold text-white">
                    {lang === 'ru' ? 'Компания' : 'Company'}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    Apex Labs
                  </div>
                </button>
              </div>
            </div>

            {/* Minimal trust indicator */}
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === 'ru' ? 'Защищённый протокол верификации' : 'Tamper-proof verified protocol'}</span>
            </div>
          </div>

          {/* RIGHT: High-tech Minimalist Motion Emblem Card matching Image 2 */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div
              style={{
                transform: `perspective(1000px) rotateX(${mousePos.y * -6}deg) rotateY(${mousePos.x * 7}deg)`,
                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="w-full max-w-[420px] aspect-square rounded-[36px] border border-white/[0.1] p-6 sm:p-8 bg-[#0c0e14]/90 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.8),0_0_50px_rgba(192,132,252,0.12)] relative overflow-hidden flex flex-col items-center justify-center group"
            >
              {/* Radial gradient backing */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
                style={{
                  background: `radial-gradient(circle at ${50 + mousePos.x * 20}% ${50 + mousePos.y * 20}%, rgba(34, 211, 238, 0.2) 0%, rgba(192, 132, 252, 0.15) 40%, transparent 70%)`
                }}
              />

              {/* Orbital Rings with motion rotation */}
              <div className="absolute inset-8 rounded-full border border-white/[0.04] animate-spin [animation-duration:40s] pointer-events-none" />
              <div className="absolute inset-16 rounded-full border border-dashed border-white/[0.05] animate-spin [animation-duration:25s] [animation-direction:reverse] pointer-events-none" />

              {/* The exact glowing triad emblem from Image 2 */}
              <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
                <NexusLogo size="hero" showWordmark={false} theme="dark" animated />

                <div className="text-slate-400 font-black text-2xl tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                  nexus
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-[10px] font-mono text-cyan-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  Live Reactive Mesh
                </div>
              </div>

              {/* Corner accent glow lines */}
              <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-[36px] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-purple-500/30 rounded-br-[36px] pointer-events-none" />
            </div>
          </div>

        </div>
      </div>

      {/* Minimal Footer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 pb-6 flex items-center justify-between text-xs font-mono text-slate-500">
        <div>© 2026 Nexus Systems</div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Human + AI Telemetry</span>
          <span>·</span>
          <span>10 Stages</span>
        </div>
      </div>

      {/* Google Account Selector Modal (Realistic Google SSO Simulation) */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl bg-[#0f121a] border border-white/[0.12] shadow-[0_25px_60px_rgba(0,0,0,0.8)] p-6 space-y-4 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span className="font-semibold text-xs text-slate-200">
                  {lang === 'ru' ? 'Вход с аккаунтом Google' : 'Sign in with Google'}
                </span>
              </div>
              <button
                onClick={() => setShowGoogleModal(false)}
                className="text-slate-400 hover:text-white text-sm p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-slate-400">
              {lang === 'ru'
                ? 'Выберите профиль для входа в Nexus:'
                : 'Select an account to access Nexus:'}
            </div>

            {/* Account List */}
            <div className="space-y-2">
              <button
                onClick={() => handleConfirmAccount('STUDENT')}
                className="w-full p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-400/60 hover:bg-cyan-500/10 text-left flex items-center gap-3 transition-all cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-full bg-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0">
                  AC
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300">
                    Alex Chen (Student)
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    alex.chen@polytech.edu
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Student
                </span>
              </button>

              <button
                onClick={() => handleConfirmAccount('COMPANY')}
                className="w-full p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-purple-400/60 hover:bg-purple-500/10 text-left flex items-center gap-3 transition-all cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-full bg-purple-500 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  AP
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white group-hover:text-purple-300">
                    Apex Distributed Labs
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    recruiter@apexdlabs.io
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Company
                </span>
              </button>
            </div>

            <div className="pt-2 text-[10px] text-slate-500 text-center font-mono">
              Nexus Authentication System
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
