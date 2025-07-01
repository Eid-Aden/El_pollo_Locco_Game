/**
 * Represents a game level with its components like enemies, clouds, background, and UI elements.
 */
class Level {
  /** @type {Array} Array of enemy objects in the level */
  enamies;

  /** @type {Array} Array of cloud objects for the level's sky layer */
  clouds;

  /** @type {Array} Array of background layer objects (e.g., ground, sky) */
  backgrounds;

  /** @type {number} The X coordinate where the level ends */
  levelEnd_x = 3500;

  /** @type {Object} UI element showing the bottle bar status */
  bottlebar;

  /** @type {Object} UI element showing the coin icon/status */
  coinIcon;

  /**
   * Creates a new Level instance.
   *
   * @param {Array} enamies - The enemies present in the level.
   * @param {Array} clouds - The clouds rendered in the level.
   * @param {Array} backgrounds - The background layers for the level.
   * @param {Object} bottlebar - The bottle bar UI element.
   * @param {Object} coinIcon - The coin icon UI element.
   */
  constructor(enamies, clouds, backgrounds, bottlebar, coinIcon) {
    this.enamies = enamies;
    this.clouds = clouds;
    this.backgrounds = backgrounds;
    this.bottlebar = bottlebar;
    this.coinIcon = coinIcon;
  }
}
