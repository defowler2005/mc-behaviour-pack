let lastColor;

/**
 * - Returns a random color code.
 * @returns {String} - A minecraft color code.
 */

export function randomColor() {
    const colors = [
        '§1', '§2', '§3', '§4', '§5', '§6', '§9', '§a', '§b', '§c', '§d', '§e', '§g'
    ];
    let finalColor = colors[Math.floor(Math.random() * colors.length)];

    while (finalColor === lastColor) {
        finalColor = colors[Math.floor(Math.random() * colors.length)];
    }

    lastColor = finalColor;
    return finalColor;
};