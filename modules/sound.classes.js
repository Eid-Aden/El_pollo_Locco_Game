class SoundManager {
  static sounds = [];
  static isMuted = false;

  static register(sound) {
    if (sound instanceof Audio) {
      this.sounds.push(sound);
    }
  }

  static muteAll() {
    this.isMuted = true;
    this.pauseAll();
  }

  static unmuteAll() {
    this.isMuted = false;
  }

  static play(sound) {
    if (!this.isMuted && sound instanceof Audio) {
      sound.play();
    }
  }

  static pauseAll() {
    this.sounds.forEach((sound) => {
      if (sound && typeof sound.pause === 'function') {
        try {
          if (!sound.paused) {
            sound.pause();
            sound.currentTime = 0;
          }
        } catch (e) {
          console.warn('Fehler beim Stoppen von Sound:', e);
        }
      }
    });
  }
}
