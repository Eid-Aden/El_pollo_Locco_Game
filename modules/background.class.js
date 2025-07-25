/**
 * Represents a scrolling background layer in the game world.
 * Inherits from MovableObjects.
 */
class Background extends MovableObjects {
  width = 720;
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
    this.y = 480 - this.height;
  }
}
