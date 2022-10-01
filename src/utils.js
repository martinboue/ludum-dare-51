/**
 * Get random number between min and max included
 * @param min
 * @param max
 * @returns {number}
 */
export function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Randomly choose an item in an array
 * @param array
 * @returns array item
 */
export function randomItem(array) {
    return array[randomBetween(0, array.length - 1)];
}

