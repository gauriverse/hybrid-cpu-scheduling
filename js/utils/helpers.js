/**
 * Generate a random color from predefined palette
 * @returns {string} Hex color code
 */

function getRandomColor(){
    const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
        '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B195', '#C06C84'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Validate if value is a positive number
 * @param {*} value - Value to validate
 * @return {boolean} - True if valid positive number
 */

function isPositiveNumber(value){
    const num = parseInt(value);
    return !isNaN(num) && num > 0;
}

/**
 * Validate if a value is a non-negative number
 * @param {*} value - Value to validate
 * @return {boolean} - True if valid non-negative number
 */

function isNonNegativeNumber(value){
    const num = parseInt(value);
    return !isNaN(num) && num >= 0;
}

/**
 * Format time for display
 * @param {number} time - Time value
 * @returns {string} Formatted time string
 */

function formatTime(time){
    return time.toFixed(2);
}