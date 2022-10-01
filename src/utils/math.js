/**
 * Get random number between min and max included
 * @param min
 * @param max
 * @returns {number}
 */
Math.randomBetween = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};