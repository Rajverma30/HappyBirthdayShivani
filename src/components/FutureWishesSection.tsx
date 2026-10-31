import React from 'react';
import { Sparkles } from 'lucide-react';

export const FutureWishesSection: React.FC = () => {
  return (
    <section className="section-container future-wishes-section" id="future-wishes">
      {/* Header */}
      <div className="section-header">
        <div className="section-pill bg-purple-50 text-purple-700 border-purple-200">
          <Sparkles className="w-4 h-4 text-purple-500 animate-spin-slow" />
          <span>Manifesting Greatness ✨</span>
        </div>
        <h2 className="section-title">
          Big Dreams, Bigger Success! 🌸
        </h2>
        <p className="section-subtitle">
          An honest, heartfelt prayer for everything the future holds for you.
        </p>
      </div>

      <div className="future-card-wrapper glass-panel">
        {/* Animated Horizon Illustration */}
        <div className="future-illustration-stage">
          <svg viewBox="0 0 600 200" className="w-full h-auto" fill="none">
            {/* Sunrise / Glowing Horizon */}
            <defs>
              <linearGradient id="horizonGlow" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#FFF0F5" />
                <stop offset="40%" stopColor="#F8BBD0" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#EDE7F6" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="pathGradient" x1="50%" y1="100%" x2="50%" y2="0%">
                <stop offset="0%" stopColor="#FF80AB" />
                <stop offset="100%" stopColor="#FFD54F" />
              </linearGradient>
            </defs>

            {/* Glowing Backdrop */}
            <rect x="0" y="0" width="600" height="200" fill="url(#horizonGlow)" rx="16" />

            {/* Glowing Sun on Horizon */}
            <circle cx="300" cy="110" r="45" fill="#FFE082" opacity="0.6" />
            <circle cx="300" cy="110" r="28" fill="#FFF8E1" />

            {/* Pathway to Success */}
            <path d="M220 200 L285 110 L315 110 L380 200 Z" fill="url(#pathGradient)" opacity="0.35" />
            <line x1="300" y1="200" x2="300" y2="110" stroke="#FFF" strokeWidth="2" strokeDasharray="6 4" />

            {/* Stars & Floating Sparkles */}
            {[
              { x: 120, y: 50, s: "✨" },
              { x: 480, y: 45, s: "⭐" },
              { x: 200, y: 40, s: "🌸" },
              { x: 400, y: 60, s: "💫" },
              { x: 80, y: 120, s: "🌟" },
              { x: 520, y: 125, s: "✨" },
            ].map((star, idx) => (
              <text key={idx} x={star.x} y={star.y} fontSize="16" className="animate-pulse">
                {star.s}
              </text>
            ))}

            {/* Girl Figure Character walking towards horizon */}
            <g transform="translate(265, 80)">
              <circle cx="35" cy="20" r="8" fill="#4A2E18" />
              {/* Ponytail */}
              <path d="M42 18 Q52 14 48 25" stroke="#4A2E18" strokeWidth="3" fill="none" />
              {/* Pink Gym Outfit */}
              <path d="M30 30 L40 30 L42 55 L28 55 Z" fill="#FF4081" />
              {/* Backpack / Gym bag */}
              <rect x="24" y="32" width="7" height="12" rx="3" fill="#E91E63" />
              {/* Legs walking forward */}
              <line x1="32" y1="55" x2="30" y2="70" stroke="#FCD0B4" strokeWidth="3" strokeLinecap="round" />
              <line x1="38" y1="55" x2="42" y2="68" stroke="#FCD0B4" strokeWidth="3" strokeLinecap="round" />
            </g>
          </svg>
        </div>

        {/* Heartfelt Wish Content */}
        <div className="future-wish-content">
          <p className="future-wish-paragraph">
            "I genuinely hope you achieve everything you've ever dreamed of. May you become more successful, keep growing, explore new places, experience amazing things and reach heights you haven't even imagined yet."
          </p>

          <p className="future-wish-paragraph">
            "I hope life gives you countless reasons to smile and be proud of yourself."
          </p>

          <div className="future-special-request-box">
            <span className="request-tag">Bas Ek Chhoti Si Request Hai, Madam Ji... 😂</span>
            <p className="request-body">
              "Keep growing, keep achieving everything you dream of, and make the most of every opportunity life brings your way. Bas itna yaad rakhna, distance chahe jitna ho jaaye, kuch bonds aur unki bakchodi hamesha special rehti hain. ❤️"
            </p>
            <p className="request-sub">
              "Because some people are not meant to be forgotten, even when life takes them to different places. ❤️"
            </p>
          </div>

          {/* Highlighted Banner */}
          <div className="future-highlight-banner">
            <Sparkles className="w-5 h-5 text-yellow-300 shrink-0" />
            <h3 className="highlight-banner-text">
              DREAM BIG. ACHIEVE BIGGER. BUT DON'T FORGET RAJ! 🏋️‍♂️
            </h3>
            <Sparkles className="w-5 h-5 text-yellow-300 shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
};
