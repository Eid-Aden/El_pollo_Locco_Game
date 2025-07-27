/**
 * Base class for all drawable game objects.
 * Handles position, size, image drawing, and image caching.
 */
class DrawableObj {
  x = 200;
  y = 60;
  width = 150;
  height = 100;
  img;
  currentImage = 0;

  /** Global image cache for all loaded images */
  static globalImageCache = {};

  /**
   * Loads a single image and caches it globally.
   * @param {string} path - Path to the image file.
   */
  loadImage(path) {
    if (!DrawableObj.globalImageCache[path]) {
      const img = new Image();
      img.src = path;
      DrawableObj.globalImageCache[path] = img;
    }
    this.img = DrawableObj.globalImageCache[path];
  }

  /**
   * Loads multiple images into the global cache.
   * @param {string[]} arr - Array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      if (!DrawableObj.globalImageCache[path]) {
        const img = new Image();
        img.src = path;
        DrawableObj.globalImageCache[path] = img;
      }
    });
  }

  /**
   * Draws the current image to the canvas.
   * @param {CanvasRenderingContext2D} ctx - Canvas 2D context.
   */
  draw(ctx) {
    if (this.img && this.img.complete && this.img.naturalWidth > 0) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }
}
