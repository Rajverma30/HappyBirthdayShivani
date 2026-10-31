import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, PartyPopper, Flame } from 'lucide-react';
import { ShivaniCharacter, GymBuddyCharacter } from './Illustrations';
import { sound } from '../utils/audio';

export const BirthdayFinale: React.FC = () => {
  const [isFiring, setIsFiring] = useState(false);

  // Intense Grand Fireworks Show with Cracker Sounds
  const handleFireFireworks = () => {
    setIsFiring(true);
    // Play realistic synthesized multi-rocket firecracker show!
    sound.playFirecrackerShow();

    const colors = ['#FF1493', '#FF69B4', '#FFD700', '#FF80AB', '#FFF', '#E91E63', '#FFEB3B'];
    const shapes: ('star' | 'circle')[] = ['star', 'circle'];

    // 1. Initial Left Rocket
    confetti({
      particleCount: 120,
      angle: 65,
      spread: 75,
      startVelocity: 65,
      origin: { x: 0.08, y: 0.8 },
      colors,
      shapes,
    });

    // 2. Right Rocket (300ms)
    setTimeout(() => {
      confetti({
        particleCount: 120,
        angle: 115,
        spread: 75,
        startVelocity: 65,
        origin: { x: 0.92, y: 0.8 },
        colors,
        shapes,
      });
    }, 300);

    // 3. Central Skyburst Star explosion (700ms)
    setTimeout(() => {
      confetti({
        particleCount: 190,
        spread: 130,
        startVelocity: 55,
        origin: { x: 0.5, y: 0.4 },
        colors: ['#FFD700', '#FF69B4', '#FFF', '#FF4081'],
        shapes: ['star'],
      });
    }, 700);

    // 4. Twin Aerial Cannons (1100ms)
    setTimeout(() => {
      confetti({
        particleCount: 130,
        angle: 75,
        spread: 85,
        startVelocity: 62,
        origin: { x: 0.25, y: 0.7 },
        colors,
        shapes,
      });
      confetti({
        particleCount: 130,
        angle: 105,
        spread: 85,
        startVelocity: 62,
        origin: { x: 0.75, y: 0.7 },
        colors,
        shapes,
      });
    }, 1100);

    // 5. GRAND FINALE BARRAGE (1500ms) - Mega 360-degree explosion!
    setTimeout(() => {
      confetti({
        particleCount: 300,
        spread: 180,
        startVelocity: 75,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#FFD700', '#FF1493', '#FFF', '#FF80AB', '#FFEB3B', '#FF4081'],
        shapes: ['star', 'circle'],
      });
    }, 1500);

    setTimeout(() => {
      setIsFiring(false);
    }, 2800);
  };

  return (
    <footer className="birthday-finale-section" id="finale">
      {/* Decorative top wave */}
      <div className="finale-wave-divider">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z"
            fill="#FFF0F5"
          />
        </svg>
      </div>

      <div className="finale-inner-container">
        {/* Waving Characters */}
        <div className="finale-characters-row">
          <div className="finale-char-box">
            <ShivaniCharacter mood="cheering" size={160} />
            <span className="text-xs font-extrabold text-pink-700 mt-1">Birthday Queen 👑</span>
          </div>

          <div className="finale-center-heart">
            <PartyPopper className="w-8 h-8 text-pink-500 animate-bounce" />
            <span className="text-2xl">🎂✨</span>
          </div>

          <div className="finale-char-box">
            <GymBuddyCharacter mood="celebrating" size={160} />
            <span className="text-xs font-extrabold text-gray-700 mt-1">Raj 🧢</span>
          </div>
        </div>

        {/* Grand Final Heading */}
        <div className="finale-headline-box">
          <h2 className="finale-grand-title font-playfair">
            HAPPY BIRTHDAY, SHIVANI! 💗
          </h2>
          <div className="finale-tagline-pill">
            <span>May all your wishes come true in Hyderabad & beyond! 🎀</span>
          </div>
        </div>

        {/* Final Message Letter */}
        <div className="finale-letter-card glass-panel">
          <p className="finale-message-para">
            May your year be filled with happiness, crazy adventures, endless laughter, good health, and everything your heart wishes for.
          </p>

          <p className="finale-message-para">
            Keep smiling, keep irritating people, keep making those legendary unfunny jokes, and keep being YOU.
          </p>

          <p className="finale-message-para">
            No matter how far life takes you, I hope we never lose this bond and the crazy memories attached to it.
          </p>

          <p className="finale-message-highlight">
            "Sending lots of birthday wishes from our little gym universe to Hyderabad! 💗"
          </p>

          {/* Signature */}
          <div className="finale-signature-box">
            <div className="sig-heart">❤️</div>
            <div>
              <p className="sig-title">Raj ❤️</p>
              <p className="sig-sub">Your Gym Partner in Bakchodi 🏋️‍♂️</p>
            </div>
          </div>

          {/* PS Note */}
          <div className="finale-ps-note">
            <span>💡 PS: Your gym membership to the bakchodi department is lifetime valid. No cancellation allowed! 😂</span>
          </div>
        </div>

        {/* Tagde Grand Fireworks & Crackers Button */}
        <div className="text-center my-6">
          <button
            onClick={handleFireFireworks}
            className={`finale-confetti-btn tagde-fireworks-btn ${isFiring ? 'is-firing-anim' : ''}`}
            id="fire-confetti-btn"
          >
            <Flame className="w-5 h-5 inline-block mr-2 text-yellow-300 animate-bounce" />
            <span>💥 LAUNCH GRAND FIREWORKS & CRACKERS 🎆</span>
            <Sparkles className="w-5 h-5 inline-block ml-2 text-yellow-300 animate-spin-slow" />
          </button>
          <p className="text-xs font-bold text-pink-600 mt-2">

          </p>
        </div>

        {/* Very bottom clean line */}
        <div className="text-center pt-8 pb-4 border-t border-pink-200 mt-10 text-xs text-pink-400 font-semibold">
          <p>
            Happy Birthday, Shivani! Keep smiling & shining bright! ✨
          </p>
        </div>
      </div>
    </footer>
  );
};
