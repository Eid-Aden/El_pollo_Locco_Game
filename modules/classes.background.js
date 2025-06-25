/**
 * Represents a scrolling background layer in the game world.
 * Inherits from MovableObjects.
 */
class Background extends MovableObjects {
  /** @type {number} Width of the background image */
  width = 720;

  /** @type {number} Height of the background image */
  height = 480;

  /**
   * Creates a background object positioned horizontally at `x`.
   * @param {string} pathImage - File path to the background image.
   * @param {number} x - Horizontal position in the level.
   */
  constructor(pathImage, x) {
    super();
    this.loadImage(pathImage);
    this.x = x;
    this.y = 480 - this.height; // Align with bottom of canvas
  }
}
