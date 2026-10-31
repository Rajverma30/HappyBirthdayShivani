import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Send, PartyPopper, Check } from 'lucide-react';
import { ShivaniCharacter, GymBuddyCharacter } from './Illustrations';
import { sound } from '../utils/audio';

export const BirthdayFinale: React.FC = () => {
  const [stickyNotes, setStickyNotes] = useState<Array<{ id: number; author: string; text: string; color: string; rotation: number }>>([
    {
      id: 1,
      author: "Gym Buddy 🧢",
      text: "Reminder: You still owe me 1 protein shake and 500 apologies for those jokes! 🥤😂",
      color: "bg-pink-100 border-pink-300",
      rotation: -2,
    },
    {
      id: 2,
      author: "The Gym Dumbbells 🏋️",
      text: "We miss you lifting us for 2 sets and gossiping for 40 minutes! Come back soon! 💗",
      color: "bg-amber-100 border-amber-300",
      rotation: 3,
    },
    {
      id: 3,
      author: "Bakchodi Dept 📜",
      text: "Status: Unanimously voted Shivani as President for Life. No elections needed! 👑",
      color: "bg-purple-100 border-purple-300",
      rotation: -1,
    },
  ]);

  const [newNote, setNewNote] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [hasAdded, setHasAdded] = useState(false);

  const handleFireConfetti = () => {
    sound.playConfettiPop();
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#FF69B4', '#FF80AB', '#FFB6C1', '#FFD700', '#EDE7F6'],
    });
  };

  const handleAddStickyNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    sound.playClick();
    const colors = [
      'bg-pink-100 border-pink-300',
      'bg-purple-100 border-purple-300',
      'bg-rose-100 border-rose-300',
      'bg-amber-100 border-amber-300',
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomRot = (Math.random() * 6 - 3);

    const note = {
      id: Date.now(),
      author: newAuthor.trim() || 'Gym Well-Wisher ✨',
      text: newNote.trim(),
      color: randomColor,
      rotation: randomRot,
    };

    setStickyNotes([note, ...stickyNotes]);
    setNewNote('');
    setNewAuthor('');
    setHasAdded(true);
    handleFireConfetti();
    setTimeout(() => setHasAdded(false), 3000);
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
        <div className="text-center my-8">
          <button
            onClick={handleFireConfetti}
            className="finale-confetti-btn"
            id="fire-confetti-btn"
          >
            <Sparkles className="w-5 h-5 inline-block mr-2 text-yellow-300 animate-spin-slow" />
            Launch Birthday Fireworks & Confetti 🎆
          </button>
        </div>

        {/* Sticky Notes & Wishes Wall */}
        <div className="sticky-wall-wrapper">
          <div className="text-center mb-6">
            <h3 className="text-xl font-extrabold text-pink-900 font-playfair">
              Birthday Wishes & Gym Notes Wall 📝🎀
            </h3>
            <p className="text-xs text-pink-600 mt-1">
              Leave an extra birthday note or a funny message for Shivani on the wall!
            </p>
          </div>

          {/* Add Note Form */}
          <form onSubmit={handleAddStickyNote} className="sticky-note-form glass-panel">
            <div className="sticky-note-form-row">
              <input
                type="text"
                placeholder="Your name or nickname..."
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                className="note-input-field note-input-name"
              />
              <input
                type="text"
                placeholder="Write a cute/funny birthday wish for Shivani..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="note-input-field note-input-message"
              />
              <button type="submit" className="note-submit-btn">
                <Send className="w-4 h-4 mr-1.5" />
                Pin Note 📌
              </button>
            </div>
            {hasAdded && (
              <p className="text-xs text-green-700 font-bold mt-2 flex items-center justify-center gap-1">
                <Check className="w-3.5 h-3.5" /> Note pinned to the wall! ✨
              </p>
            )}
          </form>

          {/* Sticky Notes Grid */}
          <div className="sticky-notes-grid">
            {stickyNotes.map((note) => (
              <div
                key={note.id}
                className={`sticky-note-card ${note.color}`}
                style={{ transform: `rotate(${note.rotation}deg)` }}
              >
                <div className="note-pin">📌</div>
                <p className="note-text font-serif italic text-sm text-gray-800">
                  "{note.text}"
                </p>
                <div className="note-author font-bold text-xs text-pink-800 mt-3 pt-2 border-t border-pink-200/60">
                  — {note.author}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Very bottom copyright/love line */}
        <div className="text-center pt-8 pb-4 border-t border-pink-200 mt-12 text-xs text-pink-500 font-semibold">
          <p>
            Designed with 💗, endless gym jokes, and Bundelkhandi love for Shivani's Birthday.
          </p>
          <p className="text-[10px] text-pink-400 mt-1">
            Happy Birthday, Shivani! Keep shining bright! ✨
          </p>
        </div>
      </div>
    </footer>
  );
};
