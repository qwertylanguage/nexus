import React from 'react';

interface NexusLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero';
  showWordmark?: boolean;
  theme?: 'dark' | 'light' | 'auto';
  className?: string;
  animated?: boolean;
}

export const NexusLogo: React.FC<NexusLogoProps> = ({
  size = 'md',
  showWordmark = true,
  theme = 'dark',
  className = '',
  animated = false
}) => {
  const iconConfig = {
    xs: { w: 20, h: 18, r: 2.8, stroke: 1.2, text: 'text-sm' },
    sm: { w: 26, h: 23, r: 3.5, stroke: 1.5, text: 'text-base' },
    md: { w: 32, h: 29, r: 4.5, stroke: 1.8, text: 'text-xl' },
    lg: { w: 44, h: 40, r: 6, stroke: 2.2, text: 'text-2xl' },
    xl: { w: 64, h: 58, r: 8, stroke: 2.6, text: 'text-3xl' },
    '2xl': { w: 96, h: 86, r: 12, stroke: 3.2, text: 'text-4xl' },
    hero: { w: 220, h: 196, r: 16, stroke: 3.5, text: 'text-5xl' }
  }[size];

  const uniqueId = React.useId().replace(/:/g, '');

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* 3-Node Triangular Emblem with precise gradients from Image 2 */}
      <div className={`relative shrink-0 flex items-center justify-center ${animated ? 'group' : ''}`}>
        <svg
          width={iconConfig.w}
          height={iconConfig.h}
          viewBox="0 0 100 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 overflow-visible transition-transform duration-500 ${
            animated ? 'group-hover:scale-105' : ''
          }`}
        >
          <defs>
            {/* Gradients for the 3 connecting lines */}
            <linearGradient id={`grad-left-${uniqueId}`} x1="50" y1="14" x2="16" y2="76" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>

            <linearGradient id={`grad-right-${uniqueId}`} x1="50" y1="14" x2="84" y2="76" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>

            <linearGradient id={`grad-bottom-${uniqueId}`} x1="16" y1="76" x2="84" y2="76" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>

            {/* Ambient node glow filters */}
            <filter id={`glow-cyan-${uniqueId}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id={`glow-purple-${uniqueId}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id={`glow-blue-${uniqueId}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Connecting gradient edges matching Image 2 */}
          <line
            x1="50"
            y1="14"
            x2="16"
            y2="76"
            stroke={`url(#grad-left-${uniqueId})`}
            strokeWidth="3"
            strokeLinecap="round"
            className="opacity-90"
          />
          <line
            x1="50"
            y1="14"
            x2="84"
            y2="76"
            stroke={`url(#grad-right-${uniqueId})`}
            strokeWidth="3"
            strokeLinecap="round"
            className="opacity-90"
          />
          <line
            x1="16"
            y1="76"
            x2="84"
            y2="76"
            stroke={`url(#grad-bottom-${uniqueId})`}
            strokeWidth="3"
            strokeLinecap="round"
            className="opacity-90"
          />

          {/* Top Node (Cyan / Turquoise) */}
          <g filter={`url(#glow-cyan-${uniqueId})`}>
            <circle cx="50" cy="14" r="9.5" fill="#22d3ee" />
            <circle cx="48" cy="12" r="3" fill="#ffffff" fillOpacity="0.75" />
          </g>

          {/* Bottom Left Node (Lavender / Violet / Purple) */}
          <g filter={`url(#glow-purple-${uniqueId})`}>
            <circle cx="16" cy="76" r="9.5" fill="#c084fc" />
            <circle cx="14" cy="74" r="3" fill="#ffffff" fillOpacity="0.75" />
          </g>

          {/* Bottom Right Node (Electric Cobalt / Blue) */}
          <g filter={`url(#glow-blue-${uniqueId})`}>
            <circle cx="84" cy="76" r="9.5" fill="#60a5fa" />
            <circle cx="82" cy="74" r="3" fill="#ffffff" fillOpacity="0.75" />
          </g>
        </svg>
      </div>

      {/* Wordmark */}
      {showWordmark && (
        <span
          className={`font-black tracking-tight font-sans leading-none ${iconConfig.text} ${
            theme === 'light' ? 'text-slate-900' : 'text-white'
          }`}
        >
          nexus
        </span>
      )}
    </div>
  );
};
