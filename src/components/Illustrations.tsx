import React from 'react';

// Character A: Shivani (Cute girl gym buddy with ponytail, pink gym wear, pink dumbbells, expressive faces)
interface CharacterProps {
  mood?: 'happy' | 'teasing' | 'joke' | 'hyderabad' | 'cheering';
  size?: number;
  className?: string;
}

export const ShivaniCharacter: React.FC<CharacterProps> = ({ mood = 'happy', size = 180, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shivani-character drop-shadow-md ${className}`}
    >
      {/* Glow aura */}
      <circle cx="100" cy="100" r="90" fill="url(#pinkGlow)" opacity="0.3" />

      {/* Hair Behind / Ponytail */}
      <g className="ponytail-anim">
        <path
          d="M135 60 C175 40, 185 85, 155 110 C140 120, 130 95, 125 75 Z"
          fill="#4A2E18"
        />
        {/* Pink Ribbon on Ponytail */}
        <circle cx="132" cy="65" r="7" fill="#FF69B4" />
        <path d="M130 65 Q115 55 125 45 Q135 55 130 65" fill="#FF8DA1" />
        <path d="M132 68 Q145 78 138 88 Q130 78 132 68" fill="#FF8DA1" />
      </g>

      {/* Body / Gym Outfit (Pastel Pink Top) */}
      <path
        d="M75 145 C75 120, 85 112, 100 112 C115 112, 125 120, 125 145 L130 185 L70 185 Z"
        fill="#FFB6C1"
      />
      {/* Cute Sports Top Neckline & Straps */}
      <path d="M85 113 L80 135 L120 135 L115 113 Z" fill="#FF69B4" />
      <path d="M88 135 Q100 142 112 135" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

      {/* Arms & Dumbbells */}
      {mood === 'happy' && (
        <g>
          {/* Left Arm holding dumbbell */}
          <path d="M75 125 Q55 125 50 145" stroke="#FCD0B4" strokeWidth="12" strokeLinecap="round" />
          {/* Right Arm holding dumbbell */}
          <path d="M125 125 Q145 125 150 145" stroke="#FCD0B4" strokeWidth="12" strokeLinecap="round" />
          {/* Left Pink Dumbbell */}
          <rect x="42" y="140" width="16" height="6" rx="3" fill="#FF4081" transform="rotate(-15 42 140)" />
          <circle cx="40" cy="138" r="8" fill="#FF80AB" />
          <circle cx="56" cy="142" r="8" fill="#FF80AB" />
          {/* Right Pink Dumbbell */}
          <rect x="142" y="140" width="16" height="6" rx="3" fill="#FF4081" transform="rotate(15 142 140)" />
          <circle cx="144" cy="142" r="8" fill="#FF80AB" />
          <circle cx="160" cy="138" r="8" fill="#FF80AB" />
        </g>
      )}

      {mood === 'teasing' && (
        <g>
          {/* Left Arm on hip */}
          <path d="M75 125 Q58 135 65 155" stroke="#FCD0B4" strokeWidth="12" strokeLinecap="round" />
          {/* Right Arm pointing/teasing */}
          <path d="M125 125 Q150 115 165 110" stroke="#FCD0B4" strokeWidth="12" strokeLinecap="round" />
          <circle cx="165" cy="110" r="6" fill="#FCD0B4" />
          {/* Mischief sparkles */}
          <text x="160" y="95" fontSize="18">👉✨</text>
        </g>
      )}

      {mood === 'joke' && (
        <g>
          {/* Arms wide: "Ta-da! Best joke ever!" */}
          <path d="M75 125 Q45 105 40 85" stroke="#FCD0B4" strokeWidth="12" strokeLinecap="round" />
          <path d="M125 125 Q155 105 160 85" stroke="#FCD0B4" strokeWidth="12" strokeLinecap="round" />
          <circle cx="40" cy="85" r="7" fill="#FCD0B4" />
          <circle cx="160" cy="85" r="7" fill="#FCD0B4" />
          <text x="148" y="70" fontSize="16">🎤</text>
        </g>
      )}

      {mood === 'hyderabad' && (
        <g>
          {/* Holding tasty Biryani plate & tea */}
          <path d="M75 125 Q60 145 80 155" stroke="#FCD0B4" strokeWidth="12" strokeLinecap="round" />
          <path d="M125 125 Q140 145 120 155" stroke="#FCD0B4" strokeWidth="12" strokeLinecap="round" />
          {/* Biryani Clay Pot */}
          <ellipse cx="100" cy="155" rx="22" ry="10" fill="#E65100" />
          <path d="M78 155 Q100 170 122 155" fill="#BF360C" />
          <circle cx="100" cy="153" r="5" fill="#FFEB3B" />
          <text x="92" y="152" fontSize="14">🍗</text>
        </g>
      )}

      {mood === 'cheering' && (
        <g>
          {/* Cheering hands up with birthday sparklers */}
          <path d="M75 125 Q50 95 60 70" stroke="#FCD0B4" strokeWidth="12" strokeLinecap="round" />
          <path d="M125 125 Q150 95 140 70" stroke="#FCD0B4" strokeWidth="12" strokeLinecap="round" />
          <circle cx="60" cy="70" r="7" fill="#FCD0B4" />
          <circle cx="140" cy="70" r="7" fill="#FCD0B4" />
          <text x="45" y="60" fontSize="18">🎉</text>
          <text x="135" y="60" fontSize="18">✨</text>
        </g>
      )}

      {/* Head & Neck */}
      <rect x="94" y="100" width="12" height="15" rx="6" fill="#FCD0B4" />
      <circle cx="100" cy="75" r="32" fill="#FCD0B4" />

      {/* Front Hair Bangs */}
      <path
        d="M68 68 C75 48, 125 48, 132 68 C132 68, 120 60, 100 62 C80 60, 68 68, 68 68 Z"
        fill="#4A2E18"
      />
      <path d="M68 68 C66 78, 68 88, 73 95 C73 95, 71 80, 75 72 Z" fill="#4A2E18" />

      {/* Sunglasses in Hyderabad mode */}
      {mood === 'hyderabad' ? (
        <g>
          {/* Cool Pink Sunglasses */}
          <rect x="76" y="68" width="20" height="14" rx="4" fill="#333" stroke="#FF4081" strokeWidth="2" />
          <rect x="104" y="68" width="20" height="14" rx="4" fill="#333" stroke="#FF4081" strokeWidth="2" />
          <line x1="96" y1="74" x2="104" y2="74" stroke="#FF4081" strokeWidth="2" />
          {/* Cool smile */}
          <path d="M92 92 Q100 100 108 92" stroke="#D81B60" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      ) : (
        /* Cute Expressive Eyes */
        <g>
          {/* Eyebrows */}
          <path d="M78 65 Q86 61 94 66" stroke="#4A2E18" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M106 66 Q114 61 122 65" stroke="#4A2E18" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {mood === 'teasing' ? (
            /* Winking Eye */
            <>
              {/* Left wink */}
              <path d="M80 75 Q86 82 92 75" stroke="#333" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              {/* Right wide eye */}
              <ellipse cx="114" cy="74" rx="6" ry="7" fill="#333" />
              <circle cx="112" cy="72" r="2.2" fill="#FFFFFF" />
            </>
          ) : mood === 'joke' ? (
            /* Proud happy squint eyes */
            <>
              <path d="M78 76 Q86 69 94 76" stroke="#333" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M106 76 Q114 69 122 76" stroke="#333" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            </>
          ) : (
            /* Big sparkly anime eyes */
            <>
              <ellipse cx="86" cy="75" rx="6" ry="7.5" fill="#2E1B0E" />
              <ellipse cx="114" cy="75" rx="6" ry="7.5" fill="#2E1B0E" />
              <circle cx="84" cy="73" r="2.5" fill="#FFFFFF" />
              <circle cx="112" cy="73" r="2.5" fill="#FFFFFF" />
              <circle cx="88" cy="77" r="1.2" fill="#FFFFFF" />
              <circle cx="116" cy="77" r="1.2" fill="#FFFFFF" />
            </>
          )}

          {/* Cheerful Blush */}
          <ellipse cx="77" cy="82" rx="6" ry="3.5" fill="#FF80AB" opacity="0.6" />
          <ellipse cx="123" cy="82" rx="6" ry="3.5" fill="#FF80AB" opacity="0.6" />

          {/* Cute Smile / Mouth */}
          {mood === 'teasing' ? (
            /* Tongue sticking out */
            <g>
              <path d="M92 88 Q100 96 108 88" stroke="#333" strokeWidth="2.5" fill="none" />
              <path d="M97 90 C97 98, 103 98, 103 90 Z" fill="#FF4081" />
            </g>
          ) : mood === 'joke' ? (
            /* Proud cheeky laugh */
            <path d="M90 87 Q100 102 110 87 Z" fill="#FF4081" stroke="#333" strokeWidth="1.5" />
          ) : (
            /* Sweet smile */
            <path d="M92 87 Q100 95 108 87" stroke="#333" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          )}
        </g>
      )}

      {/* Gradients */}
      <defs>
        <radialGradient id="pinkGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF80AB" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FF80AB" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};

// Character B: The Gym Buddy (Funny reactions, confused by jokes, missing workout buddy)
interface BuddyProps {
  mood?: 'workout' | 'irritated' | 'confused' | 'lonely' | 'celebrating';
  size?: number;
  className?: string;
}

export const GymBuddyCharacter: React.FC<BuddyProps> = ({ mood = 'workout', size = 180, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`gymbuddy-character drop-shadow-md ${className}`}
    >
      {/* Background shadow */}
      <circle cx="100" cy="100" r="90" fill="url(#blueGlow)" opacity="0.2" />

      {/* Body / Casual Gym Hoodie */}
      <path
        d="M68 140 C68 118, 80 110, 100 110 C120 110, 132 118, 132 140 L135 185 L65 185 Z"
        fill="#90A4AE"
      />
      {/* Hoodie drawstring & collar */}
      <path d="M85 110 Q100 125 115 110" stroke="#ECEFF1" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M95 122 L93 140" stroke="#ECEFF1" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M105 122 L107 140" stroke="#ECEFF1" strokeWidth="2.5" strokeLinecap="round" />
      {/* Arms & Reactions */}
      {mood === 'workout' && (
        <g>
          {/* Lifting grey dumbbell */}
          <path d="M70 125 Q50 130 55 145" stroke="#F5CBA7" strokeWidth="12" strokeLinecap="round" />
          <path d="M130 125 Q150 130 145 145" stroke="#F5CBA7" strokeWidth="12" strokeLinecap="round" />
          {/* Grey dumbbells */}
          <rect x="45" y="140" width="18" height="6" rx="3" fill="#455A64" />
          <circle cx="45" cy="143" r="7" fill="#607D8B" />
          <circle cx="63" cy="143" r="7" fill="#607D8B" />
          <rect x="135" y="140" width="18" height="6" rx="3" fill="#455A64" />
          <circle cx="137" cy="143" r="7" fill="#607D8B" />
          <circle cx="155" cy="143" r="7" fill="#607D8B" />
        </g>
      )}

      {mood === 'irritated' && (
        <g>
          {/* Hand on forehead (Facepalm moment) */}
          <path d="M130 125 Q145 105 120 80" stroke="#F5CBA7" strokeWidth="12" strokeLinecap="round" />
          <circle cx="118" cy="78" r="8" fill="#F5CBA7" />
          {/* Other hand on hip */}
          <path d="M70 125 Q52 135 60 155" stroke="#F5CBA7" strokeWidth="12" strokeLinecap="round" />
          {/* Anime sweat drop */}
          <path d="M135 60 C135 55, 142 50, 142 50 C142 50, 148 55, 148 60 C148 64, 142 67, 135 60 Z" fill="#29B6F6" />
        </g>
      )}

      {mood === 'confused' && (
        <g>
          {/* Shrugging arms with hands open */}
          <path d="M70 125 Q45 115 45 95" stroke="#F5CBA7" strokeWidth="12" strokeLinecap="round" />
          <path d="M130 125 Q155 115 155 95" stroke="#F5CBA7" strokeWidth="12" strokeLinecap="round" />
          <circle cx="45" cy="95" r="7" fill="#F5CBA7" />
          <circle cx="155" cy="95" r="7" fill="#F5CBA7" />
          {/* Big question mark floating */}
          <text x="145" y="70" fontSize="26" fill="#E91E63" fontWeight="bold">❓</text>
        </g>
      )}

      {mood === 'lonely' && (
        <g>
          {/* Slouched arms holding a gym towel, looking sad */}
          <path d="M70 130 Q60 155 75 165" stroke="#F5CBA7" strokeWidth="12" strokeLinecap="round" />
          <path d="M130 130 Q140 155 125 165" stroke="#F5CBA7" strokeWidth="12" strokeLinecap="round" />
          {/* Hanging towel */}
          <path d="M72 160 Q100 175 128 160 L124 175 Q100 190 76 175 Z" fill="#FF80AB" opacity="0.8" />
          {/* Teardrop */}
          <ellipse cx="118" cy="88" rx="2" ry="4" fill="#29B6F6" />
        </g>
      )}

      {mood === 'celebrating' && (
        <g>
          {/* High cheering arms */}
          <path d="M70 125 Q45 90 55 65" stroke="#F5CBA7" strokeWidth="12" strokeLinecap="round" />
          <path d="M130 125 Q155 90 145 65" stroke="#F5CBA7" strokeWidth="12" strokeLinecap="round" />
          <circle cx="55" cy="65" r="7" fill="#F5CBA7" />
          <circle cx="145" cy="65" r="7" fill="#F5CBA7" />
          <text x="40" y="55" fontSize="18">🥳</text>
          <text x="140" y="55" fontSize="18">🎂</text>
        </g>
      )}

      {/* Head & Neck Base */}
      <rect x="94" y="98" width="12" height="15" rx="6" fill="#F5CBA7" />
      <circle cx="100" cy="75" r="30" fill="#F5CBA7" />
      {/* Ears */}
      <circle cx="69" cy="76" r="6" fill="#F5CBA7" />
      <circle cx="131" cy="76" r="6" fill="#F5CBA7" />

      {/* FULL, STYLISH MODERN HAIR (Drawn on TOP of head) */}
      <g id="stylish-hair">
        {/* Hair base covering top and sides */}
        <path
          d="M68 76 C66 52, 75 35, 100 35 C125 35, 134 52, 132 76 C131 72, 126 62, 124 58 C116 52, 108 55, 96 52 C84 56, 76 60, 72 68 Z"
          fill="#1E272C"
        />
        {/* Modern textured quiff & volume layers */}
        <path
          d="M72 52 C70 38, 85 30, 104 32 C122 34, 132 42, 130 54 C120 44, 108 40, 94 42 C82 44, 76 48, 72 52 Z"
          fill="#2C3840"
        />
        {/* Front textured fringe/bangs */}
        <path
          d="M72 62 Q80 50 92 56 Q104 48 116 55 Q126 53 128 62 Q120 56 108 58 Q94 56 82 60 Z"
          fill="#1E272C"
        />
        {/* Hair strands & highlights */}
        <path d="M85 38 Q95 34 105 35" stroke="#455A64" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M92 44 Q104 40 115 42" stroke="#455A64" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Sideburns */}
        <path d="M70 68 L70 76 L73 72 Z" fill="#1E272C" />
        <path d="M130 68 L130 76 L127 72 Z" fill="#1E272C" />
      </g>

      {/* Face Features */}
      {mood === 'confused' ? (
        <g>
          {/* One raised eyebrow, one low */}
          <path d="M80 62 Q87 56 94 62" stroke="#263238" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M106 66 Q113 72 120 67" stroke="#263238" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Dot eyes */}
          <ellipse cx="87" cy="74" rx="4" ry="5" fill="#263238" />
          <ellipse cx="113" cy="74" rx="4" ry="5" fill="#263238" />
          {/* Wavy mouth */}
          <path d="M92 90 Q96 85 100 90 Q104 95 108 90" stroke="#263238" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      ) : mood === 'irritated' ? (
        <g>
          {/* Angled annoyed brows */}
          <path d="M80 66 L94 62" stroke="#263238" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M106 62 L120 66" stroke="#263238" strokeWidth="2.5" strokeLinecap="round" />
          {/* Side-eye look */}
          <ellipse cx="85" cy="74" rx="4" ry="4" fill="#263238" />
          <ellipse cx="111" cy="74" rx="4" ry="4" fill="#263238" />
          {/* Flat straight mouth line */}
          <line x1="92" y1="89" x2="108" y2="89" stroke="#263238" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      ) : mood === 'lonely' ? (
        <g>
          {/* Sad downturned brows */}
          <path d="M80 64 Q87 68 94 65" stroke="#263238" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M106 65 Q113 68 120 64" stroke="#263238" strokeWidth="2" strokeLinecap="round" fill="none" />
          <ellipse cx="87" cy="75" rx="4" ry="5" fill="#263238" />
          <ellipse cx="113" cy="75" rx="4" ry="5" fill="#263238" />
          {/* Sad frown */}
          <path d="M94 92 Q100 86 106 92" stroke="#263238" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>
      ) : (
        /* Friendly workout smile */
        <g>
          <path d="M80 64 Q87 61 94 64" stroke="#263238" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M106 64 Q113 61 120 64" stroke="#263238" strokeWidth="2" strokeLinecap="round" fill="none" />
          <ellipse cx="87" cy="73" rx="4.5" ry="5.5" fill="#263238" />
          <ellipse cx="113" cy="73" rx="4.5" ry="5.5" fill="#263238" />
          <circle cx="85" cy="71" r="1.5" fill="#FFFFFF" />
          <circle cx="111" cy="71" r="1.5" fill="#FFFFFF" />
          <path d="M93 87 Q100 94 107 87" stroke="#263238" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>
      )}

      <defs>
        <radialGradient id="blueGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#90CAF9" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#90CAF9" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};

// Cute Feminine Gym Assets & Badges
export const PinkDumbbellIcon: React.FC<{ size?: number; className?: string }> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="18" y="21" width="12" height="6" rx="2" fill="#E91E63" />
    <rect x="10" y="14" width="8" height="20" rx="4" fill="#FF80AB" />
    <rect x="6" y="17" width="5" height="14" rx="2.5" fill="#F48FB1" />
    <rect x="30" y="14" width="8" height="20" rx="4" fill="#FF80AB" />
    <rect x="37" y="17" width="5" height="14" rx="2.5" fill="#F48FB1" />
    {/* Cute Ribbon on center bar */}
    <circle cx="24" cy="24" r="3" fill="#FFF" />
    <path d="M22 22 Q17 18 20 14 Q23 18 22 22" fill="#FF4081" />
    <path d="M26 22 Q31 18 28 14 Q25 18 26 22" fill="#FF4081" />
  </svg>
);

export const CuteWaterBottle: React.FC<{ size?: number; className?: string }> = ({ size = 36, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    {/* Bottle Body */}
    <rect x="14" y="16" width="20" height="26" rx="6" fill="#F8BBD0" stroke="#F06292" strokeWidth="2" />
    {/* Cap */}
    <rect x="18" y="10" width="12" height="6" rx="2" fill="#E91E63" />
    <rect x="22" y="6" width="4" height="4" rx="1" fill="#C2185B" />
    {/* Water measurement lines */}
    <line x1="18" y1="22" x2="22" y2="22" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="18" y1="28" x2="24" y2="28" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="18" y1="34" x2="21" y2="34" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
    {/* Cute Heart on bottle */}
    <text x="22" y="30" fontSize="10">💗</text>
  </svg>
);

export const PinkGymBag: React.FC<{ size?: number; className?: string }> = ({ size = 40, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 50 50" fill="none" className={className}>
    <ellipse cx="25" cy="30" rx="18" ry="12" fill="#F48FB1" stroke="#D81B60" strokeWidth="2" />
    <path d="M15 25 C15 14, 35 14, 35 25" stroke="#C2185B" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M12 28 Q25 32 38 28" stroke="#FFF" strokeWidth="2" strokeDasharray="3 2" />
    <circle cx="34" cy="32" r="3" fill="#FFF" />
    <text x="31" y="35" fontSize="8">🎀</text>
  </svg>
);

// Hyderabad Doodle Illustration (Charminar silhouette + pink pin + sparkles)
export const HyderabadIllustration: React.FC<{ size?: number; className?: string }> = ({ size = 180, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className}>
    {/* Pastel sky glow */}
    <circle cx="100" cy="100" r="90" fill="#FFF3E0" />
    
    {/* Charminar Silhouette */}
    <g fill="#F48FB1" opacity="0.95">
      {/* Base */}
      <rect x="40" y="110" width="120" height="60" rx="4" />
      {/* Central Arch */}
      <path d="M75 170 L75 130 Q100 115 125 130 L125 170 Z" fill="#FFF3E0" />
      {/* 4 Minarets */}
      <rect x="42" y="60" width="14" height="60" rx="2" />
      <path d="M38 60 L49 42 L60 60 Z" />
      <rect x="144" y="60" width="14" height="60" rx="2" />
      <path d="M140 60 L151 42 L162 60 Z" />
      <rect x="70" y="75" width="12" height="40" rx="2" />
      <path d="M68 75 L76 60 L84 75 Z" />
      <rect x="118" y="75" width="12" height="40" rx="2" />
      <path d="M116 75 L124 60 L132 75 Z" />
    </g>

    {/* Location Pin */}
    <g className="bounce-anim">
      <path
        d="M100 35 C90 35, 82 43, 82 53 C82 66, 100 82, 100 82 C100 82, 118 66, 118 53 C118 43, 110 35, 100 35 Z"
        fill="#E91E63"
      />
      <circle cx="100" cy="52" r="6" fill="#FFF" />
      <text x="96" y="55" fontSize="8" fontWeight="bold">📍</text>
    </g>

    {/* Sparkles and clouds */}
    <path d="M25 80 Q35 70 45 80 Q55 70 65 80" stroke="#FF80AB" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
    <text x="25" y="50" fontSize="14">✨</text>
    <text x="155" y="75" fontSize="14">🌸</text>
    <text x="140" y="165" fontSize="22">🥘</text>
  </svg>
);

// Empty Gym Illustration (Empty pink bench, 2 lonely dumbbells, clock, mirror)
export const EmptyGymIllustration: React.FC<{ size?: number; className?: string }> = ({ size = 180, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className}>
    {/* Gym background wall */}
    <rect x="15" y="15" width="170" height="170" rx="16" fill="#FCE4EC" />
    
    {/* Wall Mirror */}
    <rect x="40" y="30" width="120" height="70" rx="6" fill="#FFF9F5" stroke="#F8BBD0" strokeWidth="3" />
    <line x1="55" y1="35" x2="85" y2="95" stroke="#FCE4EC" strokeWidth="2" opacity="0.8" />
    <line x1="75" y1="35" x2="105" y2="95" stroke="#FCE4EC" strokeWidth="2" opacity="0.8" />

    {/* Empty Workout Bench */}
    <rect x="45" y="130" width="110" height="14" rx="4" fill="#F06292" />
    <line x1="60" y1="144" x2="60" y2="168" stroke="#880E4F" strokeWidth="6" strokeLinecap="round" />
    <line x1="140" y1="144" x2="140" y2="168" stroke="#880E4F" strokeWidth="6" strokeLinecap="round" />
    <line x1="50" y1="168" x2="150" y2="168" stroke="#880E4F" strokeWidth="4" strokeLinecap="round" />

    {/* Sign on bench: "Reserved for Shivani" */}
    <rect x="65" y="112" width="70" height="18" rx="4" fill="#FFF" stroke="#E91E63" strokeWidth="1.5" />
    <text x="70" y="125" fontSize="7" fill="#C2185B" fontWeight="bold">RESERVED FOR SHIVANI 🎀</text>

    {/* Lonely dumbbells on the floor */}
    <g transform="translate(30, 160)">
      <rect x="12" y="8" width="10" height="4" rx="1" fill="#880E4F" />
      <circle cx="10" cy="10" r="5" fill="#FF80AB" />
      <circle cx="24" cy="10" r="5" fill="#FF80AB" />
    </g>
    <g transform="translate(130, 160)">
      <rect x="12" y="8" width="10" height="4" rx="1" fill="#880E4F" />
      <circle cx="10" cy="10" r="5" fill="#FF80AB" />
      <circle cx="24" cy="10" r="5" fill="#FF80AB" />
    </g>

    {/* Tumbleweed / cricket chirp visual */}
    <text x="88" y="98" fontSize="16">🦗</text>
    <text x="96" y="90" fontSize="10" fill="#999">zzzz...</text>
  </svg>
);
