/**
 * Get random number between min and max included
 * @param min
 * @param max
 * @returns {number}
 */
export function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

