
/**
 * Get random float between min included and max not included
 *
 * @param min
 * @param max
 * @returns {number}
 */
Math.randomFloatBetween = function (min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Get random integer between min and max included
 * @param min
 * @param max
 * @returns {number}
 */
Math.randomBetween = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Get random boolean
 * @returns {boolean}
 */
Math.randomBoolean = function () {
    return Math.random() < 0.5;
}