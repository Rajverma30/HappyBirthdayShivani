import React, { useState } from 'react';
import { MapPin, Bell, Heart, Sparkles } from 'lucide-react';
import { HyderabadIllustration, EmptyGymIllustration, ShivaniCharacter, GymBuddyCharacter } from './Illustrations';
import { sound } from '../utils/audio';

export const HyderabadVsGym: React.FC = () => {
  const [bellRung, setBellRung] = useState(false);
  const [ringCount, setRingCount] = useState(0);

  const handleRingBell = () => {
    sound.playGymBell();
    setBellRung(true);
    setRingCount((prev) => prev + 1);

    setTimeout(() => {
      setBellRung(false);
    }, 3000);
  };

  return (
    <section className="section-container hyderabad-vs-gym-section" id="hyderabad">
      {/* Header */}
      <div className="section-header">
        <div className="section-pill bg-pink-100 text-pink-700 border-pink-200">
          <MapPin className="w-4 h-4 text-pink-600 animate-bounce" />
          <span>Distance Check: Hyderabad ⇄ Gym</span>
        </div>
        <h2 className="section-title">
          Hyderabad Got You... But Our Gym Misses You! 💗
        </h2>
        <p className="section-subtitle">
          A tale of two cities: One city enjoying your jokes, and one gym wondering why it suddenly feels so peaceful.
        </p>
      </div>

      {/* Split-Screen Visual Comparison */}
      <div className="split-comparison-container">
        {/* LEFT: Hyderabad Side */}
        <div className="split-panel hyderabad-panel glass-panel">
          <div className="split-panel-header">
            <span className="split-city-tag bg-amber-100 text-amber-800 border border-amber-200">
              📍 Hyderabad (Current Location)
            </span>
            <span className="text-xs font-bold text-gray-500">Status: Living Her Best Life ✨</span>
          </div>

          <div className="split-art-stage">
            <HyderabadIllustration size={160} />
            <div className="split-character-overlay right-1 bottom-0">
              <ShivaniCharacter mood="hyderabad" size={120} />
            </div>
          </div>

          <div className="split-panel-content">
            <h4 className="font-extrabold text-pink-900 text-base md:text-lg mb-1">
              Hyderabad is Lucky to Have You! 👑
            </h4>
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
              New city, famous biryani, great weather, exciting explorations, and a whole new set of people to confuse with your Bundelkhandi jokes!
            </p>
            <div className="city-perks-list">
              <span className="perk-pill">🥘 Hyderabadi Biryani</span>
              <span className="perk-pill">🏢 New Adventures</span>
              <span className="perk-pill">✨ Living Like A Queen</span>
            </div>
          </div>
        </div>

        {/* Center Heart / Connection Marker */}
        <div className="split-center-divider">
          <div className="connector-circle">
            <Heart className="w-5 h-5 text-pink-500 fill-pink-500 animate-pulse" />
          </div>
          <span className="text-[10px] font-bold text-pink-600 tracking-wider uppercase">
            Gym Misses You
          </span>
        </div>

        {/* RIGHT: Empty Gym Side */}
        <div className="split-panel empty-gym-panel glass-panel">
          <div className="split-panel-header">
            <span className="split-city-tag bg-pink-100 text-pink-800 border border-pink-200">
              🏋️ Our Gym (Missing Person Alert)
            </span>
            <span className="text-xs font-bold text-pink-600">Status: Too Quiet Without You</span>
          </div>

          <div className="split-art-stage">
            <EmptyGymIllustration size={160} />
            <div className="split-character-overlay left-1 bottom-0">
              <GymBuddyCharacter mood="lonely" size={120} />
            </div>
          </div>

          <div className="split-panel-content">
            <h4 className="font-extrabold text-pink-900 text-base md:text-lg mb-1">
              Your Spot Is Waiting For You! 😭
            </h4>
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
              "Workout toh ho jaata hai... but bina tumhari bakchodi ke gym thoda boring lagta hai." Dumbbells are on the rack, your bench is reserved, and the gym buddy is lonely.
            </p>
            <div className="city-perks-list">
              <span className="perk-pill bg-pink-50 text-pink-700">🪑 Bench Reserved</span>
              <span className="perk-pill bg-pink-50 text-pink-700">🤫 Suspiciously Quiet</span>
              <span className="perk-pill bg-pink-50 text-pink-700">💔 Teasing Dept Closed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Gym Bell Section */}
      <div className="gym-bell-action-box glass-panel">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h4 className="font-extrabold text-pink-900 text-base flex items-center justify-center md:justify-start gap-2">
              <span>Come back soon, madam! Your teasing department is still waiting. 😭</span>
            </h4>
            <p className="text-xs text-gray-600 mt-1">
              Tap the bell to send a reminder signal all the way from the gym to Hyderabad!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRingBell}
              className={`ring-gym-bell-btn ${bellRung ? 'is-ringing' : ''}`}
              id="ring-gym-bell-btn"
            >
              <Bell className="w-5 h-5 text-white animate-wiggle" />
              <span>Ring Gym Bell 🔔 ({ringCount})</span>
            </button>
          </div>
        </div>

        {bellRung && (
          <div className="bell-toast-banner animate-fade-in">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span className="text-xs font-bold text-pink-800">
              Ding Dong! 🔔 Signal sent to Hyderabad: "Madam ji, Gym bench is crying for you! Wapas aa jao!"
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
