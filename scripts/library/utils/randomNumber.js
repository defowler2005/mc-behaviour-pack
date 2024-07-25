/**
 * Generate a random number from and to a number.
 * @param {Number} a 
 * @param {Number} b 
 * @returns {Number}
 */
export function randomNumber(a, b) {
    if (a > b) {
        throw new Error("a value must be less than or equal to b value.");
    }; return Math.floor(Math.random() * (b - a + 1)) + a;
};