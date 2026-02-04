// SOUND MANAGER v3 - With capture phase for game pages
const SoundManager = {
    ctx: null,
    enabled: true,
    unlocked: false,

    _ensureContext() {
        if (!this.ctx) {
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                this.ctx = new AudioContext();

            } catch (e) {
                console.warn('[Sound] AudioContext not supported');
                return false;
            }
        }
        return true;
    },

    async _unlock() {
        if (this.unlocked) return;

        this._ensureContext();
        if (this.ctx && this.ctx.state === 'suspended') {
            await this.ctx.resume();

        }
        this.unlocked = true;
    },

    init() {
        this.enabled = localStorage.getItem('sound_enabled') !== 'false';
    },

    toggle() {
        this._unlock();
        this.enabled = !this.enabled;
        localStorage.setItem('sound_enabled', this.enabled ? 'true' : 'false');
        if (this.enabled) this.play('click');
        return this.enabled;
    },

    play(type) {
        if (!this.enabled) return;
        if (!this._ensureContext()) return;

        // Force resume in case still suspended
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }



        try {
            switch (type) {
                case 'click':
                    this._beep(880, 0.08, 0.4);
                    break;
                case 'move':
                    this._beep(440, 0.1, 0.25);
                    break;
                case 'correct':
                    this._beep(660, 0.15, 0.3);
                    break;
                case 'error':
                    this._beep(220, 0.2, 0.25);
                    break;
                case 'win':
                    // Victory fanfare - louder and longer
                    this._beep(523, 0.15, 0.35);   // C5
                    setTimeout(() => this._beep(659, 0.15, 0.35), 150);   // E5
                    setTimeout(() => this._beep(784, 0.15, 0.35), 300);   // G5
                    setTimeout(() => this._beep(1047, 0.4, 0.4), 450);    // C6
                    break;
            }
        } catch (e) {
            console.error('[Sound] Error:', e);
        }
    },

    _beep(freq, duration, volume) {
        if (!this.ctx || this.ctx.state !== 'running') {
            console.warn('[Sound] Context not ready, state:', this.ctx?.state);
            return;
        }

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sine';
        osc.frequency.value = freq;

        const now = this.ctx.currentTime;
        gain.gain.setValueAtTime(volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.start(now);
        osc.stop(now + duration);
    }
};

SoundManager.init();

// CRITICAL: Use capture phase to catch events BEFORE stopPropagation
// This ensures we unlock audio even if game code stops event bubbling
document.addEventListener('click', () => SoundManager._unlock(), { capture: true, passive: true });
document.addEventListener('touchstart', () => SoundManager._unlock(), { capture: true, passive: true });
document.addEventListener('keydown', () => SoundManager._unlock(), { capture: true, passive: true });
