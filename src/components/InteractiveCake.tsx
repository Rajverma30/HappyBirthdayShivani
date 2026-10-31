import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Flame, Scissors, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';

interface CakeProps {
  onCelebrate?: () => void;
}

export const InteractiveCake: React.FC<CakeProps> = ({ onCelebrate }) => {
  // States: 'candles_lit' | 'candles_blown' | 'cutting' | 'cake_cut'
  const [step, setStep] = useState<'candles_lit' | 'candles_blown' | 'cutting' | 'cake_cut'>('candles_lit');
  const [sliceProgress, setSliceProgress] = useState(0); // 0 to 100
  const [isDraggingKnife, setIsDraggingKnife] = useState(false);
  const [knifePos, setKnifePos] = useState<{ x: number; y: number } | null>(null);
  const [hasCutAudioPlayed, setHasCutAudioPlayed] = useState(false);

  const cakeContainerRef = useRef<HTMLDivElement>(null);

  // Trigger celebration confetti
  const triggerConfetti = () => {
    sound.playConfettiPop();
    const colors = ['#FF69B4', '#FFB6C1', '#FFC0CB', '#FFD700', '#FF80AB', '#FFF'];

    // Cannon 1 left
    confetti({
      particleCount: 70,
      angle: 60,
      spread: 65,
      origin: { x: 0.1, y: 0.7 },
      colors,
    });

    // Cannon 2 right
    confetti({
      particleCount: 70,
      angle: 120,
      spread: 65,
      origin: { x: 0.9, y: 0.7 },
      colors,
    });

    // Center burst
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.6 },
        colors,
      });
    }, 250);
  };

  // Step 1: Blow candles
  const handleBlowCandles = () => {
    sound.playBlowSound();
    setStep('candles_blown');

    // After brief pause, invite to cut
    setTimeout(() => {
      setStep('cutting');
    }, 1500);
  };

  // Step 2: Handle cake cutting drag
  const handlePointerDown = (e: React.PointerEvent) => {
    if (step !== 'cutting') return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDraggingKnife(true);
    updateKnifeAndCut(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingKnife || step !== 'cutting') return;
    updateKnifeAndCut(e.clientX, e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingKnife) return;
    setIsDraggingKnife(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture lost
    }

    // If sliced over 70%, complete the cut!
    if (sliceProgress >= 70) {
      completeCut();
    }
  };

  const updateKnifeAndCut = (clientX: number, clientY: number) => {
    if (!cakeContainerRef.current) return;
    const rect = cakeContainerRef.current.getBoundingClientRect();

    const relativeX = clientX - rect.left;
    const relativeY = clientY - rect.top;

    setKnifePos({ x: relativeX, y: relativeY });

    // The cake area is approximately between y=90 and y=260 in relative coordinates
    const topY = rect.height * 0.28;
    const botY = rect.height * 0.82;
    const progress = Math.max(0, Math.min(100, ((relativeY - topY) / (botY - topY)) * 100));

    // Play slicing sound on first stroke
    if (progress > 25 && !hasCutAudioPlayed) {
      sound.playCutSound();
      setHasCutAudioPlayed(true);
    }

    setSliceProgress(progress);

    if (progress >= 95) {
      completeCut();
    }
  };

  const completeCut = () => {
    setSliceProgress(100);
    setStep('cake_cut');
    setIsDraggingKnife(false);
    triggerConfetti();
    if (onCelebrate) onCelebrate();
  };

  // Reset cake to try again
  const handleReset = () => {
    setStep('candles_lit');
    setSliceProgress(0);
    setHasCutAudioPlayed(false);
    setKnifePos(null);
  };

  return (
    <div className="interactive-cake-wrapper">
      {/* Status Banner */}
      <div className="cake-instruction-box">
        {step === 'candles_lit' && (
          <div className="animate-pulse-subtle">
            <h3 className="cake-step-title">
              MAKE A WISH, BIRTHDAY GIRL! ✨
            </h3>
            <p className="cake-step-subtitle">
              Close your eyes, make the craziest wish (and maybe wish for better jokes 😜), then tap below!
            </p>
            <button
              onClick={handleBlowCandles}
              className="cake-action-btn blow-btn"
              id="blow-candles-btn"
            >
              <Flame className="w-5 h-5 inline-block mr-2 text-yellow-300 animate-bounce" />
              TAP TO BLOW THE CANDLES 🕯️
            </button>
          </div>
        )}

        {step === 'candles_blown' && (
          <div className="smoke-reveal">
            <h3 className="cake-step-title text-pink-600">
              💨 Wish made! Smoke rising... ✨
            </h3>
            <p className="cake-step-subtitle">
              Good! Now let's get to the most important part... 🎂
            </p>
          </div>
        )}

        {step === 'cutting' && (
          <div>
            <h3 className="cake-step-title">
              NOW CUT YOUR CAKE! 🔪🎀
            </h3>
            <p className="cake-step-subtitle">
              {isDraggingKnife
                ? `Cutting through the strawberry cream... ${Math.round(sliceProgress)}%`
                : 'Grab the pink knife or drag across the cake from top to bottom!'}
            </p>
            <div className="flex justify-center gap-3 mt-2">
              <button
                onClick={completeCut}
                className="cake-action-btn slice-now-btn"
                id="slice-cake-direct-btn"
              >
                <Scissors className="w-4 h-4 inline-block mr-1" />
                Tap to Slice Directly ✨
              </button>
            </div>
          </div>
        )}

        {step === 'cake_cut' && (
          <div className="celebration-headline">
            <h2 className="cake-celebration-title">
              YAYYYY! YOU DID IT, SHIVANI! 🎂🎉
            </h2>
            <p className="cake-celebration-subtitle">
              "Ab cake toh cut ho gaya... treat kab de rahi ho? 😂"
            </p>
            <p className="cake-celebration-quote">
              "One cake, a thousand wishes, and one special bond I hope never gets old. 💗"
            </p>
            <button
              onClick={handleReset}
              className="cake-reset-btn"
            >
              <RotateCcw className="w-4 h-4 inline-block mr-1" />
              Cut Again 🍰
            </button>
          </div>
        )}
      </div>

      {/* Interactive Cake Display Stage */}
      <div
        ref={cakeContainerRef}
        className={`cake-stage-container ${isDraggingKnife ? 'is-cutting' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <svg
          viewBox="0 0 400 360"
          className="cake-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Cake Stand Gradient */}
            <linearGradient id="standGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFDF9" />
              <stop offset="50%" stopColor="#F8BBD0" />
              <stop offset="100%" stopColor="#F48FB1" />
            </linearGradient>

            {/* Cake Frosting Gradient */}
            <linearGradient id="pinkFrosting" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFC1E3" />
              <stop offset="50%" stopColor="#FFB6C1" />
              <stop offset="100%" stopColor="#FFA4B8" />
            </linearGradient>

            {/* Inner Cake Sponge & Jam */}
            <linearGradient id="innerSponge" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFE0B2" />
              <stop offset="45%" stopColor="#FFE0B2" />
              <stop offset="50%" stopColor="#D81B60" /> {/* Strawberry Jam */}
              <stop offset="55%" stopColor="#FFF" />    {/* Cream */}
              <stop offset="100%" stopColor="#FFE0B2" />
            </linearGradient>

            {/* Flame Glow */}
            <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF" />
              <stop offset="40%" stopColor="#FFD54F" />
              <stop offset="80%" stopColor="#FF7043" />
              <stop offset="100%" stopColor="#FF7043" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Sparkles around cake */}
          <g className="cake-ambient-sparkles" opacity={step === 'cake_cut' ? 1 : 0.6}>
            <circle cx="60" cy="90" r="3" fill="#FFD700" className="sparkle-dot-1" />
            <circle cx="340" cy="110" r="2.5" fill="#FF80AB" className="sparkle-dot-2" />
            <circle cx="80" cy="220" r="2" fill="#FFD700" className="sparkle-dot-3" />
            <circle cx="320" cy="230" r="3" fill="#FF4081" className="sparkle-dot-1" />
          </g>

          {/* Cake Stand */}
          <g id="cake-stand">
            <ellipse cx="200" cy="320" rx="140" ry="24" fill="url(#standGrad)" stroke="#F06292" strokeWidth="2.5" />
            <path d="M175 320 L185 348 L215 348 L225 320 Z" fill="url(#standGrad)" stroke="#F06292" strokeWidth="2" />
            <ellipse cx="200" cy="348" rx="65" ry="10" fill="#F48FB1" />
            {/* Stand Pearl Lace Rim */}
            {[75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325].map((x, idx) => (
              <circle key={idx} cx={x} cy={323 + Math.sin(idx * 0.6) * 4} r="3.5" fill="#FFF" />
            ))}
          </g>

          {/* CAKE BODY (Splits into Left & Right Halves when cut!) */}
          <g id="cake-body">
            {/* LEFT HALF */}
            <g
              id="cake-left-half"
              style={{
                transform: step === 'cake_cut' ? 'translateX(-24px) rotate(-1.5deg)' : 'translateX(0)',
                transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transformOrigin: '100px 240px',
              }}
            >
              {/* Bottom Tier Left */}
              <path
                d="M80 230 C80 205, 140 200, 200 200 L200 290 C140 290, 80 280, 80 255 Z"
                fill="url(#pinkFrosting)"
                stroke="#FF80AB"
                strokeWidth="1.5"
              />
              {/* Top Tier Left */}
              <path
                d="M110 160 C110 140, 150 135, 200 135 L200 215 C150 215, 110 205, 110 185 Z"
                fill="#FFCCE1"
                stroke="#FF80AB"
                strokeWidth="1.5"
              />
              {/* Decorative frosting drips Left */}
              <path
                d="M110 165 Q125 185 140 165 Q155 180 170 165 Q185 185 200 165"
                stroke="#FFF"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M80 235 Q100 255 120 235 Q140 255 160 235 Q180 255 200 235"
                stroke="#FFF"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
              />

              {/* Strawberries on Left */}
              <g transform="translate(130, 140)">
                <path d="M0 0 C-6 -8, -12 2, 0 14 C12 2, 6 -8, 0 0 Z" fill="#E91E63" />
                <path d="M-3 -4 L0 -7 L3 -4" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" />
                <circle cx="-2" cy="3" r="0.8" fill="#FFF" />
                <circle cx="2" cy="7" r="0.8" fill="#FFF" />
              </g>
              <g transform="translate(170, 142)">
                <path d="M0 0 C-6 -8, -12 2, 0 14 C12 2, 6 -8, 0 0 Z" fill="#E91E63" />
                <path d="M-3 -4 L0 -7 L3 -4" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" />
              </g>

              {/* Candle 1 (Left) */}
              <rect x="145" y="90" width="8" height="48" rx="2" fill="#FFF" stroke="#FF80AB" strokeWidth="1" />
              {/* Candle stripes */}
              <line x1="145" y1="102" x2="153" y2="108" stroke="#FF4081" strokeWidth="2.5" />
              <line x1="145" y1="116" x2="153" y2="122" stroke="#FF4081" strokeWidth="2.5" />
              <line x1="149" y1="90" x2="149" y2="82" stroke="#333" strokeWidth="1.5" />

              {/* Inner Cut Surface Left (visible when cut) */}
              {step === 'cake_cut' && (
                <rect x="195" y="135" width="5" height="155" fill="url(#innerSponge)" />
              )}
            </g>

            {/* RIGHT HALF */}
            <g
              id="cake-right-half"
              style={{
                transform: step === 'cake_cut' ? 'translateX(24px) rotate(1.5deg)' : 'translateX(0)',
                transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transformOrigin: '300px 240px',
              }}
            >
              {/* Bottom Tier Right */}
              <path
                d="M200 200 C260 200, 320 205, 320 230 L320 255 C320 280, 260 290, 200 290 Z"
                fill="url(#pinkFrosting)"
                stroke="#FF80AB"
                strokeWidth="1.5"
              />
              {/* Top Tier Right */}
              <path
                d="M200 135 C250 135, 290 140, 290 160 L290 185 C290 205, 250 215, 200 215 Z"
                fill="#FFCCE1"
                stroke="#FF80AB"
                strokeWidth="1.5"
              />
              {/* Decorative frosting drips Right */}
              <path
                d="M200 165 Q215 185 230 165 Q245 180 260 165 Q275 185 290 165"
                stroke="#FFF"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M200 235 Q220 255 240 235 Q260 255 280 235 Q300 255 320 235"
                stroke="#FFF"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
              />

              {/* Strawberries on Right */}
              <g transform="translate(230, 142)">
                <path d="M0 0 C-6 -8, -12 2, 0 14 C12 2, 6 -8, 0 0 Z" fill="#E91E63" />
                <path d="M-3 -4 L0 -7 L3 -4" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" />
              </g>
              <g transform="translate(270, 140)">
                <path d="M0 0 C-6 -8, -12 2, 0 14 C12 2, 6 -8, 0 0 Z" fill="#E91E63" />
                <path d="M-3 -4 L0 -7 L3 -4" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" />
              </g>

              {/* Candle 2 (Center-Right) & Candle 3 (Right) */}
              <rect x="196" y="86" width="8" height="52" rx="2" fill="#FFF" stroke="#FF80AB" strokeWidth="1" />
              <line x1="196" y1="100" x2="204" y2="106" stroke="#FF4081" strokeWidth="2.5" />
              <line x1="196" y1="114" x2="204" y2="120" stroke="#FF4081" strokeWidth="2.5" />
              <line x1="200" y1="86" x2="200" y2="78" stroke="#333" strokeWidth="1.5" />

              <rect x="245" y="90" width="8" height="48" rx="2" fill="#FFF" stroke="#FF80AB" strokeWidth="1" />
              <line x1="245" y1="102" x2="253" y2="108" stroke="#FF4081" strokeWidth="2.5" />
              <line x1="245" y1="116" x2="253" y2="122" stroke="#FF4081" strokeWidth="2.5" />
              <line x1="249" y1="90" x2="249" y2="82" stroke="#333" strokeWidth="1.5" />

              {/* Inner Cut Surface Right (visible when cut) */}
              {step === 'cake_cut' && (
                <rect x="200" y="135" width="5" height="155" fill="url(#innerSponge)" />
              )}
            </g>
          </g>

          {/* CANDLE FLAMES & SMOKE */}
          {/* Candle 1 Flame */}
          {step === 'candles_lit' && (
            <g className="flame-flicker-1">
              <ellipse cx="149" cy="74" rx="7" ry="12" fill="url(#flameGlow)" />
              <ellipse cx="149" cy="75" rx="3.5" ry="6" fill="#FFFDE7" />
            </g>
          )}

          {/* Candle 2 Flame */}
          {step === 'candles_lit' && (
            <g className="flame-flicker-2">
              <ellipse cx="200" cy="70" rx="7.5" ry="13" fill="url(#flameGlow)" />
              <ellipse cx="200" cy="71" rx="4" ry="7" fill="#FFFDE7" />
            </g>
          )}

          {/* Candle 3 Flame */}
          {step === 'candles_lit' && (
            <g className="flame-flicker-3">
              <ellipse cx="249" cy="74" rx="7" ry="12" fill="url(#flameGlow)" />
              <ellipse cx="249" cy="75" rx="3.5" ry="6" fill="#FFFDE7" />
            </g>
          )}

          {/* CANDLE SMOKE WISPS (when blown out) */}
          {(step === 'candles_blown' || step === 'cutting' || step === 'cake_cut') && (
            <g className="smoke-wisps" opacity="0.75">
              <path d="M149 80 Q145 68 152 58 Q146 48 155 36" stroke="#B0BEC5" strokeWidth="2" fill="none" strokeLinecap="round" className="smoke-path-1" />
              <path d="M200 76 Q195 62 205 50 Q198 38 208 24" stroke="#B0BEC5" strokeWidth="2.5" fill="none" strokeLinecap="round" className="smoke-path-2" />
              <path d="M249 80 Q253 68 246 56 Q252 44 245 32" stroke="#B0BEC5" strokeWidth="2" fill="none" strokeLinecap="round" className="smoke-path-3" />
            </g>
          )}

          {/* CUTTING GUIDE LINE (Dashed pink laser line in cutting mode) */}
          {step === 'cutting' && (
            <g>
              <line
                x1="200"
                y1="100"
                x2="200"
                y2="295"
                stroke="#E91E63"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                opacity="0.8"
                className="animate-pulse"
              />
              {/* Progress cut line */}
              <line
                x1="200"
                y1="100"
                x2="200"
                y2={100 + (sliceProgress / 100) * 195}
                stroke="#D81B60"
                strokeWidth="4"
              />
            </g>
          )}

          {/* Crumbs & Frosting Sprinkles when cut */}
          {step === 'cake_cut' && (
            <g className="falling-crumbs">
              <circle cx="190" cy="300" r="2.5" fill="#FFE0B2" />
              <circle cx="210" cy="302" r="2" fill="#D81B60" />
              <circle cx="185" cy="312" r="1.5" fill="#FFF" />
              <circle cx="218" cy="308" r="2.2" fill="#FFE0B2" />
              <circle cx="200" cy="315" r="3" fill="#FF80AB" />
            </g>
          )}
        </svg>

        {/* KNIFE ELEMENT (Draggable or Floating) */}
        {step === 'cutting' && (
          <div
            className={`cake-knife-cursor ${isDraggingKnife ? 'is-dragging' : 'knife-float-prompt'}`}
            style={{
              position: 'absolute',
              left: knifePos ? `${knifePos.x}px` : '50%',
              top: knifePos ? `${knifePos.y}px` : '35%',
              transform: isDraggingKnife
                ? 'translate(-30%, -75%) rotate(-25deg)'
                : 'translate(-50%, -50%) rotate(-35deg)',
              pointerEvents: 'none',
              transition: isDraggingKnife ? 'none' : 'transform 0.3s ease',
            }}
          >
            {/* Cute Pink Chef Knife SVG */}
            <svg width="90" height="90" viewBox="0 0 100 100" fill="none">
              {/* Blade */}
              <path
                d="M20 70 L65 25 Q75 15 85 22 L72 35 L40 78 Z"
                fill="#E0E0E0"
                stroke="#BDBDBD"
                strokeWidth="2"
              />
              {/* Sharp Blade Edge shine */}
              <path d="M22 69 L64 27" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
              {/* Handle */}
              <rect
                x="10"
                y="65"
                width="28"
                height="14"
                rx="5"
                fill="#FF69B4"
                stroke="#D81B60"
                strokeWidth="2"
                transform="rotate(42 10 65)"
              />
              {/* Pink Bow on Knife handle */}
              <circle cx="28" cy="74" r="3" fill="#FFF" />
              <path d="M26 73 Q20 68 22 64 Q27 68 26 73" fill="#FF4081" />
              <path d="M30 73 Q36 68 34 64 Q29 68 30 73" fill="#FF4081" />
            </svg>
            {!isDraggingKnife && (
              <div className="knife-drag-hint">
                <span>👇 Drag Me Down!</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sweet celebratory message after cut */}
      {step === 'cake_cut' && (
        <div className="cake-treat-card animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-pink-500" />
            <span className="font-bold text-pink-700 tracking-wide">CAKE SLICED TO PERFECTION!</span>
            <Sparkles className="w-5 h-5 text-pink-500" />
          </div>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            Ab officially tumhara cake cut ho gaya hai! Hyderabad mein ho ya gym mein,
            hamara hissa ready rakhna madam ji! 😋🍰
          </p>
        </div>
      )}
    </div>
  );
};
