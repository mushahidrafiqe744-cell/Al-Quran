// Female Voice (Qariah & Translation) Speech Engine

export interface VoicePlayOptions {
  text: string;
  lang?: 'ar' | 'ur' | 'en';
  rate?: number;
  pitch?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

class VoiceEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeakingState: boolean = false;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  public getAvailableFemaleVoice(lang: 'ar' | 'ur' | 'en'): SpeechSynthesisVoice | null {
    if (!this.voices || this.voices.length === 0) {
      this.loadVoices();
    }

    const langPrefix = lang === 'ar' ? 'ar' : lang === 'ur' ? 'ur' : 'en';
    const langVoices = this.voices.filter(v => v.lang.toLowerCase().startsWith(langPrefix));

    // Priority keywords for female voices across OS and browsers
    const femaleKeywords = [
      'female', 'woman', 'zira', 'samantha', 'karen', 'victoria', 'heera',
      'salma', 'fatima', 'amira', 'laila', 'noor', 'maryam', 'zari', 'natural',
      'google uk english female', 'google us english female', 'microsoft'
    ];

    for (const kw of femaleKeywords) {
      const match = langVoices.find(v => v.name.toLowerCase().includes(kw));
      if (match) return match;
    }

    // Fallback: any voice matching target language
    if (langVoices.length > 0) {
      return langVoices[0];
    }

    // Fallback for Urdu / Arabic: if no specific voice installed, try closest voice or default
    return this.voices.find(v => v.name.toLowerCase().includes('female')) || this.voices[0] || null;
  }

  public speak(options: VoicePlayOptions) {
    if (!this.synth) {
      console.warn('SpeechSynthesis not supported on this browser.');
      if (options.onEnd) options.onEnd();
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(options.text);
    const lang = options.lang || 'ar';
    const femaleVoice = this.getAvailableFemaleVoice(lang);

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    if (lang === 'ar') {
      utterance.lang = 'ar-SA';
    } else if (lang === 'ur') {
      utterance.lang = 'ur-PK';
    } else {
      utterance.lang = 'en-US';
    }

    // Feminine melodious acoustic attributes
    utterance.pitch = options.pitch ?? 1.22;
    utterance.rate = options.rate ?? (lang === 'ar' ? 0.85 : 0.92);

    utterance.onstart = () => {
      this.isSpeakingState = true;
      if (options.onStart) options.onStart();
    };

    utterance.onend = () => {
      this.isSpeakingState = false;
      this.currentUtterance = null;
      if (options.onEnd) options.onEnd();
    };

    utterance.onerror = (e) => {
      this.isSpeakingState = false;
      this.currentUtterance = null;
      // Filter out intentional cancellations
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.warn('Speech synthesis error:', e);
      }
      if (options.onEnd) options.onEnd();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public pause() {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  public resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeakingState = false;
      this.currentUtterance = null;
    }
  }

  public isSpeaking(): boolean {
    return !!this.synth && this.synth.speaking;
  }
}

export const voiceEngine = new VoiceEngine();
