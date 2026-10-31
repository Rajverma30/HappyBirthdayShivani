import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Autostart on first global user click/touch
    const handleFirstUserGesture = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        sound.startMusic();
        setIsPlaying(true);
      }
    };

    window.addEventListener('click', handleFirstUserGesture, { once: true });
    window.addEventListener('touchstart', handleFirstUserGesture, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstUserGesture);
      window.removeEventListener('touchstart', handleFirstUserGesture);
    };
  }, [hasInteracted]);

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    const playing = sound.toggleMusic();
    setIsPlaying(playing);
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="fixed-music-widget">
      <div
        className={`music-player-pill ${isPlaying ? 'is-playing' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
        title="Birthday Music Box"
      >
        {/* Animated Vinyl / Music Icon */}
        <div className={`music-disc-icon ${isPlaying ? 'spin-disc' : ''}`}>
          <div className="disc-inner">
            <Music className="w-4 h-4 text-pink-600" />
          </div>
        </div>

        {/* Text & Status */}
        <div className="music-info-text">
          <div className="flex items-center gap-1">
            <span className="font-bold text-xs text-pink-700">Birthday Melody</span>
            {isPlaying && <Sparkles className="w-3 h-3 text-pink-400 animate-pulse" />}
          </div>
          <span className="text-[10px] text-pink-500 font-medium">
            {isPlaying ? 'Music Box Playing 🎶' : 'Tap to Play 🎵'}
          </span>
        </div>

        {/* Quick controls */}
        <div className="flex items-center gap-1 ml-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={handleTogglePlay}
            className="music-ctrl-btn"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 text-pink-700" />
            ) : (
              <Play className="w-3.5 h-3.5 text-pink-700" />
            )}
          </button>

          <button
            onClick={handleToggleMute}
            className="music-ctrl-btn"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-pink-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-pink-700" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
