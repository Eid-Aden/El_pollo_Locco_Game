/**
 * Global sound controller for managing all game audio.
 * Provides mute, unmute, play, and pause functionalities for registered sounds.
 */
class SoundManager {
  /** @type {Audio[]} List of registered audio elements */
  static sounds = [];

  /** @type {boolean} Flag indicating whether all sounds are muted */
  static isMuted = false;

  /**
   * Registers a sound to be controlled by the SoundManager.
   * @param {Audio} sound - The audio object to register.
   */
  static register(sound) {
    if (sound instanceof Audio) {
      this.sounds.push(sound);
    }
  }

  /**
   * Mutes all registered sounds and stops any playing audio.
   */
  static muteAll() {
    this.isMuted = true;
    this.pauseAll();
  }

  /**
   * Unmutes the SoundManager, allowing sounds to be played again.
   */
  static unmuteAll() {
    this.isMuted = false;
  }

  /**
   * Plays a sound if not muted.
   * @param {Audio} sound - The audio object to play.
   */
  static play(sound) {
    if (!this.isMuted && sound instanceof Audio) {
      sound.play();
    }
  }

  /**
   * Pauses and resets all registered sounds.
   */

  /**
   * Pauses and resets all registered sounds safely.
   */
  static pauseAll() {
    this.sounds.forEach((sound) => {
      if (sound && typeof sound.pause === 'function') {
        try {
          // Nur pausieren, wenn der Sound gerade läuft oder bereit ist
          if (!sound.paused && sound.readyState >= 2) {
            sound.pause();
            sound.currentTime = 0;
          }
        } catch (e) {
          console.warn('Error stopping sound:', e);
        }
      }
    });
  }

  /* static pauseAll() {
    this.sounds.forEach((sound) => {
      if (sound && typeof sound.pause === 'function') {
        try {
          if (!sound.paused) {
            sound.pause();
            sound.currentTime = 0;
          }
        } catch (e) {
          console.warn('Error stopping sound:', e);
        }
      }
    });
  } */
}
