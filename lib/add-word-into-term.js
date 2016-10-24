'use strict';
/**
 * add-word-into-term module
 * @module add-word-into-term
 * @see module:index
 */
const lang = require('zero-lang');
const getIndices = require('./get-indices');

module.exports = (terms, stem, word, text) => {
    let term = terms[stem];
    if (!term) {
        term = terms[stem] = {
            stem,
            minSize: stem.length,
            maxSize: stem.length,
            count: 0,
            words: {},
        };
    }
    if (term.words[word]) {
        return;
    }
    const indices = getIndices(word, text);
    if (word.length > term.maxSize) {
        term.maxSize = word.length;
    }
    term.words[word] = indices;
    term.count += indices.length;
};
