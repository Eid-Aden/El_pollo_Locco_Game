/**
 * Displays the character's health status as a visual bar.
 * Inherits from DrawableObj.
 */
class Statusbar extends DrawableObj {
  /**
   * @type {string[]} Array of health bar image paths (0% to 100%)
   */
  IMAGES_STATUSBAR_HEALTH = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
  ];

  /** @type {number} Current health level (0–5) */
  health = 5;

  constructor() {
    super();
    this.loadImages(this.IMAGES_STATUSBAR_HEALTH);
    this.x = 50;
    this.y = 0;
    this.height = 50;
    this.width = 250;
    this.img = this.getCurrentHealthImage();
  }

  /**
   * Updates the health bar based on the character's energy (0–100).
   * @param {number} energy - The current energy value of the character.
   */
  updateHealthBar(energy) {
    if (energy > 80) {
      this.health = 5;
    } else if (energy > 60) {
      this.health = 4;
    } else if (energy > 40) {
      this.health = 3;
    } else if (energy > 20) {
      this.health = 2;
    } else if (energy > 0) {
      this.health = 1;
    } else {
      this.health = 0;
    }

    this.img = this.getCurrentHealthImage();
  }

  /**
   * Returns the current image object for the health bar.
   * @returns {HTMLImageElement|null} The cached image for current health level.
   */
  getCurrentHealthImage() {
    if (this.health === undefined || this.health === null) {
      this.health = 5;
    }
    const index = Math.max(0, Math.min(5, this.health));
    const imagePath = this.IMAGES_STATUSBAR_HEALTH[index];
    return DrawableObj.globalImageCache[imagePath] || null;
  }
}
