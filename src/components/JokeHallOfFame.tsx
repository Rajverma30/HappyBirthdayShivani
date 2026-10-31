import React, { useState } from 'react';
import { Trophy, AlertTriangle, X, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface TrophyItem {
  id: number;
  title: string;
  category: string;
  icon: string;
  badge: string;
  verdict: string;
  citation: string;
  unfunnyScore: string;
}

export const JokeHallOfFame: React.FC = () => {
  const [selectedTrophy, setSelectedTrophy] = useState<TrophyItem | null>(null);

  const awards: TrophyItem[] = [
    {
      id: 1,
      title: "Best Unfunny Joke Teller",
      category: "Lifetime Achievement",
      icon: "🏆",
      badge: "Undisputed Champion",
      verdict: "Guilty of delivering punchlines that make the entire gym go dead silent.",
      citation:
        "Awarded for consistently inventing jokes that require a 15-minute explanation, followed by self-laughter while everyone else stares into the void.",
      unfunnyScore: "9,999 / 10",
    },
    {
      id: 2,
      title: "Professional Irritation Specialist",
      category: "Daily Operations",
      icon: "🎖️",
      badge: "Master Degree",
      verdict: "Specialist in ruining workout concentration with random poking and funny faces.",
      citation:
        "Recognized for extraordinary dedication to disturbing bench presses, poking fun at lifting faces, and making people drop weights from laughter.",
      unfunnyScore: "100% Effective",
    },
    {
      id: 3,
      title: "Certified Gym Distraction",
      category: "Fitness Prevention",
      icon: "⭐",
      badge: "Trainer Warning",
      verdict: "Turned a 45-minute workout session into a 2-hour stand-up comedy trial.",
      citation:
        "Official certification that having Shivani around guarantees at least 50% fewer sets completed, but 500% more laughter.",
      unfunnyScore: "Sets Ruined: Infinite",
    },
    {
      id: 4,
      title: "Queen of Random Teasing",
      category: "Emotional Damage",
      icon: "👑",
      badge: "Royal Decree",
      verdict: "Can spot something to roast within 0.2 seconds of entering the gym.",
      citation:
        "Her teasing accuracy is 100%. Whether it's clothes, shoes, tired expressions, or poor form, Shivani will definitely point it out and laugh.",
      unfunnyScore: "Mercy Level: 0%",
    },
    {
      id: 5,
      title: "Master of 15-Minute Rest Sets",
      category: "Workout Sabotage",
      icon: "🍕",
      badge: "Record Holder",
      verdict: "Can stretch a 30-second set rest into a 15-minute gossip marathon without breaking a sweat.",
      citation:
        "Honored for the legendary talent of doing one set of bicep curls, sitting on the gym bench, and talking until the gym staff starts packing up.",
      unfunnyScore: "Rest Time: 99.8%",
    },
  ];

  const handleTrophyClick = (trophy: TrophyItem) => {
    sound.playFanfare();
    setSelectedTrophy(trophy);
  };

  return (
    <section className="section-container hall-of-fame-section" id="trophies">
      {/* Header */}
      <div className="section-header">
        <div className="section-pill bg-yellow-50 text-amber-800 border-amber-200">
          <Trophy className="w-4 h-4 text-yellow-500" />
          <span>Annual Honors 🏆 2026</span>
        </div>
        <h2 className="section-title">
          Shivani's Hall of Fame: World's Most Unfunny Jokes 🏆
        </h2>
        <p className="section-subtitle">
          "All awards are permanently reserved. No competition allowed. Because honestly, nobody can beat you at being this unfunny."
        </p>
      </div>

      {/* Trophy Cards Grid */}
      <div className="trophy-cards-grid">
        {awards.map((award) => (
          <div
            key={award.id}
            onClick={() => handleTrophyClick(award)}
            className="trophy-card glass-panel"
            role="button"
            tabIndex={0}
          >
            {/* Top Ribbon */}
            <div className="trophy-card-ribbon">
              <span>{award.badge}</span>
            </div>

            {/* Big Shiny Trophy Emoji / SVG */}
            <div className="trophy-icon-wrapper">
              <span className="trophy-emoji">{award.icon}</span>
              <div className="trophy-sparkle-dot">✨</div>
            </div>

            <h3 className="trophy-card-title">{award.title}</h3>
            <span className="trophy-category-tag">{award.category}</span>

            <p className="trophy-short-verdict">
              "{award.verdict}"
            </p>

            <div className="trophy-card-footer">
              <span className="text-[11px] font-bold text-pink-600">
                Score: {award.unfunnyScore}
              </span>
              <span className="view-cert-link">Inspect Award 🔍</span>
            </div>
          </div>
        ))}
      </div>

      {/* Official Disclaimer Banner */}
      <div className="hall-disclaimer-banner">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="w-4 h-4 text-pink-600" />
          <span className="font-extrabold text-xs uppercase tracking-wider text-pink-700">
            Legal Disclaimer & Terms
          </span>
        </div>
        <p className="text-xs text-gray-700">
          "These awards are legally binding and permanently non-refundable. They cannot be revoked, disputed, or transferred to any other human being. Even by international comedy authorities." 😂
        </p>
      </div>

      {/* Trophy Certificate Modal */}
      {selectedTrophy && (
        <div className="certificate-modal-overlay" onClick={() => setSelectedTrophy(null)}>
          <div
            className="certificate-modal-card glass-panel animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedTrophy(null)}
              className="cert-close-btn"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Certificate Header */}
            <div className="text-center pt-2 pb-4 border-b border-pink-200">
              <div className="text-4xl mb-2">{selectedTrophy.icon}</div>
              <span className="text-xs uppercase tracking-widest font-bold text-pink-600">
                Official Certificate of Comedy Exemption
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold text-pink-900 mt-1 font-playfair">
                {selectedTrophy.title}
              </h3>
            </div>

            {/* Certificate Body */}
            <div className="py-4 space-y-3">
              <div className="bg-pink-50/60 p-3 rounded-xl border border-pink-100">
                <span className="text-xs font-bold text-gray-500 uppercase">Honoree:</span>
                <p className="text-base font-extrabold text-pink-700">Shivani (Our Gym Star)</p>
              </div>

              <div>
                <span className="text-xs font-bold text-gray-500 uppercase">Official Citation:</span>
                <p className="text-sm text-gray-800 leading-relaxed mt-1">
                  {selectedTrophy.citation}
                </p>
              </div>

              <div className="flex justify-between items-center text-xs pt-2">
                <span className="font-semibold text-gray-600">Verified Unfunniness:</span>
                <span className="font-extrabold text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full">
                  {selectedTrophy.unfunnyScore}
                </span>
              </div>
            </div>

            {/* Gold Seal */}
            <div className="flex items-center justify-between pt-3 border-t border-pink-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-[11px] text-gray-600 font-medium">Certified by Raj ✍️</span>
              </div>
              <button
                onClick={() => setSelectedTrophy(null)}
                className="px-4 py-1.5 rounded-full bg-pink-600 text-white font-bold text-xs hover:bg-pink-700"
              >
                Accept Award 🎀
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
