/**
 * Represents the status bar for collected bottles in the game.
 * Extends the DrawableObj to visually display the bottle collection progress.
 */
class Bottles extends DrawableObj {
  /**
   * Array of image paths representing the bottle status bar at different collection percentages.
   * @type {string[]}
   */
  BOTTLE_IMAGES = [
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
  ];

  /**
   * Percentage of collected bottles (0–100).
   * @type {number}
   */
  percentage = 0;

  /**
   * Current number of collected bottles.
   * @type {number}
   */
  collectedBottles = 0;

  /**
   * Total number of bottles to collect in the level.
   * @type {number}
   */
  totalBottles = 10;

  /**
   * Creates an instance of the Bottles status bar.
   * Initializes the bar's position, dimensions, and initial image.
   */
  constructor() {
    super();
    this.loadImages(this.BOTTLE_IMAGES);
    this.x = 50;
    this.y = 80;
    this.width = 250;
    this.height = 50;
    this.setPercentage(0, this.totalBottles);
  }

  /**
   * Updates the bottle status bar based on the number of collected and total bottles.
   * @param {number} collected - Number of bottles collected.
   * @param {number} total - Total number of bottles available.
   */
  setPercentage(collected, total) {
    this.collectedBottles = collected;
    this.totalBottles = total;
    this.percentage = total > 0 ? (collected / total) * 100 : 0;
    const index = StatusBarUtil.resolveImageIndex(this.percentage);
    const path = this.BOTTLE_IMAGES[index];
    this.img = DrawableObj.globalImageCache[path];
  }

  /**
   * Randomly spawns bottle objects on the ground throughout the level.
   * @param {World} world - The current game world instance.
   */
  addBottles(world) {
    for (let i = 0; i < this.totalBottles; i++) {
      const x = 500 + Math.random() * 2500;
      const y = 385;
      const bottle = new BottleGround();
      bottle.x = x;
      bottle.y = y;
      world.bottles.push(bottle);
    }
  }

  /**
   * Checks if the character collides with any bottles, collects them,
   * updates the status bar and plays the collection sound.
   * @param {World} world - The current game world instance.
   */
  checkCollectBottles(world) {
    for (let i = world.bottles.length - 1; i >= 0; i--) {
      const bottle = world.bottles[i];
      if (world.character.isColliding(bottle)) {
        world.bottles.splice(i, 1);
        world.collectedBottles++;
        world.bottle.setPercentage(world.collectedBottles, world.totalBottles);
        SoundManager.play(world.character.brokenBottle);
      }
    }
  }

  /**
   * Removes a specific bottle from the world and updates the status bar.
   * @param {World} world - The current game world instance.
   * @param {BottleGround} bottle - The bottle to be removed.
   */
  removeBottle(world, bottle) {
    const index = world.bottles.indexOf(bottle);
    if (index > -1) {
      world.bottles.splice(index, 1);
      this.setPercentage(this.collectedBottles, this.totalBottles);
    }
  }

  /**
   * Draws the collected/total bottle count as text next to the bottle bar.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawBottleBarText(ctx) {
    ctx.font = '12px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`${this.collectedBottles} / ${this.totalBottles}`, 250, 110);
  }
}
