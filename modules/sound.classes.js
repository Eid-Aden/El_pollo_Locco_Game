class SoundManager {
  static sounds = [];
  static isMuted = false;

  static register(sound) {
    this.sounds.push(sound);
  }

  static muteAll() {
    this.isMuted = true;
    this.sounds.forEach((sound) => {
      sound.pause();
      sound.currentTime = 0;
    });
  }

  static unmuteAll() {
    this.isMuted = false;
  }

  static play(sound) {
    if (!this.isMuted) {
      sound.play();
    }
  }
}
