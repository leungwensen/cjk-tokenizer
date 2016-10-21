'use strict';
/**
 * japanese module
 * @module japanese
 * @see module:index
 */
// process only Japanese characters in [BMP](https://en.wikipedia.org/wiki/Plane_(Unicode))
// Kana: \u3041-\u309F\u30A0-\u30FF
// Kanji: \u4E00-\u9FFF\u3400-\u4DBF

const japanese = require('japanese');
const TinySegmenter = require('tiny-segmenter');
const constant = require('../constant');

function tokenizeJapanese() {
}

module.exports = tokenizeJapanese;
