/**
 * Displays the character's health status as a visual bar.
 * Inherits from DrawableObj.
 */
class Statusbar extends DrawableObj {
  /** @type {string[]} Image paths representing different health levels */
  IMAGES = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
  ];

  /** @type {number} Current health percentage (0–100) */
  percentage = 100;

  /**
   * Initializes the status bar with default position and full health.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 50;
    this.y = 0;
    this.height = 50;
    this.width = 250;
    this.setPercentage(100);
  }

  /**
   * Updates the status bar based on current percentage.
   * @param {number} percentages - New health value (0–100).
   */
  setPercentage(percentages) {
    this.percentage = percentages;
    const path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines which image index to use based on current percentage.
   * @returns {number} Index of the image in the IMAGES array.
   */
  resolveImageIndex() {
    if (this.percentage === 100) return 5;
    if (this.percentage > 80) return 4;
    if (this.percentage > 60) return 3;
    if (this.percentage > 40) return 2;
    if (this.percentage > 20) return 1;
    return 0;
  }
}
