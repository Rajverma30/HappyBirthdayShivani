import React, { useState } from 'react';
import { Dumbbell, Laugh, HelpCircle, ArrowRight } from 'lucide-react';
import { ShivaniCharacter, GymBuddyCharacter, PinkDumbbellIcon } from './Illustrations';
import { sound } from '../utils/audio';

export const GymChronicles: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const scenes = [
    {
      id: 0,
      title: "Scene 1: The Beginning",
      badge: "Leg Day vs Bakchodi Day",
      icon: <Dumbbell className="w-5 h-5 text-pink-500" />,
      caption: "Started with workouts... ended up with unlimited bakchodi.",
      description:
        "Remember when we actually came to the gym to exercise? Yeah, neither do I. Within 5 minutes, stretching turned into 45 minutes of non-stop gossip, laughing at random things, and doing 1 set of bicep curls every half hour.",
      shivaniMood: 'happy' as const,
      buddyMood: 'workout' as const,
      meterLabel: "Workout Focus",
      meterValue: "12%",
      meterColor: "bg-red-400",
      funnyStat: "Sets completed: 2 | Gossips exchanged: 94",
    },
    {
      id: 1,
      title: "Scene 2: The Teasing Department",
      badge: "Full-Time Profession",
      icon: <Laugh className="w-5 h-5 text-pink-500" />,
      caption: "Your favourite hobby: Irritating me for absolutely no reason.",
      description:
        "Whether it's making funny faces in the gym mirror while I'm struggling with a heavy lift, stealing my water bottle, or poking fun at my workout form — irritating me is clearly your true calling in life. And honestly? It's iconic.",
      shivaniMood: 'teasing' as const,
      buddyMood: 'irritated' as const,
      meterLabel: "Irritation Index",
      meterValue: "99.9%",
      meterColor: "bg-pink-500",
      funnyStat: "Focus lost: 100% | Patience remaining: 1%",
    },
    {
      id: 2,
      title: "Scene 3: The Legendary Jokes",
      badge: "Google 404: Punchline Not Found",
      icon: <HelpCircle className="w-5 h-5 text-pink-500" />,
      caption:
        "Those legendary jokes... Shivani, seriously, even Google can't explain how they're supposed to be funny. 😭",
      description:
        "You tell a joke with 200% confidence, laugh hysterically before even delivering the punchline, and then stare at me waiting for a reaction while my brain tries to decode which parallel universe that joke was meant for.",
      shivaniMood: 'joke' as const,
      buddyMood: 'confused' as const,
      meterLabel: "Joke Unfunniness",
      meterValue: "1000%",
      meterColor: "bg-purple-500",
      funnyStat: "Audience confused: Worldwide | Shivani laughing alone: Always",
    },
  ];

  const handleTabChange = (index: number) => {
    sound.playClick();
    if (index === 2) {
      sound.playJokeBuzzer();
    }
    setActiveTab(index);
  };

  const current = scenes[activeTab];

  return (
    <section className="section-container gym-chronicles-section" id="chronicles">
      {/* Section Header */}
      <div className="section-header">
        <div className="section-pill">
          <PinkDumbbellIcon size={18} />
          <span>Gym Diaries & Memories</span>
        </div>
        <h2 className="section-title">
          From Gym Buddies to Certified Troublemakers 🏋️‍♀️
        </h2>
        <p className="section-subtitle">
          A three-part documentary of how two innocent gym members became each other's primary workout distraction.
        </p>
      </div>

      {/* Interactive Tabs */}
      <div className="chronicle-tabs-bar">
        {scenes.map((scene, idx) => (
          <button
            key={scene.id}
            onClick={() => handleTabChange(idx)}
            className={`chronicle-tab-btn ${activeTab === idx ? 'is-active' : ''}`}
          >
            <span className="tab-icon">{scene.icon}</span>
            <span className="tab-text">{scene.title.split(':')[0]}</span>
          </button>
        ))}
      </div>

      {/* Main Story Card */}
      <div className="chronicle-stage-card glass-panel">
        <div className="stage-top-meta">
          <span className="badge-tag">{current.badge}</span>
          <span className="text-xs font-bold text-pink-600 tracking-wider">
            Episode {activeTab + 1} of 3
          </span>
        </div>

        {/* Dual Character Animated Stage */}
        <div className="stage-scene-canvas">
          <div className="scene-character-wrapper">
            <ShivaniCharacter mood={current.shivaniMood} size={165} />
            <span className="character-label">Shivani 🎀</span>
          </div>

          <div className="scene-middle-connector">
            <div className="sparkle-chat-bubble">
              {activeTab === 0 && "Chal na ek set aur... baad mein! 🍕"}
              {activeTab === 1 && "Dekh main kitna irritate kar sakti hoon! 😜"}
              {activeTab === 2 && "Arey sun ek joke... hahahahaha pehle hi hansi aa gayi! 😂"}
            </div>
          </div>

          <div className="scene-character-wrapper">
            <GymBuddyCharacter mood={current.buddyMood} size={165} />
            <span className="character-label">Gym Buddy 🧢</span>
          </div>
        </div>

        {/* Scene Caption & Description */}
        <div className="scene-content-box">
          <h3 className="scene-caption-heading">
            "{current.caption}"
          </h3>
          <p className="scene-description-text">
            {current.description}
          </p>

          {/* Funny Meter & Stats */}
          <div className="scene-meter-box">
            <div className="flex justify-between items-center text-xs font-bold mb-1.5 text-gray-700">
              <span>{current.meterLabel}</span>
              <span className="text-pink-600 font-extrabold">{current.meterValue}</span>
            </div>
            <div className="meter-track">
              <div
                className={`meter-fill ${current.meterColor}`}
                style={{ width: current.meterValue.includes('%') ? current.meterValue : '95%' }}
              />
            </div>
            <div className="scene-stat-line">
              <span>💡 {current.funnyStat}</span>
            </div>
          </div>
        </div>

        {/* Next Scene Button */}
        <div className="flex justify-between items-center pt-4 border-t border-pink-100 mt-4">
          <span className="text-xs text-pink-500 font-semibold">
            Swipe or click tabs to explore all episodes!
          </span>
          <button
            onClick={() => handleTabChange((activeTab + 1) % scenes.length)}
            className="next-scene-btn"
          >
            <span>Next Episode</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
