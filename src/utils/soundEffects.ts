"use client";

class SoundManager {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  constructor() {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("codexa_sound_enabled");
      if (saved !== null) {
        this.enabled = saved === "true";
      }
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
    if (typeof window !== "undefined") {
      localStorage.setItem("codexa_sound_enabled", String(val));
    }
    if (val) {
      this.playClick();
    }
  }

  // Soft sci-fi button hover blip (1200Hz -> 900Hz, 30ms)
  public playHover() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1100, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.035);
    } catch {
      // AudioContext safe catch
    }
  }

  // Punchy tactile click sound (450Hz -> 180Hz)
  public playClick() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // AudioContext safe catch
    }
  }

  // Sci-fi robot voice chirp (Three.js robot click)
  public playRobot() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(700, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.07);
      osc.frequency.exponentialRampToValueAtTime(950, ctx.currentTime + 0.14);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // AudioContext safe catch
    }
  }

  // Form submit / quote success chime (Harmonic C5 -> E5)
  public playSuccess() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.09);

        gain.gain.setValueAtTime(0.06, now + i * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.09);
        osc.stop(now + i * 0.09 + 0.28);
      });
    } catch {
      // AudioContext safe catch
    }
  }

  // Robot speech voice synthesis
  public speak(text: string, onEnd?: () => void) {
    if (!this.enabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const speakNow = () => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.05;
        utterance.volume = 1.0;

        const voices = window.speechSynthesis.getVoices();
        const preferredVoice =
          voices.find(
            (v) =>
              v.lang.startsWith("en") &&
              (v.name.includes("Zira") ||
                v.name.includes("Aria") ||
                v.name.includes("Jenny") ||
                v.name.includes("Samantha") ||
                v.name.includes("Victoria") ||
                v.name.includes("Google US English") ||
                v.name.toLowerCase().includes("female"))
          ) ||
          voices.find((v) => v.name.includes("Google") && v.lang.startsWith("en")) ||
          voices.find((v) => v.lang.startsWith("en"));

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        if (onEnd) {
          utterance.onend = onEnd;
        }
        window.speechSynthesis.speak(utterance);
      };

      if (window.speechSynthesis.getVoices().length > 0) {
        speakNow();
      } else {
        window.speechSynthesis.onvoiceschanged = () => {
          speakNow();
          window.speechSynthesis.onvoiceschanged = null;
        };
      }
    } catch {
      // Safe catch
    }
  }
}

export const sounds = new SoundManager();
