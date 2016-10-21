'use strict';
/**
 * index module
 * @module index
 * @see module:index
 */
const tokenizeChinese = require('./tokenizer/chinese');
const tokenizeJapanese = require('./tokenizer/japanese');
const tokenizeEnglish = require('./tokenizer/english');

const cjkTokenizer = {
    tokenizeChinese,
    tokenizeEnglish,
    tokenizeJapanese,
    tokenize(text, options) {
    }
};

module.exports = cjkTokenizer;
