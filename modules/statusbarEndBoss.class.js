/**
 * Represents the health status bar for the End Boss.
 * Extends DrawableObj to visually display the End Boss's remaining energy.
 */
class StatusBarEndBos extends DrawableObj {
  /**
   * Array of image paths representing the End Boss health bar at different percentages.
   * @type {string[]}
   */
  IMAGES = [
    'img/7_statusbars/2_statusbar_endboss/green/green0.png',
    'img/7_statusbars/2_statusbar_endboss/green/green20.png',
    'img/7_statusbars/2_statusbar_endboss/green/green40.png',
    'img/7_statusbars/2_statusbar_endboss/green/green60.png',
    'img/7_statusbars/2_statusbar_endboss/green/green80.png',
    'img/7_statusbars/2_statusbar_endboss/green/green100.png',
  ];

  /**
   * Creates an instance of the End Boss health bar.
   * Initializes the position, dimensions, and loads the images.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 500;
    this.y = 0;
    this.width = 200;
    this.height = 50;
    this.setPercentage(100);
  }

  /**
   * Sets the health percentage of the End Boss and updates the image accordingly.
   * @param {number} percent - The End Boss's current health percentage (0–100).
   */
  setPercentage(percent) {
    this.percentage = percent;
    const index = StatusBarUtil.resolveImageIndex(percent);
    const path = this.IMAGES[index];
    this.img = DrawableObj.globalImageCache[path];
  }
}
