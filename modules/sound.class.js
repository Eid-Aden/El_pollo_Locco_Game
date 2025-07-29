/**
 * @class SoundManager
 * @description
 * Global controller for all game audio. Provides methods to register,
 * play, pause, mute, and unmute audio elements in a unified way.
 */
class SoundManager {
  /**
   * @type {Audio[]}
   * @private
   * Collection of all registered Audio instances.
   */
  static sounds = [];

  /**
   * @type {boolean}
   * @private
   * Flag indicating whether all sounds are currently muted.
   */
  static isMuted = false;

  /**
   * Register an Audio instance for global control.
   *
   * @param {Audio} sound - The Audio object to register.
   */
  static register(sound) {
    if (sound instanceof Audio) {
      this.sounds.push(sound);
    }
  }

  /**
   * Mute all registered sounds and reset playback positions.
   *
   * @example
   * SoundManager.muteAll();
   */
  static muteAll() {
    this.isMuted = true;
    localStorage.setItem('soundMuted', 'true');
    this.pauseAll();
  }

  /**
   * Unmute all sounds and resume background music if available.
   *
   * @example
   * SoundManager.unmuteAll();
   */
  static unmuteAll() {
    this.isMuted = false;
    localStorage.setItem('soundMuted', 'false');
    this.resumeBackgroundMusic();
  }

  /**
   * Play or restart a specific sound if not muted.
   * If the sound is already playing, its playback will reset to the start.
   *
   * @param {Audio} sound - The Audio object to play.
   */
  static play(sound) {
    if (this.isMuted || !(sound instanceof Audio)) return;

    // Restart if already playing, otherwise start fresh
    if (!sound.paused) {
      sound.currentTime = 0;
    } else {
      sound.play();
    }
  }

  /**
   * Pause and reset all registered sounds.
   *
   * @example
   * SoundManager.pauseAll();
   */
  static pauseAll() {
    this.sounds.forEach((s) => {
      if (!s.paused && s.readyState >= 2) {
        s.pause();
        s.currentTime = 0;
      }
    });
  }

  /**
   * Initialize mute state from localStorage.
   * Reads the 'soundMuted' key and applies it on load.
   *
   * @example
   * SoundManager.initFromStorage();
   */
  static initFromStorage() {
    this.isMuted = localStorage.getItem('soundMuted') === 'true';
  }

  /**
   * Resume background music if it was previously registered.
   * Looks for an Audio whose src contains 'game-background-sound'.
   */
  static resumeBackgroundMusic() {
    const bg = this.sounds.find((s) => typeof s.src === 'string' && s.src.includes('game-background-sound'));
    if (bg && bg.paused) {
      bg.play();
    }
  }
}
