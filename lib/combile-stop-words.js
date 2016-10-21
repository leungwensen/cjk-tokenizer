'use strict';
/**
 * get-stop-words module
 * @module get-stop-words
 * @see module:index
 */
const lang = require('zero-lang');

module.exports = (stopWords1, stopWords2) => {
    return lang.map(
        lang.filter(
            lang.uniq(stopWords1.concat(stopWords2 || [])),
                word => !REGEXP_NON_ENGLISH.test(word)
        ),
            word => lang.lc(word)
    );
};
