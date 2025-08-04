/**
 * Utility class for resolving image indices for different status bars (e.g., health, bottles).
 * Provides methods to map percentage or energy values to corresponding image frames.
 */
class StatusBarUtil {
  /**
   * Maps a given percentage (0–100) to a corresponding image index (0–5).
   * Used for status bars like bottles or End Boss health.
   *
   * @param {number} percent - The current percentage value.
   * @returns {number} Index (0–5) representing the status bar image to use.
   */
  static resolveImageIndex(percent) {
    if (percent >= 100) return 5;
    if (percent > 80) return 4;
    if (percent > 60) return 3;
    if (percent > 40) return 2;
    if (percent > 20) return 1;
    return 0;
  }

  /**
   * Maps a given energy value (0–100) to a health index (0–5).
   * Specifically used for the player's health bar resolution.
   *
   * @param {number} energy - Energy value from 0 (dead) to 100 (full health).
   * @returns {number} Health index (0–5) to select the correct health bar image.
   */
  static resolveHealthIndex(energy) {
    if (energy > 80) return 5;
    if (energy > 60) return 4;
    if (energy > 40) return 3;
    if (energy > 20) return 2;
    if (energy > 0) return 1;
    return 0;
  }
}
