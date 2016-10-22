'use strict';
/**
 * get-positions module
 * @module get-positions
 * @see module:index
 */
const lang = require('zero-lang');

module.exports = (word, text) => {
    const indices = [];
    let result;
    const regexp = new RegExp('\\W+' + word.replace(/\./g, '\\.') + '\\W+', 'g');
    //console.log(regexp);
    while (result = regexp.exec(text)) {
        indices.push(result.index);
    }
    return indices;
};
