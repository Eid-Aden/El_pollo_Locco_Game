/**
 * Represents a cloud object that moves slowly across the screen.
 * Inherits from MovableObjects.
 */
class Cloud extends MovableObjects {
  y = 20;
  width = 650;
  height = 100;

  /**
   * Creates a new Cloud instance.
   * Loads the cloud image, assigns a random X position, and starts animation.
   */
  constructor() {
    super();
    this.loadImage('img/5_background/layers/4_clouds/full.png');

    // Random horizontal position between 200 and 700
    this.x = 200 + Math.random() * 500;

    this.animate();
  }

  /**
   * Starts the cloud's leftward movement.
   */
  animate() {
    this.movLeft();
  }

  /**
   * Moves the cloud continuously to the left at its speed.
   * Uses a fixed interval for smooth animation.
   */
  movLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}
