'use strict';
/**
 * japanese module
 * @module japanese
 * @see module:index
 */
// process only Japanese characters in [BMP](https://en.wikipedia.org/wiki/Plane_(Unicode))
// Kana: \u3041-\u309F\u30A0-\u30FF
// Kanji: \u4E00-\u9FFF\u3400-\u4DBF
// Process only Kana characters, because all Kanji characters are processed in chinese tokenizer
const lang = require('zero-lang');
const japanese = require('japanese');
// const TinySegmenter = require('tiny-segmenter');
const addWordIntoTerm = require('../add-word-into-term');
const constant = require('../constant');
const getSubStrings = require('../get-sub-strings');

// const segmenter = new TinySegmenter();

function tokenizeJapanese(originText, options) {
    // N-gram
    options = lang.extend({}, constant.OPTIONS, options);
    let text = originText.replace(/[^\u3041-\u309F\u30A0-\u30FF]+/g, '\n');
    const stopWords = lang.uniq(constant.STOP_WORDS.chinese.concat(options.stopWords || []));
    const terms = {};
    const pendingTerms = {};

    lang.each(stopWords, (stopWord) => {
        // Not handling that stop word if it's not a Chinese word.
        if (!(/^[\u3041-\u309F\u30A0-\u30FF]+$/).test(stopWord)) {
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
            addWordIntoTerm(terms, japanese.hiraganize(term), term, originText);
        }
    });
    return terms;
}

module.exports = tokenizeJapanese;
