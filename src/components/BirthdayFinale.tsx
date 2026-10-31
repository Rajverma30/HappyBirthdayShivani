import React from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, PartyPopper } from 'lucide-react';
import { ShivaniCharacter, GymBuddyCharacter } from './Illustrations';
import { sound } from '../utils/audio';

export const BirthdayFinale: React.FC = () => {
  const handleFireConfetti = () => {
    sound.playConfettiPop();
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.65 },
      colors: ['#FF69B4', '#FF80AB', '#FFB6C1', '#FFD700', '#EDE7F6'],
    });
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
            <span className="text-xs font-extrabold text-gray-700 mt-1">Gym Buddy Partner 🧢</span>
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
            No matter how far life takes you, I hope we never lose this friendship and the crazy memories attached to it.
          </p>

          <p className="finale-message-highlight">
            "Sending lots of birthday wishes from our little gym universe to Hyderabad! 💗"
          </p>

          {/* Signature */}
          <div className="finale-signature-box">
            <div className="sig-heart">❤️</div>
            <div>
              <p className="sig-title">Your Gym Partner in Bakchodi</p>
              <p className="sig-sub">Certified Sufferer of Shivani's Jokes 🏋️‍♂️</p>
            </div>
          </div>

          {/* PS Note */}
          <div className="finale-ps-note">
            <span>💡 PS: Your gym membership to the bakchodi department is lifetime valid. No cancellation allowed! 😂</span>
          </div>
        </div>

        {/* Confetti Celebration Button */}
        <div className="text-center my-6">
          <button
            onClick={handleFireConfetti}
            className="finale-confetti-btn"
            id="fire-confetti-btn"
          >
            <Sparkles className="w-5 h-5 inline-block mr-2 text-yellow-300 animate-spin-slow" />
            Launch Birthday Fireworks & Confetti 🎆
          </button>
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
