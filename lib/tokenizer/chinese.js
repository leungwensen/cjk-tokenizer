'use strict';
/**
 * chinese module
 * @module chinese
 * @see module:index
 */
// process only Chinese characters in [BMP](https://en.wikipedia.org/wiki/Plane_(Unicode))
// Chinese: \u4E00-\u9FFF\u3400-\u4DBF
const lang = require('zero-lang');
const addWordIntoTerm = require('../add-word-into-term');
const constant = require('../constant');
const getSubStrings = require('../get-sub-strings');

function tokenizeChinese(originText, options) {
    // N-gram
    options = lang.extend({}, constant.OPTIONS, options);
    let text = originText.replace(/[^\u4E00-\u9FFF\u3400-\u4DBF]+/g, '\n');
    const stopWords = lang.uniq(constant.STOP_WORDS.chinese.concat(options.stopWords || []));
    const terms = {};
    const pendingTerms = {};

    lang.each(stopWords, (stopWord) => {
        // Not handling that stop word if it's not a Chinese word.
        if (!(/^[\u4E00-\u9FFF\u3400-\u4DBF]+$/).test(stopWord)) {
            return;
        }
        text = text.replace(new RegExp(stopWord, 'g'), `${stopWord}\n`);
    });
    lang.each(text.split(/\n+/), (chunk) => {
        if (chunk.length <= 1) {
            return;
        }
        lang.each(getSubStrings(chunk, options.maxPhraseLength), (subStr) => {
            if (subStr.length <= 1) {
                return;
            }
            if (!lang.hasKey(pendingTerms, subStr)) {
                pendingTerms[subStr] = 0;
            }
            pendingTerms[subStr]++;
        });
        if (options.filterSubString) {
            lang.forIn(pendingTerms, (count, term) => {
                lang.each(getSubStrings(term, options.maxPhraseLength), (subStr) => {
                    if (term === subStr) {
                        return;
                    }
                    if (lang.hasKey(pendingTerms, subStr) && pendingTerms[subStr] === pendingTerms[term]) {
                        delete pendingTerms[subStr];
                    }
                });
            });
        }
    });
    lang.forIn(pendingTerms, (count, term) => {
        if (count >= options.minFrequency) {
            addWordIntoTerm(terms, term, term, originText);
        }
    });
    return terms;
}

module.exports = tokenizeChinese;