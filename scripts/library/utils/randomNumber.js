/**
 * Generate a random number from and to a number.
 * @param {Number} a - The first number.
 * @param {Number} b - The second number.
 * @returns {Number} - The 
 */
export function randomNumber(a, b) {
    if (a > b) {
        throw new Error(`First number ${a} cannot be greater than the second number ${b}`);
    }; return Math.floor(Math.random() * (b - a + 1)) + a;
};