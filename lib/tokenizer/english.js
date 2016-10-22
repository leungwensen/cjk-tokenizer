'use strict';
/**
 * english module
 * @module english
 * @see module:index
 */
// process only English characters
// English: [A-Za-zéÉ'’_\-0-9@\.]+

const lang = require('zero-lang');
const porterStemmer = require('porter-stemmer');
const constant = require('../constant');
const addWordIntoTerm = require('../add-word-into-term');

function tokenizeEnglish(text, options) {
    // For English, we count "stems" instead of words,
    // and decide how to represent that stem at the end
    // according to the counts.
    text = lang.lc(text);
    options = lang.extend({}, constant.OPTIONS, options);

    const terms = {};
    const words = text.split(/[^A-Za-zéÉ'’_\-0-9@\.]+/);
    const stopWords = lang.map(
        lang.uniq(constant.STOP_WORDS.english.concat(options.stopWords || [])),
            word => lang.lc(word)
    );

    lang.each(words, (word) => {
        word = word
            .replace(/\.+/g, '.') // replace multiple full stops
            .replace(/(.{3,})\.$/g, '$1') // replace single trailing stop
            .replace(/n[\'’]t\b/ig, '') // get rid of ~n't
            .replace(/[\'’](s|ll|d|ve)?\b/ig, ''); // get rid of ’ and '

        // skip if the word is shorter than two characters
        // (i.e. exactly one letter)
        if (!word || word.length < 2) {
            return;
        }
        // that's not a word unless it contains at least an alphabet
        if (/^[0-9\.@\-]+$/.test(word)) {
            return;
        }
        // skip if this is a stop word
        if (lang.contains(stopWords, word)) {
            return;
        }

        const stem = porterStemmer.memoizingStemmer(word);
        if (!lang.hasKey(terms, stem)) {
            terms[stem] = {
                stem,
                size: stem.length,
                count: 0,
                words: {},
            };
        }
        addWordIntoTerm(terms[stem], word, text);
    });
    return terms;
}

module.exports = tokenizeEnglish;