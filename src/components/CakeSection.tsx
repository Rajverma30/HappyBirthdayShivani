import React from 'react';
import { Cake } from 'lucide-react';
import { InteractiveCake } from './InteractiveCake';

export const CakeSection: React.FC = () => {
  return (
    <section className="section-container cake-ceremony-section" id="cake">
      {/* Header */}
      <div className="section-header">
        <div className="section-pill bg-pink-100 text-pink-700 border-pink-200">
          <Cake className="w-4 h-4 text-pink-600" />
          <span>The Main Event 🎂 Special Ceremony</span>
        </div>
        <h2 className="section-title font-playfair">
          Shivani's Birthday Cake Celebration 🎂✨
        </h2>
        <p className="section-subtitle">
          Close your eyes, blow out the candles, and grab the pink knife to cut your custom birthday cake!
        </p>
      </div>

      {/* Interactive Cake Component */}
      <InteractiveCake />
    </section>
  );
};
