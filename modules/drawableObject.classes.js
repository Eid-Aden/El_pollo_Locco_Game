/**
 * Base class for all drawable objects in the game.
 * Handles image loading and drawing on canvas.
 */
class DrawableObj {
  x = 200;
  y = 60;
  img;
  height = 100;
  width = 150;
  /** @type {number} Index of current animation frame */
  currentImage = 0;

  /** @type {Object.<string, HTMLImageElement>} Cached images for animation */
  imageCache = {};

  /**
   * Loads a single image.
   * @param {string} path - Path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the image on the canvas at the current position and size.
   * @param {CanvasRenderingContext2D} ctx - Canvas 2D context.
   */
  /* draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  } */

  draw(ctx) {
    if (this.img && this.img.complete && this.img.naturalWidth > 0) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } else {
      // Optional fürs Debuggen:
      // console.warn('Image not ready or broken:', this.img?.src);
    }
  }

  /**
   * Loads multiple images and stores them in the cache.
   * @param {string[]} arr - Array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      const img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
