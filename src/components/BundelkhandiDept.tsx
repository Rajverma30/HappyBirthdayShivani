import React, { useState } from 'react';
import { Mic, Volume2, Sparkles, Heart } from 'lucide-react';
import { ShivaniCharacter } from './Illustrations';
import { sound } from '../utils/audio';

export const BundelkhandiDept: React.FC = () => {
  const [activeQuote, setActiveQuote] = useState<number | null>(0);
  const [likes, setLikes] = useState<{ [key: number]: number }>({ 0: 42, 1: 38, 2: 55 });

  const quotes = [
    {
      id: 0,
      bundeli: "Ka haal hai madam ji? Hyderabad mein gym ki yaad aawat hai ki naahi? 🏋️‍♀️",
      translation: "How are you madam ji? Do you miss our gym sessions in Hyderabad or not?",
      reaction: "Aawat toh hogi, but batayegi thodi na! 😂",
      tag: "Classic Greeting",
    },
    {
      id: 1,
      bundeli: "Thodi apni Bundelkhandi comedy bhi saath leke gayo hai ka? 🎭",
      translation: "Did you take your Bundelkhandi comedy along with you to Hyderabad too?",
      reaction: "Hyderabad walo, sambhal ke rehna! 🏃‍♂️💨",
      tag: "Export Quality Humor",
    },
    {
      id: 2,
      bundeli:
        "Waise jokes toh tumhare pehle bhi unfunny the... ab Hyderabad mein bhi logon ko pareshan kar rahi hogi. 😂",
      translation:
        "By the way, your jokes were already unfunny earlier... now you must be tormenting Hyderabad folks too.",
      reaction: "Google Maps route: Straight to Unfunny Town!",
      tag: "Universal Truth",
    },
  ];

  const handleQuoteClick = (index: number) => {
    sound.playClick();
    setActiveQuote(index);
    setLikes((prev) => ({ ...prev, [index]: (prev[index] || 0) + 1 }));
  };

  return (
    <section className="section-container bundelkhandi-section" id="bundelkhandi">
      {/* Section Header */}
      <div className="section-header">
        <div className="section-pill bg-amber-50 text-amber-700 border-amber-200">
          <Mic className="w-4 h-4 text-amber-500 animate-pulse" />
          <span>Regional Dialect Alert 🎙️</span>
        </div>
        <h2 className="section-title text-pink-700">
          WARNING: BUNDELKHANDI ACCENT DETECTED! 😂
        </h2>
        <p className="section-subtitle">
          "Some people speak English, some speak Hindi... and then there's Shivani with her own legendary Bundelkhandi edition."
        </p>
      </div>

      <div className="bundeli-showcase-grid">
        {/* Left Side: Animated Character with Microphone & Ribbon */}
        <div className="bundeli-speaker-card glass-panel">
          <div className="relative flex justify-center py-4">
            <ShivaniCharacter mood="teasing" size={170} />
            {/* Cute Mic Badge */}
            <div className="bundeli-mic-badge">
              <Mic className="w-4 h-4 text-white" />
              <span className="text-[10px] font-bold text-white">LIVE</span>
            </div>
          </div>

          <div className="bundeli-speaker-meta">
            <h4 className="font-extrabold text-pink-800 text-base">
              Shivani "Bundelkhandi Queen" 👑
            </h4>
            <p className="text-xs text-pink-600 mt-0.5">
              Certified Accent Ambassador • High Energy • 100% Original
            </p>

            <div className="bundeli-stats-row">
              <div className="stat-pill">
                <span className="label">Desi Swag:</span>
                <span className="val">100% Pure</span>
              </div>
              <div className="stat-pill">
                <span className="label">Accent Sweetness:</span>
                <span className="val">⭐⭐⭐⭐⭐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Speech Bubbles */}
        <div className="bundeli-quotes-stack">
          {quotes.map((item, idx) => {
            const isSelected = activeQuote === idx;
            return (
              <div
                key={item.id}
                onClick={() => handleQuoteClick(idx)}
                className={`bundeli-speech-bubble ${isSelected ? 'is-selected' : ''}`}
              >
                <div className="bubble-header">
                  <div className="flex items-center gap-1.5">
                    <span className="quote-number-tag">#{idx + 1}</span>
                    <span className="text-xs font-bold text-pink-600">{item.tag}</span>
                  </div>
                  <button className="bubble-audio-btn" title="Tap to react">
                    <Volume2 className="w-3.5 h-3.5 text-pink-600" />
                  </button>
                </div>

                <div className="bubble-main-dialogue">
                  <p className="bundeli-quote-text">
                    "{item.bundeli}"
                  </p>
                </div>

                <div className="bubble-translation-box">
                  <span className="translation-label">Hindi/Eng Context: </span>
                  <span className="translation-text">{item.translation}</span>
                </div>

                <div className="bubble-footer-reaction">
                  <span className="reaction-badge">💭 {item.reaction}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuoteClick(idx);
                    }}
                    className="flex items-center gap-1 text-xs text-pink-600 hover:text-pink-700 font-bold"
                  >
                    <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                    <span>{likes[idx]}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Playful Bottom Disclaimer */}
      <div className="bundeli-disclaimer-card">
        <Sparkles className="w-4 h-4 text-pink-500 shrink-0" />
        <p className="text-xs md:text-sm text-gray-700 italic">
          <strong>Note from Gym Buddy:</strong> Tumhara accent chahe kitna bhi funny ho, gym ki bakchodi tumhari Bundelkhandi lines ke bina adhuri hai. Never lose that charm! 💗
        </p>
      </div>
    </section>
  );
};
