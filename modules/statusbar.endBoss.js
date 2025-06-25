/**
 * Displays the health bar for the Endboss.
 * Inherits from DrawableObj.
 */
class StatusBarEndBos extends DrawableObj {
  /** @type {string[]} Image paths for different Endboss health levels */
  IMAGES = [
    'img/7_statusbars/2_statusbar_endboss/green/green0.png',
    'img/7_statusbars/2_statusbar_endboss/green/green20.png',
    'img/7_statusbars/2_statusbar_endboss/green/green40.png',
    'img/7_statusbars/2_statusbar_endboss/green/green60.png',
    'img/7_statusbars/2_statusbar_endboss/green/green80.png',
    'img/7_statusbars/2_statusbar_endboss/green/green100.png',
  ];

  /** @type {number} Current health percentage of the Endboss */
  percentage = 100;

  /**
   * Initializes the Endboss health bar at default position and full health.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 500;
    this.y = 0;
    this.height = 50;
    this.width = 200;
    this.setPercentage(100);
  }

  /**
   * Updates the health bar based on Endboss health.
   * @param {number} percentages - New health value (0–100).
   */
  setPercentage(percentages) {
    this.percentage = percentages;
    const path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines which image to display based on current percentage.
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
