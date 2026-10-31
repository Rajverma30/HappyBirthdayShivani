import React from 'react';
import { Heart, Coffee, ShieldCheck, Smile } from 'lucide-react';

export const AppreciationSection: React.FC = () => {
  const polaroids = [
    {
      id: 1,
      tag: "Pure Energy ⚡",
      quote: "Someone who knows how to make people laugh, even when the joke didn't earn it!",
      icon: <Smile className="w-4 h-4 text-pink-500" />,
      caption: "Spreading Smiles",
    },
    {
      id: 2,
      tag: "True Support 🛡️",
      quote: "Having my back and encouraging me when it really matters.",
      icon: <ShieldCheck className="w-4 h-4 text-pink-500" />,
      caption: "Real Friendship",
    },
    {
      id: 3,
      tag: "Unfiltered You 🌸",
      quote: "Crazy, authentic, funny, and 100% genuinely wonderful.",
      icon: <Coffee className="w-4 h-4 text-pink-500" />,
      caption: "Never Change",
    },
  ];

  return (
    <section className="section-container appreciation-section" id="appreciation">
      {/* Header */}
      <div className="section-header">
        <div className="section-pill bg-pink-50 text-pink-700 border-pink-200">
          <Heart className="w-4 h-4 text-pink-500 fill-pink-400" />
          <span>Heart-to-Heart • Friendship Note</span>
        </div>
        <h2 className="section-title font-playfair">
          Okay, Jokes Apart... 💕
        </h2>
        <p className="section-subtitle">
          Because underneath all the roasting and gym drama, some things deserve to be said out loud.
        </p>
      </div>

      {/* Main Emotional Message Card */}
      <div className="appreciation-letter-card glass-panel">
        <div className="letter-header-decor">
          <div className="pin-head">🎀</div>
        </div>

        <div className="letter-body-text">
          <p className="letter-paragraph">
            "Behind all that teasing, random jokes and endless bakchodi, you're genuinely a really good person."
          </p>

          <p className="letter-paragraph">
            "You're someone who knows how to make people laugh, even when your jokes absolutely don't deserve the laughter."
          </p>

          <p className="letter-paragraph highlight-quote">
            "And I really appreciate those moments when you support me, encourage me and have my back. Sometimes it's the little things that make a friendship special, and I'm genuinely glad we share those moments."
          </p>

          <p className="letter-paragraph">
            "Keep being the same crazy, supportive and wonderful person you are. Don't change."
          </p>

          <p className="letter-paragraph text-pink-700 font-bold italic">
            "Well... maybe improve your jokes a little. 😂"
          </p>
        </div>

        {/* Polaroid Memory Cards */}
        <div className="polaroid-row">
          {polaroids.map((card) => (
            <div key={card.id} className="polaroid-card">
              <div className="polaroid-inner">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-pink-600">{card.tag}</span>
                  {card.icon}
                </div>
                <p className="text-xs text-gray-700 italic leading-relaxed">
                  "{card.quote}"
                </p>
              </div>
              <div className="polaroid-footer">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  {card.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
