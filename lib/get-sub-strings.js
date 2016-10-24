'use strict';
/**
 * Return all possible sub strings of a give string in an array
 * If there is no maxLength is unrestricted, array will contain
 * (2 * str.length) sub strings.
 * @module get-sub-strings
 * @see module:index
 */
function getSubStrings(str, maxLength) {
    if (!str.length) {
        return [];
    }
    let result = [];

    let i = Math.min(str.length, maxLength);
    do {
        result.push(str.substr(0, i));
    } while (--i);

    if (str.length > 1) {
        result = result.concat(getSubStrings(str.substr(1), maxLength));
    }
    return result;
}

module.exports = getSubStrings;
