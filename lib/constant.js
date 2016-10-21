'use strict';
/**
 * constant module
 * @module constant
 * @see module:index
 * @see https://github.com/timdream/wordfreq
 */
const EnglishStopWords = require('./stop-word/english');
const ChineseStopWords = require('./stop-word/chinese');
const JapaneseStopWords = require('./stop-word/japanese');

module.exports = {
    OPTIONS: {
        countFrequency: true,
        filterSubString: false,
        maxPhraseLength: 8,
        minFrequency: 1,
        recordPositions: true,
    },
    STOP_WORDS: {
        chinese: ChineseStopWords,
        english: EnglishStopWords,
        japanese: JapaneseStopWords,
    },
};
