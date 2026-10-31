import React from 'react';
import confetti from 'canvas-confetti';
import { Gift, Sparkles } from 'lucide-react';
import { ShivaniCharacter, GymBuddyCharacter, PinkDumbbellIcon, CuteWaterBottle } from './Illustrations';
import { sound } from '../utils/audio';

interface HeroProps {
  onOpenSurprise: () => void;
}

export const HeroSection: React.FC<HeroProps> = ({ onOpenSurprise }) => {
  const handleOpenClick = () => {
    sound.playConfettiPop();
    sound.startMusic();

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#FF69B4', '#FF80AB', '#FFB6C1', '#FFD700', '#FFF'],
    });

    onOpenSurprise();
  };

  return (
    <section className="hero-section" id="hero">
      {/* Floating background decorative balloons & hearts */}
      <div className="floating-decorations-container">
        <div className="balloon balloon-1">🎈</div>
        <div className="balloon balloon-2">🎀</div>
        <div className="balloon balloon-3">🎈</div>
        <div className="balloon balloon-4">✨</div>
        <div className="balloon balloon-5">💖</div>
        <div className="balloon balloon-6">🌸</div>
      </div>

      <div className="hero-content-container">
        {/* Cute Top Gym Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 border border-pink-200 shadow-sm backdrop-blur-sm mb-4 animate-bounce-subtle">
          <PinkDumbbellIcon size={20} />
          <span className="text-xs md:text-sm font-bold text-pink-700 tracking-wide uppercase">
            Official Birthday Edition 🎀 2026
          </span>
          <CuteWaterBottle size={18} />
        </div>

        {/* Main Headings */}
        <h1 className="hero-title">
          HEY SHIVANI! 🎀
        </h1>

        <div className="hero-subtitle-box">
          <p className="hero-subtitle">
            "Someone's getting older... but her jokes are still not getting funnier."
          </p>
        </div>

        <p className="hero-tagline">
          Happy Birthday to my favourite gym troublemaker! 💗
        </p>

        {/* Dual Cartoon Characters Illustration Stage */}
        <div className="hero-characters-stage">
          {/* Shivani Cartoon */}
          <div className="character-card shivani-hero-card">
            <ShivaniCharacter mood="happy" size={175} />
            <div className="character-name-tag">
              <span>Shivani 👑</span>
              <span className="sub-badge">Master of Bakchodi</span>
            </div>
          </div>

          {/* Playful versus / gym buddy connection */}
          <div className="hero-vs-badge">
            <span className="vs-text">🏋️‍♀️ ⇄ 🏋️‍♂️</span>
            <div className="funny-thought-bubble">
              "Roz ka drama hai!" 😭
            </div>
          </div>

          {/* Gym Buddy Cartoon */}
          <div className="character-card buddy-hero-card">
            <GymBuddyCharacter mood="irritated" size={175} />
            <div className="character-name-tag">
              <span>Raj 🧢</span>
              <span className="sub-badge">Victim of Jokes</span>
            </div>
          </div>
        </div>

        {/* Main CTA Button */}
        <div className="hero-cta-wrapper">
          <button
            onClick={handleOpenClick}
            className="hero-surprise-btn"
            id="open-surprise-btn"
          >
            <Gift className="w-6 h-6 mr-2 text-white animate-bounce" />
            <span>OPEN YOUR BIRTHDAY SURPRISE 🎁</span>
            <Sparkles className="w-5 h-5 ml-2 text-yellow-200 animate-pulse" />
          </button>
          <p className="hero-btn-hint">
            Tap to open the vault of gym memories & cake! 🌸
          </p>
        </div>
      </div>
    </section>
  );
};
