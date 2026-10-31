// Web Audio API procedural music box & sound effects engine for Shivani's Birthday Wonderland

class SoundEngine {
  private ctx: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private isPlayingMusic: boolean = false;
  private isMuted: boolean = false;
  private musicTimeout: number | null = null;
  private noteIndex: number = 0;
  private volume: number = 0.35;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.musicGain = this.ctx.createGain();
      this.sfxGain = this.ctx.createGain();

      this.musicGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.sfxGain.gain.setValueAtTime(0.5, this.ctx.currentTime);

      this.musicGain.connect(this.ctx.destination);
      this.sfxGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a music box note (warm sine with subtle overtone)
  private playMusicBoxNote(freq: number, duration: number = 0.8, timeOffset: number = 0) {
    if (!this.ctx || !this.musicGain || this.isMuted) return;

    const startTime = this.ctx.currentTime + timeOffset;
    
    // Fundamental
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, startTime);

    // Overtone (music box sparkle)
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.756, startTime); // metallic chime ratio

    gain1.gain.setValueAtTime(0.001, startTime);
    gain1.gain.linearRampToValueAtTime(0.3, startTime + 0.02);
    gain1.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    gain2.gain.setValueAtTime(0.001, startTime);
    gain2.gain.linearRampToValueAtTime(0.06, startTime + 0.015);
    gain2.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.6);

    osc1.connect(gain1);
    osc2.connect(gain2);

    gain1.connect(this.musicGain);
    gain2.connect(this.musicGain);

    osc1.start(startTime);
    osc2.start(startTime);

    osc1.stop(startTime + duration + 0.1);
    osc2.stop(startTime + duration + 0.1);
  }

  // Soft background chords (C, G, Am, F)
  private playWarmPad(freqs: number[], duration: number = 2.4, timeOffset: number = 0) {
    if (!this.ctx || !this.musicGain || this.isMuted) return;

    const startTime = this.ctx.currentTime + timeOffset;
    freqs.forEach(freq => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(0.035, startTime + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.musicGain!);

      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  }

  // Happy Birthday Melody in C Major
  // G4=392, A4=440, B4=493.88, C5=523.25, D5=587.33, E5=659.25, F5=698.46, G5=783.99
  private readonly melody: Array<{ note: number; dur: number; pad?: number[] }> = [
    // Phrase 1
    { note: 392, dur: 0.35, pad: [261.63, 329.63, 392] }, // G4 (C chord)
    { note: 392, dur: 0.25 },
    { note: 440, dur: 0.6 },                              // A4
    { note: 392, dur: 0.6 },                              // G4
    { note: 523.25, dur: 0.6 },                           // C5
    { note: 493.88, dur: 1.2 },                           // B4

    // Phrase 2
    { note: 392, dur: 0.35, pad: [196, 293.66, 392] },   // G4 (G chord)
    { note: 392, dur: 0.25 },
    { note: 440, dur: 0.6 },                              // A4
    { note: 392, dur: 0.6 },                              // G4
    { note: 587.33, dur: 0.6 },                           // D5
    { note: 523.25, dur: 1.2 },                           // C5

    // Phrase 3: Happy birthday dear Shivani
    { note: 392, dur: 0.35, pad: [220, 261.63, 329.63] },// G4 (Am chord)
    { note: 392, dur: 0.25 },
    { note: 783.99, dur: 0.6 },                           // G5
    { note: 659.25, dur: 0.6 },                           // E5
    { note: 523.25, dur: 0.6 },                           // C5
    { note: 493.88, dur: 0.6 },                           // B4
    { note: 440, dur: 1.1 },                              // A4

    // Phrase 4: Happy birthday to you
    { note: 698.46, dur: 0.35, pad: [174.61, 261.63, 349.23] }, // F5 (F chord)
    { note: 698.46, dur: 0.25 },
    { note: 659.25, dur: 0.6 },                           // E5
    { note: 523.25, dur: 0.6 },                           // C5
    { note: 587.33, dur: 0.7 },                           // D5
    { note: 523.25, dur: 1.8, pad: [261.63, 392, 523.25] }, // C5 final resolution
  ];

  public startMusic() {
    this.initContext();
    if (this.isPlayingMusic) return;
    this.isPlayingMusic = true;
    this.noteIndex = 0;
    this.stepMusicLoop();
  }

  private stepMusicLoop() {
    if (!this.isPlayingMusic) return;

    const current = this.melody[this.noteIndex];
    this.playMusicBoxNote(current.note, Math.max(0.7, current.dur * 1.5));
    if (current.pad) {
      this.playWarmPad(current.pad, 2.5);
    }

    const stepDelay = current.dur * 700; // gentle lofi tempo
    this.noteIndex = (this.noteIndex + 1) % this.melody.length;

    // Small pause between loops
    const nextDelay = this.noteIndex === 0 ? stepDelay + 1400 : stepDelay;
    this.musicTimeout = window.setTimeout(() => this.stepMusicLoop(), nextDelay);
  }

  public pauseMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimeout) {
      clearTimeout(this.musicTimeout);
      this.musicTimeout = null;
    }
  }

  public toggleMusic(): boolean {
    if (this.isPlayingMusic) {
      this.pauseMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.musicGain && this.ctx) {
      this.musicGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public setVolume(v: number) {
    this.volume = Math.max(0, Math.min(1, v));
    if (this.musicGain && this.ctx && !this.isMuted) {
      this.musicGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlayingMusic;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // --- Sound Effects ---

  // Cute bubble / button click
  public playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(1200, t + 0.08);

    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.12);
  }

  // Blow out candle sound: gentle breath / wind + soft high chime
  public playBlowSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const t = this.ctx.currentTime;
    const dur = 1.0;

    // Breath noise
    const bufferSize = this.ctx.sampleRate * dur;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(900, t);
    filter.frequency.exponentialRampToValueAtTime(350, t + dur);
    filter.Q.setValueAtTime(2, t);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.001, t);
    noiseGain.gain.linearRampToValueAtTime(0.28, t + 0.2);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.sfxGain);

    noise.start(t);
    noise.stop(t + dur);

    // Magical chime when blown out
    [1046.5, 1318.5, 1567.98].forEach((f, idx) => {
      const osc = this.ctx!.createOscillator();
      const g = this.ctx!.createGain();
      const st = t + 0.4 + idx * 0.1;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, st);

      g.gain.setValueAtTime(0.08, st);
      g.gain.exponentialRampToValueAtTime(0.0001, st + 0.6);

      osc.connect(g);
      g.connect(this.sfxGain!);
      osc.start(st);
      osc.stop(st + 0.7);
    });
  }

  // Cake slicing sound (creamy gentle swoosh + sweet chime)
  public playCutSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const t = this.ctx.currentTime;
    const dur = 0.55;

    // Knife glide frequency drop
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(450, t);
    osc.frequency.exponentialRampToValueAtTime(180, t + dur);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.18, t + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + dur);

    // Sparkle chime
    const sparkle = this.ctx.createOscillator();
    const sparkleGain = this.ctx.createGain();
    sparkle.type = 'sine';
    sparkle.frequency.setValueAtTime(1396.9, t + 0.15);
    sparkleGain.gain.setValueAtTime(0.09, t + 0.15);
    sparkleGain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

    sparkle.connect(sparkleGain);
    sparkleGain.connect(this.sfxGain);

    sparkle.start(t + 0.15);
    sparkle.stop(t + 0.55);
  }

  // Confetti celebration fanfare
  public playConfettiPop() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const t = this.ctx.currentTime;

    // Pop
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.exponentialRampToValueAtTime(70, t + 0.1);

    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.14);

    // Arpeggio sparkle
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    notes.forEach((freq, i) => {
      const o = this.ctx!.createOscillator();
      const g = this.ctx!.createGain();
      const startTime = t + 0.04 + i * 0.05;

      o.type = 'sine';
      o.frequency.setValueAtTime(freq, startTime);

      g.gain.setValueAtTime(0.001, startTime);
      g.gain.linearRampToValueAtTime(0.12, startTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.4);

      o.connect(g);
      g.connect(this.sfxGain!);

      o.start(startTime);
      o.stop(startTime + 0.45);
    });
  }

  // Playful cartoon boing / unfunny joke buzzer
  public playJokeBuzzer() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const t = this.ctx.currentTime;

    // Cartoon wah-wah / boing
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.linearRampToValueAtTime(260, t + 0.18);
    osc.frequency.linearRampToValueAtTime(200, t + 0.4);

    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.5);
  }

  // Triumphant Trophy Fanfare
  public playFanfare() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const t = this.ctx.currentTime;
    const notes = [
      { f: 523.25, d: 0.12 },
      { f: 659.25, d: 0.12 },
      { f: 783.99, d: 0.15 },
      { f: 1046.5, d: 0.5 },
    ];

    let offset = 0;
    notes.forEach((item) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const st = t + offset;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.f, st);

      gain.gain.setValueAtTime(0.001, st);
      gain.gain.linearRampToValueAtTime(0.18, st + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, st + item.d + 0.1);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(st);
      osc.stop(st + item.d + 0.15);
      offset += item.d;
    });
  }

  // Gym bell chime
  public playGymBell() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;

    const t = this.ctx.currentTime;
    [1200, 2400].forEach(f => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(t);
      osc.stop(t + 1.3);
    });
  }
}

export const sound = new SoundEngine();
