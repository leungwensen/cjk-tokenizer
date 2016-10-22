'use strict';
/**
 * add-word-into-term module
 * @module add-word-into-term
 * @see module:index
 */
const getIndices = require('./get-indices');

module.exports = (term, word, text) => {
    if (term.words[word]) {
        return;
    }
    const indices = getIndices(word, text);
    term.words[word] = indices;
    term.count += indices.length;
};
