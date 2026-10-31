import React from 'react';
import { HeroSection } from './components/HeroSection';
import { GymChronicles } from './components/GymChronicles';
import { JokeHallOfFame } from './components/JokeHallOfFame';
import { HyderabadVsGym } from './components/HyderabadVsGym';
import { AppreciationSection } from './components/AppreciationSection';
import { FutureWishesSection } from './components/FutureWishesSection';
import { CakeSection } from './components/CakeSection';
import { BirthdayFinale } from './components/BirthdayFinale';
import { MusicPlayer } from './components/MusicPlayer';
import { PinkDumbbellIcon } from './components/Illustrations';

export const App: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pink-wonderland-app">
      {/* Background Decorative Gradient Orbs */}
      <div className="bg-gradient-orb orb-1" />
      <div className="bg-gradient-orb orb-2" />
      <div className="bg-gradient-orb orb-3" />

      {/* Floating Ambient Music Player */}
      <MusicPlayer />

      {/* Top Cute Navbar */}
      <header className="wonderland-navbar">
        <div className="nav-container">
          <div className="nav-brand" onClick={() => scrollToSection('hero')}>
            <PinkDumbbellIcon size={24} />
            <span className="brand-text">
              SHIVANI'S WONDERLAND 🎀
            </span>
          </div>

          <nav className="nav-links">
            <button onClick={() => scrollToSection('chronicles')} className="nav-link-btn">
              Gym Chronicles 🏋️
            </button>
            <button onClick={() => scrollToSection('trophies')} className="nav-link-btn">
              Hall of Fame 🏆
            </button>
            <button onClick={() => scrollToSection('hyderabad')} className="nav-link-btn">
              Hyderabad 📍
            </button>
            <button onClick={() => scrollToSection('cake')} className="nav-link-btn highlight-cake">
              Cut Cake 🎂
            </button>
            <button onClick={() => scrollToSection('finale')} className="nav-link-btn">
              Wishes 💌
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="wonderland-main">
        {/* 1. Hero Section */}
        <HeroSection onOpenSurprise={() => scrollToSection('chronicles')} />

        {/* 2. The Gym Chronicles */}
        <GymChronicles />

        {/* 3. Shivani's Unfunny Joke Hall of Fame */}
        <JokeHallOfFame />

        {/* 4. Hyderabad vs Our Gym */}
        <HyderabadVsGym />

        {/* 5. Okay, Jokes Apart... (The Sweet Side) */}
        <AppreciationSection />

        {/* 6. Big Dreams, Bigger Success (Future Wishes) */}
        <FutureWishesSection />

        {/* 7. Interactive Birthday Cake (The Main Highlight) */}
        <CakeSection />

        {/* 8. Grand Birthday Finale & Sticky Wall */}
        <BirthdayFinale />
      </main>
    </div>
  );
};

export default App;
